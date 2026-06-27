// Compatibility wrapper for the legacy problem-bank-review asset path.
// Primary app script: assets/item-hub-review.js
(() => {
  const current = document.currentScript;
  const script = document.createElement("script");
  script.src = "assets/item-hub-review.js?v=20260627-item-hub-route";
  script.defer = true;
  if (current?.parentNode) {
    current.parentNode.insertBefore(script, current.nextSibling);
  } else {
    document.head.appendChild(script);
  }
})();
