# Sehwa 2024 Q14 재생성 패킷

```yaml
schemaVersion: handsolution-regeneration-packet-v1
runId: sehwa-q14-regeneration-packet-20260618051542
problemCode: sehwa-2024-q14
sourceSolutionPacket: work/agents/pipeline-test-sehwa-2024-q14/solution_packet.md
sourceGenerationPacket: work/agents/pipeline-test-sehwa-2024-q14/generation_packet.md
status: ready_for_regeneration_plan_review
createdFor: immediate-regeneration-queue
processGateVersion: 4
currentWorkflow: handsolution Agent Harness
```

## 1. 목적

이 패킷은 `REVIEW_QUEUE.md`의 즉시 재생성 필요 항목 중 Sehwa 2024 Q14 계열을 새 작업번호로 전체 재생성하기 위한 입력 계약서다.

이번 패킷 단계에서는 이미지를 생성하지 않는다. 목표는 다음 실행 단계에서 image generation 또는 손글씨 변환을 시도할 때 실패 원인과 통과 조건이 흔들리지 않도록 고정하는 것이다.

## 2. 현재 상태 요약

### 즉시 재생성 필요

```text
outputs/2026-06-17_sehwa-2024-q14_상세형_pipeline-test-01_attempt10_page2.png
outputs/2026-06-16_sehwa-2024-q14_상세형_pipeline-test-01_attempt09_page2.png
outputs/2026-06-16_sehwa-2024-q14_상세형_pipeline-test-01_attempt05_page1.png
outputs/2026-06-16_sehwa-2024-q14_상세형_pipeline-test-01_attempt05_page2.png
```

### 기준 후보 / positive reference

```text
page1 anchor:
outputs/2026-06-16_sehwa-2024-q14_상세형_pipeline-test-01_attempt09_page1.png

page2 anchor:
outputs/2026-06-17_sehwa-2024-q14_상세형_pipeline-test-01_attempt11_page2.png
```

이 두 장만 Sehwa Q14 2쪽 상세형의 positive reference로 사용한다. `수정 필요`, `이전 후보`, `폐기`, `검수자료` 상태의 이미지는 실패 원인 확인용으로만 본다.

## 3. 핵심 수학 계약

원천:

```text
work/agents/pipeline-test-sehwa-2024-q14/solution_packet.md
```

반드시 보존할 풀이 구조:

1. 이동 후 중심은 `(x+m, f(x)+m)`이다.
2. 두 축 동시 접선 조건은 `|x+m|=2`, `|f(x)+m|=2`이다.
3. 같은 `m`을 쓰므로 두 식을 빼서 `m`을 제거한다.
4. 따라서 `f(x)-x ∈ {-4, 0, 4}`이다.
5. `g(x)=f(x)-x`로 두면, 조건을 만족하는 x좌표는 `g(x)`와 `y=-4, y=0, y=4`의 교점 x좌표다.
6. 총 교점이 5개이므로 세 수평선 중 하나는 포물선에 접해야 한다.
7. `x1=0`, `f(0)<0`이므로 `g(0)=-4`이다.
8. 구조는 아래로 열린 포물선 `g(x)=4-a(x-p)^2`와 `y=4` 접선, `y=0`, `y=-4` 두 교점이다.
9. 교점 x좌표는 `0`, `p-p/√2`, `p`, `p+p/√2`, `2p`이다.
10. `x2+x3+x4+x5=5p=30`이므로 `p=6`이다.
11. `f(6)=g(6)+6=4+6=10`이다.

최종 정답:

```text
④ 10
```

## 4. 실패 원인 정리

### attempt05 page1/page2

상태:

```text
수정 필요
```

실패 요약:

- typed/code-rendered full page 성격이 강하다.
- 현재 v4+ 기준의 손글씨형 산출물과 충돌한다.
- 수학 정확도나 그래프 정확도 일부가 맞더라도, 비그래프 영역이 문서형/카드형/코드 렌더링처럼 보이면 최종 후보가 될 수 없다.

