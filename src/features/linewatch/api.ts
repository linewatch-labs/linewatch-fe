import ky from "ky";
import type { DashboardData } from "./types";

const api = ky.create({
  prefixUrl: process.env.LINEWATCH_API_URL ?? "http://127.0.0.1:8000/api/v1",
  timeout: 2500,
});

const mockDashboard: DashboardData = {
  lines: [
    { id: "line-a", name: "Line A", plant: "Busan Plant", status: "warning" },
    { id: "line-b", name: "Line B", plant: "Busan Plant", status: "running" },
  ],
  machines: [
    { id: "cam-01", lineId: "line-a", name: "Vision Cam 01", type: "inspection" },
    { id: "press-07", lineId: "line-a", name: "Press 07", type: "pressure" },
  ],
  events: [
    {
      id: "qe-1001",
      lineId: "line-a",
      machineId: "cam-01",
      severity: "critical",
      status: "open",
      reason: "AI defect score exceeded threshold after vibration spike",
      defectScore: 0.93,
      openedAt: "2026-07-08T08:20:00Z",
    },
    {
      id: "qe-1002",
      lineId: "line-a",
      machineId: "press-07",
      severity: "high",
      status: "acknowledged",
      reason: "Pressure drift above rule profile for 4 minutes",
      defectScore: 0.72,
      openedAt: "2026-07-08T08:12:00Z",
    },
  ],
  sensorSeries: {
    "cam-01": [
      { time: "08:15", value: 38 },
      { time: "08:16", value: 41 },
      { time: "08:17", value: 63 },
      { time: "08:18", value: 81 },
      { time: "08:19", value: 76 },
      { time: "08:20", value: 88 },
    ],
    "press-07": [
      { time: "08:15", value: 42 },
      { time: "08:16", value: 45 },
      { time: "08:17", value: 49 },
      { time: "08:18", value: 66 },
      { time: "08:19", value: 71 },
      { time: "08:20", value: 68 },
    ],
  },
  actionLogs: [
    {
      id: "act-1",
      eventId: "qe-1002",
      actor: "operator@linewatch.local",
      action: "acknowledged",
      memo: "Checked rule profile and requested on-site sample review",
      createdAt: "2026-07-08T08:14:30Z",
    },
  ],
};

export const fetchDashboard = async (): Promise<DashboardData> => {
  try {
    const [lines, events] = await Promise.all([
      api.get("lines").json<DashboardData["lines"]>(),
      api.get("quality-events").json<DashboardData["events"]>(),
    ]);

    const firstEvent = events[0];
    const sensorSeries = firstEvent
      ? {
          [firstEvent.machineId]: await api
            .get(`machines/${firstEvent.machineId}/sensor-series`)
            .json<DashboardData["sensorSeries"][string]>(),
        }
      : {};

    return { ...mockDashboard, lines, events, sensorSeries: { ...mockDashboard.sensorSeries, ...sensorSeries } };
  } catch {
    return mockDashboard;
  }
};
