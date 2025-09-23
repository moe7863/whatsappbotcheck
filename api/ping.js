// /api/ping.js
module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    haveEnv: !!process.env.INDEX_URL,
  });
};
