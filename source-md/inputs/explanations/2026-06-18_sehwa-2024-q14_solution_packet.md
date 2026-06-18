# Sehwa 2024 Q14 attempt13 재생성 계획

```yaml
schemaVersion: handsolution-regeneration-plan-v1
runId: sehwa-q14-attempt13-regeneration-plan-20260618063827
problemCode: sehwa-2024-q14
plannedAttempt: attempt13
status: waiting_for_user_approval_before_generation
sourceRegenerationPacket: work/regeneration-packets/sehwa-2024-q14-regeneration-packet.md
latestFailedAttempt: attempt12b
latestFeedbackSource: Supabase handsolution_review_feedback + REVIEW_FEEDBACK_LOG.md
```

## 1. 결론 요약

attempt13은 attempt12b의 내부 품질은 일부 유지하되, DB 검수에서 확정된 두 실패를 반드시 막는 재생성이다.

핵심 수정 조건:

```text
page1: 원문 보기 ①~⑤를 모두 제공한다. ④ 10만 적으면 실패.
page2: y=-4와 포물선의 왼쪽 교점이 정확히 x=0으로 보이게 한다.
```

실제 이미지 생성은 이 계획 승인 후 별도 실행한다.

## 2. attempt12b 실패 원인

DB에서 최종 적용한 수정 필요 피드백:

### page1

```text
보기가 4번밖에 나와있지 않음. 원문 문항은 모두 제공하는게 좋다.
```

해석:

- attempt12b page1은 `보기 ④ 10`만 보이도록 생성되었다.
- 원문 문제 블록은 학생이 실제로 풀 수 있게 전체 보기 ①~⑤를 포함해야 한다.
- 다음 생성에서 보기 일부 생략은 즉시 실패다.

### page2

```text
y=-4가 x=0에서 만나는데 그렇게 보이지 않는 그림이다.
```

해석:

- 수학적으로는 `g(0)=-4`이고, `y=-4`와 포물선의 왼쪽 교점이 `x=0`이어야 한다.
- attempt12b page2는 그래프 구조는 대체로 좋았지만, 왼쪽 아래 교점이 x=0으로 명확히 읽히지 않았다.
- 다음 생성에서 그래프는 왼쪽 교점 `A(0,-4)`를 크고 분명하게 표시해야 한다.

## 3. 생성 전 필수 선행 조건

### 3.1 원문 보기 ①~⑤ 확인

호빈님이 새로 제공한 원문 이미지 `/opt/data/image_cache/img_1d67448ff98a.jpg`를 확인했고, 호빈님이 판독 결과를 맞다고 확인했다.

확정된 보기:

```text
① 4
② 6
③ 8
④ 10
⑤ 12
```

따라서 attempt13 page1에는 보기 전체를 반드시 아래 형태로 넣는다.

```text
① 4   ② 6   ③ 8   ④ 10   ⑤ 12
```

보기 누락 또는 `④ 10` 단독 표기는 실패다.

### 3.2 page2 그래프 스펙 고정

attempt13 그래프는 다음 좌표를 고정한다.

```text
g(x)=4-a(x-p)^2
p=6
ap^2=8 이므로 a=8/36=2/9
따라서 g(x)=4-(2/9)(x-6)^2
```

핵심 교점:

```text
A = (0, -4)          ← 반드시 y=-4 위, x=0 라벨과 함께 표시
B = (6-3√2, 0)
C = (6, 4)           ← y=4 접점
D = (6+3√2, 0)
E = (12, -4)
```

기호형 라벨도 병기 가능:

```text
0, p-p/√2, p, p+p/√2, 2p
```

하지만 학생 눈에는 `x=0` 교점이 가장 중요하므로, page2 그래프에서는 `A(0,-4)` 또는 `x=0` 라벨을 굵게/파란색으로 표시한다.

## 4. attempt13 제작 방식

추천 route:

```text
Route B-plus: matched 2-page generation + graph safety box 강화
```

구성:

