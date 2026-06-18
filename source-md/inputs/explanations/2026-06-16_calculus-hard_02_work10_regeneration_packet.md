# 미적분 고난도 2번 작업10 재생성 패킷

- 작업 ID: `2026-06-16_calculus-hard`
- 대상: `calculus-hard` 02번 상세확장형 1쪽/2쪽 작업10
- 상태: `blocked` — 첫 image_gen 시도는 내부 반려, 검수 후보 등록 금지
- 내부 반려 파일:
  - `work/internal-rejects_2026-06-16/work10-imagegen-text-corruption/2026-06-16_calculus-hard_02_상세확장형_1쪽_작업10.png`
  - `work/internal-rejects_2026-06-16/work10-imagegen-text-corruption/2026-06-16_calculus-hard_02_상세확장형_2쪽_작업10.png`
- 기준 스타일: 작업08의 흰 종이 손글씨형 스타일
- 반려 기준: 사용자의 “렌더링 형태로 풀이가 나오는건 최악” 지시와 v4 비그래프 렌더링 금지 게이트

## 사용자 피드백 요약

작업08 반려:

- 1쪽: `호빈T의 Tip` 박스가 굳이 좁을 이유가 없고, 1쪽/2쪽 모두 재배치부터 다시 해야 한다.
- 2쪽: 그래프를 가로로 더 키워서 잘 보이게 하고, 풀이 배치가 너무 좁게 몰리지 않게 해야 한다.

작업09 반려:

- 전체 페이지가 PIL/NotoSansCJK 코드 렌더링 카드형 문서처럼 보여 기존 손글씨형 스타일과 완전히 다르다.
- 수학 정확도가 좋아도 비그래프 영역이 렌더링형이면 검수 후보 불가.

## 작업10 목표

1. 작업09는 절대 참고 스타일로 쓰지 않는다.
2. 작업08의 손글씨형 흰 종이 질감, 자연스러운 문제 → Tip → 풀이 흐름을 유지한다.
3. 작업08보다 `호빈T의 Tip`을 넓게 잡아 오른쪽 빈 칸이 어색하지 않게 한다.
4. 1쪽은 중복 그래프 없이 문제, Tip, \(\alpha\) 계산에 집중한다.
5. 2쪽은 그래프/도형을 작업08보다 크게 배치하되, 풀이와 충돌하지 않게 좌우 균형을 다시 잡는다.
6. 최종 비그래프 영역은 반드시 손글씨형 image_gen 결과여야 한다. PIL/HTML/SVG/canvas/시스템 폰트/LaTeX 렌더링 금지.

## 문제 재작성용 원문

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

## 풀이 검산

- \(A\): 중심 \((2,2)\), 반지름 2, 오른쪽 120° 원호
- \(B\): 중심 \((-2,2)\), 반지름 2, 왼쪽 120° 원호
- \(C\): \(y=2+\sqrt3\), \(y=2-\sqrt3\), \(-3\le x\le 3\)인 두 선분
- \(X\) 넓이:
  \[
  \alpha=6\cdot2\sqrt3+2\left(\frac{4\pi}{3}-\sqrt3\right)
  =\frac{8\pi}{3}+10\sqrt3
  \]
- 포물선과 아래 선분 교점:
  \[
  -\sqrt3x^2+2=2-\sqrt3\Rightarrow x=\pm1,\quad c=2-\sqrt3
  \]
- \(\beta\):
  \[
  \beta=\int_{-1}^{1}\{(2-\sqrt3x^2)-(2-\sqrt3)\}\,dx
  =\sqrt3\int_{-1}^{1}(1-x^2)\,dx=\frac{4\sqrt3}{3}
  \]
- 최종:
  \[
  \alpha-\beta=\frac{8\pi+26\sqrt3}{3},\quad p=8,\quad q=26,
  \quad p+q=34
  \]

## 작업10 1쪽 레이아웃 계약

- 상단: 원문 문제를 손글씨형으로 넓게 재작성한다.
- 하이라이트: \(A\cup B\cup C\), \(X\), \(c\), \(\alpha\), \(\beta\), \(y=c\)만 작은 노란 표시.
- `호빈T의 Tip`: 페이지 폭을 충분히 사용한다. 작업08처럼 오른쪽이 크게 비어 보이면 실패.
- Tip 내용:
  - \(A,B\)는 중심 \((2,2),(-2,2)\), 반지름 2인 120° 원호.
  - \(C\)는 \(y=2+\sqrt3\), \(y=2-\sqrt3\) 두 선분.
  - 그래서 \(X\)는 직사각형에 양쪽 원호 조각이 붙은 도형.
  - 먼저 \(\alpha\) 전체를 구하고 마지막에 \(\beta\)를 뺀다.
