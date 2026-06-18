# 25년 1학기 기말 내신기출 1회 22번 상세형 작업02 패킷

- 작업 ID: `2026-06-14_final-exam-1`
- 이전 후보: `outputs/2026-06-14_final-exam-1_22_상세형_작업01.png`
- 신규 후보: `outputs/2026-06-14_final-exam-1_22_상세형_작업02.png`
- image_gen 원본: `work/generated_raw/2026-06-14_final-exam-1/22_work02_bar_core_raw.png`
- 도형 하네스 소스: `work/generated_raw/2026-06-14_final-exam-1/22_work02_figure_harness_source.png`
- 도형 하네스 스크립트: `scripts/render_final_exam_22_work02_figure_harness.py`
- 생성 방식: 비그래프 영역 전체 손글씨형 재생성 후, 원문 도형 영역만 좌표 기반 하네스로 교체

## 재생성 이유

사용자 DB 검수에서 `핵심 조건이 풀이 중 어디인지 표현이 안됨. 선분위에 bar가 있어야 함.`으로 반려되었다. 작업02에서는 조건 사용 위치를 명시하고, 길이를 뜻하는 두 글자 선분 기호의 overline/bar 표기를 일관되게 적용했다.

## 고정 풀이

- 사인법칙으로 `\overline{BC}:\overline{CA}:\overline{AB}=sin A:sin B:sin C=8:7:6`
- `\overline{BC}=8t`, `\overline{CA}=7t`, `\overline{AB}=6t`
- `s=21t/2`
- `K=(21√15/4)t^2`
- `r=K/s=(√15/2)t`
- 조건 `(나)`에서 `r^2π=15π`이므로 `r=√15`, 따라서 `t=2`
- `\overline{BC}=16`, `\overline{CA}=14`, `\overline{AB}=12`
- 좌표는 `A=(0,0)`, `C=(14,0)`, `B=(3,3√15)`
- `D=(3/2,3√15/2)`, `E=(17/2,3√15/2)`, `F=(6,0)`
- `O=(5,y)`로 두고 `\overline{OD}^2=\overline{OF}^2`
- `(7/2)^2+(y-3√15/2)^2=1+y^2`
- `y=√15`, `O=(5,√15)`
- `\overline{AO}=2√10`, `\overline{OF}=4`, 외접원의 넓이 `16π`

## 강조와 bar 표기

- 조건 `(가)` 사용 위치: `sin A:sin B:sin C -> \overline{BC}:\overline{CA}:\overline{AB}`.
- 이유 설명: `각 정보를 변 길이 비로 바꾼다`.
- 조건 `(나)` 사용 위치: `r=K/s=(√15/2)t`, `r=√15 -> t=2`.
- 이유 설명: `내접원 넓이가 실제 길이 스케일을 정한다`.
- 길이 기호: `\overline{AB}`, `\overline{BC}`, `\overline{CA}`, `\overline{AO}`, `\overline{OD}`, `\overline{OF}`를 bar 표기로 작성.

## 도형 하네스 검수

원문 도형은 image_gen 추측 도형으로 두지 않고 작업02 생성본의 도형 영역만 좌표 기반 하네스로 교체했다.

- `AB:CA:BC=300:350:400=6:7:8`
- `AD=DB=150`
- `BE=EC=200`
- `CF:FA=4:3`
- `D/E/F` 라벨과 내부 삼각형 `DEF` 확인
- 조건 박스와 도형 박스가 겹치지 않도록 도형 위치와 크기를 조정

## 내부 반려와 검수

- 1차 생성본은 외심 계산 중간식이 잘못 적혀 내부 반려했다.
- 2차 생성본은 문제 자체가 다른 문항으로 변형되어 내부 반려했다.
- 최종 작업02는 검증된 풀이식과 도형 하네스를 적용했다.
- A4 정규화: `1240x1754`
- 비그래프 영역은 image_gen 손글씨형 결과이며 로컬 텍스트 오버레이를 사용하지 않았다.
