// /api/books.js - Vercel Serverless Function
module.exports = async (req, res) => {
  const INDEX_URL = process.env.INDEX_URL;
  if (!INDEX_URL) return res.status(500).json({ error: "INDEX_URL not set" });
  try {
    const r = await fetch(INDEX_URL, { cache: "no-store" });
    if (!r.ok) throw new Error("Upstream fetch failed: " + r.status);
    const data = await r.json();

    // 👇 make responses always fresh (no CDN/browser cache)
    res.setHeader("Cache-Control", "no-store");

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};
