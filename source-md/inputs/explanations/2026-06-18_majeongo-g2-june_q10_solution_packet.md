# 마전고 26년 고2 6월 Q10 solution packet

```yaml
schemaVersion: handsolution-solution-packet-v1
runId: majeongo-g2-june-full-batch-20260618161108
problemCode: majeongo-g2-june-q10
processGateVersion: 4
status: packet_ready
```

## 문제 재작성용 원문

AB=2√5, AC=BC=5인 삼각형 ABC에서 BC를 지름으로 하는 반원이 AC와 만나는 점 중 C가 아닌 점을 D라 하자. 호 CD 위에 점 E를 삼각형 DCE의 넓이가 3/5가 되도록 잡는다. CE=k일 때 60k²의 값을 구하시오. (CE<DE)

## 단원 및 난이도

- 단원 및 난이도: 삼각함수/도형/함수 그래프 내신형 문항.
- 문항별 난이도: 상.
- 배치 분류: graph/figure-expanded.

## problemTextCheck

문제 번호, 조건, 수식, 보기/질문, 정답 검산 기준을 원문 페이지 이미지와 빠른정답표에서 확인했다. 최종 후보는 문제 원문을 요약하지 않고 재작성해야 한다.

## problemSourceCheck

최종 후보의 문제 본문, 풀이, Tip, 정답은 손글씨형 이미지 생성 기반이어야 한다. 원본 PDF 크롭, OCR 텍스트, HTML/SVG/PIL/system font 텍스트 오버레이는 금지한다. 그래프/도형 영역만 수학 정확성 검증용 하네스를 사용할 수 있다.

## 핵심식 / 핵심 조건 / coreConditionCheck

반원 지름의 원주각이 90°임을 이용해 3-4-5 구조를 만든 뒤 좌표로 E를 찾는다.

이 핵심 조건은 풀이의 갈림길이므로 최종 손풀이에서 색/밑줄/작은 박스 중 하나로 강조한다.

## 풀이 검산 / 정답 검산 / solutionValidation

BC가 지름이고 D가 반원 위이므로 ∠BDC=90°. D가 AC 위에 있으므로 AD+CD=5. AD=x, CD=5-x라 두고 직각삼각형 ABD,BCD에서 BC²-AB²=CD²-AD². 25-20=(CD-AD)(CD+AD)=5(CD-AD), CD-AD=1. 따라서 CD=3, AD=2, BD=4. 좌표를 D(0,0), C(3,0), B(0,4)로 두면 원의 중심은 (3/2,2), 반지름 5/2. △DCE 넓이 3/5에서 밑변 CD=3이므로 E의 높이는 2/5. 호 CD 조건으로 y=-2/5. 원에 대입하면 x=4/5 또는 11/5. CE<DE 조건에 맞는 것은 E(11/5,-2/5), 따라서 CE²=(4/5)²+(2/5)²=4/5, 60k²=48.

정답: `48`

## 그래프/도형 / visualPurposeCheck / visualLegendCheck / visualValidation

원본 그래프/도형 존재 여부: 삼각형, 반원, 호 위 점 E, 음영 삼각형. visualPurposeCheck: 지름을 보는 원주각이 직각임을 보여 CD=3,BD=4를 유도하는 목적. 라벨/색상: AB=2√5, AC=BC=5, D,E,C, CE=k, △DCE 음영. visualValidation: D=(0,0), C=(3,0), B=(0,4), E=(11/5,-2/5), k²=4/5, 60k²=48. 페이지 간 시각 연속성: 2쪽이면 1쪽 도형 길이, 2쪽 좌표/넓이. 이전 쪽에서 이어지는 값: CD=3,BD=4. 구해야 하는 대상: 60k².

## 호빈T의 Tip

반원과 지름이 보이면 원주각 90°를 먼저 표시하자.

## minimumVisibleSolution

최종 후보에는 다음이 보여야 한다.

1. 원문 조건과 질문.
2. 핵심식/핵심 조건과 그 이유.
3. 학생이 따라갈 수 있는 단계별 풀이.
4. 정답 `48`.
5. 필요한 경우 그래프/도형의 목적, 라벨, 색상 역할, 검산 근거.

## 페이지/배치 계획

- 예상 배치: graph/figure-expanded
- 페이지 간 시각 연속성: 한 문항이 2쪽 이상이면 같은 문제 번호, 같은 핵심 색상, 같은 그래프/도형 기준을 유지한다.
- 이전 쪽에서 이어지는 값: 2쪽 구성 시 1쪽 마지막에 다음 쪽에서 사용할 핵심값을 표시한다.
- 구해야 하는 대상 / 최종 목표: 정답 `48`를 구하는 것.
