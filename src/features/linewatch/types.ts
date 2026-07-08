export type LineStatus = "running" | "warning" | "stopped";
export type EventSeverity = "critical" | "high" | "medium";
export type EventStatus = "open" | "acknowledged" | "resolved";

export type ProductionLine = {
  id: string;
  name: string;
  plant: string;
  status: LineStatus;
};

export type Machine = {
  id: string;
  lineId: string;
  name: string;
  type: string;
};

export type SensorPoint = {
  time: string;
  value: number;
};

export type QualityEvent = {
  id: string;
  lineId: string;
  machineId: string;
  severity: EventSeverity;
  status: EventStatus;
  reason: string;
  defectScore: number;
  openedAt: string;
};

export type ActionLog = {
  id: string;
  eventId: string;
  actor: string;
  action: EventStatus;
  memo: string;
  createdAt: string;
};

export type DashboardData = {
  lines: ProductionLine[];
  machines: Machine[];
  events: QualityEvent[];
  sensorSeries: Record<string, SensorPoint[]>;
  actionLogs: ActionLog[];
};
