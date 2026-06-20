# 마전고 26년 고2 6월 Q01-Q02 작업05 재생성 패킷

```yaml
schemaVersion: handsolution-regeneration-packet-v1
runId: majeongo-q10-q01q02-stabilized-regeneration-202606201134
problemCode: majeongo-g2-june-q01-q02
workId: 작업05
sourcePacket: inputs/explanations/2026-06-18_majeongo-g2-june_q01-q02_combined_packet.md
visualSpec: work/visual-specs/majeongo-q10-q01q02-stabilized-regeneration-202606201134/q01-q02_work05_visual_spec.md
status: packet_ready
regenerationType: full_regeneration
```

## 1. 재생성 사유

기존 `outputs/2026-06-19_majeongo-g2-june_q01-q02_기본형_작업04.png`은 `수정 필요` 상태이며, 새 작업번호 전체 재생성 대상이다. 과거 피드백에서 다음 문제가 확인되었다.

- `호빈T의 팁`이 이전에 들어가지 않았던 형태이며, 1번과 2번 중 어느 문제의 팁인지 잘 보이지 않았다.
- Q02 부등식은 그래프로 해집합을 읽을 수 있어야 한다.
- 부등식 범위는 실선/색칠처럼 x의 범위가 보이게 표현해야 한다.
- 진한 보라색처럼 그래프가 잘 보이지 않는 색칠은 지양해야 한다.
- 이전 작업에서 `Tip` 단독 표기, 원문 색상/박스 문제, 그래프 선택 오류가 반복되었다.

이번 작업은 기존 PNG 위 그래프만 교체하지 않고, Q01/Q02 원문·풀이·Tip·Q02 보조 그래프 배치를 한 페이지에서 다시 설계한다.

## 2. 문제 재작성용 원문

### 1번

`π/2 ≤ x ≤ 3π/2`일 때, 방정식 `2sin x + √3 = 0`을 만족시키는 `x`의 값은?

`① 2π/3  ② 5π/6  ③ π  ④ 7π/6  ⑤ 4π/3`

### 2번

`0 ≤ x < 2π`일 때, 부등식 `2cos x - √2 ≤ 0`을 만족시키는 모든 `x`의 값의 범위는 `α ≤ x ≤ β`이다. `β-α`의 값은?

`① π  ② 7π/6  ③ 4π/3  ④ 3π/2  ⑤ 5π/3`

## 3. 단원 및 난이도

- 단원 및 난이도: 삼각방정식과 삼각부등식 기본 확인 문항.
- 문항별 난이도: 1번 하, 2번 하~중.
- 출력 모드: 기본형 2문항 묶음 1쪽.

## 4. problemTextCheck

1번과 2번의 문제 번호, 조건, 수식, 보기 ①~⑤, 정답 목표가 모두 최종 후보에 재작성되어야 한다. 원문은 검은 손글씨형을 기본으로 한다.

## 5. problemSourceCheck

최종 후보의 문제 본문/보기/풀이/Tip/정답은 손글씨형 image generation 기반이며, 원본 PDF 크롭/OCR/코드 텍스트 오버레이를 쓰지 않는다.

## 6. 핵심식 / 핵심 조건 / coreConditionCheck

- 1번 핵심식: `sin x=-√3/2`. 값→기준각→사분면→범위 확인이 풀이의 갈림길이다.
- 2번 핵심식: `cos x≤√2/2`. 등호 경계 `π/4`, `7π/4`를 잡고 구간 길이를 계산한다.

## 7. 풀이 검산 / 정답 검산 / solutionValidation

1번: `2sin x+√3=0`에서 `sin x=-√3/2`. 후보각 `4π/3`, `5π/3` 중 `π/2≤x≤3π/2`에 들어가는 값은 `4π/3`. 정답 `⑤ 4π/3`.

2번: `2cos x-√2≤0`에서 `cos x≤√2/2`. `0≤x<2π`에서 해는 `π/4≤x≤7π/4`. 따라서 `β-α=7π/4-π/4=3π/2`. 정답 `④ 3π/2`.

## 8. 그래프/도형 / visualPurposeCheck / visualLegendCheck / visualValidation

