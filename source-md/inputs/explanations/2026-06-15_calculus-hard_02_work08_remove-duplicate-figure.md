# 미적분 고난도 2번 작업08 중복 보조도 제거 패킷

- 작업 ID: `2026-06-15_calculus-hard`
- 이번 대상: 2번 상세확장형 1쪽/2쪽 작업08
- 기준 후보: `outputs/2026-06-15_calculus-hard_02_상세확장형_1쪽_작업07.png`, `outputs/2026-06-15_calculus-hard_02_상세확장형_2쪽_작업07.png`
- 수정 사유: 사용자 검수에서 1쪽과 2쪽의 보조도형이 중복되어 의미가 떨어진다는 피드백이 있었다.
- 생성 방침: 1쪽의 오른쪽 중복 보조도형을 제거하고, 실제 `c`, `β` 계산 근거가 되는 2쪽 보조도형만 유지한다.
- 하네스: `scripts/render_calculus_hard_work08_visual_harness.py`

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

## 단원 및 난이도

- 문항별 난이도: 상
- 풀이 복잡도 요소: 매개변수 집합 도형 해석, 원호 조각 넓이, 포물선 교점 높이 결정, 정적분, 계수 비교
- 대상 교육과정: 2022 개정
- 2022 기준 단원: 미적분 II > 적분법 > 정적분의 활용, 공통수학2 > 도형의 방정식 참고
- AntiMoon/2015식 참고 단원: 미적분 > 적분법, 수학 II > 적분
- A4 2쪽 상세확장형 여부: 예
- 상세확장형 판정 근거: 난이도 상, 도형 해석과 적분 계산이 모두 필요하고, 1쪽은 원문/Tip/α 계산, 2쪽은 c/β 계산으로 역할을 분리하는 것이 자연스럽다.

## 작업08 배치 기준

- 1쪽 오른쪽 중단의 중복 보조도형을 삭제한다.
- 1쪽은 문제 조건, `호빈T의 Tip`, \(\alpha\) 계산 흐름, `2쪽에서 c, β 계산` 연결 박스에 집중한다.
- 2쪽에만 통합 도형/포물선 보조도를 유지한다.
- 2쪽 보조도형은 \(c=2-\sqrt3\), \(y=2-\sqrt3\), 포물선과 닫힌 \(\beta\) 영역을 보여 주는 근거 그림으로 사용한다.
- 중복 도형 제거 외에는 수학 내용과 정답 계산을 바꾸지 않는다.

## 페이지 간 시각 연속성

- 페이지 간 시각 연속성: 1쪽은 도형을 반복하지 않고 \(\alpha=\frac{8\pi}{3}+10\sqrt3\)까지 계산한 뒤, 2쪽에서 같은 문제의 \(c\), \(\beta\) 계산으로 이어진다.
- 같은 도형/그래프 반복 여부: 작업08은 같은 통합 도형을 두 페이지에 반복하지 않는다. 2쪽에만 보조도형을 남겨 실제 \(c\), \(\beta\) 계산 근거로 사용한다.
- 이전 쪽에서 이어받는 값: 2쪽은 1쪽의 \(\alpha=\frac{8\pi}{3}+10\sqrt3\)를 이어받는다.
- 구해야 하는 대상 표시: 2쪽 보조도형에서 직선 \(y=c=2-\sqrt3\), 포물선 교점 \(x=\pm1\), 회색 \(\beta\) 영역을 표시해 무엇을 빼야 하는지 드러낸다.
- 출력물만 보고 알 수 있는 목표: 최종 목표는 \(\alpha-\beta\)에서 \(p+q=34\)를 구하는 것이며, 1쪽 하단 연결 박스와 2쪽 그림/정답 박스로 흐름을 고정한다.

## 핵심 조건 및 Tip 연결

- 발문 표시: \(A\cup B\cup C\), \(X\), \(c\), \(y=c\), \(\alpha\), \(\beta\)를 작은 노란 표시로 연결한다.
- `호빈T의 Tip`: \(A,B\)는 120도 원호이고 \(C\)는 두 수평선이므로, \(X\)는 직사각형에 양쪽 원호 조각이 붙은 도형이다. 먼저 \(\alpha\) 전체를 구하고 마지막에 \(\beta\)를 뺀다.
- 핵심식 1: \(\alpha=\) 직사각형 넓이 \(+\) 원호 조각 2개
- 핵심식 1 이유: 집합 조건을 도형 경계로 바꾸면 계산 대상이 바로 보인다.
- 핵심식 2: \(c=2-\sqrt3\)
- 핵심식 2 이유: \(\beta\)는 포물선과 \(y=c\)가 만드는 닫힌 영역이다.
- 핵심식 3: \(\beta=\int_{-1}^{1}\{(2-\sqrt3x^2)-(2-\sqrt3)\}\,dx\)

## 풀이 검산

