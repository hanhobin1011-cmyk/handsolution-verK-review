# 미적분 고난도 1-2번 해설 MD work03

- 작업 ID: `2026-06-15_calculus-hard`
- 이번 대상: 2번 상세확장형 1쪽/2쪽 작업03
- 승인 유지: `outputs/2026-06-15_calculus-hard_01_상세형_작업02.png`
- 이전 반려본: `outputs/2026-06-15_calculus-hard_02_상세확장형_1쪽_작업02.png`, `outputs/2026-06-15_calculus-hard_02_상세확장형_2쪽_작업02.png`
- DB 반려 사유: 그래프 주변 이중선, 1쪽과 2쪽 그래프가 따로 그려져 전체 이해를 돕기 어려움, 도형 문제는 구해야 하는 부분이 구분되는 그림이 중요함.
- 사용자 참고 그림 반영: 원래 집합 `A,B,C`가 만드는 도형 `X`, 기준선 `y=2\pm\sqrt3`, 포물선, `\beta` 음영을 한 좌표계에서 함께 보이게 한다.
- 그래프/도형 하네스: `scripts/render_calculus_hard_work03_visual_harness.py`

## 페이지 판단

| 문항 | 판단 | 근거 |
|---|---|---|
| 1번 | 작업02 기준 후보 유지 | 사용자 승인 완료. 이번 재생성 범위에서 제외한다. |
| 2번 | A4 2쪽 상세확장형 유지 | 난도 `상`, 도형 해석, 원호 넓이, `c` 결정, `\beta` 정적분, 계수 비교가 모두 필요하다. 단, 두 페이지의 그래프는 같은 좌표 구조를 공유하게 만든다. |

## 문제 재작성용 원문

### 2번

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

- 문항별 난이도: 상
- 풀이 복잡도 요소: 매개변수 집합 도형 해석, 원호 조각 넓이, 포물선 교점 높이 결정, 정적분, 계수 비교
- 대상 교육과정: 2022 개정
- 2022 기준 단원: 미적분 II > 적분법 > 정적분의 활용, 공통수학2 > 도형의 방정식 참고
- AntiMoon/2015식 참고 단원: 미적분 > 적분법, 수학 II > 적분
- 단원 변환 상태: 2015->2022 변환
- A4 2쪽 상세확장형 여부: 예

## 페이지 간 시각 연속성

- 페이지 간 시각 연속성: 1쪽과 2쪽은 다른 그림을 새로 해석하게 만들지 않고, 동일 도형 기준으로 `X`, 기준선 `y=2\pm\sqrt3`, 포물선, `\beta` 음영을 같은 좌표계에 둔다.
- 같은 도형 기준: 1쪽은 전체 도형 `X`와 넓이 `\alpha`의 분해를 먼저 보이고, 2쪽은 동일 좌표계에서 아래 기준선 `c=2-\sqrt3`와 `\beta` 영역을 더 진하게 강조한다.
- 이전 쪽에서 이어지는 값: 2쪽은 1쪽에서 구한 `\alpha=\frac{8\pi}{3}+10\sqrt3`를 이어받고, `c=2-\sqrt3`, `\beta=\frac{4\sqrt3}{3}`를 계산해 `\alpha-\beta`로 연결한다.
- 구해야 하는 대상: 두 페이지 모두 최종 목표가 `p+q=34`임을 잃지 않도록 `X 전체 넓이 \alpha`에서 `\beta`를 빼는 영역을 색상 역할로 구분한다.

## 작업03 수정 체크리스트

- [x] 파란 안전박스 테두리를 다시 그려 생기던 이중선을 제거했다.
- [x] 1쪽에 `X`, `y=2\pm\sqrt3`, 포물선, `\beta` 음영을 한 좌표계에 함께 배치했다.
- [x] 2쪽도 같은 좌표 구조를 유지하고, 아래 기준선 `c=2-\sqrt3`와 `\beta` 영역을 강조했다.
- [x] 계산 흐름은 작업02의 검산값을 유지했다.
- [x] 비그래프 영역은 code/text 렌더링하지 않고, 그래프/도형 안전 영역만 데이터 하네스로 교체했다.

## 풀이 검산 유지

### 2번

1. \(X\)는 가로 \(6\), 세로 \(2\sqrt3\)인 직사각형에 양쪽 120도 원호 조각 2개가 붙은 도형이다.
2. 원호 조각 하나의 넓이는
   \[
   \frac12\cdot2^2\cdot\frac{2\pi}{3}-\frac12\cdot2^2\sin\frac{2\pi}{3}
   =\frac{4\pi}{3}-\sqrt3.
   \]
