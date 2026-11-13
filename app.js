// AFRICALIFE — unofficial static UI clone interactions
// No backend, no accounts, no real game data. Pure client-side UI behavior.
(function () {
  "use strict";

  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  // --- Settings toggles (pure UI, no persistence) ---
  function wireSettings() {
    var night = document.getElementById("ll-night-toggle");
    var layout = document.getElementById("ll-layout-toggle");
    if (night) {
      night.addEventListener("change", function () {
        if (night.checked) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      });
    }
    if (layout) {
      layout.addEventListener("change", function () {
        if (layout.checked) document.documentElement.dataset.layout = "comfortable";
        else delete document.documentElement.dataset.layout;
      });
    }
  }

  // --- Auth mock forms (no network) ---
  function wireAuth() {
    var forms = $$("form[data-mock]");
    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = document.createElement("p");
        msg.className = "muted";
        msg.textContent = "Mock only — no account is created or sent anywhere.";
        form.appendChild(msg);
      });
    });
  }

  // --- Map tile interactions ---
  function wireMap() {
    var tiles = $$(".map-tile");
    tiles.forEach(function (tile) {
      tile.addEventListener("click", function () {
        var name = tile.getAttribute("data-name") || "this place";
        var detail = document.getElementById("ll-map-detail");
        if (detail) {
          detail.innerHTML =
            '<h2>' + name + '</h2>' +
            '<p class="muted">Static mock detail. The official app shows live info for this location.</p>' +
            '<p><a class="btn" href="./locations.html">Back to locations</a></p>';
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireSettings();
    wireAuth();
    wireMap();
  });
})();