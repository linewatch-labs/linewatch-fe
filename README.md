# LineWatch FE

제조 라인의 품질 이벤트, 설비 상태, 센서 추이를 한 화면에서 확인하는 운영 대시보드입니다. InterX Frontend/Product Engineer 지원을 위해 React 웹, REST 연동, 제조 데이터 UI 흐름을 보여주도록 구성했습니다.

## 주요 기능

- 라인별 가동 상태와 품질 이슈 요약
- 품질 이벤트 타임라인과 심각도/상태 표시
- 설비 센서 추이 차트
- 작업자 조치 상태 변경 흐름
- API 장애 시에도 확인 가능한 데모 데이터 fallback

## 기술 스택

- Next.js App Router
- React, TypeScript
- ky REST client
- CSS 기반 반응형 대시보드

## 실행

```bash
npm install
npm run dev
```

백엔드 연결:

```bash
LINEWATCH_API_URL=http://127.0.0.1:8000/api/v1 npm run dev
```

## 검증

```bash
npm run typecheck
npm run verify
npm run build
```

## API 연동

`src/features/linewatch/api.ts`에서 ky 클라이언트를 관리합니다.

- `GET /api/v1/lines`
- `GET /api/v1/quality-events`
- `GET /api/v1/machines/{id}/sensor-series`

## 프로젝트 포인트

LineWatch FE는 제조 현장의 품질 알림을 단순 테이블이 아니라 운영자가 바로 판단할 수 있는 워크플로우로 풀어낸 프로젝트입니다. 라인 상태, 이벤트 원인, 결함 점수, 센서 추이, 조치 상태를 하나의 제품 화면으로 연결했습니다.
