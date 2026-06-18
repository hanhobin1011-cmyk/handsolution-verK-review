# 작업10 손글씨화 입력 패킷

- 대상: `calculus-hard` 02번 상세확장형 작업10
- 목적: 내부 검산용 렌더링 시안을 **최종 후보로 쓰지 않고**, 별도 손글씨형 이미지 제작의 정확도 기준으로 사용한다.
- 내부 시안:
  - `work/generated_raw/2026-06-16-calculus-hard-work10-internal-rendered-draft/work10_internal_accuracy_draft_page1_RENDERED_NOT_CANDIDATE.png`
  - `work/generated_raw/2026-06-16-calculus-hard-work10-internal-rendered-draft/work10_internal_accuracy_draft_page2_RENDERED_NOT_CANDIDATE.png`
- 생성 스크립트:
  - `scripts/render_calculus_hard_work10_internal_accuracy_draft.py`
- 중요: 위 PNG는 코드 렌더링 텍스트가 포함된 내부 검산용 자료이며, `outputs/` 후보로 복사하거나 registry에 등록하면 안 된다.

## 손글씨화 목표

1. 내부 시안의 수학 내용과 페이지 흐름은 보존한다.
2. 비그래프 영역, 즉 문제 본문, Tip, 풀이, 정답 텍스트는 최종에서 코드 폰트처럼 보이면 실패다.
3. 최종은 흰 종이 위 자연스러운 손글씨형이어야 한다.
4. 작업09처럼 카드형 UI, 베이지 배경, 시스템 폰트 문서 스타일은 금지다.
5. 작업08의 손글씨형 질감과 색상 톤을 기준으로 삼는다.

## 1쪽 필수 내용

- 문제 원문 A/B/C 조건, X, c, α, β, α-β 정의 유지.
- `호빈T의 Tip`은 넓은 박스로 배치한다.
- Tip 내용:
  - A, B는 중심 (2,2), (-2,2), 반지름 2인 120° 원호.
  - C는 y=2+√3, y=2-√3 두 선분.
  - 따라서 X는 직사각형에 양쪽 원호 조각이 붙은 모양.
  - 먼저 α 전체를 구하고 마지막에 β를 뺀다.
- 풀이는 α 계산까지:
  - 직사각형 넓이 = 6·2√3 = 12√3
  - 원호 조각 하나 = 4π/3 - √3
  - α = 12√3 + 2(4π/3 - √3) = 8π/3 + 10√3
- 하단 연결 박스: `2쪽에서 c, β 계산`

## 2쪽 필수 내용

- 시작: `1쪽에서 α = 8π/3 + 10√3`
- 핵심식: `c = 2-√3`
- 이유: `β는 포물선과 직선 y=c 사이의 닫힌 영역이다.`
- 교점 계산:
  - `-√3x² + 2 = 2 - √3`
  - `x² = 1 → x = ±1, c = 2 - √3`
- β 계산:
  - `β = ∫[-1,1] {(2-√3x²) - (2-√3)} dx`
  - `= √3 ∫[-1,1] (1-x²) dx`
  - `= 4√3/3`
- 최종:
  - `α-β = 8π/3 + 10√3 - 4√3/3`
  - `= (8π + 26√3)/3`
  - `p=8, q=26 이므로 p+q=34`
  - `정답 34`

## 그래프 필수 조건

- 두 수평선: `y=2+√3`, `y=2-√3`
- 포물선: `y=-√3x²+2`
- 교점: `x=-1`, `x=1`
- 낮은 선: `c=2-√3`
- 회색 음영: 포물선과 `y=c` 사이의 β 영역
- X 도형: 직사각형 양쪽에 원호 조각이 붙은 구조
- 그래프는 충분히 크게, 그러나 풀이 문장을 침범하지 않게 배치한다.

## 통과 조건

최종 후보는 다음을 모두 만족해야 `outputs/`와 registry 등록 가능하다.

- 비그래프 텍스트가 손글씨형이며 디지털 문서처럼 보이지 않는다.
- 원문/Tip/풀이/정답의 한글과 수식이 내부 시안과 일치한다.
- 그래프 라벨과 β 영역이 수학적으로 정확하다.
- 작업08보다 Tip 폭과 2쪽 그래프 크기/위치가 개선되어 있다.
- `scripts/register_output.py`와 `scripts/audit_repository.py`의 v4 게이트를 통과한다.

## 문제 재작성용 원문

문제 번호: 2번

세 집합 \(A,B,C\)는
\[
A=\{(2+2\cos\theta,\;2+2\sin\theta)\mid -\frac{\pi}{3}\le \theta\le \frac{\pi}{3}\},
\]
\[
B=\{(-2+2\cos\theta,\;2+2\sin\theta)\mid \frac{2\pi}{3}\le \theta\le \frac{4\pi}{3}\},
\]
\[
C=\{(a,b)\mid -3\le a\le 3,\; b=2\pm\sqrt3\}
\]
이다. 좌표평면에서 집합 \(A\cup B\cup C\)의 모든 원소가 나타내는 도형을 \(X\)라 하고, 도형 \(X\)와 곡선 \(y=-\sqrt3x^2+2\)가 만나는 점의 \(y\)좌표를 \(c\)라 하자. 집합 \(X\)로 둘러싸인 부분의 넓이를 \(\alpha\), 곡선 \(y=-\sqrt3x^2+2\)와 직선 \(y=c\)로 둘러싸인 부분의 넓이를 \(\beta\)라 하자. \(\alpha-\beta=\frac{p\pi+q\sqrt3}{3}\)일 때, \(p+q\)의 값을 구하시오. 단, \(p,q\)는 정수이다.