- 본문: \(\alpha=\frac{8\pi}{3}+10\sqrt3\)까지.
- 하단 연결 박스: `2쪽에서 c, β 계산`.
- 1쪽에는 통합 그래프/도형을 반복하지 않는다.

## 작업10 2쪽 레이아웃 계약

- 제목: `2번 이어서`.
- 첫 줄: `1쪽에서 α = 8π/3 + 10√3`.
- 왼쪽 또는 상단 본문: \(c=2-\sqrt3\)의 이유와 \(\beta\) 적분 계산.
- 그래프/도형: 작업08보다 크게, 오른쪽 중상단에서 충분한 폭을 사용.
- 그래프 필수 요소:
  - 두 수평선 \(y=2+\sqrt3\), \(y=2-\sqrt3\)
  - 양쪽 원호 조각
  - 포물선 \(y=-\sqrt3x^2+2\)
  - 교점 \(x=-1,1\)
  - \(c=2-\sqrt3\)
  - 회색 \(\beta\) 영역
- 정답 박스: `정답 34`.

## 첫 image_gen 시도 내부 반려 기록

첫 작업10 image_gen 시도는 아래 이유로 즉시 내부 반려했다.

- 1쪽 원문 수식과 한글이 대량으로 깨졌다.
- `호빈T의 Tip` 본문이 의미 불명확한 문장으로 변형되었다.
- 풀이 번호와 계산식이 누락/중복/오염되었다.
- 2쪽에서 \(c=2-\sqrt3\), 포물선 식, 적분식, 정답 흐름이 모두 심각하게 깨졌다.
- 그래프 라벨도 원래 수학 의미와 다르게 생성되었다.

따라서 해당 PNG는 `outputs/`에서 제거하고 `work/internal-rejects_2026-06-16/work10-imagegen-text-corruption/`로 이동했다. 이 파일들은 검수 후보, 기준 후보, 스타일 참고로 사용할 수 없다.

## v4 등록 메타데이터 목표값

아래 조건이 실제 새 PNG에서 충족될 때만 등록한다.

- processGateVersion: 4
- explanationReviewRef: `inputs/explanations/2026-06-16_calculus-hard_02_work10_regeneration_packet.md#풀이-검산`
- explanationReviewResult: pass
- curriculumCheck: pass
- gradeLevelCheck: pass
- solutionValidation: pass
- answerCheck: pass: \(p+q=34\)
- problemTextCheck: pass
- problemSourceCheck: pass: 문제/Tip/풀이/정답은 손글씨형 image_gen 결과이며 코드 렌더링 아님
- coreConditionCheck: pass
- fixedLabelCheck: pass
- visualKind: figure
- visualSpecRef: `inputs/explanations/2026-06-16_calculus-hard_02_work10_regeneration_packet.md#작업10-2쪽-레이아웃-계약`
- visualValidation: pass
- visualPurposeCheck: pass
- visualLegendCheck: pass
- visualLabelGlyphCheck: pass
- renderingPolicy: 비그래프 영역은 image_gen 손글씨형만 허용, 그래프/도형 영역은 데이터 기반 손그림 하네스 허용
- blindReviewResult: pass

## 구역별 image_gen 시도 결과

긴 전체 페이지 생성을 피하기 위해 문제 원문, Tip, 1쪽 풀이, 그래프, 2쪽 풀이를 구역별로 나누어 생성했다.

생성 파일:

- `work/generated_raw/2026-06-16-calculus-hard-work10-sections/problem_section.png`
- `work/generated_raw/2026-06-16-calculus-hard-work10-sections/tip_section.png`
- `work/generated_raw/2026-06-16-calculus-hard-work10-sections/page1_solution_section.png`
- `work/generated_raw/2026-06-16-calculus-hard-work10-sections/graph_section.png`
- `work/generated_raw/2026-06-16-calculus-hard-work10-sections/page2_solution_section.png`
- 검수 기록: `work/generated_raw/2026-06-16-calculus-hard-work10-sections/section_attempt_review.md`

판정: fail / 내부 반려

주요 실패:

- 문제 원문 A/B/C 조건, θ 범위, ±√3, 정의 문장이 대량 변형됨.
- Tip의 핵심 문장이 의미를 잃고 `√3` 표기가 깨짐.
- 1쪽 풀이의 A/B/C 해석, 핵심식, 원호 조각 계산, 최종 α 식이 오염됨.
- 그래프 라벨 `c=2-√3`, `y=-√3x²+2`, `y=2±√3`이 부정확함.
- 2쪽 풀이의 핵심식, 적분식, 최종 계산이 후보로 쓸 수 없을 정도로 깨짐.

