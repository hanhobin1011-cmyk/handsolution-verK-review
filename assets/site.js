const REVIEW_DECISIONS_KEY = "handsolution-review-decisions-v1";
const REVIEW_TOKEN_KEY = "handsolution-review-token-v1";

let reviewDbClient = null;
let reviewDbClientKey = "";

const state = {
  items: [],
  groups: [],
  filtered: [],
  selectedByGroup: {},
  source: "전체",
  category: "전체",
  mode: "전체",
  query: "",
  sort: "recent",
  view: "gallery",
  reviewQueue: null,
  reviewItems: [],
  reviewFiltered: [],
  reviewBucket: "reviewPending",
  reviewSource: "전체",
  reviewStatus: "전체",
  reviewQuery: "",
  reviewIndex: 0,
  reviewDecisions: loadReviewDecisions(),
};

const categoryOrder = ["공통", "확률과통계", "미적분", "기하", "기타"];
const bucketOrder = ["needsFix", "reviewPending", "baselines", "reviewAssets", "historyOnly", "other"];
const decisionLabels = {
  approve: "승인",
  fix: "수정 필요",
  hold: "보류",
};

const $ = (selector) => document.querySelector(selector);

const els = {
  summary: $("#siteSummary"),
  galleryTab: $("#galleryTab"),
  reviewTab: $("#reviewTab"),
  galleryView: $("#galleryView"),
  reviewView: $("#reviewView"),
  sourceFilters: $("#sourceFilters"),
  categoryFilters: $("#categoryFilters"),
  modeFilters: $("#modeFilters"),
  search: $("#searchInput"),
  sort: $("#sortSelect"),
  count: $("#resultCount"),
  activeSummary: $("#activeSummary"),
  gallery: $("#gallery"),
  empty: $("#emptyState"),
  copy: $("#copyPageLink"),
  reviewSummary: $("#reviewSummary"),
  reviewStats: $("#reviewStats"),
  reviewBucket: $("#reviewBucketSelect"),
  reviewSource: $("#reviewSourceSelect"),
  reviewStatus: $("#reviewStatusSelect"),
  reviewSearch: $("#reviewSearchInput"),
  reviewCount: $("#reviewCount"),
  reviewProgress: $("#reviewProgress"),
  reviewList: $("#reviewList"),
  reviewDetail: $("#reviewDetail"),
  viewer: $("#viewer"),
  viewerTitle: $("#viewerTitle"),
  viewerMeta: $("#viewerMeta"),
  viewerImage: $("#viewerImage"),
  viewerOpen: $("#viewerOpen"),
  viewerDownload: $("#viewerDownload"),
};

async function init() {
  const [manifestResponse, queueResponse] = await Promise.all([
    fetch("assets/output-manifest.json", { cache: "no-store" }),
    fetch("assets/review-queue.json", { cache: "no-store" }).catch(() => null),
  ]);
  const manifest = await manifestResponse.json();
  const queue = queueResponse?.ok ? await queueResponse.json() : null;

  state.items = manifest.items;
  state.groups = buildGroups(manifest.items);
  state.reviewQueue = queue;
  state.reviewItems = queue ? flattenReviewQueue(queue) : [];

  els.summary.textContent = `${state.groups.length}개 작업물 · ${manifest.count}개 이미지 · ${formatBytes(
    manifest.totalBytes,
  )} · ${new Date(manifest.generatedAt).toLocaleString("ko-KR")}`;

  renderFilters();
  renderReviewControls();
  bindEvents();
  applyFilters();
  applyReviewFilters();
  setView(window.location.hash === "#review" ? "review" : "gallery", { updateHash: false });
}

