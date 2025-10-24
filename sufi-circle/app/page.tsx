"use client";

import { useEffect, useMemo, useState } from "react";

const WHATSAPP_GROUP_LINK =
  process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK ??
  "https://chat.whatsapp.com/K5kVxaJisma73QIskOkq1n";

export default function HomePage() {
  const [nums, setNums] = useState<[number, number]>([0, 0]);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState<{ text: string; ok?: boolean } | null>(
    null
  );
  const [unlocked, setUnlocked] = useState(false);

  const correct = useMemo(() => nums[0] + nums[1], [nums]);

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function rand() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function regenerate() {
    setNums([rand(), rand()]);
    setAnswer("");
    setMessage(null);
  }

  function verify() {
    const val = parseInt(answer, 10);
    if (Number.isNaN(val)) {
      setMessage({ text: "Please enter a number." });
      return;
    }
    if (val === correct) {
      setUnlocked(true);
      setMessage({ text: "Correct! Link unlocked below.", ok: true });
      // Optional auto-open:
      window.open(WHATSAPP_GROUP_LINK, "_blank", "noopener");
    } else {
      setMessage({ text: "Incorrect. Please try again." });
      regenerate();
    }
  }

  return (
    <div className="bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-white/30">
      <p className="text-xl font-extrabold text-gray-800 mb-2">
        Bismillahir Rahmanir Raheem <br />
        <span className="text-gray-700">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </span>
      </p>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-4 flex flex-wrap items-center justify-center gap-2 text-center">
        <span>Sufi Circle</span>
        <span className="inline-flex items-center gap-2 text-[#0f5132]">
          <img
            src="/whatsapp-logo.png"
            alt="WhatsApp Logo"
            className="w-6 h-6 object-contain"
          />
          WhatsApp Group
        </span>
        <span className="block w-full text-lg font-normal text-gray-600 mt-1">
          Anti-Bot Verification
        </span>
      </h1>

      <p className="text-gray-600 mb-6">
        To prevent bots, please complete the human verification below to get the
        group link.
      </p>

      {!unlocked && (
        <section aria-label="Verification">
          <div className="mb-6">
            <label
              htmlFor="captchaInput"
              className="block text-xl font-semibold text-gray-700 mb-3"
            >
              What is {nums[0]} + {nums[1]}?
            </label>
            <input
              id="captchaInput"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verify()}
              inputMode="numeric"
              pattern="[0-9]*"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-center text-lg"
              placeholder="Your Answer"
              autoComplete="off"
            />
          </div>

          <button
            onClick={verify}
            className="w-full bg-[#0f5132] hover:bg-[#0c3f27] text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-[#c2a43b]/40 hover:shadow-[0_0_20px_rgba(194,164,59,0.4)]"
          >
            Verify
          </button>

          {message && (
            <p
              className={`mt-4 text-sm font-medium ${
                message.ok ? "text-[#0f5132]" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </section>
      )}

      {unlocked && (
        <section
          className="mt-6 bg-emerald-50 p-6 rounded-xl border border-emerald-200"
          aria-live="polite"
        >
          <p className="text-lg font-semibold text-[#0f5132] mb-4 border-l-4 border-[#c2a43b] pl-3">
            Verification successful! Click the link below to join the group:
          </p>
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#0f5132] hover:bg-[#0c3f27] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-[#c2a43b]/40 hover:shadow-[0_0_20px_rgba(194,164,59,0.4)]"
          >
            <img
              src="/whatsapp-logo.png"
              alt="WhatsApp Logo"
              className="w-5 h-5 object-contain"
            />
            Join WhatsApp Group
          </a>
          <p className="text-sm text-gray-500 mt-4">
            (This link opens in a new tab)
          </p>
        </section>
      )}

      <noscript>
        <p className="mt-6 text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          JavaScript is required to complete the verification.
        </p>
      </noscript>
    </div>
  );
}
