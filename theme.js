/* Light/dark switch. Follows the device setting until the visitor picks one, then remembers it. */
(function () {
  var root = document.documentElement;
  var KEY = "bloomshire-theme";
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function systemDark() { return !!(window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches); }
  function current() { return root.getAttribute("data-theme") || (systemDark() ? "dark" : "light"); }

  var s = saved();
  if (s === "dark" || s === "light") root.setAttribute("data-theme", s);

  document.addEventListener("DOMContentLoaded", function () {
    var b = document.getElementById("theme-toggle");
    if (!b) return;
    function label() {
      var dark = current() === "dark";
      b.textContent = dark ? "Light mode" : "Dark mode";
      b.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
    label();
    b.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });
  });
})();