function buildGroups(items) {
  const byKey = new Map();
  for (const item of items) {
    if (!byKey.has(item.groupKey)) {
      byKey.set(item.groupKey, []);
    }
    byKey.get(item.groupKey).push(item);
  }

  return [...byKey.entries()].map(([groupKey, versions]) => {
    versions.sort((a, b) => a.workNumber - b.workNumber || a.id.localeCompare(b.id));
    const latest =
      versions.find((item) => item.isLatestInGroup) ??
      versions.reduce((best, item) => (versionRank(item) > versionRank(best) ? item : best), versions[0]);
    const titleParts = [latest.source];
    if (latest.category !== "기타") titleParts.push(latest.category);
    if (latest.problem) titleParts.push(`${latest.problem}번`);
    titleParts.push(latest.mode);

    return {
      groupKey,
      versions,
      latest,
      source: latest.source,
      category: latest.category,
      problem: latest.problem,
      problemSort: latest.problemSort,
      mode: latest.mode,
      modifiedAt: versions.reduce(
        (value, item) => (item.modifiedAt > value ? item.modifiedAt : value),
        latest.modifiedAt,
      ),
      sortKey: latest.sortKey,
      title: titleParts.join(" · "),
      searchText: versions
        .map((item) => [item.searchText, item.title, item.work, item.fileName].join(" "))
        .join(" ")
        .toLowerCase(),
    };
  });
}

