# Generation Packet — sehwa-2024-q14 pipeline-test-01

```yaml
agent: handwritten-production
status: ready_for_review_planning
schemaVersion: handsolution-generation-packet-v1
processGateVersion: 4
problemCode: sehwa-2024-q14
workId: pipeline-test-01
sourcePacket: work/agents/pipeline-test-sehwa-2024-q14/solution_packet.md
productionStage: planning_only_no_final_image_yet
qualityRevision:
  revision: 2
  reason: 사용자가 단계별 에이전트 점검 중 보완 필요성을 질문하여, 제작 계획을 실제 이미지 생성 직전 계약서 수준으로 강화함.
  upgradedItems:
    - 1쪽 기본안과 2쪽 대안 분리
    - 최종 이미지에 들어갈 실제 텍스트 블록 확정
    - 그래프 제작용 고정 스펙 강화
    - 이미지 생성 실패 시 fallback 전략 추가
    - 검수 에이전트가 확인할 acceptance criteria 추가
problemTextCheck: pass
problemSourceCheck: pass
coreConditionCheck: pass
fixedLabelCheck: pass
answerFromSolutionPacket: 10
renderingPolicy:
  nonGraphText: image_gen_handwritten_only
  graphFigure: integrated_handwritten_image_from_fixed_spec
  prohibited:
    - full_page_system_font_rendering
    - html_css_solution_card_as_final
    - pil_or_svg_non_graph_text_overlay_as_final
    - publishing_without_review_gate
visualKind: graph
visualSpecRef: solution_packet.graphSpec
visualValidation: planned_not_generated
harnessRefs:
  - type: graph_spec
    ref: solution_packet.graphSpec
    purpose: compare final graph against required intersection structure
canvasPlan:
  workingCanvas: A3
  finalOutput: A4
  pageDecisionPolicy: problem_specific_not_fixed
  pageDecisionInputs:
    - problemStatementLength
    - numberOfCoreIdeas
    - formulaDensity
    - graphOrFigureNeed
    - expectedStudentConfusionPoints
    - A4ReadabilityAfterDownscale
  recommendedPageCount: 1
  fallbackPageCount: 2
  orientation: portrait
  pageCountRationale: 이 문제는 핵심 발상이 하나이고 그래프도 단순한 교점 구조라 1쪽 기본안이 가능하지만, 설명이 길어져 A4 가독성이 떨어지면 2쪽으로 전환한다. 다른 문제에도 1쪽/2쪽 판단을 그대로 적용하지 않는다.
  onePageUseWhen:
    - 본문을 핵심식 위주로 압축할 수 있음
    - 그래프와 조건 변환이 A4 축소 후에도 읽힘
    - 최종 이미지에서 수식이 깨지지 않음
    - 핵심 발상이 1~2개이고 페이지 흐름이 끊기지 않음
  twoPageFallbackUseWhen:
    - A4 축소 시 글씨가 작아짐
    - 그래프 라벨이 겹침
    - m 제거 설명과 교점 5개 설명을 한 쪽에 넣으면 과밀해짐
    - 문제 조건이 길거나 케이스 분류가 많음
    - 학생 오개념 방지 설명이 1쪽에 들어가면 핵심식이 묻힘
  pageSafeBoxes:
    - id: title_problem_box
      area: top_16_percent
      purpose: 문제 조건 요약과 핵심 질문 표시
    - id: condition_box
      area: upper_left_24_percent
      purpose: 원의 이동 후 중심과 접선 조건 정리
    - id: key_idea_box
      area: upper_right_24_percent
      purpose: m 소거와 g(x)=f(x)-x 치환 강조
    - id: graph_box
      area: middle_right_32_percent
      purpose: g(x)와 y=-4,0,4의 교점 구조 시각화
    - id: solution_flow_box
      area: middle_left_to_lower_44_percent
      purpose: 교점 좌표 도출과 합 계산
    - id: final_answer_box
      area: bottom_12_percent
      purpose: f(6)=10 결론 강조
  a4ReadabilityPlan:
    minTextHeightAfterDownscale: 18px_equivalent
    lineSpacing: generous
    formulaSpacing: avoid_dense_fraction_stack
    marginRule: keep_outer_margin_at_least_5_percent
    graphLineThickness: readable_after_A4_downscale
    pageDensity: medium_not_full
    maxMainEquationsOnOnePage: 18
    ifTooDense: split_to_2_pages_before_final_generation
colorPlan:
  coreCondition: blue
  coreIdea: purple_or_orange
  calculationTransition: green
  finalConclusion: red
  maxColorsPerPage: 4
  colorAssignments:
    blue:
      - 이동 후 중심 (x+m, f(x)+m)
      - 두 축 접선 조건 |x+m|=2, |f(x)+m|=2
      - f(x)-x ∈ {-4,0,4}
    purple_or_orange:
      - g(x)=f(x)-x 치환
      - 교점 개수 5개는 한 수평선 접촉을 의미한다는 발상
      - 왜 y=4에서 접해야 하는지
    green:
      - g(x)=4-a(x-p)^2 설정
      - ap^2=8
      - x2+x3+x4+x5=5p 계산
    red:
      - p=6
      - f(6)=10
handwrittenGraphPlan:
  style: handwritten_integrated_image
  accuracySource: graphSpec
  placement: middle_right_or_center
  graphSizeRule: page_width_38_to_45_percent
  mustPreserve:
    - axis
    - ticks
    - intersections
    - labels
    - functionShape
    - y=4_tangent_one_point
    - y=0_two_intersections
    - y=-4_two_intersections
    - x=0_leftmost_intersection
  graphConstruction:
    curve: 아래로 열린 포물선 g(x)=4-a(x-p)^2
    horizontalLines:
      - y=4: 꼭짓점에서 접함, x=p
      - y=0: 두 점에서 만남, x=p-p/√2 and x=p+p/√2
      - y=-4: 두 점에서 만남, x=0 and x=2p
    xLabels:
      - 0
      - p-p/√2
      - p
      - p+p/√2
      - 2p
    yLabels:
      - -4
      - 0
      - 4
  handwrittenAccuracyRequirements:
    - y=4는 포물선의 꼭짓점에 닿는 접선처럼 보여야 한다.
    - y=0과 y=-4는 각각 포물선과 정확히 두 번 만나는 모습이어야 한다.
    - x=0이 가장 왼쪽 교점으로 보이게 한다.
    - 포물선은 아래로 열려야 한다.
    - 그래프는 개념 설명용이므로 스케일은 엄밀하지 않아도 되지만, 교점 개수와 대칭 구조는 틀리면 안 된다.
visualPurposeCheck: pass
visualLegendCheck: pass
visualLabelGlyphCheck: planned
styleContinuityCheck:
  required: true
  references:
    - previous handsolution handwritten style standard
    - solution_packet.handoffToProduction
  result: planned
  notes: 최종 산출물은 카드형 디지털 폰트가 아니라 학생 노트 같은 손글씨 해설이어야 한다.
finalVisibleTextBlocks:
  problemSummary: |
    중심 (x, f(x)), 반지름 2인 원.
    x방향 m, y방향 m만큼 이동 후 x축·y축에 동시에 접함.
    조건을 만족하는 x좌표는 5개: x1=0, f(0)<0, x2+x3+x4+x5=30.
    구할 것: f(6)
  blockA_condition: |
    이동 후 중심 = (x+m, f(x)+m)
    x축 접함 ⇒ |f(x)+m|=2
    y축 접함 ⇒ |x+m|=2
    같은 m이므로 두 식을 빼서 m 제거!
  blockB_coreIdea: |
    f(x)-x ∈ {-4, 0, 4}
    g(x)=f(x)-x 로 두면,
    g(x)가 y=-4,0,4와 만나는 x좌표가 조건을 만족한다.
  blockC_intersectionLogic: |
    교점은 총 5개.
    수평선 3개와 포물선은 최대 6번 만나므로,
    한 수평선은 접해야 한다.
    g(0)=f(0)<0 이고 가능한 값은 -4,0,4 중 하나 → g(0)=-4.
    따라서 y=4에서 접하는 아래로 열린 포물선 구조.
  blockD_calculation: |
    g(x)=4-a(x-p)^2
    g(0)=-4 ⇒ 4-ap²=-4 ⇒ ap²=8

    g=-4: x=0, 2p
    g=0: x=p-p/√2, p+p/√2
    g=4: x=p
  blockE_sumAndAnswer: |
    x2+x3+x4+x5
    =(p-p/√2)+p+(p+p/√2)+2p
    =5p=30
    p=6

    g(6)=4 ⇒ f(6)=g(6)+6=10
pageStoryboard:
  - step: 1
    title: 문제를 원의 중심 이동으로 바꾸기
    text: 중심이 (x+m, f(x)+m)으로 이동한다는 것을 먼저 쓴다.
    visibleTextRef: finalVisibleTextBlocks.problemSummary
    emphasisColor: blue
  - step: 2
    title: 두 축 접선 조건
    text: 축까지 거리가 반지름 2이므로 |x+m|=2, |f(x)+m|=2를 세운다.
    visibleTextRef: finalVisibleTextBlocks.blockA_condition
    emphasisColor: blue
  - step: 3
    title: m 제거
    text: 같은 m을 쓴다는 점을 표시하고 f(x)-x ∈ {-4,0,4}를 얻는다.
    visibleTextRef: finalVisibleTextBlocks.blockB_coreIdea
    emphasisColor: blue
  - step: 4
    title: g(x)=f(x)-x 치환
    text: 조건을 g(x)와 세 수평선 y=-4,0,4의 교점 문제로 바꾼다.
    emphasisColor: purple_or_orange
  - step: 5
    title: 교점 5개의 의미
    text: 세 수평선과 최대 6개 교점이 가능하지만 총 5개이므로 하나는 접한다. y=4에서 접하는 아래로 열린 포물선을 그린다.
    visibleTextRef: finalVisibleTextBlocks.blockC_intersectionLogic
    emphasisColor: purple_or_orange
  - step: 6
    title: 좌표 배열
    text: 교점 순서를 0, p-p/√2, p, p+p/√2, 2p로 정리한다.
    visibleTextRef: finalVisibleTextBlocks.blockD_calculation
    emphasisColor: green
  - step: 7
    title: 합 조건과 결론
    text: x2+x3+x4+x5=5p=30에서 p=6, f(6)=4+6=10을 얻는다.
    visibleTextRef: finalVisibleTextBlocks.blockE_sumAndAnswer
    emphasisColor: red
promptDraft:
  imageGenerationPromptKorean: |
    A3 세로 캔버스에 한국어 고등수학 손풀이 노트 스타일로 작성한다. 문제는 이차함수 f(x), 반지름 2인 원, 평행이동 후 x축과 y축 동시 접선 조건이다. 글씨는 자연스러운 손글씨, 수식은 또렷하고 읽기 쉽게 쓴다. 파란색은 핵심조건, 보라/주황은 핵심발상, 초록은 계산 전환, 빨강은 최종답에만 사용한다. 오른쪽 중간에 아래로 열린 포물선 g(x)=4-a(x-p)^2와 수평선 y=4, y=0, y=-4를 손그림 그래프로 넣는다. y=4는 꼭짓점에서 접하고, y=0과 y=-4는 각각 두 점에서 만난다. x=0은 가장 왼쪽 교점으로 보이게 한다. 최종 결론 f(6)=10은 빨간 박스에 강조한다.
  negativePromptKorean: |
    디지털 폰트, 인쇄체, HTML 카드, 깨진 한글, 틀린 수식, 과도한 장식, 너무 작은 글씨, 잘못된 그래프 교점 개수, y=4가 두 점에서 만나는 그림, y=0 또는 y=-4가 한 점만 만나는 그림, 포물선이 위로 열린 그림, x=0보다 왼쪽에 교점이 있는 그림, 최종답 누락을 피한다.
productionRisks:
  - risk: 이미지 생성 모델이 긴 한국어와 수식을 깨뜨릴 수 있음
    mitigation: 최종 이미지 생성 전, finalVisibleTextBlocks 기준으로 짧은 블록 단위 생성 또는 2쪽 분할을 검토한다.
  - risk: 그래프가 예쁘게 보이지만 교점 개수가 틀릴 수 있음
    mitigation: graphSpec 기준으로 별도 시각 검수를 한다.
  - risk: 1쪽에 너무 많은 설명을 넣으면 A4 축소 시 가독성이 떨어질 수 있음
    mitigation: 본문을 핵심식 중심으로 압축하고, 설명문은 짧은 문장으로 유지한다. 실패 시 2쪽 fallback 사용.
  - risk: 색을 너무 많이 쓰면 핵심 강조가 흐려짐
    mitigation: 최대 4색 규칙을 유지한다.
  - risk: y=4 접선이 아니라 y=0 접선처럼 표현될 수 있음
    mitigation: 꼭짓점 라벨 (p,4), y=4 tangent 표시, y=0 two intersections 표시를 의무화한다.
fallbackStrategy:
  primary: one_page_handwritten_image_with_integrated_graph
  fallback1: two_page_handwritten_image_split_condition_and_graph_calculation
  fallback2: generate_graph_region_separately_from_fixed_spec_then_integrate_handwritten_style
  stopCondition: 한국어/수식이 읽을 수 없거나 graphSpec을 만족하지 못하면 내부 reject 처리하고 검수 통과 금지
acceptanceCriteriaForReviewAgent:
  mathVisible:
    - "|x+m|=2 and |f(x)+m|=2 both visible"
    - "f(x)-x ∈ {-4,0,4} visible"
    - "g(x)=f(x)-x visible"
    - "g(0)=-4 visible"
    - "g(x)=4-a(x-p)^2 and ap²=8 visible"
    - "final f(6)=10 visible"
  graphVisible:
    - downward parabola
    - y=4 tangent at vertex
    - y=0 has two intersections
    - y=-4 has two intersections
    - x=0 is leftmost intersection
  styleVisible:
    - handwritten style
    - no digital/system font final non-graph text
    - max 4 colors
    - final answer red
  readabilityVisible:
    - A4 downscale still readable
    - no overlapping labels
    - graph labels distinguishable
outputFiles: []
visualValidationFile: null
knownRisks:
  - Korean/math text corruption in image generation
  - graph intersection mismatch
  - A4 downscale readability failure
  - non-graph text accidentally rendered as digital/system font
blockers:
  - final image not generated in this step by user request; this packet is for staged pipeline inspection only
```

