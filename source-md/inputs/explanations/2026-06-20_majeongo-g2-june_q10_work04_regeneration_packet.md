# 마전고 26년 고2 6월 Q10 작업04 재생성 패킷

```yaml
schemaVersion: handsolution-regeneration-packet-v1
runId: majeongo-q10-q01q02-stabilized-regeneration-202606201134
problemCode: majeongo-g2-june-q10
workId: 작업04
sourcePacket: inputs/explanations/2026-06-18_majeongo-g2-june_q10_solution_packet.md
visualSpec: work/visual-specs/majeongo-q10-q01q02-stabilized-regeneration-202606201134/q10_work04_visual_spec.md
status: packet_ready
regenerationType: full_regeneration
```

## 1. 재생성 사유

기존 `outputs/2026-06-19_majeongo-g2-june_q10_상세형_작업03.png`은 `수정 필요` 상태이며, 새 작업번호 전체 재생성 대상이다. 과거 사용자 피드백에서 `E`가 반원 위에 있어야 하는데 잘못 들어간 문제와 그림 크기/위치 조정 필요가 확인되었다.

이번 작업은 기존 PNG 위 덧칠/부분 보정이 아니라, 문제 원문·Tip·풀이·도형 배치를 새 작업번호에서 다시 구성한다. 단, 수학 풀이와 도형 검산은 기존 solution packet과 승인된 양성 참고군의 통과 요소를 사용한다.

## 2. 문제 재작성용 원문

AB=2√5, AC=BC=5인 삼각형 ABC에서 BC를 지름으로 하는 반원이 AC와 만나는 점 중 C가 아닌 점을 D라 하자. 호 CD 위에 점 E를 삼각형 DCE의 넓이가 3/5가 되도록 잡는다. CE=k일 때 60k²의 값을 구하시오. (CE<DE)

## 3. 단원 및 난이도

- 단원 및 난이도: 삼각함수/도형/원주각/넓이 조건을 결합한 고2 내신형 문항.
- 문항별 난이도: 상.
- 출력 모드: 상세형 1쪽 우선. 과밀하면 상세형 안에서 도형/풀이 밀도를 조절하되, 2쪽 상세확장형으로 임의 변경하지 않는다.

## 4. problemTextCheck

문제 번호, 조건 `AB=2√5`, `AC=BC=5`, 반원, 점 `D`, 호 `CD` 위 점 `E`, 넓이 `3/5`, `CE=k`, `60k²`, 조건 `CE<DE`를 모두 최종 문제 영역에 손글씨형으로 재작성해야 한다.

## 5. problemSourceCheck

최종 후보의 문제 본문, Tip, 풀이, 정답은 손글씨형 image generation 결과여야 한다. 원본 PDF 크롭, OCR 텍스트, HTML/SVG/PIL/system font 텍스트 오버레이는 금지한다. 그래프/도형 영역만 수학 정확성 검증용 하네스를 사용할 수 있다.

## 6. 핵심식 / 핵심 조건 / coreConditionCheck

핵심 조건은 `BC`가 지름인 반원 위의 점을 보는 원주각이 90°라는 점이다. 이 조건으로 직각 구조를 만들고 `CD=3`, 넓이 조건, `CE²=4/5` 계산으로 이어진다. 최종 손풀이에서는 이 핵심 조건과 이유를 색/밑줄/작은 박스 중 하나로 일반 계산과 구분한다.

## 7. 풀이 검산 / 정답 검산 / solutionValidation

BC가 지름이고 D가 반원 위이므로 ∠BDC=90°. D가 AC 위에 있으므로 AD+CD=5. AD=x, CD=5-x라 두고 직각삼각형 ABD, BCD에서 BC²-AB²=CD²-AD². 25-20=(CD-AD)(CD+AD)=5(CD-AD), CD-AD=1. 따라서 CD=3, AD=2, BD=4. 좌표를 D(0,0), C(3,0), B(0,4)로 두면 원의 중심은 (3/2,2), 반지름 5/2. △DCE 넓이 3/5에서 밑변 CD=3이므로 E의 높이는 2/5. 호 CD 조건과 CE<DE 조건에 맞는 점에서 CE²=(4/5)²+(2/5)²=4/5. 따라서 60k²=48.

정답: `48`

