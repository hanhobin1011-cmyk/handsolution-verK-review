# 세화 2024 Q14 변형 A-01 패킷 및 내부 검수

```yaml
schemaVersion: handsolution-variant-production-packet-v1
runId: sehwa-q14-variant-a-plan-20260618124843
problemCode: sehwa-2024-q14-variant-a-01
variantType: A
processGateVersion: 4
status: review_candidate_registered
```

## 문제 재작성용 원문

이차함수 `f(x)=ax²+bx+c`가 있다. 중심이 함수 `y=f(x)`의 그래프 위에 있고 반지름의 길이가 `2`인 원 중에서, 다음 조건을 만족시키는 중심이 서로 다른 원의 개수는 `5개`이다.

```text
원을 x축의 방향으로 m만큼, y축의 방향으로 m만큼 평행이동한 원이
x축과 y축에 동시에 접하도록 하는 실수 m의 값이 1개 이상 존재한다.
```

이 5개의 원의 중심의 x좌표를 작은 수부터 크기 순서대로 `x1, x2, x3, x4, x5`라 하자.

```text
x1 = 0,
x2 + x3 + x4 + x5 = 25,
f(x1) < 0
```

`f(5)`의 값을 구하면?

```text
① 7   ② 8   ③ 9   ④ 10   ⑤ 11
```

## 단원 및 난이도

- 단원 및 난이도: 이차함수, 원과 접선, 평행이동, 그래프 해석을 결합한 고난도 내신형 문항.
- 문항별 난이도: 상.
- A형 변형: 숫자만 변경, 조건 구조와 핵심 아이디어 유지.

## problemTextCheck

문제 원문, 조건 박스, `x1=0`, `x2+x3+x4+x5=25`, `f(x1)<0`, 질문 `f(5)`, 보기 ①~⑤ 전체를 패킷과 page1 후보에서 확인했다.

## problemSourceCheck

최종 후보의 문제 본문/보기/풀이/정답은 image generation 기반 손글씨형이다. page2 그래프 영역은 수학 정확성을 위해 데이터 하네스 합성을 사용했고, 비그래프 영역에는 코드 텍스트 오버레이를 사용하지 않았다.

## 핵심식 / coreConditionCheck

핵심식:

```text
g(x)=f(x)-x
```

이동 후 중심이 `(x+m, f(x)+m)`이고 같은 `m`으로 x축/y축 접선 조건을 동시에 만족해야 하므로 `f(x)-x`가 핵심 조건이 된다.

가능한 값:

```text
g(x) ∈ {-4, 0, 4}
```

## 풀이 검산 / 정답 검산 / solutionValidation

`g(x)=f(x)-x`라 두면 `x1=0`, `f(x1)<0`에서 `g(0)=-4`.

아래로 열린 포물선으로:

```text
g(x)=4-a(x-p)^2
```

`g(0)=-4`이므로:

```text
4-ap²=-4
ap²=8
```

교점 x좌표:

```text
x1 = 0
x2 = p-p/√2
x3 = p
x4 = p+p/√2
x5 = 2p
```

합:

```text
x2+x3+x4+x5=5p=25
p=5
```

정답:

```text
f(5)=g(5)+5=4+5=9
정답 ③ 9
```

## 호빈T의 Tip

```text
같은 m으로 두 접선 조건을 동시에 맞춰야 하니까,
f(x)와 x의 차이인 f(x)-x를 보자.
```

## minimumVisibleSolution

최종 후보에는 다음이 보인다.

1. 이동 후 중심 `(x+m, f(x)+m)`.
2. `|f(x)+m|=2`, `|x+m|=2`.
3. `g(x)=f(x)-x`.
4. `g(x)∈{-4,0,4}`.
5. `g(0)=-4`.
6. `g(x)=4-a(x-p)^2`, `ap²=8`.
7. `x2+x3+x4+x5=5p=25`.
8. `p=5`.
9. `f(5)=9`, `정답 ③ 9`.

## whyExplanationBlocks

### 왜 `g(x)=f(x)-x`로 보나?

같은 `m`으로 x좌표 조건과 y좌표 조건을 동시에 맞춰야 하므로 두 좌표의 차이인 `f(x)-x`가 핵심이다.

### 왜 그래프로 보나?

가능한 값이 `-4,0,4` 세 가지라서 `g(x)`와 세 수평선의 교점 개수를 보면 중심 x좌표 5개를 정리할 수 있다.

### 왜 합에서 루트가 사라지나?

`y=0`과 만나는 두 점이 꼭짓점 `p`를 중심으로 대칭이므로 `p-p/√2`와 `p+p/√2`가 합쳐져 `2p`가 된다.

## pageDecisionPolicy

```yaml
pageDecisionPolicy: problem_specific_not_fixed
recommendedPageCount: 2
pageCountRationale: 원문 조건과 보기 전체, 조건 변환, 그래프 해석, 계산을 A4 한 장에 넣으면 가독성이 떨어지므로 2쪽 상세확장형으로 제작했다.
```

## 페이지 간 시각 연속성

page1은 원문, 보기 전체, 접선 조건 변환, `g(x)=f(x)-x` 도입을 맡고 page2는 같은 `g(x)`를 이어받아 그래프 교점과 합 계산을 보여준다. 두 쪽 모두 같은 변형 A-01 제목과 같은 정답 흐름을 유지한다.

## 이전 쪽에서 이어지는 값 / carry-forward

1쪽에서 이어지는 값은 `g(x)=f(x)-x`, `g(x)∈{-4,0,4}`, 합 조건 `25`, 목표 `f(5)`이다. 2쪽은 이 값을 이어받아 `g(0)=-4`, `5p=25`, `p=5`, `f(5)=9`로 마무리한다.

## 최종 목표 / 구해야 하는 대상

구해야 하는 대상은 `f(5)`이고, 목표 영역은 page2 하단 빨간 정답 박스다. 찾을 값은 `9`, 선택지는 `③ 9`다.

## visualPurposeCheck

그래프는 `g(x)`와 `y=-4,0,4`의 교점에서 다섯 x좌표가 어떻게 생기는지 학생이 볼 수 있게 하기 위해 포함했다.

## visualLegendCheck

- `y=4`: 빨강 수평선, 꼭짓점 `C(5,4)`.
- `y=0`: x축, 교점 `B`, `D`.
- `y=-4`: 파랑 수평선, 교점 `A(0,-4)`, `E(10,-4)`.
- 정답 박스: 빨강.

## visualValidation

최종 page2는 `scripts/render_sehwa_q14_variant_a01_graph_harness.py` 기반 graph harness composite v2를 사용했다.

검산 좌표:

```text
A(0,-4)
B(5-5/√2,0)
C(5,4)
D(5+5/√2,0)
E(10,-4)
```

`y=0`은 x축과 일치하고, `y=-4`는 x축 아래에 있다.

## blindReview

- page1: 원문, 조건, 보기, `f(5)`, 합 25, `g(x)=f(x)-x`, `g(x)∈{-4,0,4}`, `호빈T의 Tip` 확인.
- page2 initial image: 그래프에서 `y=-4` 위치가 x축 기준으로 부정확해 내부 반려.
- page2 final composite v2: 그래프 좌표축/교점/합 계산/정답 확인.

## fixedLabelCheck

- `호빈T의 Tip`: page1에 확인.
- `정답 ③ 9`: page2에 확인.

## renderingPolicy

비그래프 영역은 손글씨형 image generation 결과다. 그래프 영역은 수학 정확성을 위해 데이터 기반 하네스 합성을 적용했다.
