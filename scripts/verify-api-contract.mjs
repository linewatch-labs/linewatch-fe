import { readFileSync } from "node:fs";

const files = ["src/features/linewatch/api.ts", "src/features/linewatch/types.ts"];
const text = files.map((file) => readFileSync(file, "utf8")).join("\n");
const required = ["ky", "QualityEvent", "SensorPoint", "ActionLog", "quality-events", "sensor-series"];
const missing = required.filter((item) => !text.includes(item));

if (missing.length) {
  throw new Error(`Missing API contract evidence: ${missing.join(", ")}`);
}

console.log("api contract ok");