function flattenReviewQueue(queue) {
  const buckets = queue.buckets ?? {};
  return bucketOrder.flatMap((bucketKey) => {
    const bucket = buckets[bucketKey];
    if (!bucket?.items) return [];
    return bucket.items.map((item) => ({
      ...item,
      bucketKey,
      bucketLabel: bucket.label,
      searchText: [
        item.fileName,
        item.title,
        item.source,
        item.category,
        item.problem,
        item.mode,
        item.status,
        item.action,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase(),
    }));
  });
}

function renderFilters() {
  renderFilterGroup(els.sourceFilters, "source", [
    "전체",
    ...unique(state.groups.map((group) => group.source)),
  ]);
  renderFilterGroup(els.categoryFilters, "category", [
    "전체",
    ...categoryOrder.filter((name) => state.groups.some((group) => group.category === name)),
  ]);
  renderFilterGroup(els.modeFilters, "mode", [
    "전체",
    ...unique(state.groups.map((group) => group.mode)),
  ]);
}

function renderFilterGroup(container, key, values) {
  container.innerHTML = values
    .map((value) => {
      const active = state[key] === value ? " active" : "";
      const count =
        value === "전체"
          ? state.groups.length
          : state.groups.filter((group) => group[key] === value).length;
      return `<button class="filter-chip${active}" type="button" data-filter="${key}" data-value="${escapeHtml(
        value,
      )}">${escapeHtml(shortLabel(value))} ${count}</button>`;
    })
    .join("");
}

function renderReviewControls() {
  if (!state.reviewQueue) {
    els.reviewSummary.textContent = "검수 큐를 불러오지 못했습니다.";
    return;
  }

  const queue = state.reviewQueue;
  els.reviewSummary.textContent = `${queue.groupCount}개 활성 그룹 · ${queue.totalItems}개 이미지 · ${new Date(
    queue.generatedAt,
  ).toLocaleString("ko-KR")}`;

  els.reviewStats.innerHTML = bucketOrder
    .filter((bucketKey) => queue.buckets?.[bucketKey])
    .map((bucketKey) => {
      const bucket = queue.buckets[bucketKey];
      return `<button class="stat-tile" type="button" data-review-bucket="${bucketKey}">
        <span>${escapeHtml(bucket.label)}</span>
        <strong>${bucket.count}</strong>
      </button>`;
    })
    .join("");

  fillSelect(
    els.reviewBucket,
    bucketOrder
      .filter((bucketKey) => queue.buckets?.[bucketKey])
      .map((bucketKey) => [bucketKey, `${queue.buckets[bucketKey].label} ${queue.buckets[bucketKey].count}`]),
    state.reviewBucket,
  );
  fillSelect(
    els.reviewSource,
    [["전체", "전체"], ...unique(state.reviewItems.map((item) => item.source)).map((value) => [value, value])],
    state.reviewSource,
  );
  fillSelect(
    els.reviewStatus,
    [["전체", "전체"], ...unique(state.reviewItems.map((item) => item.status)).map((value) => [value, value])],
    state.reviewStatus,
  );
}

function fillSelect(select, options, selected) {
  select.innerHTML = options
    .map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`)
    .join("");
  select.value = selected;
}

function bindEvents() {
  els.galleryTab.addEventListener("click", () => setView("gallery"));
  els.reviewTab.addEventListener("click", () => setView("review"));
  window.addEventListener("hashchange", () => {
    setView(window.location.hash === "#review" ? "review" : "gallery", { updateHash: false });
  });

  document.addEventListener("click", (event) => {
    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      const key = filterButton.dataset.filter;
      state[key] = filterButton.dataset.value;
      renderFilters();
      applyFilters();
      return;
    }

    const versionButton = event.target.closest("[data-select-version]");
    if (versionButton) {
      state.selectedByGroup[versionButton.dataset.selectGroup] =
        versionButton.dataset.selectVersion;
      renderGallery(state.filtered);
      return;
    }

    const reviewBucketButton = event.target.closest("[data-review-bucket]");
    if (reviewBucketButton) {
      state.reviewBucket = reviewBucketButton.dataset.reviewBucket;
      els.reviewBucket.value = state.reviewBucket;
      state.reviewIndex = 0;
      applyReviewFilters();
      setView("review");
      return;
    }

    const reviewItemButton = event.target.closest("[data-review-index]");
    if (reviewItemButton) {
      state.reviewIndex = Number(reviewItemButton.dataset.reviewIndex);
      renderReview();
      return;
    }

    const reviewDecisionButton = event.target.closest("[data-review-decision]");
    if (reviewDecisionButton) {
      setReviewDecision(reviewDecisionButton.dataset.reviewDecision);
      return;
    }

    const reviewNavButton = event.target.closest("[data-review-nav]");
    if (reviewNavButton) {
      moveReview(reviewNavButton.dataset.reviewNav === "next" ? 1 : -1);
      return;
    }

    const reviewCopyButton = event.target.closest("[data-copy-feedback]");
    if (reviewCopyButton) {
      copyReviewFeedback(reviewCopyButton);
      return;
    }

    const reviewSaveButton = event.target.closest("[data-save-feedback]");
    if (reviewSaveButton) {
      saveReviewFeedback(reviewSaveButton);
      return;
    }

    const resetReviewTokenButton = event.target.closest("[data-reset-review-token]");
    if (resetReviewTokenButton) {
      resetReviewToken(resetReviewTokenButton);
      return;
    }

    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      const item = findItem(viewButton.dataset.view);
      if (item) openViewer(item);
    }
  });

  els.search.addEventListener("input", () => {
    state.query = els.search.value.trim().toLowerCase();
    applyFilters();
  });

  els.sort.addEventListener("change", () => {
    state.sort = els.sort.value;
    applyFilters();
  });

  els.reviewBucket.addEventListener("change", () => {
    state.reviewBucket = els.reviewBucket.value;
    state.reviewIndex = 0;
    applyReviewFilters();
  });

  els.reviewSource.addEventListener("change", () => {
    state.reviewSource = els.reviewSource.value;
    state.reviewIndex = 0;
    applyReviewFilters();
  });

  els.reviewStatus.addEventListener("change", () => {
    state.reviewStatus = els.reviewStatus.value;
    state.reviewIndex = 0;
    applyReviewFilters();
  });

  els.reviewSearch.addEventListener("input", () => {
    state.reviewQuery = els.reviewSearch.value.trim().toLowerCase();
    state.reviewIndex = 0;
    applyReviewFilters();
  });

  els.reviewDetail.addEventListener("input", (event) => {
    if (event.target.id !== "reviewNote") return;
    const item = currentReviewItem();
    if (!item) return;
    const existing = state.reviewDecisions[item.fileName] ?? {};
    state.reviewDecisions[item.fileName] = {
      ...existing,
      note: event.target.value,
      updatedAt: new Date().toISOString(),
    };
    saveReviewDecisions();
  });

  els.copy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(window.location.href);
    els.copy.textContent = "복사됨";
    window.setTimeout(() => {
      els.copy.textContent = "링크 복사";
    }, 1400);
  });
}

function setView(view, options = {}) {
  state.view = view;
  const review = view === "review";
  els.galleryView.hidden = review;
  els.reviewView.hidden = !review;
  els.galleryTab.classList.toggle("active", !review);
  els.reviewTab.classList.toggle("active", review);

  if (options.updateHash === false) return;
  if (review) {
    window.history.replaceState(null, "", "#review");
  } else {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
}

function applyFilters() {
  let groups = [...state.groups];

  if (state.source !== "전체") {
    groups = groups.filter((group) => group.source === state.source);
  }
  if (state.category !== "전체") {
    groups = groups.filter((group) => group.category === state.category);
  }
  if (state.mode !== "전체") {
    groups = groups.filter((group) => group.mode === state.mode);
  }
  if (state.query) {
    groups = groups.filter((group) => group.searchText.includes(state.query));
  }

  groups.sort(groupSorters[state.sort] ?? groupSorters.recent);
  state.filtered = groups;
  renderGallery(groups);
}

function applyReviewFilters() {
  let items = state.reviewItems.filter((item) => item.bucketKey === state.reviewBucket);
  if (state.reviewSource !== "전체") {
    items = items.filter((item) => item.source === state.reviewSource);
  }
  if (state.reviewStatus !== "전체") {
    items = items.filter((item) => item.status === state.reviewStatus);
  }
  if (state.reviewQuery) {
    items = items.filter((item) => item.searchText.includes(state.reviewQuery));
  }
  state.reviewFiltered = items;
  if (state.reviewIndex >= items.length) state.reviewIndex = Math.max(0, items.length - 1);
  renderReview();
}

const groupSorters = {
  recent: (a, b) => b.modifiedAt.localeCompare(a.modifiedAt) || a.sortKey.localeCompare(b.sortKey),
  source: (a, b) => a.source.localeCompare(b.source, "ko") || a.sortKey.localeCompare(b.sortKey),
  problem: (a, b) => a.problemSort - b.problemSort || a.sortKey.localeCompare(b.sortKey),
};

function selectedVersion(group) {
  const selectedId = state.selectedByGroup[group.groupKey];
  return group.versions.find((item) => item.id === selectedId) ?? group.latest;
}

function versionRank(item) {
  return item.workNumber * 10 + (item.isPrintReady ? 1 : 0);
}

function renderGallery(groups) {
  els.count.textContent = `${groups.length}개`;
  els.activeSummary.textContent = activeSummary();
  els.empty.hidden = groups.length > 0;
  els.gallery.innerHTML = groups.map(cardTemplate).join("");
}

function renderReview() {
  els.reviewStats.querySelectorAll("[data-review-bucket]").forEach((button) => {
    button.classList.toggle("active", button.dataset.reviewBucket === state.reviewBucket);
  });
  els.reviewCount.textContent = `${state.reviewFiltered.length}개`;
  els.reviewProgress.textContent = state.reviewFiltered.length
    ? `${state.reviewIndex + 1} / ${state.reviewFiltered.length}`
    : "";
  els.reviewList.innerHTML = state.reviewFiltered.map(reviewListItemTemplate).join("");

  const item = currentReviewItem();
  if (!item) {
    els.reviewDetail.innerHTML = '<p class="empty">조건에 맞는 검수 항목이 없습니다.</p>';
    return;
  }
  els.reviewDetail.innerHTML = reviewDetailTemplate(item);
}

function reviewListItemTemplate(item, index) {
  const decision = state.reviewDecisions[item.fileName]?.decision;
  const active = index === state.reviewIndex ? " active" : "";
  return `
    <button class="review-list-item${active}" type="button" data-review-index="${index}">
      <span class="pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
      ${decision ? `<span class="pill ${decisionClass(decision)}">${escapeHtml(decisionLabels[decision] ?? decision)}</span>` : ""}
      <strong>${escapeHtml(item.title)}</strong>
      <small>${escapeHtml(item.fileName)}</small>
    </button>
  `;
}

function reviewDetailTemplate(item) {
  const src = encodeURI(item.path);
  const decision = state.reviewDecisions[item.fileName] ?? {};
  const note = decision.note ?? "";
  return `
    <div class="review-detail-head">
      <div>
        <p class="eyebrow">${escapeHtml(item.bucketLabel)}</p>
        <h2>${escapeHtml(item.title)}</h2>
      </div>
      <div class="review-nav">
        <button class="button secondary" type="button" data-review-nav="prev">이전</button>
        <button class="button secondary" type="button" data-review-nav="next">다음</button>
      </div>
    </div>
    <div class="review-stage">
      <button class="review-image-button" type="button" data-view="${escapeHtml(item.id)}">
        <img src="${src}" alt="${escapeHtml(item.title)}" />
      </button>
      <div class="review-meta-panel">
        <div class="meta">
          <span class="pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
          <span class="pill">${escapeHtml(item.source)}</span>
          <span class="pill">${escapeHtml(item.mode)}</span>
          <span class="pill">${escapeHtml(item.work)}</span>
          <span class="pill">${item.width}×${item.height}</span>
        </div>
        <p class="review-action">${escapeHtml(item.action)}</p>
        <div class="decision-row" aria-label="검수 판정">
          ${decisionButton("approve", decision.decision)}
          ${decisionButton("fix", decision.decision)}
          ${decisionButton("hold", decision.decision)}
        </div>
        <label class="review-note">
          <span>검수 메모</span>
          <textarea id="reviewNote" rows="7" placeholder="원문, 정답, 그래프, 배치, 글씨 상태를 기록">${escapeHtml(
            note,
          )}</textarea>
        </label>
        <div class="review-actions">
          <button class="button secondary" type="button" data-view="${escapeHtml(item.id)}">확대</button>
          <a class="button secondary" href="${src}" target="_blank" rel="noreferrer">원본 열기</a>
          ${reviewDbButtonTemplate()}
          <button class="button" type="button" data-copy-feedback>피드백 복사</button>
        </div>
      </div>
    </div>
  `;
}

function decisionButton(value, current) {
  const active = value === current ? " active" : "";
  return `<button class="decision-button${active}" type="button" data-review-decision="${value}">${escapeHtml(
    decisionLabels[value],
  )}</button>`;
}

function cardTemplate(group) {
  const item = selectedVersion(group);
  const src = encodeURI(item.path);
  const versionButtons = group.versions
    .map((version) => {
      const active = version.id === item.id ? " active" : "";
      return `<button class="version-chip${active}" type="button" data-select-group="${escapeHtml(
        group.groupKey,
      )}" data-select-version="${escapeHtml(version.id)}">${escapeHtml(version.work)}</button>`;
    })
    .join("");
  const latestBadge = item.isLatestInGroup ? '<span class="latest-badge">최신</span>' : "";
  const statusPill =
    item.status && item.status !== "미기록"
      ? `<span class="pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span>`
      : "";

  return `
    <article class="card">
      <button class="thumb" type="button" data-view="${item.id}" aria-label="${escapeHtml(group.title)} 보기">
        ${latestBadge}
        <img loading="lazy" src="${src}" alt="${escapeHtml(group.title)} ${escapeHtml(item.work)}" />
      </button>
      <div class="card-body">
        <h3 class="card-title">${escapeHtml(group.title)}</h3>
        <div class="version-strip" aria-label="작업번호 선택">
          ${versionButtons}
        </div>
        <div class="meta">
          <span class="pill">${escapeHtml(item.category)}</span>
          <span class="pill">${escapeHtml(item.mode)}</span>
          <span class="pill red">${escapeHtml(item.work)}</span>
          ${statusPill}
          <span class="pill">${group.versions.length}개 작업</span>
          <span class="pill">${item.width}×${item.height}</span>
        </div>
        <div class="card-actions">
          <button class="button secondary" type="button" data-view="${item.id}">확대</button>
          <a class="button" href="${src}" download>다운로드</a>
        </div>
      </div>
    </article>
  `;
}

