import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const api = read("src/features/linewatch/api.ts");
const page = read("src/app/page.tsx");
const dashboard = read("src/features/linewatch/linewatch-dashboard.tsx");

assert.match(api, /ky\.create/);
assert.match(api, /LINEWATCH_API_URL/);
assert.match(api, /api\.get\("lines"\)/);
assert.match(api, /api\.get\("quality-events"\)/);
assert.match(api, /machines\/\$\{firstEvent\.machineId\}\/sensor-series/);
assert.match(api, /catch\s*\{/);
assert.match(page, /fetchDashboard/);
assert.match(dashboard, /updateStatus/);
assert.match(dashboard, /aria-label="sensor chart data"/);

console.log("linewatch-fe contract tests passed");
