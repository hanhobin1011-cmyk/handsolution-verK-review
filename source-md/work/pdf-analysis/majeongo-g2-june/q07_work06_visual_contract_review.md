# Q07 작업06 Visual Contract Review

visualSpec: work/visual-specs/majeongo-g2-june-full-batch-20260618161108/q07_work06_visual_spec.md
output: outputs/2026-06-19_majeongo-g2-june_q07_상세형_작업06.png
reviewDecision: pass

mathInvariantCheck:
- `B_x > 2π` asserted in harness.
- `a=20π/13`, `b=28π/13`, `a+b=48π/13`.
- Final answer is `② 48π/13`.

layoutCheck:
- Graph box is separated from solution text and does not cover the handwritten solution.
- A/B/C/O/P labels are visible.
- Triangle overlays are faint and do not hide the original function curves.

labelCheck:
- kyunghoonmath label helpers render `π` and the stacked fraction label.
- No tofu squares or forbidden ASCII label strings in the graph.

originalFunctionPreservationCheck:
- Left and right original tangent-function pieces remain visible after line/triangle overlays.
- The straight line and two triangles are explanatory layers on top of the function graph, not replacements for it.

textbookStyleCheck:
- The graph follows the Korean high-school workbook pattern: function graph first, key points second, line/triangles last.
- Shading is light and supports the area-ratio explanation.