## 1. 손풀이 제작 에이전트 판단

이번 단계의 목표는 **최종 이미지를 바로 만드는 것**이 아니라, 풀이 설계 에이전트의 `solution_packet.md`를 받아서 실제 손풀이 이미지 제작이 가능한지 점검하고 제작 계획을 세우는 것이다.

현재 판단은 다음과 같다.

- 풀이 설계 산출물은 손풀이 제작에 충분하다.
- 그래프가 필요한 문제이다.
- 단, 그래프는 복잡한 정밀 그래프가 아니라 `교점 개수와 대칭성`을 보여주는 개념도이다.
- 1쪽 구성이 가능하지만, 설명이 길어지면 A4 축소 시 글씨가 작아질 위험이 있다.
- 따라서 최종 이미지에서는 문장을 줄이고 핵심식 중심으로 구성해야 한다.
- 만약 A4 가독성이 떨어지면 1쪽을 고집하지 말고 2쪽으로 나누는 것이 좋다.

## 2. 보완된 권장 화면 구성

### 기본안: 1쪽 구성

```text
상단 16%:
문제 요약 + 구할 것 f(6)

왼쪽 상단~중단:
이동 후 중심, 두 축 접선 조건, m 제거

오른쪽 상단~중단:
g(x)=f(x)-x 치환과 교점 5개 발상

오른쪽 중단:
아래로 열린 포물선 + y=4,0,-4 그래프

왼쪽 하단:
교점 좌표 도출

하단:
x2+x3+x4+x5=5p=30, f(6)=10
```