재사용 원칙:

- 최종 이미지 positive reference로 사용 금지.
- 내부 accuracy/layout reference로만 제한 가능.
- 문제 본문, Tip, 풀이, 정답의 비그래프 영역을 attempt05에서 복사/오버레이/부분 패치하지 않는다.

### attempt09 page2

상태:

```text
수정 필요
```

실패 요약:

- page1은 기준 후보로 승인되었으나, page2는 page1과 글씨 두께와 페이지 비율이 다르게 보였다.
- 두 장이 한 세트가 아니라 서로 다른 생성물처럼 느껴진다.

재생성 조건:

- page2는 page1 anchor와 같은 캔버스 비율, 흰 배경, 중간-얇은 손글씨 두께를 맞춘다.
- page1/page2의 여백, 밀도, 색상 무게가 하나의 세트처럼 보여야 한다.

### attempt10 page2

상태:

```text
수정 필요
```

실패 요약:

- page consistency는 개선됐으나, `왜 그래프로 보나?` 개념 설명이 일반 검은 풀이문처럼 보였다.
- 이 설명은 계산 줄이 아니라 학생 이해를 여는 개념 설명 블록이므로 색상/박스/밑줄/형광 표시가 필요하다.

재생성 조건:

- 개념 설명 블록은 보라색 계열 박스, 연한 음영, 색 밑줄, 또는 명확한 강조선을 가진다.
- 핵심 개념 설명은 검은 일반 풀이 줄에 묻히면 실패다.

### attempt11 page2

상태:

```text
기준 후보
```

통과 요약:

- page1 anchor와 같은 1055x1491 계열 캔버스 비율과 중간-얇은 손글씨 느낌을 유지했다.
- `왜 그래프로 보나?` 개념 설명을 보라색 박스와 강조 처리로 분리했다.
- 그래프는 큰 중앙 영역에 배치되어 교점 구조가 읽힌다.
- 답 박스는 빨간색으로 분명히 구분된다.

## 5. 새 작업번호 제안

새 재생성은 기존 PNG 위 부분 보정이 아니라 전체 재생성이다.

권장 작업명:

```text
sehwa-2024-q14_상세형_regen-work12_page1.png
sehwa-2024-q14_상세형_regen-work12_page2.png
```

또는 현재 파일명 체계를 유지해야 하면:

```text
outputs/2026-06-18_sehwa-2024-q14_상세형_pipeline-test-01_attempt12_page1.png
outputs/2026-06-18_sehwa-2024-q14_상세형_pipeline-test-01_attempt12_page2.png
```

## 6. 페이지 구성 계약

### page1 역할

page1은 문제 조건 변환과 핵심 치환까지 담당한다.

필수 포함:

- 원문 문제 전체 재작성
- 핵심 조건 형광/색 표시
  - 반지름 2
  - x축과 y축에 동시에 접함
  - `x1=0`, `f(x1)<0`
  - `x2+x3+x4+x5=30`
  - `f(6)`
- `호빈T의 Tip` 박스
- 이동 후 중심 `(x+m, f(x)+m)`
- 접선 조건 `|x+m|=2`, `|f(x)+m|=2`
- 같은 `m`을 빼서 `f(x)-x ∈ {-4,0,4}` 도출
- `g(x)=f(x)-x` 치환
- page2로 이어진다는 표시

page1 스타일 anchor:

```text
outputs/2026-06-16_sehwa-2024-q14_상세형_pipeline-test-01_attempt09_page1.png
```

### page2 역할

page2는 그래프 해석과 합 계산, 최종 답을 담당한다.

필수 포함:

- 상단에 `g(x)=f(x)-x` 연결
- `왜 그래프로 보나?` 개념 설명 강조 블록
- `g(0)=-4` 근거
- 아래로 열린 포물선 그래프
- `y=4`, `y=0`, `y=-4` 수평선
- 교점 5개 구조
- 교점 목록: `0`, `p-p/√2`, `p`, `p+p/√2`, `2p`
- 합 계산 `5p=30`, `p=6`
- `f(6)=g(6)+6=10`
- 빨간 정답 박스 `정답 ④ 10`

