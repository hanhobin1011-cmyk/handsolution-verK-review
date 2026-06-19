# Q07 work14 visual spec — graph feedback fix

- 대상: `outputs/2026-06-19_majeongo-g2-june_q07_상세형_작업14.png`
- 반복 수정 2회 초과 정책에 따른 전체 재생성 계열 후보.
- DB 피드백: P좌표 쪽에 4π가 겹침. 그래프가 이중 레이어처럼 보이고 틀어져 있음.

## 수정 게이트

- graph region is cleared before the verified harness graph is drawn.
- 그래프는 한 레이어처럼 보여야 하며 뒤쪽/앞쪽 그래프가 겹쳐 보이면 실패.
- P와 4π tick label은 분리되어 읽혀야 한다.
- AOB/BCP 영역과 B/C/P 라벨은 보존한다.
- 그래프 박스/테두리 금지.

## 결과

pass
