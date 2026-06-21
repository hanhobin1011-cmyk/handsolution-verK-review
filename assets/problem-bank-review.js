const PROBLEM_REVIEW_DECISIONS_KEY = "handsolution-problem-review-decisions-v1";
const PROBLEM_REVIEW_TOKEN_KEY = "handsolution-review-token-v1";
const PROBLEM_REVIEW_SAVE_KEY = "handsolution-problem-review-saves-v1";

let problemReviewDbClient = null;
let problemReviewDbClientKey = "";

const problemState = {
  data: null,
  problems: [],
  filtered: [],
  selectedProblemId: "",
  selectedProblemIds: new Set(),
  sourceFilter: "전체",
  statusFilter: "전체",
  difficultyFilter: "전체",
  query: "",
  decisions: loadProblemReviewDecisions(),
  saves: loadProblemReviewSaves(),
};

const problemEls = {
  summary: document.querySelector("#problemBankSummary"),
  search: document.querySelector("#problemBankSearch"),
  sourceFilter: document.querySelector("#problemBankSourceFilter"),
  statusFilter: document.querySelector("#problemBankStatusFilter"),
  difficultyFilter: document.querySelector("#problemBankDifficultyFilter"),
  count: document.querySelector("#problemBankCount"),
  progress: document.querySelector("#problemBankProgress"),
  list: document.querySelector("#problemBankList"),
  detail: document.querySelector("#problemBankDetail"),
  selectedSummary: document.querySelector("#selectedProblemSummary"),
  clearSelected: document.querySelector("#clearSelectedProblems"),
  showSelectedExports: document.querySelector("#showSelectedExports"),
  selectedExportsDialog: document.querySelector("#selectedExportsDialog"),
  selectedExportsContent: document.querySelector("#selectedExportsContent"),
  copyLink: document.querySelector("#copyProblemBankLink"),
};

const problemDecisionLabels = {
  approve_problem: "문제DB 승인",
  reject_problem: "반려",
  hold_problem: "보류",
  request_handsolution: "손풀이 요청",
  request_variant: "변형 요청",
};

const dbDecisionMap = {
  approve_problem: { code: "approve", label: "승인" },
  reject_problem: { code: "fix", label: "수정 필요" },
  hold_problem: { code: "hold", label: "보류" },
  request_handsolution: { code: "approve", label: "승인" },
  request_variant: { code: "approve", label: "승인" },
};

async function initProblemBankReview() {
  const response = await fetch("assets/problem-bank-review-data.json", { cache: "no-store" });
  if (!response.ok) throw new Error("문제DB 검수 데이터를 불러오지 못했습니다.");
  problemState.data = await response.json();
  problemState.problems = (problemState.data.problems ?? []).map(normalizeProblem);

  problemEls.summary.textContent = `${problemState.problems.length}개 문항 · ${new Date(
    problemState.data.generatedAt,
  ).toLocaleString("ko-KR")} 스냅샷 · 검수 저장은 Supabase DB에 기록됩니다.`;

  problemState.selectedProblemId = initialProblemId() || problemState.problems[0]?.id || "";
  renderProblemFilters();
  bindProblemEvents();
  applyProblemFilters();
  selectProblem(problemState.selectedProblemId, { updateUrl: false });
}

function normalizeProblem(problem) {
  const classifications = problem.classifications ?? [];
  const classification = classifications[0] ?? {};
  const packets = problem.solutionPackets ?? [];
  const packet = packets[0] ?? {};
  const source = problem.metadata?.source || problem.metadata?.sourceName || sourceFromCode(problem.stable_problem_code);
  const searchText = [
    problem.stable_problem_code,
    source,
    problem.subject,
    problem.unit_path,
    problem.problem_type,
    problem.difficulty,
    problem.answer,
    problem.problem_md,
    problem.source_solution_md,
    classification.concept_tags?.join(" "),
    classification.problem_type_tags?.join(" "),
    packet.core_idea,
    packet.tip_plan,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    ...problem,
    source,
    classification,
    packet,
    searchText,
  };
}

function sourceFromCode(code = "") {
  if (code.startsWith("majeongo")) return "마전고 고2 6월";
  if (code.startsWith("sehwa")) return "세화 변형";
  return "기타";
}