따라서 구역별 생성물도 최종 합성에 사용하지 않는다.

## 채택된 다음 제작 방식

사용자 판단: 손글씨 소스 기반은 이전에도 손풀이 느낌이 충분히 나오지 않았으므로, 3번 방식이 더 적합하다.

따라서 작업10은 다음 방식으로 진행한다.

1. 비그래프 텍스트 정확도 확인용 렌더링 시안을 내부 검산용으로 만든다.
2. 이 렌더링 시안은 절대 `outputs/` 후보나 registry 후보로 등록하지 않는다.
3. 렌더링 시안을 기준으로 별도 손글씨화 제작을 진행한다.
4. 최종 후보는 비그래프 영역이 손글씨형으로 보이고, 내부 시안의 한글·수식 정확도를 보존해야 한다.
5. 최종 후보는 `register_output.py`와 `audit_repository.py`의 렌더링 오염 게이트를 통과해야 한다.

내부 검산용 렌더링 시안:

- `work/generated_raw/2026-06-16-calculus-hard-work10-internal-rendered-draft/work10_internal_accuracy_draft_page1_RENDERED_NOT_CANDIDATE.png`
- `work/generated_raw/2026-06-16-calculus-hard-work10-internal-rendered-draft/work10_internal_accuracy_draft_page2_RENDERED_NOT_CANDIDATE.png`
- 생성 스크립트: `scripts/render_calculus_hard_work10_internal_accuracy_draft.py`

손글씨화 입력 패킷:

- `inputs/explanations/2026-06-16_calculus-hard_02_work10_handwriting_input_packet.md`

현재 규칙상 PIL/HTML/폰트 렌더링으로 최종 후보를 만들 수 없으므로, 내부 시안은 정확도 기준 자료로만 사용한다.

## 손글씨화 1차 시도 결과

내부 렌더링 시안을 기준으로 손글씨화 image_gen 시도를 진행했다.

생성 파일:

- `work/generated_raw/2026-06-16-calculus-hard-work10-handwriting-attempts/work10_handwriting_attempt_page1.png`
- `work/generated_raw/2026-06-16-calculus-hard-work10-handwriting-attempts/work10_handwriting_attempt_page2.png`
- 검수 기록: `work/generated_raw/2026-06-16-calculus-hard-work10-handwriting-attempts/handwriting_attempt_review.md`

판정: fail / 내부 반려

주요 실패:

- 1쪽 A/B/C 원문 조건, θ 범위, cos/sin, ±√3, α/β 정의가 깨짐.
- Tip 문장과 핵심식이 의미를 잃음.
- 2쪽 c, β, 포물선 식, 적분식, 최종 계산이 오염됨.
- 그래프가 원래 X 도형/포물선/β 영역 구조와 다름.
- 손글씨 느낌은 일부 있으나 수학/한글 정확도가 후보 기준 미달.

따라서 이 손글씨화 결과도 `outputs/` 후보와 registry에 등록하지 않는다.

## 단원 및 난이도

- 문항별 난이도: 중상 이상.

## 단원 매칭과 난이도

- 2022 개정교육과정 매칭: 미적분, 정적분의 활용, 곡선과 직선 사이의 넓이.
- 보조 개념: 매개변수 원호 해석, 도형의 넓이 분해, 적분으로 넓이 계산.
- 문항 난이도: 중상 이상.
- 제작 유형: 2쪽 상세확장형.

## 페이지 간 시각 연속성 계획

- 1쪽은 원문, 넓은 `호빈T의 Tip`, \(\alpha\) 계산까지만 담고 그래프를 반복하지 않는다.
- 2쪽은 1쪽의 결과 \(\alpha=\frac{8\pi}{3}+10\sqrt3\)를 첫 줄에서 받아 \(c\), \(\beta\), 최종 정답을 계산한다.
- 두 페이지 모두 흰 종이 손글씨형, 파란 단계 번호, 빨간 핵심식, 주황 이유 박스, 제한적 노란 하이라이트로 톤을 통일한다.
- 2쪽 그래프는 작업08보다 크게 배치하되 풀이와 겹치지 않게 한다.

## 이전 쪽 carry-forward

- 2쪽 첫 줄에 `1쪽에서 α = 8π/3 + 10√3`를 명확히 적는다.
- 2쪽의 최종 계산은 이 \(\alpha\) 값에서 \(\beta=\frac{4\sqrt3}{3}\)를 빼는 구조로 이어진다.

## 최종 목표 및 목표 표시 계획

- 구해야 하는 대상: \(p+q\).
- 2쪽: 그래프의 β 음영, \(c=2-\sqrt3\), \(x=\pm1\), 최종 `정답 34`를 명확히 표시한다.
