"use client";

import { useMemo, useState } from "react";
import type { DashboardData, EventStatus, QualityEvent } from "./types";

type LinewatchDashboardProps = {
  dashboard: DashboardData;
};

const statusLabels: EventStatus[] = ["open", "acknowledged", "resolved"];

const SensorChart = ({ event, dashboard }: { event: QualityEvent; dashboard: DashboardData }) => {
  const points = dashboard.sensorSeries[event.machineId] ?? [];
  const values = points.map((point) => point.value);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 100);
  const polyline = points
    .map((point, index) => {
      const x = points.length === 1 ? 0 : (index / (points.length - 1)) * 100;
      const y = 100 - ((point.value - min) / (max - min || 1)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="panel chart-panel" aria-label="sensor chart data">
      <div>
        <h2>Sensor trend</h2>
        <p>{event.machineId} anomaly window</p>
      </div>
      <svg viewBox="0 0 100 100" role="img" aria-label="Sensor values over time">
        <polyline points={polyline} />
      </svg>
      <div className="chart-axis">
        {points.map((point) => (
          <span key={point.time}>{point.time}</span>
        ))}
      </div>
    </section>
  );
};

export const LinewatchDashboard = ({ dashboard }: LinewatchDashboardProps) => {
  const [status, setStatus] = useState<EventStatus | "all">("all");
  const [events, setEvents] = useState(dashboard.events);
  const selectedEvent = events[0];
  const openCount = events.filter((event) => event.status !== "resolved").length;
  const filteredEvents = useMemo(
    () => events.filter((event) => status === "all" || event.status === status),
    [events, status],
  );

  const updateStatus = (eventId: string, nextStatus: EventStatus) => {
    setEvents((current) => current.map((event) => (event.id === eventId ? { ...event, status: nextStatus } : event)));
  };

  return (
    <main>
      <header className="topbar">
        <div>
          <p className="eyebrow">LineWatch</p>
          <h1>Manufacturing quality events</h1>
        </div>
        <strong>{openCount} active events</strong>
      </header>

      <section className="line-grid" aria-label="production lines">
        {dashboard.lines.map((line) => (
          <article key={line.id} className="panel">
            <span className={`status ${line.status}`}>{line.status}</span>
            <h2>{line.name}</h2>
            <p>{line.plant}</p>
          </article>
        ))}
      </section>

      <section className="workspace">
        <div className="panel">
          <div className="toolbar">
            <h2>Quality timeline</h2>
            <select value={status} onChange={(event) => setStatus(event.target.value as EventStatus | "all")}>
              <option value="all">all</option>
              {statusLabels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="event-list">
            {filteredEvents.map((event) => (
              <article key={event.id} className="event-row">
                <div>
                  <span className={`severity ${event.severity}`}>{event.severity}</span>
                  <h3>{event.reason}</h3>
                  <p>
                    {event.machineId} · score {Math.round(event.defectScore * 100)} ·{" "}
                    {new Date(event.openedAt).toLocaleString()}
                  </p>
                </div>
                <div className="actions">
                  {statusLabels.map((item) => (
                    <button key={item} type="button" onClick={() => updateStatus(event.id, item)}>
                      {item}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {selectedEvent ? <SensorChart event={selectedEvent} dashboard={dashboard} /> : null}
      </section>

      <section className="panel">
        <h2>Operator actions</h2>
        <div className="log-list">
          {dashboard.actionLogs.map((log) => (
            <article key={log.id}>
              <strong>{log.actor}</strong>
              <p>
                {log.action} · {log.memo}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