1. page1/page2는 같은 1024x1536 또는 같은 2:3 portrait 비율로 생성한다.
2. page1은 문제 원문/보기/조건 변환을 담당한다.
3. page2는 그래프 해석/교점/계산/정답을 담당한다.
4. page2 그래프는 image_gen에게만 맡기지 않고, 좌표 스펙을 강하게 고정한다.
5. 생성 후 Review Gate에서 `A(0,-4)`가 눈으로 확인되지 않으면 즉시 실패 처리한다.

## 5. page1 생성 계약

page1 역할:

```text
원문 문제 전체 + 보기 전체 + 접선 조건 변환 + g(x)=f(x)-x 치환
```

필수 포함:

- 제목: `14번 손풀이 (1/2)`
- 문제 원문 전체
- 보기 ①~⑤ 전체
- 핵심 조건 표시:
  - 중심 `(x, f(x))`
  - 반지름 `2`
  - x축 방향 `m`, y축 방향 `m`
  - x축과 y축에 동시에 접함
  - `x1=0`
  - `f(x1)<0`
  - `x2+x3+x4+x5=30`
  - `f(6)`
- `호빈T의 Tip`
- 이동 후 중심 `(x+m, f(x)+m)`
- 접선 조건:
  - x축 접함 → `|f(x)+m|=2`
  - y축 접함 → `|x+m|=2`
- `같은 m!` 강조
- `f(x)-x ∈ {-4,0,4}`
- `g(x)=f(x)-x`
- page2 연결 문구

page1 실패 기준:

```text
보기 ①~⑤ 중 하나라도 빠짐
보기 ④ 10만 적음
문제 원문을 조건 요약으로만 처리
문제 본문/보기 글자가 인쇄체/시스템 폰트처럼 보임
```

## 6. page2 생성 계약

page2 역할:

```text
graph interpretation + x=0 교점 명확화 + p 계산 + 정답
```

필수 포함:

- 제목: `14번 손풀이 (2/2)`
- `왜 그래프로 보나?` 강조 박스
- `g(0)=f(0)<0`이고 가능한 값이 `-4,0,4`이므로 `g(0)=-4`
- 그래프 중앙 배치
- 아래로 열린 포물선 `g(x)=4-a(x-p)^2`
- 세 수평선 `y=4`, `y=0`, `y=-4`
- `y=4`는 꼭짓점에서 접함
- `y=0`은 두 점에서 만남
- `y=-4`는 두 점에서 만남
- 왼쪽 아래 교점은 반드시 `A(0,-4)`로 표시
- 오른쪽 아래 교점은 `E(2p,-4)` 또는 `E(12,-4)`로 표시
- 합 계산:
  - `x2+x3+x4+x5`
  - `=(p-p/√2)+p+(p+p/√2)+2p`
  - `=5p=30`
  - `p=6`
- 최종:
  - `f(6)=g(6)+6=4+6=10`
  - `정답 ④ 10`

page2 실패 기준:

```text
y=-4와 왼쪽 교점이 x=0으로 안 보임
A(0,-4) 라벨이 없거나 애매함
포물선이 y=-4와 만나는 왼쪽 점이 y축에서 떨어져 보임
y=4가 두 점에서 만나는 것처럼 보임
y=0 또는 y=-4 교점 수가 틀림
```

## 7. 그래프 안전 스펙

attempt13 그래프 프롬프트에는 아래 문장을 강제한다.

```text
왼쪽 아래 교점 A는 정확히 y축 위에 놓고 A(0,-4)라고 크게 표시한다.
y=-4 수평선은 A(0,-4)를 지나야 한다.
A에서 x축 아래 방향으로 점선이나 짧은 세로 보조선을 내려 x=0임을 보이게 한다.
오른쪽 아래 교점은 E(2p,-4) 또는 E(12,-4)로 표시한다.
```

가능하면 그래프 영역에는 다음 보조 표기를 둔다.

```text
A(0,-4) = x1
C(p,4)
E(2p,-4)
```

이렇게 하면 `x1=0`과 `g(0)=-4`가 시각적으로 연결된다.

