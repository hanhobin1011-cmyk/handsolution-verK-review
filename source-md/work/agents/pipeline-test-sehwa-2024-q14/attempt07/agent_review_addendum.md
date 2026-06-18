# Attempt07 GPT Image 2 Handwritten Final Candidate Review

## User requested fixes

- Text was too large in the previous candidate.
- `호빈T의 Tip` should be emphasized more.
- Tip title and tip content should be grouped in one box.
- The full original problem statement, including choices, must be written, not only the conditions needed for solution.
- Output must feel like a handwritten image, not typed/code-rendered.

## Production route

Provider/model:

```text
image_gen.provider=openai-codex
image_gen.model=gpt-image-2
```

Generated two A4 portrait pages directly with GPT Image 2, using exact text locks and smaller handwriting instructions.

## Files

```text
outputs/2026-06-16_sehwa-2024-q14_상세형_pipeline-test-01_attempt07_page1.png
outputs/2026-06-16_sehwa-2024-q14_상세형_pipeline-test-01_attempt07_page2.png
```

## Review

Status: `pass_as_handwritten_final_candidate`

Pass:

- Handwritten visual feel: pass
- Text size: pass; smaller and more printable than Attempt05
- Full original problem block: pass; includes choices ① 4, ② 6, ③ 8, ④ 10, ⑤ 12
- Tip box: pass; `호빈T의 Tip` and tip sentence are grouped in one emphasized rounded box
- Korean/math fidelity: pass with minor acceptable handwriting variation
- Minimum visible solution: pass
- Graph structure: pass; y=4 tangent, y=0 and y=-4 two intersections each
- Final answer: pass; `정답 ④ 10`

Notes:

- Page 1 preserves the full problem statement and starts the solution.
- Page 2 gives the graph interpretation and final calculation.
- This candidate is materially better than FAL/default attempts and the code-rendered Attempt05.