function currentReviewItem() {
  return state.reviewFiltered[state.reviewIndex] ?? null;
}

function moveReview(delta) {
  if (!state.reviewFiltered.length) return;
  state.reviewIndex = Math.min(
    Math.max(state.reviewIndex + delta, 0),
    state.reviewFiltered.length - 1,
  );
  renderReview();
}

function setReviewDecision(decision) {
  const item = currentReviewItem();
  if (!item) return;
  const existing = state.reviewDecisions[item.fileName] ?? {};
  state.reviewDecisions[item.fileName] = {
    ...existing,
    decision,
    updatedAt: new Date().toISOString(),
  };
  saveReviewDecisions();
  renderReview();
}

function reviewDbButtonTemplate() {
  if (!isReviewDbConfigured()) return "";
  return [
    '<button class="button" type="button" data-save-feedback>DB 저장</button>',
    '<button class="button secondary" type="button" data-reset-review-token>DB 키 재입력</button>',
  ].join("");
}

function isReviewDbConfigured() {
  const config = reviewDbConfig();
  return Boolean(
    config.enabled &&
      config.provider === "supabase" &&
      config.url &&
      (config.publishableKey || config.anonKey),
  );
}

function reviewDbConfig() {
  return window.HANDSOLUTION_DB ?? {};
}