### 대안: 2쪽 구성

1쪽이 너무 빽빽하면 다음처럼 나눈다.

```text
1쪽:
원 접선 조건 → m 제거 → g(x)=f(x)-x 치환

2쪽:
그래프 해석 → 교점 좌표 → 합 계산 → 정답
```

이 문제는 설명형 문제라서, **가독성이 흔들리면 2쪽이 더 안전**하다.

## 3. 최종 이미지에 들어갈 실제 문구

이미지 생성에서 긴 문장을 그대로 넣으면 한글과 수식이 깨질 수 있으므로, 최종 이미지에는 다음 짧은 블록을 우선 사용한다.

### 조건 블록

```text
이동 후 중심 = (x+m, f(x)+m)

x축 접함 ⇒ |f(x)+m|=2
 y축 접함 ⇒ |x+m|=2

같은 m이므로 두 식을 빼서 m 제거!
```

### 핵심 발상 블록

```text
f(x)-x ∈ {-4, 0, 4}

g(x)=f(x)-x 로 두면,
g(x)가 y=-4,0,4와 만나는 x좌표가 조건을 만족한다.
```

### 교점 개수 블록

```text
교점은 총 5개.
수평선 3개와 포물선은 최대 6번 만나므로,
한 수평선은 접해야 한다.

g(0)=f(0)<0
가능한 값은 -4,0,4 중 하나
따라서 g(0)=-4
```