## 8. Review Gate 체크리스트

### 원문/보기 gate

```yaml
problemBlockGate:
  fullProblemTextPresent: pass | fail
  allChoicesPresent: pass | fail
  choice4Equals10: pass | fail
  noChoiceOmission: pass | fail
  handwrittenProblemSource: pass | fail
```

### 그래프 gate

```yaml
graphGate:
  opensDownward: pass | fail
  y4TangentAtVertex: pass | fail
  y0TwoIntersections: pass | fail
  yMinus4TwoIntersections: pass | fail
  leftIntersectionIsX0: pass | fail
  A_0_minus4_labelVisible: pass | fail
  x1Equals0VisuallyConnected: pass | fail
```

### 기존 gate 유지

```yaml
multiPageConsistency:
  samePixelSize: pass | fail
  canvasRatio: pass | fail
  strokeWeight: pass | fail
studentUnderstandingEmphasis:
  whyGraphBlockVisible: pass | fail
renderedTextContamination:
  nonGraphTextHandwrittenSource: pass | fail
```

## 9. 실행 제한

attempt13은 다음 순서로만 진행한다.

1. 원문 보기 ①~⑤ 확인
2. page1/page2 prompt 확정
3. image generation page1 1회 + page2 1회
4. 내부 raw 저장
5. strict visual review
6. 통과 시에만 registration plan 작성

무작정 여러 장 생성하지 않는다.

같은 실패가 반복되면:

- page1 보기 누락 반복 → 원문 보기 블록을 별도 작은 이미지/손글씨 영역으로 분리하는 계획으로 전환
- page2 x=0 교점 실패 반복 → 그래프 영역을 별도 graph-harness 이미지로 만든 뒤 손글씨 페이지에 통합하는 계획으로 전환

## 10. 호빈님 승인 전 확인 사항

attempt13 실제 생성 전 호빈님에게 확인해야 할 것:

```text
원문 보기 ①~⑤ 전체를 확인할 수 있는가?
```

현재 제가 확인한 바로는, 원문 보기 ①~⑤가 새 이미지와 호빈님 확인으로 확정되었다. 따라서 실제 생성 전에는 이 보기 세트를 프롬프트/검수 gate에 고정한다.

## 11. 추천 다음 액션

추천은 다음과 같다.

```text
1. 확정된 보기 ① 4, ② 6, ③ 8, ④ 10, ⑤ 12를 page1에 넣는다.
2. attempt13 page1/page2를 1회 생성한다.
3. page2는 A(0,-4) 라벨을 강제한다.
```

승인 문구 예시:

```text
원문 보기 확인부터 진행해.
```

또는 호빈님이 보기를 직접 주실 경우:

```text
보기는 ① ?, ② ?, ③ ?, ④ 10, ⑤ ? 이야. 이걸로 attempt13 생성해.
```

---

## Clean-repo v4 보존 메타 섹션

이 파일은 기존 `work/agents/.../solution_packet.md`가 clean repo에서 local-only 경로로 분류되어, 검수 사이트 MD 표시와 registry `explanationMdRef` 보존을 위해 `inputs/explanations/` 아래로 옮긴 기준 패킷이다.

### 문제 재작성용 원문

- 문제 번호: 2024 세화여고 14번
- 조건: 이차함수 `f(x)=ax²+bx+c`, 중심이 `y=f(x)` 위에 있고 반지름이 2인 원 중 조건을 만족하는 중심이 서로 다른 원의 개수는 5개.
- 조건 박스: 원을 x축 방향으로 `m`, y축 방향으로 `m`만큼 평행이동한 원이 x축과 y축에 동시에 접하도록 하는 실수 `m`이 1개 이상 존재.
- 중심 x좌표: 작은 순서로 `x1, x2, x3, x4, x5`.
- 추가 조건: `x1=0`, `x2+x3+x4+x5=30`, `f(x1)<0`.
- 구할 값: `f(6)`.
- 보기: `① 4 ② 6 ③ 8 ④ 10 ⑤ 12`.

