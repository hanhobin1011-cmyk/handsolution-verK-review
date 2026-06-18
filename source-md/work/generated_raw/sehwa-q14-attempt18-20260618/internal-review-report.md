# Sehwa 2024 Q14 attempt18 raw 내부 검수 리포트

```yaml
schemaVersion: handsolution-internal-review-v1
runId: sehwa-q14-attempt18-internal-final-candidate-20260618080500
problemCode: sehwa-2024-q14
attempt: attempt18
status: raw_pass_internal_review_not_registered
reviewDecision: ready_for_review_gallery_registration
```

## 1. 생성 파일

```text
page1: work/generated_raw/sehwa-q14-attempt18-20260618/attempt18_page1_from_attempt14_raw.png
page2: work/generated_raw/sehwa-q14-attempt18-20260618/attempt18_page2_raw.png
feedback: work/review-feedback/attempt14-page2/user-feedback.md
```

## 2. 사용자 피드백 반영

사용자 피드백:

```text
수정지시에 이미지를 붙여서 설명하는 것도 필요해보인다. 이미지 Ctrl+V해서 붙여넣을 수 있게 피드백 칸 수정 필요.
이차함수인데 왼쪽이 휘어져서 들어가 있음.
```

반영:

```yaml
feedbackImageUXImplemented: pass
quadraticLeftBranchSmooth: pass
noInwardBentLeftBranch: pass
```

## 3. page1 검수

page1은 보기 전체가 통과한 기존 raw를 유지했다.

```yaml
allChoicesPresent: pass
choices: "① 4, ② 6, ③ 8, ④ 10, ⑤ 12"
problemBlockGate: pass
```

## 4. page2 그래프 hard gate

```yaml
realYAxisDrawn: pass
A_on_y_axis_x0: pass
A_bottomLabelIsZeroOnly: pass
no2pNearA: pass
rightPointE2pLabelAlignment: pass
smoothQuadraticParabola: pass
noSShapeOrInwardBend: pass
internalFeedbackTextLeakedIntoImage: pass
```

세부 확인:

- 빨간 A점 `A(0,-4)=x1`이 실제 y축/x=0 위에 놓여 있다.
- `0` 라벨은 y축 아래에 있고 A와 같은 세로선에 정렬되어 있다.
- `2p`는 오른쪽 아래 점 `E(2p,-4)` 아래에만 있다.
- 왼쪽 가지 A→B→C가 매끈한 이차함수 포물선으로 보이며 S자/안쪽 휘어짐이 없다.
- 내부 피드백 문구가 이미지 안에 들어가지 않았다.

## 5. 수학/정답 gate

```yaml
opensDownward: pass
y4TangentAtVertex: pass
y0TwoIntersections: pass
yMinus4TwoIntersections: pass
fiveDistinctXValues: pass
calculationFlow: pass
finalAnswer: pass
```

최종 정답:

```text
f(6)=g(6)+6=4+6=10
정답 ④ 10
```

## 6. 결론

attempt18 raw는 내부 기준상 `raw_pass_internal_review_not_registered`이다. 다음 단계는 검수 후보 갤러리 등록이다.