page2 style anchor:

```text
outputs/2026-06-17_sehwa-2024-q14_상세형_pipeline-test-01_attempt11_page2.png
```

## 7. 스타일 계약

필수:

- page1/page2가 같은 문제 세트처럼 보여야 한다.
- 캔버스 비율, 여백, stroke weight, 배경색, 색상 무게가 일치해야 한다.
- 손글씨는 중간-얇은 자연스러운 필기체다.
- 두꺼운 마커 느낌, 인쇄체, 디지털 카드형, 문서형 레이아웃은 실패다.
- 4색 이내 사용:
  - 파랑: 핵심 조건/접선 조건/그래프 기준선
  - 보라 또는 주황: 핵심 발상/개념 설명
  - 초록: 계산 전환
  - 빨강: 최종 답
- Tip 제목은 `호빈T의 Tip`으로 유지한다.
- conceptual explanation block은 일반 계산문과 시각적으로 구분한다.

금지:

- 비그래프 영역 PIL/HTML/SVG/canvas/시스템 폰트 렌더링
- 원문 PDF 크롭 또는 OCR 텍스트 붙이기
- 기존 실패 PNG 위 덧칠/부분 패치
- attempt05의 코드 렌더링 페이지를 final candidate로 재사용
- page1/page2 중 하나만 다른 비율이나 다른 글씨 두께로 생성
- `왜 그래프로 보나?`를 검은 일반 풀이문으로 방치

## 8. 그래프 계약

그래프는 수학적으로 정확한 데이터 하네스 근거를 사용한다. 단, 최종 페이지에 통합될 때는 손풀이 스타일과 어울려야 한다.

필수 구조:

```text
g(x)=4-a(x-p)^2
```

- 포물선은 아래로 열린다.
- `y=4`는 꼭짓점 `P(p,4)`에서 접한다.
- `y=0`은 두 점에서 만난다.
- `y=-4`는 두 점에서 만난다.
- 왼쪽 끝 교점은 `x=0`이다.
- 오른쪽 끝 교점은 `x=2p`이다.
- `p-p/√2`, `p`, `p+p/√2` 라벨이 식별 가능해야 한다.
- 그래프는 page2 중앙에서 충분히 크고 읽기 쉬워야 한다.

그래프 실패 기준:

- `y=4`가 두 점에서 만나는 것처럼 보임
- `y=0` 또는 `y=-4`의 교점 수가 틀림
- 포물선이 위로 열림
- x=0이 가장 왼쪽 교점처럼 보이지 않음
- 라벨이 겹치거나 읽기 어려움
- 그래프가 풀이 영역을 침범함

## 9. 제작 경로 제안

`docs/successful-image-production-patterns.md` 기준으로, 전체 텍스트/수식/그래프를 한 번에 image_gen에 맡기는 방식은 불안정하다.

권장 경로:

1. 정확도 master로 solution/generation packet을 고정한다.
2. 비그래프 영역은 손글씨형 image generation 또는 손글씨 변환 경로로 생성한다.
3. 그래프 영역은 blank graph box 또는 안전 박스에 둔다.
4. `g(x)=4-a(x-p)^2`, `y=4,0,-4` 그래프는 데이터 하네스 근거로 만든다.
5. 최종 통합 시 그래프가 손풀이 페이지 질감과 어울리는지 확인한다.
6. 비그래프 텍스트에 코드 렌더링이 섞이면 후보 등록 금지다.

주의:

- 그래프/도형 영역의 데이터 기반 렌더링은 허용된다.
- 그러나 문제 본문, Tip, 풀이, 정답 같은 비그래프 글자는 코드 렌더링하면 안 된다.
- 그래프 라벨은 정확도와 손글씨 감각을 동시에 확인한다.

## 10. Review & Gate 체크리스트

### page consistency

