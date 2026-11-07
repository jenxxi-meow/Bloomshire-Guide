/* Search and render for the NPC Gift Guide. Data comes from npc-gifts-data.js (global DATA). */
var listEl = document.getElementById("list");
var emptyEl = document.getElementById("empty");
var countEl = document.getElementById("count");
var input = document.getElementById("q");

function esc(s) {
  return s.replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}
function hl(text, q) {
  if (!q) return esc(text);
  var i = text.toLowerCase().indexOf(q);
  if (i < 0) return esc(text);
  return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length));
}
function items(str, q) {
  return str.split(", ").map(function (it) {
    var h = hl(it, q);
    return '<span class="chip' + (it.indexOf("any ") === 0 ? " any" : "") + '">' + h + "</span>";
  }).join("");
}
function render() {
  var q = input.value.trim().toLowerCase();
  var out = [];
  DATA.forEach(function (r) {
    var hay = (r[0] + " " + r[1] + " " + r[2] + ", " + r[3]).toLowerCase();
    if (q && hay.indexOf(q) < 0) return;
    out.push(
      '<div class="row">' +
        '<div class="npc">' + hl(r[0], q) + (r[1] ? "<small>" + hl(r[1], q) + "</small>" : "") + "</div>" +
        '<div class="perfect"><span class="label">Perfect +80</span><div class="items">' + items(r[2], q) + "</div></div>" +
        '<div class="good"><span class="label">Good +45</span><div class="items">' + items(r[3], q) + "</div></div>" +
      "</div>"
    );
  });
  listEl.innerHTML = out.join("");
  emptyEl.hidden = out.length > 0;
  countEl.textContent = out.length + " of " + DATA.length;
}
input.addEventListener("input", render);
render();
