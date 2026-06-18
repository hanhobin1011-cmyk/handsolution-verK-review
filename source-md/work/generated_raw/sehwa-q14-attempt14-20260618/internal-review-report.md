# Sehwa 2024 Q14 attempt14 raw 내부 검수 리포트

```yaml
schemaVersion: handsolution-internal-review-v1
runId: sehwa-q14-attempt14-internal-final-candidate-20260618071542
problemCode: sehwa-2024-q14
attempt: attempt14
status: raw_pass_internal_review_not_registered
reviewDecision: ready_for_user_review_or_registration_plan
```

## 1. 생성 파일

```text
page1: work/generated_raw/sehwa-q14-attempt14-20260618/attempt14_page1_from_attempt13_raw.png
page2: work/generated_raw/sehwa-q14-attempt14-20260618/attempt14_page2_raw.png
metadata: work/generated_raw/sehwa-q14-attempt14-20260618/generation-metadata.json
```

주의: 아직 `outputs/` 등록, 공개 갤러리 반영, Supabase/Drive 반영은 하지 않았다.

## 2. 파일 크기 / 비율

```text
page1: 1024x1536
page2: 1024x1536
```

```yaml
samePixelSize: pass
canvasRatio: pass
```

## 3. page1 검수

page1은 attempt13 raw를 유지했다. 이유는 DB 피드백이었던 보기 누락 문제가 해결되어 있었기 때문이다.

확인된 보기:

```text
① 4
② 6
③ 8
④ 10
⑤ 12
```

```yaml
allChoicesPresent: pass
choice4Equals10: pass
noChoiceOmission: pass
problemBlockGate: pass
```

## 4. page2 attempt14 hard gate

호빈님이 attempt13에서 지적한 실패:

```text
2p는 E인데 왼쪽 점에 매칭되어 보인다.
내부 설명 문구가 이미지에 들어가면 안 된다.
y축은 그리고 x=0이니까 A를 지나가게 그려야 한다.
```

attempt14 검수 결과:

```yaml
realYAxisDrawn: pass
leftIntersectionOnXAxisZeroLine: pass
A_0_minus4_labelVisible: pass
A_bottomLabelIsZeroOnly: pass
no2pNearA: pass
rightPointE2pLabelAlignment: pass
internalFeedbackTextLeakedIntoImage: pass
```

세부 확인:

- 실제 세로 y축이 그려져 있다.
- 왼쪽 아래 교점 A가 그 세로 y축과 `y=-4` 수평선의 교점으로 놓여 있다.
- A 옆 라벨은 `A(0,-4)=x1`로 보인다.
- A 아래 x좌표는 `0`만 보이고, `2p`가 A 근처에 없다.
- `2p`는 오른쪽 아래 교점 `E(2p,-4)` 아래에 직접 배치되어 있다.
- E에서 아래 `2p` 라벨로 수직 점선이 내려가 있어 대응이 명확하다.
- `y축 위의 점`, `x=0임을 강조` 같은 내부 검수 문구는 이미지에 들어가지 않았다.

## 5. page2 수학/그래프 검수

```yaml
opensDownward: pass
y4TangentAtVertex: pass
y0TwoIntersections: pass
yMinus4TwoIntersections: pass
fiveDistinctXValues: pass
calculationFlow: pass
finalAnswer: pass
```

세부 확인:

- 아래로 열린 포물선이다.
- `y=4`는 `C(p,4)`에서 접한다.
- `y=0`은 B, D 두 점에서 만난다.
- `y=-4`는 `A(0,-4)=x1`, `E(2p,-4)` 두 점에서 만난다.
- x좌표 라벨이 왼쪽부터 `0`, `p-p/√2`, `p`, `p+p/√2`, `2p` 순서로 보인다.
- 계산 흐름은 `g(0)=-4`, `A=(0,-4)`, `4-ap²=-4`, `ap²=8`, `5p=30`, `p=6`으로 이어진다.
- 최종 박스에 `f(6)=g(6)+6=4+6=10, 정답 ④ 10`이 있다.

## 6. 렌더링/스타일 검수

```yaml
handwrittenStyle: pass
nonGraphTextHandwrittenSource: pass
noInternalReviewerText: pass
readability: pass
```

## 7. 결론

attempt14 raw는 내부 기준상 `raw_pass_internal_review_not_registered`다.

최종 후보 세트:

```text
page1: work/generated_raw/sehwa-q14-attempt14-20260618/attempt14_page1_from_attempt13_raw.png
page2: work/generated_raw/sehwa-q14-attempt14-20260618/attempt14_page2_raw.png
```

다음 단계는 호빈님 검수 또는 별도 승인 후 `outputs/` 검수 후보 등록 계획이다.