- \(\alpha=6\cdot2\sqrt3+2\left(\frac{4\pi}{3}-\sqrt3\right)=\frac{8\pi}{3}+10\sqrt3\)
- \(-\sqrt3x^2+2=2-\sqrt3\Rightarrow x=\pm1,\;c=2-\sqrt3\)
- \(\beta=\sqrt3\int_{-1}^{1}(1-x^2)\,dx=\frac{4\sqrt3}{3}\)
- \(\alpha-\beta=\frac{8\pi+26\sqrt3}{3}\)
- 정답 검산: \(p=8,\;q=26,\;p+q=34\)

## 2번 보조도형 작업08

- 원본 그래프/도형 존재 여부: 없음
- 생성 유형: 풀이 보조 도형
- 학생 이해에 도움이 되는 이유: 2쪽에서 실제로 \(c=2-\sqrt3\)와 \(\beta\) 적분 구간을 결정하는 근거를 보여 준다.
- 풀이 보조 도형의 목적: \(\alpha\) 계산 이후 \(\beta\)로 빼야 할 작은 닫힌 영역을 확인하게 한다.
- 학생이 그래프에서 읽어야 할 관계: 포물선 \(y=-\sqrt3x^2+2\)와 직선 \(y=2-\sqrt3\)가 \(x=\pm1\)에서 만나고, 그 사이 회색 영역이 \(\beta\)이다.
- 함수식/선 색상 매칭: 흑백 중심, 2쪽의 \(y=c\)만 옅은 빨강 보조 강조.
- 그래프 라벨 또는 범례 방식: `kyunghoonmath` 숫자/문자와 손그림 루트 기호를 사용하고 ASCII 대체 라벨은 쓰지 않는다.
- 손글씨형 통합 검수: 그래프 테두리 박스 없이 흰 종이 위에 직접 그린 보조도처럼 배치한다.

## 해설 MD 검수

- 검수 결과: pass
- 2022 단원 검수: pass
- 학년/수준 검수: pass
- 풀이 정확성 검수: pass
- 정답 검산: pass
- 표기/핵심식 검수: pass
- 그래프/도형 스펙 연결: pass
- 문제 원문/핵심 조건/그래프 목적 검수: pass
- 중복 도형 제거 판단: pass

## v4 등록 메타데이터

- processGateVersion: 4
- explanationReviewRef: inputs/explanations/2026-06-15_calculus-hard_02_work08_remove-duplicate-figure.md#해설-md-검수
- explanationReviewResult: pass
- curriculumCheck: pass: 2022 개정 미적분 II 정적분 활용 및 도형 방정식 참고 범위 확인
- gradeLevelCheck: pass: 고난도 상세확장형 풀이 수준 확인
- solutionValidation: pass: alpha, c, beta, p+q 독립 검산 완료
- answerCheck: pass: p=8, q=26, p+q=34
- problemTextCheck: pass: 원문 문제 번호/조건/수식/발문을 유지함
- problemSourceCheck: pass: 문제/풀이 블록은 작업07 손글씨형 출력 기반 수정이며 PDF 크롭/OCR/코드 텍스트가 아님
- coreConditionCheck: pass: X, alpha, c, beta, alpha-beta 구조 유지
- fixedLabelCheck: pass: 호빈T의 Tip, 풀이 (1쪽), 2번 이어서, 풀이, 정답 라벨 유지
- visualKind: figure
- visualSpecRef: inputs/explanations/2026-06-15_calculus-hard_02_work08_remove-duplicate-figure.md#2번-보조도형-작업08
- visualValidation: pass: page1 duplicate figure removed; page2 c/beta figure retained; validationJson=work/generated_raw/2026-06-15_calculus-hard/02_work08_page1_visual_validation.json, work/generated_raw/2026-06-15_calculus-hard/02_work08_page2_visual_validation.json
- visualPurposeCheck: pass: 보조도형은 2쪽 c, beta 계산 근거로만 남김
- visualLegendCheck: pass: y=2±√3, c=2-√3, 포물선, beta 음영 구분 유지
- visualLabelGlyphCheck: pass: kyunghoonmath 기반 라벨 및 루트 글리프 유지
- renderingPolicy: 비그래프 영역은 손글씨형 출력 기반, 그래프/도형 영역은 데이터 하네스/후처리 렌더링
- harnessRefs: scripts/render_calculus_hard_work08_visual_harness.py
- blindReviewRef: inputs/explanations/2026-06-15_calculus-hard_02_work08_remove-duplicate-figure_blind-output-review.md
- blindReviewResult: pass

## 해설-md-검수

- pass: 작업08은 사용자 피드백의 핵심인 1쪽/2쪽 중복 도형 제거를 반영한다.
- pass: 수학 계산, 원문 조건, 정답 34는 작업07과 동일하게 유지한다.
- pass: 보조도형은 실제 c와 beta 계산 근거가 되는 2쪽에만 남긴다.

## 블라인드-출력-검수

- pass: 별도 블라인드 출력 검수 문서는 `2026-06-15_calculus-hard_02_work08_remove-duplicate-figure_blind-output-review.md`에 기록한다.