### 단원 및 난이도 / 문항별 난이도

- 단원 및 난이도: 이차함수, 원의 접선 조건, 평행이동 조건 해석을 결합한 고난도 내신형 문항.
- 문항별 난이도: 상. 조건을 좌표/부호 경우로 해석한 뒤 중심 x좌표 합 조건으로 이차함수 계수를 추론해야 한다.

### 풀이 검산 / 정답 검산 / solutionValidation

- 독립 풀이 검산은 세화 Q14 attempt18 기준 후보 제작 과정에서 수행했다.
- 보기 전체를 누락하지 않고 최종 목표 `f(6)`을 확인한다.
- 검수 기준 후보는 page1/page2 모두 사용자 승인 후 `기준 후보`가 되었다.

### 핵심식 / 핵심 조건 / coreConditionCheck

- 핵심 조건: 반지름 2인 원을 `(m,m)` 평행이동했을 때 x축과 y축에 동시에 접한다.
- 핵심식: 중심 좌표와 반지름 2, 평행이동 후 좌표의 절댓값 조건을 이용해 가능한 중심 조건을 분류한다.
- 이유: 중심이 `y=f(x)` 위에 있으므로 가능한 중심 x좌표 5개와 합 조건이 이차함수 결정에 직접 연결된다.

### 고정 라벨

- 최종 이미지 고정 라벨: `호빈T의 Tip`.

### processGateVersion=4 / v4

- processGateVersion=4.
- 비그래프 본문/풀이/Tip/정답은 손글씨형 image_gen 결과여야 한다.
- 그래프/좌표 조건은 필요한 경우 데이터 기반 하네스 검산을 우선한다.
- 카드형/HTML/PIL/system-font 렌더링 스타일을 positive reference로 쓰지 않는다.

### problemTextCheck

- 문제 원문 블록은 조건, x좌표 조건, `f(x1)<0`, 질문 `f(6)`, 보기 ①~⑤ 전체가 포함되어야 한다.
- 특히 `④ 10`만 단독으로 쓰면 실패다.

### problemSourceCheck

- 문제 블록은 손글씨형 재작성 출처로 처리한다.
- 원문 확인용 텍스트는 패킷에 고정하되 최종 출력물은 학생용 손글씨형이어야 한다.

### 그래프/도형 목적 / visualPurposeCheck

- 그래프/도형을 넣는 목적: 학생이 원 중심 조건과 이차함수 위의 점 조건을 눈으로 연결해 이해하게 하기 위해서다.
- 학생 이해에 도움이 되는 이유: 가능한 중심 x좌표가 왜 5개인지, 합 조건이 왜 함수 결정으로 이어지는지 시각적으로 확인할 수 있다.
- 라벨/색상/범례: 함수 그래프, 중심 후보, 조건 경계, 최종 목표는 서로 다른 라벨과 색상으로 구분한다.
- 하네스 검산 / visualValidation: 그래프가 사용될 경우 함수식, 중심 후보, 좌표 합, 최종 `f(6)` 값을 수치로 검산한다.

### 페이지 간 시각 연속성

- page1은 문제 원문, 보기 전체, 조건 해석의 출발점을 보여준다.
- page2는 같은 조건을 이어받아 계산/정답으로 연결한다.
- 같은 도형 기준 또는 같은 그래프 기준을 유지해 page1과 page2가 서로 다른 문제처럼 보이지 않게 한다.

### 이전 쪽에서 이어지는 값 / carry-forward

- 1쪽에서 이어받는 값: 문제 조건, 가능한 중심 x좌표 5개, 보기 ①~⑤, 최종 목표 `f(6)`.
- 2쪽은 1쪽의 조건 해석을 carry-forward 하여 계수 결정과 정답 선택으로 마무리한다.

### 최종 목표 / 구해야 하는 대상

- 구해야 하는 대상: `f(6)`.
- 목표 영역: 마지막 계산 박스와 정답 표시 영역.
- 찾을 값: 보기 중 정답값.