function reviewDecision(item) {
  const decision = state.reviewDecisions[item.fileName] ?? {};
  const code = decision.decision ?? "hold";
  return {
    code,
    label: decisionLabels[code] ?? "미정",
    note: decision.note ?? "",
    nextAction: nextActionForDecision(code),
  };
}

function nextActionForDecision(code) {
  if (code === "approve") return "기준 후보 승격 검토";
  if (code === "fix") return "수정 필요로 내리고 새 작업번호 전체 재생성";
  return "보류 사유 확인 후 재검수";
}

function reviewFeedbackText(item, channel = "inbox") {
  const decision = reviewDecision(item);
  const registryId = item.registryId || item.id || "";
  const route =
    channel === "db"
      ? "Supabase handsolution_review_feedback"
      : "REVIEW_FEEDBACK_INBOX.md";
  return [
    "[검수 피드백]",
    `- 대상 파일: ${item.path}`,
    `- Registry ID: ${registryId}`,
    `- 현재 상태: ${item.status}`,
    `- 판정: ${decision.label}`,
    `- 검수 메모: ${decision.note}`,
    `- 다음 조치: ${decision.nextAction}`,
    `- 반영 경로: ${route}`,
    "- 반영 명령: 검수항목 반영해줘",
    "- 함께 갱신할 문서: REVIEW_FEEDBACK_LOG.md, OUTPUT_INDEX.md, REVIEW_QUEUE.md",
  ].join("\n");
}

