(async () => {
  const $ = (s) => document.querySelector(s);
  const grid = $("#grid"),
    search = $("#search");
  const catSel = $("#category-select"),
    fmtSel = $("#format-select");
  const updated = $("#updated");

  const res = await fetch("/api/books");
  if (!res.ok) {
    grid.textContent = "Failed to load books.";
    return;
  }
  const data = await res.json();
  const items = data.items || [];
  updated.textContent = data.updatedAt
    ? `Index updated: ${new Date(data.updatedAt).toLocaleString()}`
    : "";

  const formats = Array.from(
    new Set(items.map((b) => (b.ext || "").toLowerCase()).filter(Boolean))
  ).sort();
  const cats = Array.from(
    new Set(
      items
        .map((b) => (b.path || "").split("/")[1] || b.path || "")
        .filter(Boolean)
    )
  ).sort();
  for (const f of formats)
    fmtSel.insertAdjacentHTML(
      "beforeend",
      `<option value="${f}">${f.toUpperCase()}</option>`
    );
  for (const c of cats)
    catSel.insertAdjacentHTML(
      "beforeend",
      `<option value="${c}">${c}</option>`
    );

  function render() {
    const q = (search.value || "").toLowerCase();
    const fmt = fmtSel.value,
      cat = catSel.value;
    const filtered = items.filter((b) => {
      if (fmt !== "all" && (b.ext || "").toLowerCase() !== fmt) return false;
      if (cat !== "all") {
        const top = (b.path || "").split("/")[1] || b.path || "";
        if (top !== cat) return false;
      }
      const hay = `${b.title || ""} ${b.author || ""} ${
        b.name || ""
      }`.toLowerCase();
      return q ? hay.includes(q) : true;
    });

    grid.innerHTML = filtered
      .map(
        (b) => `
        <article class="card">
          <img class="cover" src="${(b.cover || "").replace(
            /"/g,
            "&quot;"
          )}" alt="${(b.title || b.name).replace(/"/g, "&quot;")}"/>
          <h3>${b.title || b.name}</h3>
          <div class="meta">${b.author || "—"}${
          b.year ? " • " + b.year : ""
        }</div>
          <div class="actions">
            <a class="btn" href="${
              b.webViewLink
            }" target="_blank" rel="noreferrer">Preview</a>
            <a class="btn primary" href="${b.downloadLink}">Download</a>
          </div>
        </article>
      `
      )
      .join("");
  }

  search.addEventListener("input", render);
  fmtSel.addEventListener("change", render);
  catSel.addEventListener("change", render);
  render();
})();