function renderProblemFilters() {
  fillSelect(problemEls.sourceFilter, ["전체", ...unique(problemState.problems.map((p) => p.source))]);
  fillSelect(problemEls.statusFilter, ["전체", ...unique(problemState.problems.map((p) => p.bank_status))]);
  fillSelect(problemEls.difficultyFilter, ["전체", ...unique(problemState.problems.map((p) => p.difficulty))]);
}

function fillSelect(select, values) {
  select.innerHTML = values.map((value) => `<option value="${escapeHtml(value || "미분류")}">${escapeHtml(value || "미분류")}</option>`).join("");
}

function bindProblemEvents() {
  problemEls.search.addEventListener("input", (event) => {
    problemState.query = event.target.value.trim().toLowerCase();
    applyProblemFilters();
  });
  problemEls.sourceFilter.addEventListener("change", (event) => {
    problemState.sourceFilter = event.target.value;
    applyProblemFilters();
  });
  problemEls.statusFilter.addEventListener("change", (event) => {
    problemState.statusFilter = event.target.value;
    applyProblemFilters();
  });
  problemEls.difficultyFilter.addEventListener("change", (event) => {
    problemState.difficultyFilter = event.target.value;
    applyProblemFilters();
  });
  problemEls.list.addEventListener("click", (event) => {
    const checkbox = event.target.closest("[data-problem-select]");
    if (checkbox) {
      toggleProblemSelection(checkbox.dataset.problemSelect, checkbox.checked);
      return;
    }
    const card = event.target.closest("[data-problem-id]");
    if (card) selectProblem(card.dataset.problemId);
  });
  problemEls.detail.addEventListener("change", (event) => {
    const decision = event.target.closest("[name='problemReviewDecision']");
    if (decision) setProblemDecision(decision.value);
  });
  problemEls.detail.addEventListener("input", (event) => {
    if (event.target.matches("[data-problem-review-note]")) setProblemReviewNote(event.target.value);
  });
  problemEls.detail.addEventListener("click", (event) => {
    const saveButton = event.target.closest("[data-save-problem-review]");
    if (saveButton) {
      saveProblemReview(saveButton);
      return;
    }
    const variantButton = event.target.closest("[data-save-variant-request]");
    if (variantButton) saveVariantRequest(variantButton);
  });
  problemEls.clearSelected.addEventListener("click", () => {
    problemState.selectedProblemIds.clear();
    renderProblemList();
    renderSelectedSummary();
  });
  problemEls.showSelectedExports.addEventListener("click", showSelectedExports);
  problemEls.copyLink.addEventListener("click", copyCurrentProblemLink);
}

function applyProblemFilters() {
  problemState.filtered = problemState.problems.filter((problem) => {
    if (problemState.sourceFilter !== "전체" && problem.source !== problemState.sourceFilter) return false;
    if (problemState.statusFilter !== "전체" && problem.bank_status !== problemState.statusFilter) return false;
    if (problemState.difficultyFilter !== "전체" && (problem.difficulty || "미분류") !== problemState.difficultyFilter) return false;
    if (problemState.query && !problem.searchText.includes(problemState.query)) return false;
    return true;
  });
  renderProblemList();
  renderSelectedSummary();
}

function renderProblemList() {
  problemEls.count.textContent = `${problemState.filtered.length}개`;
  problemEls.progress.textContent = `${problemState.problems.length}개 중 필터 결과`;
  problemEls.list.innerHTML = problemState.filtered
    .map((problem) => {
      const active = problem.id === problemState.selectedProblemId ? " active" : "";
      const checked = problemState.selectedProblemIds.has(problem.id) ? " checked" : "";
      const saved = problemState.saves[problem.id];
      return `<article class="review-list-card${active}" data-problem-id="${escapeHtml(problem.id)}">
        <label class="problem-select-box" title="HWPX 묶음 확인용 선택">
          <input type="checkbox" data-problem-select="${escapeHtml(problem.id)}"${checked} />
        </label>
        <div>
          <strong>${escapeHtml(problem.stable_problem_code)}</strong>
          <p>${escapeHtml(firstLine(problem.problem_md))}</p>
          <span>${escapeHtml(problem.source)} · ${escapeHtml(problem.difficulty || "난이도 미정")} · ${escapeHtml(problem.bank_status)}</span>
          ${saved ? `<span class="review-db-status saved">DB 저장됨 · ${escapeHtml(saved.decisionLabel)}</span>` : ""}
        </div>
      </article>`;
    })
    .join("");
}