async function copyReviewFeedback(button) {
  const item = currentReviewItem();
  if (!item) return;
  await navigator.clipboard.writeText(reviewFeedbackText(item));
  button.textContent = "복사됨";
  window.setTimeout(() => {
    button.textContent = "피드백 복사";
  }, 1400);
}

async function saveReviewFeedback(button) {
  const item = currentReviewItem();
  if (!item) return;

  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "저장 중";

  try {
    const client = getReviewDbClient();
    const config = reviewDbConfig();
    const payload = buildReviewDbPayload(item);
    const { error } = await client
      .from(config.table || "handsolution_review_feedback")
      .insert(payload, { returning: "minimal" });
    if (error) throw error;
    button.textContent = "DB 저장됨";
  } catch (error) {
    console.error(error);
    button.textContent = "저장 실패";
    if (isReviewTokenError(error)) {
      window.localStorage.removeItem(REVIEW_TOKEN_KEY);
      reviewDbClient = null;
      reviewDbClientKey = "";
      button.title = "검수 저장 키가 맞지 않아 초기화했습니다. DB 키 재입력 후 다시 저장하세요.";
    } else {
      button.title = error.message ?? "DB 저장에 실패했습니다.";
    }
  } finally {
    window.setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
    }, 1800);
  }
}

function isReviewTokenError(error) {
  const message = `${error?.message ?? ""} ${error?.details ?? ""} ${error?.hint ?? ""}`.toLowerCase();
  return (
    message.includes("row-level security") ||
    message.includes("violates row-level security") ||
    message.includes("401") ||
    message.includes("42501")
  );
}

function resetReviewToken(button) {
  window.localStorage.removeItem(REVIEW_TOKEN_KEY);
  reviewDbClient = null;
  reviewDbClientKey = "";
  const originalText = button.textContent;
  button.textContent = "키 초기화됨";
  button.title = "검수 저장 키를 초기화했습니다. 다음 DB 저장 때 새 키를 입력하세요.";
  window.setTimeout(() => {
    button.textContent = originalText;
  }, 1800);
}

