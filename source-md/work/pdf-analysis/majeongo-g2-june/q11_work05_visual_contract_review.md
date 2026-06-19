# Q11 작업05 Visual Contract Review

visualSpec: work/visual-specs/majeongo-g2-june-full-batch-20260618161108/q11_work05_visual_spec.md
output: outputs/2026-06-19_majeongo-g2-june_q11_상세형_작업05.png
reviewDecision: pass

mathInvariantCheck:
- Sine graph shows the required 1.5-cycle original function piece.
- Parabola vertex is `(4,-1)` and right branch is visible.
- Final answer is `224`.

layoutCheck:
- Complete problem text including `g(10)을 구하시오` is visible above the graph.
- Graph stays inside the reserved box and does not cover the solution.
- h labels are outside the plotting area and do not hide the original function graph.

labelCheck:
- kyunghoonmath label helpers render `π`, `h(1)` style labels, and the stacked a-value fraction.
- No tofu squares or forbidden ASCII label strings in the graph.

originalFunctionPreservationCheck:
- The sine and parabola are visible as the primary graph.
- The h guide lines are light, secondary teaching guides.

textbookStyleCheck:
- The visual order matches a Korean high-school workbook: original graph first, boundary/key point second, horizontal guide lines and h labels last.
- The graph explains the h(n) intersection-count idea without crowding the solution.