- 원본 그래프/도형 존재 여부: no.
- 학생 이해에 도움이 되는 이유: Q02 부등식 해집합을 x축 범위로 읽게 해 학생이 `β-α`를 시각적으로 확인할 수 있다.
- 라벨/색상 역할: `y=cos x`, `y=√2/2`, `π/4`, `7π/4`, x축 해 구간 실선/얇은 형광띠.
- 하네스 검산: visual spec `work/visual-specs/majeongo-q10-q01q02-stabilized-regeneration-202606201134/q01-q02_work05_visual_spec.md`의 교점/해구간 assert를 사용한다.

## 9. 호빈T의 Tip

삼각방정식/부등식은 먼저 삼각함수 값을 만들고, 기준각과 범위를 같이 확인하자. Q02는 코사인 그래프에서 해가 되는 x축 구간을 먼저 읽으면 `β-α`가 바로 보인다.

## 10. v4 / processGateVersion=4

신규 재생성 후보는 `processGateVersion=4`로 등록한다. `problemTextCheck`, `problemSourceCheck`, `coreConditionCheck`, `visualPurposeCheck`, `visualLegendCheck`, `visualValidation`, `blindReviewResult=pass`를 registry에 남긴다.

## 11. 페이지 간 시각 연속성 / 이전 쪽에서 이어지는 값 / 구해야 하는 대상

- 페이지 간 시각 연속성: 1쪽 기본형 묶음이므로 해당 없음. 다만 Q01/Q02의 문제 경계와 Tip 귀속은 명확해야 한다.
- 이전 쪽에서 이어지는 값: 해당 없음.
- 구해야 하는 대상 / 최종 목표: Q01은 `x=4π/3`, Q02는 `β-α=3π/2`.

## 12. 유지할 통과 요소

- Q01 정답: `⑤ 4π/3`.
- Q02 정답: `④ 3π/2`.
- Q01 핵심 흐름: `sin x=-√3/2 → 기준각 π/3 → 범위 안 해 4π/3`.
- Q02 핵심 흐름: `cos x≤√2/2 → π/4≤x≤7π/4 → β-α=3π/2`.
- 기본형 묶음 1쪽 구성. 단, 두 문항의 경계와 Tip 귀속이 명확해야 한다.

## 3. 하드 게이트

1. 비그래프 영역 코드 렌더링 금지: 문제 본문, 보기, Tip, 풀이, 정답은 손글씨형 image generation 결과여야 한다.
2. 새 작업번호 전체 재생성: 기존 PNG에 그래프/라벨만 부분 패치해 검수 후보로 올리지 않는다.
3. 원문 문제와 보기 ①~⑤를 모두 재작성한다.
4. `호빈T의 팁`은 plain `Tip`으로 바뀌면 실패다.
5. Q01/Q02 각각 어느 문제의 풀이·Tip인지 명확해야 한다.
6. Q02 그래프 기준값은 `√2/2`이며, `y=1/2` 등 틀린 라벨은 실패다.
7. Q02 해 구간 `π/4≤x≤7π/4`가 x축 실선/얇은 형광띠로 보인다.
8. 그래프를 가리는 진한 면 채움 금지. 축/곡선/기준선이 계속 보여야 한다.
9. `π`, `√2/2`, 분수 라벨은 교육과정 표기와 kyunghoonmath 라벨 기준을 따른다.
10. 정답 번호와 값이 빠른정답과 일치해야 한다.

## 4. 생성 지시 요약

- 출력 모드: 기본형 2문항 묶음 1쪽.
- 원문 문제는 검은 손글씨형, 풀이/핵심 강조는 색상 역할로 구분한다.
- Tip은 한 박스로 통합하더라도 `1번`, `2번` 또는 내용상 귀속이 명확해야 한다. 모호하면 각 문항 근처에 짧게 분리한다.
- Q02 그래프는 단위원보다 코사인 그래프 기반이 우선이다.
- Q02 그래프는 풀이 보조 목적이므로 크게 과장하지 말고, 풀이 흐름을 방해하지 않는 크기로 둔다.

## 5. 검증 산출물

생성 후 아래를 남긴다.

- visual validation JSON
- blind output review MD
- visual contract review MD
- registry 등록 시 `harnessRefs`에 실제 `scripts/...` 검증 하네스 포함
