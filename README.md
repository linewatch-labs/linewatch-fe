# LineWatch FE

Minimal Next.js App Router dashboard for manufacturing quality events.

## Run

```bash
npm install
npm run dev
```

Optional API target:

```bash
LINEWATCH_API_URL=http://127.0.0.1:8000/api/v1 npm run dev
```

## Checks

```bash
npm run verify
```

## UI Evidence

- Production line status cards
- Quality event timeline with severity/status filters
- Sensor chart data rendered from `sensorSeries`
- Operator status actions: `open`, `acknowledged`, `resolved`
- REST integration through `ky`

## API Used

- `GET /api/v1/lines`
- `GET /api/v1/quality-events`
- `GET /api/v1/machines/{id}/sensor-series`

## Portfolio Evidence

LineWatch normalizes manufacturing sensor and Inspection AI signals into actionable quality events. The dashboard shows the event reason, defect score, sensor trend, and operator action state in one workflow.

## Resume Bullets

- Built a Next.js App Router quality dashboard that connects manufacturing line status, AI defect events, sensor chart data, and operator actions.
- Used TypeScript domain models and `ky` REST calls to keep frontend/API contracts explicit and easy to verify.