```yaml
multiPageConsistency:
  canvasRatio: pass | fail
  strokeWeight: pass | fail
  density: pass | fail
  colorWeight: pass | fail
  backgroundTone: pass | fail
```

실패 조건:

- 두 페이지가 서로 다른 템플릿/상품처럼 보임
- 한쪽만 글씨가 두껍거나 밀도가 다름
- 한쪽만 색상 무게가 과하거나 약함

### student-understanding emphasis

```yaml
studentUnderstandingEmphasis:
  conceptExplanationBlocksHighlighted: pass | fail
  coreIdeaNotBuriedInBlackCalculation: pass | fail
  whyGraphBlockVisible: pass | fail
```

실패 조건:

- `왜 그래프로 보나?`가 일반 검은 계산 줄처럼 보임
- `g(x)=f(x)-x` 치환 이유가 눈에 띄지 않음
- 학생이 그래프를 왜 봐야 하는지 시각적으로 분리되어 있지 않음

### math/graph

```yaml
mathAndGraph:
  answerCheck: pass | fail
  gSubstitutionCheck: pass | fail
  intersectionCountCheck: pass | fail
  graphShapeCheck: pass | fail
  finalAnswerBoxCheck: pass | fail
```

실패 조건:

- 정답 10이 아니거나 보기 번호가 틀림
- 교점 5개 구조가 틀림
- `5p=30` 흐름이 빠짐
- 그래프 라벨/교점이 불명확함

### rendering contamination

```yaml
renderedTextContamination:
  nonGraphTextHandwrittenSource: pass | fail
  noPilHtmlSvgCanvasText: pass | fail
  noOcrTextOverlay: pass | fail
  noDigitalCardLayout: pass | fail
```

실패 조건:

- 비그래프 영역이 코드 렌더링/문서형처럼 보임
- 문제나 풀이가 OCR/시스템 폰트처럼 보임
- attempt05류의 문서형 산출물로 회귀함

## 11. 등록 전 필수 메타데이터

검수 후보 등록 전 다음 필드를 준비한다.

```yaml
processGateVersion: 4
explanationMdRef: work/agents/pipeline-test-sehwa-2024-q14/solution_packet.md
explanationReviewResult: pass
problemTextCheck: pass
problemSourceCheck: pass
coreConditionCheck: pass
fixedLabelCheck: pass
visualKind: graph
visualSpecRef: work/agents/pipeline-test-sehwa-2024-q14/solution_packet.md
visualPurposeCheck: pass
visualLegendCheck: pass
visualLabelGlyphCheck: pass
blindReviewResult: pass
sourcePacket: work/regeneration-packets/sehwa-2024-q14-regeneration-packet.md
styleReferenceSet: sehwa-2024-q14-two-page-reference
```

## 12. 다음 실행 단계

이 패킷이 통과하면 다음 단계는 별도 Harness run으로 진행한다.

추천 다음 run:

```text
sehwa-q14-attempt12-generation-plan
```

그 run에서 할 일:

1. 실제 제작 방식 선택
   - image_gen 직접 재생성
   - blank graph box + graph harness 통합
   - 내부 accuracy draft → 손글씨 변환
2. 예상 비용/실패율 확인
3. 생성 실행 전 호빈님 승인
4. 생성 후 Review & Gate 체크리스트 작성
5. 통과 시 publish-output 여부 별도 승인 요청

## 13. 이번 패킷의 결론

Sehwa Q14는 이미 positive reference 세트가 있다.

```text
page1: attempt09_page1
page2: attempt11_page2
```

따라서 새 재생성은 디자인 탐색이 아니라, 이 기준 세트의 일관성을 유지하면서 실패 항목만 막는 방식으로 진행해야 한다.

가장 중요한 금지선은 두 가지다.

1. page1/page2가 서로 다른 스타일로 보이면 실패다.
2. 개념 설명이 검은 일반 풀이에 묻히거나 비그래프 영역이 코드 렌더링처럼 보이면 실패다.