3. 따라서
   \[
   \alpha=6\cdot2\sqrt3+2\left(\frac{4\pi}{3}-\sqrt3\right)
   =\frac{8\pi}{3}+10\sqrt3.
   \]
4. 포물선은 아래 선분에서 만난다.
   \[
   -\sqrt3x^2+2=2-\sqrt3
   \Rightarrow x=\pm1,\quad c=2-\sqrt3.
   \]
5. \[
   \beta=\int_{-1}^{1}\{(2-\sqrt3x^2)-(2-\sqrt3)\}\,dx
   =\sqrt3\int_{-1}^{1}(1-x^2)\,dx
   =\frac{4\sqrt3}{3}.
   \]
6. \[
   \alpha-\beta=\frac{8\pi}{3}+10\sqrt3-\frac{4\sqrt3}{3}
   =\frac{8\pi+26\sqrt3}{3}.
   \]
7. \(p=8,\;q=26\)이므로 \(p+q=34\).

정답: \(34\)

## 2번 보조도형 작업03

- 원문 그래프/도형 존재 여부: 없음
- 생성 유형: 풀이 보조 도형
- 학생 이해에 도움이 되는 이유: 집합 조건이 만드는 전체 도형과 실제로 빼야 하는 `\beta` 영역을 분리된 그림이 아니라 같은 좌표계에서 보게 한다.
- 도형 `X`: 위아래 선분 `y=2\pm\sqrt3`, `-3\le x\le3`, 좌우 120도 원호
- 포물선: `y=-\sqrt3x^2+2`
- 기준선: `y=c=2-\sqrt3`
- 음영: `X` 내부 연노랑, `\beta` 영역 연초록
- 핵심 점: `(-1,c)`, `(1,c)`, `c=2-\sqrt3`
- 1쪽 역할: 전체 도형 `X`와 포물선, `\beta` 음영을 함께 보여 도형 해석의 출발점을 잡는다.
- 2쪽 역할: 같은 좌표 구조에서 아래 선분과 `\beta` 적분 영역을 강조한다.

## 작업03 생성 및 검수 결과

### 산출물

- 2번 1쪽: `outputs/2026-06-15_calculus-hard_02_상세확장형_1쪽_작업03.png`
- 2번 2쪽: `outputs/2026-06-15_calculus-hard_02_상세확장형_2쪽_작업03.png`
- 하네스 검산 소스:
  - `work/generated_raw/2026-06-15_calculus-hard/02_work03_page1_visual_harness_source.png`
  - `work/generated_raw/2026-06-15_calculus-hard/02_work03_page2_visual_harness_source.png`
- 블라인드 출력 검수: `inputs/explanations/2026-06-15_calculus-hard_01-02_work03_blind-output-review.md`

### 하네스 검산

- \(c=2-\sqrt3\)
- \(\alpha=\frac{8\pi}{3}+10\sqrt3\)
- \(\beta=\frac{4\sqrt3}{3}\)
- \(\alpha-\beta=\frac{8\pi+26\sqrt3}{3}\)
- \(p+q=34\)

### v4 출력 검수 기록

- explanationReviewResult: pass
- problemTextCheck: 2번 1쪽 문제 블록은 작업02 손글씨형 재작성본을 유지했고 원문 발문/조건이 포함되어 있다.
- problemSourceCheck: 문제 블록은 image_gen 손글씨형 재작성본이며 원문 PDF 크롭/OCR/코드 텍스트가 아니다.
- coreConditionCheck: `X` 도형 분해, `c=2-\sqrt3`, `\beta` 적분식이 풀이 흐름과 연결된다.
- fixedLabelCheck: `호빈T의 Tip`, `풀이`, `정답`, `2쪽에서 계속` 고정 라벨을 확인했다.
- visualValidation: 두 페이지 모두 A4 `1240x1754`; 그래프 영역 이중선 없음. 같은 좌표 구조 안에 `X`, 기준선, 포물선, `\beta` 음영이 표시된다.
- visualLabelGlyphCheck: 그래프/도형 라벨은 `kyunghoonmath` 기반 래스터 레이어를 사용했다. `sqrt3`, `alpha`, `beta`, `120deg` ASCII 안전 대체는 수식 본문에서 정확한 기호로 보완된다.
