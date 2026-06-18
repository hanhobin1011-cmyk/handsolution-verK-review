# Sehwa 2024 Q14 attempt12b raw 내부 검수 리포트

```yaml
schemaVersion: handsolution-internal-review-v1
runId: sehwa-q14-attempt12b-generation-execution-20260618055715
problemCode: sehwa-2024-q14
attempt: attempt12b
status: raw_pass_internal_review_not_registered
reviewDecision: ready_for_user_review_or_registration_plan
```

## 1. 생성 파일

```text
page1: work/generated_raw/sehwa-q14-attempt12b-20260618/attempt12b_page1_raw.png
page2: work/generated_raw/sehwa-q14-attempt12b-20260618/attempt12b_page2_raw.png
metadata: work/generated_raw/sehwa-q14-attempt12b-20260618/generation-metadata.json
```

주의: 위 파일은 내부 raw 결과다. 아직 `outputs/`에 등록하지 않았고, 공개 갤러리에도 올리지 않았다.

## 2. 파일 크기 / 비율 검수

```text
page1: 1024x1536
page2: 1024x1536
```

판정:

```yaml
canvasRatio: pass
samePixelSize: pass
```

attempt12의 핵심 실패였던 page1/page2 비율 불일치는 해결됐다.

## 3. page1 검수

### 통과

- 손글씨형 느낌이 강하고, 비그래프 영역이 시스템 폰트/문서형 카드처럼 보이지 않는다.
- 원문 조건이 전체적으로 잘 재작성되어 있다.
- 핵심 조건 박스/파란 강조가 분명하다.
- `호빈T의 Tip` 박스가 있고, 핵심 발상 `g(x)=f(x)-x`가 강조되어 있다.
- 이동 후 중심 `(x+m, f(x)+m)`이 보인다.
- 접선 조건 `|f(x)+m|=2`, `|x+m|=2`가 보인다.
- `같은 m!` 강조와 `f(x)-x ∈ {-4,0,4}` 도출이 있다.
- page2로 넘어가는 흐름이 있다.

### 우려

- 최종 등록 전에는 원문 조건과 수식이 실제 문제와 한 글자 단위로 맞는지 한 번 더 사람/에이전트 검수가 필요하다.

## 4. page2 검수

### 통과

- `왜 그래프로 보나?` 블록이 보라색 박스와 주황 밑줄로 충분히 강조되어 있다.
- 그래프는 아래로 열린 포물선이다.
- `y=4`가 꼭짓점에서 접한다.
- `y=0`은 두 점에서 만난다.
- `y=-4`는 두 점에서 만난다.
- x축 라벨 `0`, `p-p/√2`, `p`, `p+p/√2`, `2p`가 잘 보인다.
- `g(0)=-4`, `g(x)=4-a(x-p)^2`, `ap²=8` 흐름이 있다.
- 교점 목록과 합 계산 `5p=30`, `p=6`이 보인다.
- 최종 빨간 박스에 `f(6)=g(6)+6=4+6=10, 정답 ④ 10`이 있다.
- 전체가 손글씨 풀이 페이지에 가깝고 문서형 카드 오염이 보이지 않는다.

### 우려

- 그래프 라벨은 대체로 명확하지만, 등록 전 최종 blind review에서 라벨 가독성을 다시 확인해야 한다.

## 5. Gate 판정

```yaml
multiPageConsistency:
  canvasRatio: pass
  samePixelSize: pass
  strokeWeight: pass
  density: pass
  colorWeight: pass
  backgroundTone: pass
studentUnderstandingEmphasis:
  conceptExplanationBlocksHighlighted: pass
  coreIdeaNotBuriedInBlackCalculation: pass
  whyGraphBlockVisible: pass
mathAndGraph:
  answerCheck: pass
  gSubstitutionCheck: pass
  intersectionCountCheck: pass
  graphShapeCheck: pass
  finalAnswerBoxCheck: pass
renderedTextContamination:
  nonGraphTextHandwrittenSource: pass
  noPilHtmlSvgCanvasText: pass
  noOcrTextOverlay: pass
  noDigitalCardLayout: pass
```

## 6. 결론

attempt12b raw는 내부 기준상 `raw_pass_internal_review_not_registered`로 본다.

현재 단계에서 바로 할 수 있는 안전한 다음 단계는 두 가지다.

1. 호빈님에게 raw 이미지를 보여주고 직접 검수 받기
2. 별도 승인 후 `outputs/` 후보 경로로 복사하고 registry/gallery 등록 계획을 세우기

아직 자동으로 `검수 후보` 등록, public gallery publish, 기준 후보 승격은 하지 않는다.