### 계산 블록

```text
g(x)=4-a(x-p)^2

g(0)=-4
⇒ 4-ap²=-4
⇒ ap²=8

교점:
g=-4: x=0, 2p
g=0: x=p-p/√2, p+p/√2
g=4: x=p
```

### 결론 블록

```text
x2+x3+x4+x5
=(p-p/√2)+p+(p+p/√2)+2p
=5p=30

p=6

g(6)=4
f(6)=g(6)+6=10
```

## 4. 그래프 제작 지시

그래프는 반드시 다음을 만족해야 한다.

- 포물선은 아래로 열린다.
- 꼭짓점은 \((p,4)\)이다.
- \(y=4\)는 꼭짓점에서 접한다.
- \(y=0\)은 포물선과 두 점에서 만난다.
- \(y=-4\)도 포물선과 두 점에서 만난다.
- \(x=0\)은 가장 왼쪽 교점이다.
- \(x=2p\)는 가장 오른쪽 교점이다.

그래프 라벨은 너무 많이 쓰지 말고 아래 정도만 유지한다.

```text
y=4, y=0, y=-4
x=0, x=p, x=2p
g(x)=f(x)-x
```

루트가 들어간 라벨 \(p-\frac p{\sqrt2}\), \(p+\frac p{\sqrt2}\)는 본문 계산에 쓰고, 그래프에서는 너무 작으면 생략 가능하다.