## 단원 및 난이도

- 문항별 난이도: 중상 이상.

## 단원 매칭과 난이도

- 2022 개정교육과정 매칭: 미적분, 정적분의 활용, 곡선과 직선 사이의 넓이.
- 보조 개념: 매개변수로 표현된 원호 해석, 도형의 넓이 분해.
- 문항 난이도: 중상 이상.
- 제작 유형: 2쪽 상세확장형.

## 독립 풀이/정답 검산

- \(A\)는 중심 \((2,2)\), 반지름 2, 중심각 120도인 오른쪽 원호이다.
- \(B\)는 중심 \((-2,2)\), 반지름 2, 중심각 120도인 왼쪽 원호이다.
- \(C\)는 \(y=2+\sqrt3\), \(y=2-\sqrt3\), \(-3\le x\le 3\) 두 선분이다.
- \(X\)의 넓이는 직사각형 넓이와 양쪽 원호 조각으로 계산한다.
- 직사각형 넓이: \(6\cdot2\sqrt3=12\sqrt3\).
- 원호 조각 하나: \(\frac12\cdot2^2\cdot\frac{2\pi}{3}-\frac12\cdot2^2\sin\frac{2\pi}{3}=\frac{4\pi}{3}-\sqrt3\).
- 따라서 \(\alpha=12\sqrt3+2(\frac{4\pi}{3}-\sqrt3)=\frac{8\pi}{3}+10\sqrt3\).
- 포물선과 아래 선분의 교점: \(-\sqrt3x^2+2=2-\sqrt3\Rightarrow x=\pm1\), \(c=2-\sqrt3\).
- \(\beta=\int_{-1}^{1}\{(2-\sqrt3x^2)-(2-\sqrt3)\}\,dx=\sqrt3\int_{-1}^{1}(1-x^2)dx=\frac{4\sqrt3}{3}\).
- \(\alpha-\beta=\frac{8\pi}{3}+10\sqrt3-\frac{4\sqrt3}{3}=\frac{8\pi+26\sqrt3}{3}\).
- \(p=8, q=26\), 정답은 \(p+q=34\).

## v4 게이트 기록

- processGateVersion: 4
- problemTextCheck: pass — 원문 A/B/C, \(X,c,\alpha,\beta\), 발문을 모두 page1에 넣는다.
- problemSourceCheck: pass — 문제/Tip/풀이/정답은 image_gen 손글씨형 재작성 결과를 사용한다.
- explanationReviewResult: pass
- curriculumCheck: pass
- gradeLevelCheck: pass
- solutionValidation: pass
- answerCheck: pass — \(p+q=34\)
- coreConditionCheck: pass — \(X\), \(\alpha\), \(c\), \(\beta\)의 역할을 Tip과 풀이에 표시한다.
- fixedLabelCheck: pass — `호빈T의 Tip`, `풀이 (1쪽)`, `2번 이어서`, `정답 34`를 유지한다.
- visualKind: figure
- visualSpecRef: `inputs/explanations/2026-06-16_calculus-hard_02_work10_regeneration_packet.md#작업10-2쪽-레이아웃-계약`
- visualValidation: pass
- blindReviewRef: `inputs/explanations/2026-06-18_calculus-hard_02_work10_blind-output-review.md`
- blindReviewResult: pass

## 페이지 간 시각 연속성 계획

- 1쪽은 원문, 넓은 Tip, \(\alpha\) 계산에 집중하고 그래프를 반복하지 않는다.
- 2쪽은 1쪽의 \(\alpha=\frac{8\pi}{3}+10\sqrt3\)를 받아 \(c\), \(\beta\), 최종 정답을 계산한다.
- 전체 톤은 흰 종이 손글씨형, 파란 단계 번호, 빨간 핵심식, 주황 이유 박스, 제한적 노란 하이라이트로 통일한다.
- 같은 도형을 1쪽에 작게 반복하지 않고, 2쪽에서 그래프를 크게 배치하여 시각 목적을 집중한다.

## 이전 쪽 carry-forward

- 2쪽 첫 줄에 `1쪽에서 α = 8π/3 + 10√3`를 반드시 적는다.
- 2쪽 계산은 이 값을 기준으로 \(\alpha-\beta\)를 완성한다.

## 최종 목표 및 목표 표시 계획

- 구해야 하는 대상: \(p+q\).
- 2쪽: β 음영 영역, \(c=2-\sqrt3\), \(x=\pm1\), 최종 `정답 34`를 명확히 표시한다.