function selectProblem(problemId, options = {}) {
  if (!problemId) return;
  problemState.selectedProblemId = problemId;
  const problem = currentProblem();
  if (!problem) return;
  if (options.updateUrl !== false) {
    const url = new URL(window.location.href);
    url.searchParams.set("problem", problem.id);
    window.history.replaceState({}, "", url);
  }
  renderProblemList();
  renderProblemDetail(problem);
}

function renderProblemDetail(problem) {
  const classification = problem.classification ?? {};
  const packet = problem.packet ?? {};
  const decision = currentProblemDecision(problem.id);
  problemEls.detail.innerHTML = `<article class="problem-detail-card">
    <div class="problem-detail-head">
      <div>
        <p class="eyebrow">${escapeHtml(problem.source)}</p>
        <h2>${escapeHtml(problem.stable_problem_code)}</h2>
        <p class="summary">${escapeHtml(problem.subject || "과목 미정")} · ${escapeHtml(problem.unit_path || classification.unit_path || "단원 미정")}</p>
      </div>
      <div class="problem-status-pills">
        ${statusPill("bank", problem.bank_status)}
        ${statusPill("solution", problem.solution_status)}
        ${statusPill("handsolution", problem.handsolution_status)}
      </div>
    </div>

    <section class="problem-info-grid">
      ${infoBox("정답", problem.answer || "미입력")}
      ${infoBox("난이도", problem.difficulty || classification.difficulty || "미정")}
      ${infoBox("유형", problem.problem_type || asList(classification.problem_type_tags) || "미정")}
      ${infoBox("PDF 대조", problem.pdf_check_status || "미정")}
    </section>

    <section class="problem-bank-section">
      <h3>문제 발문</h3>
      <pre class="markdown-preview">${escapeHtml(problem.problem_md || "문제 MD 없음")}</pre>
    </section>

    <section class="problem-bank-two-col">
      <div class="problem-bank-section">
        <h3>원본 해설</h3>
        <pre class="markdown-preview">${escapeHtml(problem.source_solution_md || "원본 해설 없음")}</pre>
      </div>
      <div class="problem-bank-section">
        <h3>문풀이 정리</h3>
        ${infoBox("핵심 발상", packet.core_idea || asList(classification.required_ideas) || "아직 없음")}
        ${infoBox("학생 포인트 / Tip", packet.tip_plan || problem.metadata?.tipPlan || "아직 없음")}
        ${infoBox("태그", asList(classification.concept_tags || problem.concept_tags) || "태그 없음")}
      </div>
    </section>

    <section class="problem-bank-section">
      <h3>HWPX 다운로드</h3>
      ${hwpxExportsTemplate(problem)}
    </section>

    <section class="problem-bank-section">
      <h3>변형문제 요청</h3>
      <p class="summary">호빈님이 원하는 문항에 대해서만 변형문 에이전트에게 A/B/C 유형별 제작 요청을 보냅니다.</p>
      <div class="variant-request-grid">
        <label><span>A 변형<br><small>숫자/표현 변경</small></span><input type="number" min="0" max="20" value="0" data-variant-count="A" /></label>
        <label><span>B 변형<br><small>조건 일부 변경</small></span><input type="number" min="0" max="20" value="0" data-variant-count="B" /></label>
        <label><span>C 변형<br><small>핵심 발상 확장</small></span><input type="number" min="0" max="20" value="0" data-variant-count="C" /></label>
      </div>
      <label class="problem-review-note">
        <span>변형 요청 메모</span>
        <textarea data-variant-request-note rows="3" placeholder="예: A 3개는 숫자만 변경, C는 난이도 상으로 1개 등"></textarea>
      </label>
      <div class="problem-review-actions">
        <button class="button secondary" type="button" data-save-variant-request>변형문제 요청 DB 저장</button>
      </div>
    </section>

    <section class="problem-bank-section">
      <h3>호빈님 검수</h3>
      <div class="problem-review-options">
        ${reviewRadio("approve_problem", decision.decision)}
        ${reviewRadio("reject_problem", decision.decision)}
        ${reviewRadio("hold_problem", decision.decision)}
        ${reviewRadio("request_handsolution", decision.decision)}
      </div>
      <label class="problem-review-note">
        <span>반려/수정/요청 사유</span>
        <textarea data-problem-review-note rows="5" placeholder="예: 정답 검산 다시, 원본 해설과 다름, HWPX 줄바꿈 수정, 손풀이 요청 등">${escapeHtml(decision.note)}</textarea>
      </label>
      <div class="problem-review-actions">
        ${problemReviewDbStatusTemplate(problem)}
        <button class="button" type="button" data-save-problem-review>검수 결과 DB 저장</button>
      </div>
    </section>
  </article>`;
}

