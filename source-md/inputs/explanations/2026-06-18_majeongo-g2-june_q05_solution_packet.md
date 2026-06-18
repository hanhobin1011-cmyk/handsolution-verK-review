# 마전고 26년 고2 6월 Q05 solution packet

```yaml
schemaVersion: handsolution-solution-packet-v1
runId: majeongo-g2-june-full-batch-20260618161108
problemCode: majeongo-g2-june-q05
processGateVersion: 4
status: packet_ready
```

## 문제 재작성용 원문

0≤x≤8에서 f(x)=2√3 sin(πx/4). 곡선 y=f(x)가 y=k와 만나는 두 점을 y축에서 가까운 순서대로 A,B, y=-k와 만나는 두 점을 C,D라 하자. 직선 AC의 기울기가 -3/2일 때 사각형 ACDB의 넓이는? (0<k<2√3)

① 13/2  ② 7  ③ 15/2  ④ 8  ⑤ 17/2

## 단원 및 난이도

- 단원 및 난이도: 삼각함수/도형/함수 그래프 내신형 문항.
- 문항별 난이도: 중~상.
- 배치 분류: graph/figure-expanded.

## problemTextCheck

문제 번호, 조건, 수식, 보기/질문, 정답 검산 기준을 원문 페이지 이미지와 빠른정답표에서 확인했다. 최종 후보는 문제 원문을 요약하지 않고 재작성해야 한다.

## problemSourceCheck

최종 후보의 문제 본문, 풀이, Tip, 정답은 손글씨형 이미지 생성 기반이어야 한다. 원본 PDF 크롭, OCR 텍스트, HTML/SVG/PIL/system font 텍스트 오버레이는 금지한다. 그래프/도형 영역만 수학 정확성 검증용 하네스를 사용할 수 있다.

## 핵심식 / 핵심 조건 / coreConditionCheck

교점 x좌표를 a,4-a,4+a,8-a로 두면 AC의 가로 길이가 4로 고정된다.

이 핵심 조건은 풀이의 갈림길이므로 최종 손풀이에서 색/밑줄/작은 박스 중 하나로 강조한다.

## 풀이 검산 / 정답 검산 / solutionValidation

y=k의 첫 교점을 A(a,k)라 두면 사인 그래프의 대칭으로 B(4-a,k), C(4+a,-k), D(8-a,-k). AC의 기울기는 (-k-k)/((4+a)-a)=-2k/4=-k/2. 이것이 -3/2이므로 k=3. 2√3 sin(πa/4)=3에서 sin(πa/4)=√3/2, 0<a<2이므로 a=4/3. 따라서 AB=(4-a)-a=4-2a=4/3, 높이는 6이므로 넓이는 (4/3)·6=8.

정답: `④ 8`

## 그래프/도형 / visualPurposeCheck / visualLegendCheck / visualValidation

원본 그래프/도형 존재 여부: 사인 그래프와 음영 사각형 있음. visualPurposeCheck: y=±k 교점 A,B,C,D의 대칭 좌표를 보여 기울기와 넓이 계산을 이해시키는 목적. 라벨/색상: y=k, y=-k, A(4/3,3), B(8/3,3), C(16/3,-3), D(20/3,-3), 음영 ACDB. visualValidation/하네스 검산: f(x)=2√3 sin(πx/4), k=3, AC 기울기=-3/2, AB=4/3, 높이=6, 넓이=8.

## 호빈T의 Tip

사인 그래프의 대칭성을 먼저 쓰면 네 교점을 모두 삼각방정식으로 풀 필요가 없다.

## minimumVisibleSolution

최종 후보에는 다음이 보여야 한다.

1. 원문 조건과 질문.
2. 핵심식/핵심 조건과 그 이유.
3. 학생이 따라갈 수 있는 단계별 풀이.
4. 정답 `④ 8`.
5. 필요한 경우 그래프/도형의 목적, 라벨, 색상 역할, 검산 근거.

## 페이지/배치 계획

- 예상 배치: graph/figure-expanded
- 페이지 간 시각 연속성: 한 문항이 2쪽 이상이면 같은 문제 번호, 같은 핵심 색상, 같은 그래프/도형 기준을 유지한다.
- 이전 쪽에서 이어지는 값: 2쪽 구성 시 1쪽 마지막에 다음 쪽에서 사용할 핵심값을 표시한다.
- 구해야 하는 대상 / 최종 목표: 정답 `④ 8`를 구하는 것.