## 5. 제작 위험과 대응

### 위험 1. 한글/수식 깨짐

긴 문장을 그대로 이미지 생성하면 깨질 수 있다.

대응:

- 최종 이미지 문구는 위의 `최종 이미지에 들어갈 실제 문구` 블록을 기준으로 짧게 사용한다.
- 한 번에 긴 페이지를 만들기보다, 필요하면 블록별 생성 또는 2쪽 구성을 사용한다.

### 위험 2. 그래프 구조 오류

가장 위험한 오류는 다음이다.

```text
y=4가 두 점에서 만남
포물선이 위로 열림
y=0 또는 y=-4가 한 점에서만 만남
x=0보다 왼쪽에 다른 교점이 생김
```

이 중 하나라도 나오면 검수에서 탈락해야 한다.

### 위험 3. 1쪽 과밀

풀이 설계 산출물은 자세하지만, 최종 이미지는 너무 길면 안 된다.

대응:

- 1쪽 기본안으로 시작한다.
- A4 축소 시 글씨가 작으면 2쪽으로 분할한다.
- 그래프는 최소 페이지 너비의 38~45% 정도를 차지하게 한다.

## 6. 다음 에이전트에게 넘길 검수 기준

검수 에이전트는 최종 이미지가 없더라도, 이 제작 계획 자체를 다음 기준으로 검토해야 한다.

- 수학 핵심식이 빠지지 않았는가?
- `같은 m`이라는 핵심조건이 보이는가?
- `f(x)-x ∈ {-4,0,4}`가 명확한가?
- `g(x)=f(x)-x` 치환이 보이는가?
- 왜 교점이 5개인지 그래프로 설명 가능한가?
- 최종 답 `f(6)=10`이 빨간색 결론으로 들어가는가?
- 그래프가 수학적으로 틀릴 위험을 충분히 막았는가?
- A4 가독성 대안이 있는가?

## 7. 현재 결론

손풀이 제작 에이전트 기준으로는 **제작 진행 가능**이다.

다만 현재는 사용자가 한 단계씩 점검하기를 원했으므로, 최종 이미지는 아직 생성하지 않는다.

다음 단계는 검수·게이트 에이전트가 다음 두 파일을 작성하는 것이다.

```text
review_report.md
decision.json
```
