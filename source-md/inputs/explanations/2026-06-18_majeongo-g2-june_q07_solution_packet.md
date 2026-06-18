# 마전고 26년 고2 6월 Q07 solution packet

```yaml
schemaVersion: handsolution-solution-packet-v1
runId: majeongo-g2-june-full-batch-20260618161108
problemCode: majeongo-g2-june-q07
processGateVersion: 4
status: packet_ready
```

## 문제 재작성용 원문

0≤x≤4π, x≠2π에서 f(x)=3tan(x/4)+|tan(x/4)|. P(4π,0)이 있고 A(a,f(a)), B(b,0)을 지나며 기울기가 음수인 직선이 그래프와 다시 만나는 점을 C라 하자. A,C의 x좌표 합이 4π이고, 삼각형 AOB와 BCP의 넓이비가 7:3일 때 a+b는?

① 47π/13  ② 48π/13  ③ 49π/13  ④ 50π/13  ⑤ 51π/13

## 단원 및 난이도

- 단원 및 난이도: 삼각함수/도형/함수 그래프 내신형 문항.
- 문항별 난이도: 상.
- 배치 분류: graph/figure-expanded.

## problemTextCheck

문제 번호, 조건, 수식, 보기/질문, 정답 검산 기준을 원문 페이지 이미지와 빠른정답표에서 확인했다. 최종 후보는 문제 원문을 요약하지 않고 재작성해야 한다.

## problemSourceCheck

최종 후보의 문제 본문, 풀이, Tip, 정답은 손글씨형 이미지 생성 기반이어야 한다. 원본 PDF 크롭, OCR 텍스트, HTML/SVG/PIL/system font 텍스트 오버레이는 금지한다. 그래프/도형 영역만 수학 정확성 검증용 하네스를 사용할 수 있다.

## 핵심식 / 핵심 조건 / coreConditionCheck

절댓값 때문에 왼쪽은 4tan(x/4), 오른쪽은 2tan(x/4)로 나누고 A,C 좌표를 u로 표현한다.

이 핵심 조건은 풀이의 갈림길이므로 최종 손풀이에서 색/밑줄/작은 박스 중 하나로 강조한다.

## 풀이 검산 / 정답 검산 / solutionValidation

0<a<2π에서 tan(a/4)=u>0이면 A(a,4u). 조건으로 C의 x좌표는 4π-a이고 tan((4π-a)/4)=tan(π-a/4)=-u이므로 C(4π-a,-2u). 직선 AC의 x절편 B를 구하면 기울기 계산으로 b=(8π-a)/3. 넓이는 [AOB]=2bu, [BCP]=(4π-b)u. 비가 7:3이므로 2b:(4π-b)=7:3, 13b=28π, b=28π/13. b=(8π-a)/3에서 a=20π/13. 따라서 a+b=48π/13.

정답: `② 48π/13`

## 그래프/도형 / visualPurposeCheck / visualLegendCheck / visualValidation

원본 그래프/도형 존재 여부: 절댓값 탄젠트 그래프, A,B,C,P,O, 두 음영 삼각형. visualPurposeCheck: x=2π 전후의 함수식 변화와 수평/삼각형 넓이비를 보이는 목적. 라벨/색상: x=2π 점근선, P(4π,0), A(a,4u), C(4π-a,-2u), B(b,0), 삼각형 AOB/BCP. visualValidation: a=20π/13, b=28π/13, a+b=48π/13.

## 호빈T의 Tip

그래프 문제처럼 보여도 A와 C의 x좌표 합 조건을 좌표식으로 쓰면 넓이비만 남는다.

## minimumVisibleSolution

최종 후보에는 다음이 보여야 한다.

1. 원문 조건과 질문.
2. 핵심식/핵심 조건과 그 이유.
3. 학생이 따라갈 수 있는 단계별 풀이.
4. 정답 `② 48π/13`.
5. 필요한 경우 그래프/도형의 목적, 라벨, 색상 역할, 검산 근거.

## 페이지/배치 계획

- 예상 배치: graph/figure-expanded
- 페이지 간 시각 연속성: 한 문항이 2쪽 이상이면 같은 문제 번호, 같은 핵심 색상, 같은 그래프/도형 기준을 유지한다.
- 이전 쪽에서 이어지는 값: 2쪽 구성 시 1쪽 마지막에 다음 쪽에서 사용할 핵심값을 표시한다.
- 구해야 하는 대상 / 최종 목표: 정답 `② 48π/13`를 구하는 것.