## 8. 그래프/도형 / visualPurposeCheck / visualLegendCheck / visualValidation

- 원본 그래프/도형 존재 여부: yes.
- 학생 이해에 도움이 되는 이유: 원주각 90°, `CD=3`, 넓이 조건의 높이, `CE=k`가 도형에서 한 번에 연결되어야 한다.
- 라벨/색상 역할: `A/B/C/D/E`, `BC=5`, `CD=3`, `CE=k`, 옅은 `△DCE` 음영.
- 하네스 검산: visual spec `work/visual-specs/majeongo-q10-q01q02-stabilized-regeneration-202606201134/q10_work04_visual_spec.md`의 좌표/거리 assert를 사용한다.

## 9. 호빈T의 Tip

반원과 지름이 보이면 원주각 90°를 먼저 표시하자.

## 10. v4 / processGateVersion=4

신규 재생성 후보는 `processGateVersion=4`로 등록한다. `problemTextCheck`, `problemSourceCheck`, `coreConditionCheck`, `visualPurposeCheck`, `visualLegendCheck`, `visualValidation`, `blindReviewResult=pass`를 registry에 남긴다.

## 11. 페이지 간 시각 연속성 / 이전 쪽에서 이어지는 값 / 구해야 하는 대상

- 페이지 간 시각 연속성: 이번 작업은 1쪽 상세형을 목표로 한다. 2쪽 이상으로 갈 경우 같은 도형 기준과 색상 역할을 유지해야 한다.
- 이전 쪽에서 이어지는 값: 1쪽 목표라 해당 없음. 2쪽으로 전환되면 1쪽 말미에 `CD=3`, `CE²=4/5` 중 이어받는 값을 명시한다.
- 구해야 하는 대상 / 최종 목표: `60k²=48`.

## 12. 유지할 통과 요소

- 정답: `48`.
- 핵심 발상: 반원 지름을 보는 원주각 90° → 직각 구조 → `CD=3`, 넓이 조건 → `CE²=4/5`.
- 학생용 `호빈T의 Tip`: `반원과 지름이 보이면 원주각 90°를 먼저 표시하자.`
- 도형은 원문 도형처럼 큰 삼각형 `ABC`, 지름 `BC`, 위쪽 반원, `A-D-C` 직선, 호 위 `E`, 음영 `△DCE`를 보여준다.

## 3. 하드 게이트

1. 비그래프 영역 코드 렌더링 금지: 문제 본문, Tip, 풀이, 정답, 조건 박스 수식은 손글씨형 image generation 결과여야 한다.
2. 새 작업번호 전체 재생성: 기존 PNG에 도형만 부분 패치해 검수 후보로 올리지 않는다.
3. `E`는 반드시 작은 호 `CD` 위에 있고 `CE<DE`가 시각적으로 읽혀야 한다.
4. `A-D-C`는 한 직선이어야 하며, `D`가 `AC`와 반원의 교점처럼 보여야 한다.
5. 음영은 삼각형 `DCE` 내부만 표시한다. 부채꼴/사다리꼴/현 아래 전체 영역처럼 보이면 실패다.
6. 도형 라벨 `A/B/C/D/E`, `BC=5`, `CD=3`, `CE=k`는 잘리지 않고 겹치지 않아야 한다.
7. 도형은 독립 흰 박스처럼 떠 있지 않고 풀이 흐름 속에 자연스럽게 들어가야 한다.
8. 정답 `48`과 풀이 검산이 맞아야 한다.

## 4. 생성 지시 요약

- 출력 모드: 상세형 1쪽 우선. 과밀하면 상세확장형 검토하되, 이번 후보는 가능한 한 1쪽 상세형으로 유지한다.
- 원문 문제는 검은 손글씨형으로 재작성한다.
- 핵심 조건과 이유 설명은 색/밑줄/작은 박스 중 하나로 풀이에서 드러낸다.
- 도형은 visual spec 기준으로 데이터 기반 손그림 하네스에서 구성하되, 최종 페이지와 질감이 이질적이면 실패로 둔다.

## 5. 검증 산출물

생성 후 아래를 남긴다.

- visual validation JSON
- blind output review MD
- visual contract review MD
- registry 등록 시 `harnessRefs`에 실제 `scripts/...` 검증 하네스 포함
