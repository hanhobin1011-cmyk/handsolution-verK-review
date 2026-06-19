# 마전고 26년 고2 6월 Q07 작업05 내부 검수

```yaml
visualSpec: work/pdf-analysis/majeongo-g2-june/q07_work05_visual_spec.md
output: outputs/2026-06-19_majeongo-g2-june_q07_상세형_작업05.png
harnessRef: scripts/render_majeongo_g2_june_q07_work05_visual_harness.py
reviewDecision: pass
```

## feedbackGate

사용자 DB 피드백 하드 게이트:

1. 그래프가 잘려서 잘 보이지 않으면 실패.
2. `pi`가 아니라 수식 `π`로 보여야 함.
3. 분수식은 세로식이어야 함.

## mathInvariantCheck:

- 문제 원문 조건 `0≤x≤4π`, `x≠2π`, `A,C` x좌표 합 `4π`, 넓이비 `7:3` 유지.
- `A=(a,4u)`, `C=(4π-a,-2u)`, `b=(8π-a)/3` 풀이 유지.
- `2b:(4π-b)=7:3`, `13b=28π`, `b=28π/13`, `a=20π/13`, `a+b=48π/13` 유지.
- 정답 `② 48π/13` 유지.

## layoutCheck:

- 그래프 박스는 문제/선지 아래, 풀이 시작 위에 배치되어 풀이 텍스트를 자르지 않는다.
- A, B, C, O, P가 모두 박스 안에 들어오며, 원문 피드백의 그래프 잘림 문제를 반복하지 않는다.
- 두 음영 삼각형은 연한 색으로 들어가고 축/곡선/점/라벨을 가리지 않는다.

## labelCheck:

- `2π`, `4π`, `x=2π`는 실제 `π` 글리프로 보이고 ASCII pi가 아니다.
- `28π/13`은 세로분수 형태로 보인다.
- 점 라벨 `O, A, B, C, P`는 각 점 옆에 배치되어 식별 가능하다.
- 그래프 라벨은 하네스 래스터 레이어이며, 문제 본문/풀이/정답/Tip 글자는 코드 렌더링하지 않았다.

## blindOutputReview

최종 PNG만 보았을 때 그래프가 잘리거나 해설을 침범하지 않고, 분수와 `π` 표기가 학생용 수학 표기로 읽힌다. Q07 작업05는 사용자 재검수에 올릴 수 있는 `검수 후보`로 판단한다.