function infoBox(label, value) {
  return `<div class="problem-info-box"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value ?? "")}</span></div>`;
}

function statusPill(label, value) {
  return `<span class="status-pill">${escapeHtml(label)}: ${escapeHtml(value || "미정")}</span>`;
}

function reviewRadio(code, current) {
  const checked = code === current ? " checked" : "";
  return `<label><input type="radio" name="problemReviewDecision" value="${code}"${checked} /> ${escapeHtml(problemDecisionLabels[code])}</label>`;
}

function hwpxExportsTemplate(problem) {
  const exports = flattenHwpxExports([problem]);
  if (!exports.length) return `<p class="empty">연결된 HWPX export가 없습니다. 선택 문항 HWPX 생성은 다음 단계에서 서버 작업으로 연결합니다.</p>`;
  return `<div class="hwpx-export-list">${exports
    .map((entry) => {
      const drive = entry.hwpx.metadata?.drive ?? {};
      const viewLink = drive.webViewLink || drive.webContentLink || "";
      const downloadLink = drive.fileId ? `https://drive.google.com/uc?export=download&id=${encodeURIComponent(drive.fileId)}` : viewLink;
      const mode = entry.hwpx.manifest?.output?.mode || entry.exportSet.layout_template || entry.hwpx.template_id;
      const validation = entry.hwpx.validation_result?.status || entry.hwpx.manifest?.output?.validation?.status || entry.hwpx.status;
      return `<article class="hwpx-export-card">
        <strong>${escapeHtml(drive.name || entry.hwpx.output_path)}</strong>
        <span>${escapeHtml(mode)} · ${escapeHtml(validation || "검증상태 미상")}</span>
        <div class="selected-action-row">
          ${viewLink ? `<a class="button secondary" href="${escapeHtml(viewLink)}" target="_blank" rel="noreferrer">Drive 열기</a>` : ""}
          ${downloadLink ? `<a class="button" href="${escapeHtml(downloadLink)}" target="_blank" rel="noreferrer">다운로드</a>` : ""}
        </div>
      </article>`;
    })
    .join("")}</div>`;
}

function flattenHwpxExports(problems) {
  const seen = new Set();
  const results = [];
  for (const problem of problems) {
    for (const exportEntry of problem.exports ?? []) {
      const exportSet = exportEntry.exportSet ?? {};
      for (const hwpx of exportEntry.hwpxExports ?? []) {
        const key = hwpx.id || `${exportSet.id}:${hwpx.output_path}`;
        if (seen.has(key)) continue;
        seen.add(key);
        results.push({ problem, exportSet, exportItem: exportEntry.exportItem, hwpx });
      }
    }
  }
  return results;
}

function setProblemDecision(decision) {
  const problem = currentProblem();
  if (!problem) return;
  const existing = currentProblemDecision(problem.id);
  problemState.decisions[problem.id] = { ...existing, decision, updatedAt: new Date().toISOString() };
  saveProblemReviewDecisions();
}

function setProblemReviewNote(note) {
  const problem = currentProblem();
  if (!problem) return;
  const existing = currentProblemDecision(problem.id);
  problemState.decisions[problem.id] = { ...existing, note, updatedAt: new Date().toISOString() };
  saveProblemReviewDecisions();
}

async function saveProblemReview(button) {
  const problem = currentProblem();
  if (!problem) return;
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "저장 중";
  try {
    const client = getProblemReviewDbClient();
    const payload = buildProblemReviewPayload(problem);
    const { error } = await client.from(problemReviewDbConfig().table || "handsolution_review_feedback").insert(payload, { returning: "minimal" });
    if (error) throw error;
    problemState.saves[problem.id] = {
      savedAt: new Date().toISOString(),
      decisionLabel: problemDecisionLabels[currentProblemDecision(problem.id).decision],
      note: currentProblemDecision(problem.id).note,
    };
    saveProblemReviewSaves();
    button.textContent = "저장 완료";
    renderProblemList();
    renderProblemDetail(problem);
  } catch (error) {
    console.error(error);
    button.textContent = "저장 실패";
    if (isProblemReviewTokenError(error)) {
      window.localStorage.removeItem(PROBLEM_REVIEW_TOKEN_KEY);
      problemReviewDbClient = null;
      problemReviewDbClientKey = "";
      alert("검수 저장 키가 맞지 않아 초기화했습니다. 다시 저장할 때 새 키를 입력하세요.");
    } else {
      alert(`DB 저장 실패: ${error.message ?? error}`);
    }
  } finally {
    window.setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
    }, 1800);
  }
}

async function saveVariantRequest(button) {
  const problem = currentProblem();
  if (!problem) return;
  const counts = variantRequestCounts();
  const total = counts.A + counts.B + counts.C;
  if (total <= 0) {
    alert("변형문제 개수를 1개 이상 입력하세요.");
    return;
  }
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "요청 저장 중";
  try {
    const client = getProblemReviewDbClient();
    const payload = buildVariantRequestPayload(problem, counts);
    const { error } = await client.from(problemReviewDbConfig().table || "handsolution_review_feedback").insert(payload, { returning: "minimal" });
    if (error) throw error;
    button.textContent = "변형 요청 저장 완료";
  } catch (error) {
    console.error(error);
    button.textContent = "저장 실패";
    if (isProblemReviewTokenError(error)) {
      window.localStorage.removeItem(PROBLEM_REVIEW_TOKEN_KEY);
      problemReviewDbClient = null;
      problemReviewDbClientKey = "";
      alert("검수 저장 키가 맞지 않아 초기화했습니다. 다시 저장할 때 새 키를 입력하세요.");
    } else {
      alert(`변형 요청 저장 실패: ${error.message ?? error}`);
    }
  } finally {
    window.setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
    }, 1800);
  }
}

function variantRequestCounts() {
  const counts = { A: 0, B: 0, C: 0 };
  document.querySelectorAll("[data-variant-count]").forEach((input) => {
    const key = input.dataset.variantCount;
    if (["A", "B", "C"].includes(key)) {
      counts[key] = Math.max(0, Number.parseInt(input.value || "0", 10) || 0);
    }
  });
  return counts;
}

function buildVariantRequestPayload(problem, counts) {
  const note = document.querySelector("[data-variant-request-note]")?.value?.trim() || "";
  const total = counts.A + counts.B + counts.C;
  return {
    source_app: "problem-bank-review",
    target_path: `handsolution_problems/${problem.id}/variant-request`,
    target_file: problem.stable_problem_code,
    current_status: problem.bank_status || "unknown",
    decision: "승인",
    decision_code: "approve",
    note,
    next_action: "변형문 에이전트가 A/B/C 변형문제 후보 생성",
    reviewer: problemReviewDbConfig().reviewer || "hanho",
    page_url: window.location.href,
    feedback_text: [
      "[변형문제 요청]",
      `- 원본 문항: ${problem.stable_problem_code}`,
      `- A 변형: ${counts.A}`,
      `- B 변형: ${counts.B}`,
      `- C 변형: ${counts.C}`,
      `- 총 요청: ${total}`,
      `- 메모: ${note}`,
    ].join("\n"),
    item_payload: {
      reviewTargetType: "variant_request",
      requestedDecisionCode: "request_variant",
      requestedDecisionLabel: "변형 요청",
      problemId: problem.id,
      stableProblemCode: problem.stable_problem_code,
      variantCounts: counts,
      totalVariantCount: total,
      variantAgent: "byeonhyeongmun",
      verificationAgent: "moon-puli",
      source: problem.source,
      answer: problem.answer,
      difficulty: problem.difficulty,
      problemType: problem.problem_type,
    },
  };
}

function buildProblemReviewPayload(problem) {
  const decision = currentProblemDecision(problem.id);
  const dbDecision = dbDecisionMap[decision.decision] ?? dbDecisionMap.hold_problem;
  const requestedLabel = problemDecisionLabels[decision.decision] ?? "보류";
  const selectedProblemIds = [...problemState.selectedProblemIds];
  return {
    source_app: "problem-bank-review",
    target_path: `handsolution_problems/${problem.id}`,
    target_file: problem.stable_problem_code,
    current_status: problem.bank_status || "unknown",
    decision: dbDecision.label,
    decision_code: dbDecision.code,
    note: decision.note || "",
    next_action: nextActionForProblemDecision(decision.decision),
    reviewer: problemReviewDbConfig().reviewer || "hanho",
    page_url: window.location.href,
    feedback_text: problemFeedbackText(problem, decision),
    item_payload: {
      reviewTargetType: "problem_bank_problem",
      requestedDecisionCode: decision.decision,
      requestedDecisionLabel: requestedLabel,
      problemId: problem.id,
      stableProblemCode: problem.stable_problem_code,
      bankStatus: problem.bank_status,
      solutionStatus: problem.solution_status,
      handsolutionStatus: problem.handsolution_status,
      answer: problem.answer,
      difficulty: problem.difficulty,
      problemType: problem.problem_type,
      source: problem.source,
      selectedProblemIds,
      selectedProblemCodes: selectedProblemIds.map((id) => problemState.problems.find((p) => p.id === id)?.stable_problem_code).filter(Boolean),
    },
  };
}

function nextActionForProblemDecision(decision) {
  if (decision === "approve_problem") return "문제은이 문제은행 확정 등록 및 LLM Wiki 등록";
  if (decision === "reject_problem") return "문풀이/원정리 반려 사유 확인 후 수정 루프 재진입";
  if (decision === "request_handsolution") return "김수석이 손풀이 제작 큐로 분류";
  return "보류 사유 확인 후 재검수";
}

function problemFeedbackText(problem, decision) {
  return [
    "[문제DB 검수 피드백]",
    `- 문항: ${problem.stable_problem_code}`,
    `- 현재 bank_status: ${problem.bank_status}`,
    `- 현재 solution_status: ${problem.solution_status}`,
    `- 판정: ${problemDecisionLabels[decision.decision]}`,
    `- 메모: ${decision.note || ""}`,
    `- 다음 조치: ${nextActionForProblemDecision(decision.decision)}`,
  ].join("\n");
}

function problemReviewDbStatusTemplate(problem) {
  const saved = problemState.saves[problem.id];
  if (saved) return `<span class="review-db-status saved">DB 저장됨 · ${escapeHtml(saved.decisionLabel)} · ${formatDateTime(saved.savedAt)}</span>`;
  return `<span class="review-db-status ${hasProblemReviewToken() ? "ready" : "empty"}">${hasProblemReviewToken() ? "키 입력됨 · DB 저장 가능" : "키 미입력 · DB 저장 때 입력"}</span>`;
}

function getProblemReviewDbClient() {
  const config = problemReviewDbConfig();
  if (!config.enabled || config.provider !== "supabase" || !config.url || !(config.publishableKey || config.anonKey)) {
    throw new Error("DB 설정이 비활성화되어 있습니다.");
  }
  if (!window.supabase?.createClient) throw new Error("Supabase 클라이언트를 불러오지 못했습니다.");
  const token = config.requireReviewToken === false ? "" : getProblemReviewToken();
  const key = config.publishableKey || config.anonKey;
  const clientKey = `${config.projectName || "default"}|${config.url}|${key}|${token}`;
  if (problemReviewDbClient && problemReviewDbClientKey === clientKey) return problemReviewDbClient;
  problemReviewDbClient = window.supabase.createClient(config.url, key, {
    global: { headers: token ? { "x-handsolution-review-token": token, Prefer: "return=minimal" } : { Prefer: "return=minimal" } },
  });
  problemReviewDbClientKey = clientKey;
  return problemReviewDbClient;
}

function problemReviewDbConfig() {
  return window.HANDSOLUTION_DB ?? {};
}

function getProblemReviewToken() {
  let token = window.localStorage.getItem(PROBLEM_REVIEW_TOKEN_KEY) ?? "";
  if (!token) token = window.prompt("검수 DB 저장 키를 입력하세요.")?.trim() ?? "";
  if (!token) throw new Error("검수 DB 저장 키가 필요합니다.");
  window.localStorage.setItem(PROBLEM_REVIEW_TOKEN_KEY, token);
  return token;
}

function hasProblemReviewToken() {
  return Boolean(window.localStorage.getItem(PROBLEM_REVIEW_TOKEN_KEY));
}

function isProblemReviewTokenError(error) {
  const message = `${error?.message ?? ""} ${error?.details ?? ""} ${error?.hint ?? ""}`.toLowerCase();
  return message.includes("row-level security") || message.includes("401") || message.includes("42501");
}

function toggleProblemSelection(problemId, selected) {
  if (selected) problemState.selectedProblemIds.add(problemId);
  else problemState.selectedProblemIds.delete(problemId);
  renderSelectedSummary();
}

function renderSelectedSummary() {
  const selected = [...problemState.selectedProblemIds]
    .map((id) => problemState.problems.find((problem) => problem.id === id))
    .filter(Boolean);
  problemEls.selectedSummary.textContent = selected.length
    ? `${selected.length}개 선택 · ${selected.map((p) => p.stable_problem_code).join(", ")}`
    : "0개 선택됨";
}

function showSelectedExports() {
  const selected = [...problemState.selectedProblemIds]
    .map((id) => problemState.problems.find((problem) => problem.id === id))
    .filter(Boolean);
  if (!selected.length) {
    problemEls.selectedExportsContent.innerHTML = `<p class="empty">먼저 왼쪽 목록에서 문항을 선택하세요.</p>`;
  } else {
    const exports = flattenHwpxExports(selected);
    problemEls.selectedExportsContent.innerHTML = exports.length
      ? `<p class="summary">선택 문항이 포함된 기존 HWPX export입니다. 정확히 같은 묶음이 없으면 다음 단계에서 export request 생성 기능을 붙입니다.</p>${hwpxExportEntriesTemplate(exports)}`
      : `<p class="empty">선택 문항에 연결된 기존 HWPX가 없습니다. 다음 구현 단계에서 선택 묶음 HWPX 생성 요청을 DB에 저장하도록 연결합니다.</p>`;
  }
  problemEls.selectedExportsDialog.showModal();
}

function hwpxExportEntriesTemplate(exports) {
  return `<div class="hwpx-export-list">${exports
    .map((entry) => {
      const drive = entry.hwpx.metadata?.drive ?? {};
      const viewLink = drive.webViewLink || drive.webContentLink || "";
      const downloadLink = drive.fileId ? `https://drive.google.com/uc?export=download&id=${encodeURIComponent(drive.fileId)}` : viewLink;
      return `<article class="hwpx-export-card">
        <strong>${escapeHtml(drive.name || entry.hwpx.output_path)}</strong>
        <span>${escapeHtml(entry.problem.stable_problem_code)} · ${escapeHtml(entry.hwpx.status || "상태 미상")}</span>
        <div class="selected-action-row">
          ${viewLink ? `<a class="button secondary" href="${escapeHtml(viewLink)}" target="_blank" rel="noreferrer">Drive 열기</a>` : ""}
          ${downloadLink ? `<a class="button" href="${escapeHtml(downloadLink)}" target="_blank" rel="noreferrer">다운로드</a>` : ""}
        </div>
      </article>`;
    })
    .join("")}</div>`;
}

async function copyCurrentProblemLink() {
  const problem = currentProblem();
  const url = new URL(window.location.href);
  if (problem) url.searchParams.set("problem", problem.id);
  await navigator.clipboard.writeText(url.toString());
  const original = problemEls.copyLink.textContent;
  problemEls.copyLink.textContent = "복사됨";
  window.setTimeout(() => (problemEls.copyLink.textContent = original), 1400);
}

function currentProblem() {
  return problemState.problems.find((problem) => problem.id === problemState.selectedProblemId) ?? null;
}

function currentProblemDecision(problemId) {
  return problemState.decisions[problemId] ?? { decision: "hold_problem", note: "" };
}

function initialProblemId() {
  return new URLSearchParams(window.location.search).get("problem") || "";
}

function firstLine(text = "") {
  return text.split("\n").find((line) => line.trim())?.slice(0, 90) || "문제 미리보기 없음";
}

function asList(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return value || "";
}

function unique(values) {
  return [...new Set(values.map((value) => value || "미분류"))].filter(Boolean);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDateTime(value) {
  if (!value) return "시간 미상";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("ko-KR", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function loadProblemReviewDecisions() {
  try {
    return JSON.parse(window.localStorage.getItem(PROBLEM_REVIEW_DECISIONS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveProblemReviewDecisions() {
  window.localStorage.setItem(PROBLEM_REVIEW_DECISIONS_KEY, JSON.stringify(problemState.decisions));
}

function loadProblemReviewSaves() {
  try {
    return JSON.parse(window.localStorage.getItem(PROBLEM_REVIEW_SAVE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveProblemReviewSaves() {
  window.localStorage.setItem(PROBLEM_REVIEW_SAVE_KEY, JSON.stringify(problemState.saves));
}

initProblemBankReview().catch((error) => {
  console.error(error);
  problemEls.summary.textContent = `문제DB 검수 데이터를 불러오지 못했습니다: ${error.message ?? error}`;
});