function getReviewDbClient() {
  if (!isReviewDbConfigured()) {
    throw new Error("DB 설정이 비활성화되어 있습니다.");
  }
  if (!window.supabase?.createClient) {
    throw new Error("Supabase 클라이언트를 불러오지 못했습니다.");
  }

  const config = reviewDbConfig();
  const token = config.requireReviewToken === false ? "" : getReviewToken();
  const key = config.publishableKey || config.anonKey;
  const clientKey = `${config.projectName || "default"}|${config.url}|${key}|${token}`;
  if (reviewDbClient && reviewDbClientKey === clientKey) return reviewDbClient;

  reviewDbClient = window.supabase.createClient(config.url, key, {
    global: {
      headers: token
        ? { "x-handsolution-review-token": token, Prefer: "return=minimal" }
        : { Prefer: "return=minimal" },
    },
  });
  reviewDbClientKey = clientKey;
  return reviewDbClient;
}

function getReviewToken() {
  let token = window.localStorage.getItem(REVIEW_TOKEN_KEY) ?? "";
  if (!token) {
    token = window.prompt("검수 DB 저장 키를 입력하세요.")?.trim() ?? "";
  }
  if (!token) {
    throw new Error("검수 DB 저장 키가 필요합니다.");
  }
  window.localStorage.setItem(REVIEW_TOKEN_KEY, token);
  return token;
}

function buildReviewDbPayload(item) {
  const decision = reviewDecision(item);
  const registryId = item.registryId || item.id || null;
  return {
    source_app: reviewDbConfig().sourceApp || "handsolution-verK-staging",
    target_path: item.path,
    target_file: item.fileName,
    current_status: item.status,
    decision: decision.label,
    decision_code: decision.code,
    note: decision.note,
    next_action: decision.nextAction,
    reviewer: reviewDbConfig().reviewer || null,
    page_url: window.location.href,
    feedback_text: reviewFeedbackText(item, "db"),
    item_payload: {
      registryId,
      registryStatus: item.registryStatus || item.status,
      registryPrimaryFile: item.registryPrimaryFile || item.path,
      id: item.id,
      path: item.path,
      fileName: item.fileName,
      title: item.title,
      source: item.source,
      category: item.category,
      problem: item.problem,
      mode: item.mode,
      work: item.work,
      width: item.width,
      height: item.height,
      groupKey: item.groupKey,
      reviewGroupKey: item.reviewGroupKey,
      bucketKey: item.bucketKey,
      bucketLabel: item.bucketLabel,
    },
  };
}

function openViewer(item) {
  const src = encodeURI(item.path);
  els.viewerTitle.textContent = item.title;
  els.viewerMeta.textContent = [
    item.source,
    item.category,
    item.mode,
    item.work,
    item.status && item.status !== "미기록" ? item.status : "",
  ]
    .filter(Boolean)
    .join(" · ");
  els.viewerImage.src = src;
  els.viewerImage.alt = item.title;
  els.viewerOpen.href = src;
  els.viewerDownload.href = src;
  els.viewerDownload.download = item.fileName;
  els.viewer.showModal();
}

function findItem(id) {
  return (
    state.items.find((entry) => entry.id === id) ??
    state.reviewItems.find((entry) => entry.id === id)
  );
}

function activeSummary() {
  const labels = [];
  if (state.source !== "전체") labels.push(shortLabel(state.source));
  if (state.category !== "전체") labels.push(state.category);
  if (state.mode !== "전체") labels.push(state.mode);
  if (state.query) labels.push(`"${state.query}"`);
  return labels.length ? labels.join(" · ") : "전체 작업물";
}

function shortLabel(value) {
  return value.length > 18 ? `${value.slice(0, 17)}...` : value;
}

function statusClass(status) {
  if (["폐기", "수정 필요", "수정 중"].includes(status)) return "warn";
  if (["최종 후보", "최종본", "기준 후보"].includes(status)) return "ok";
  return "";
}

function decisionClass(decision) {
  if (decision === "approve") return "ok";
  if (decision === "fix") return "warn";
  return "";
}

function unique(values) {
  return [...new Set(values)].filter(Boolean);
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

function loadReviewDecisions() {
  try {
    return JSON.parse(window.localStorage.getItem(REVIEW_DECISIONS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveReviewDecisions() {
  window.localStorage.setItem(REVIEW_DECISIONS_KEY, JSON.stringify(state.reviewDecisions));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

init().catch((error) => {
  console.error(error);
  els.summary.textContent = "결과물 목록을 불러오지 못했습니다.";
  els.reviewSummary.textContent = "검수 큐를 불러오지 못했습니다.";
});
