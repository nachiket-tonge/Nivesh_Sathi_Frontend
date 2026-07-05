"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const fundCategories = [
  "Select Fund Category",
  "Large Cap",
  "Mid Cap",
  "Small Cap",
  "Hybrid",
  "Debt",
];

const amcOptions = [
  "Select AMC",
  "Aditya Birla Sun Life Mutual Fund",
  "Axis Mutual Fund",
  "Bandhan Mutual Fund",
  "Bank of India Mutual Fund",
  "Baroda BNP Paribas Mutual Fund",
  "Canara Robeco Mutual Fund",
  "DSP Mutual Fund",
  "Edelweiss Mutual Fund",
  "Franklin Templeton Mutual Fund",
  "HDFC Mutual Fund",
  "HSBC Mutual Fund",
  "ICICI Prudential Mutual Fund",
  "IDBI Mutual Fund",
  "Indiabulls Mutual Fund",
  "Invesco Mutual Fund",
  "ITI Mutual Fund",
  "JM Financial Mutual Fund",
  "Kotak Mahindra Mutual Fund",
  "LT Mutual Fund",
  "LIC Mutual Fund",
  "Mahindra Manulife Mutual Fund",
  "Mirae Asset Mutual Fund",
  "Motilal Oswal Mutual Fund",
  "Navi Mutual Fund",
  "Nippon India Mutual Fund",
  "PGIM India Mutual Fund",
  "Quant Mutual Fund",
  "SBI Mutual Fund",
  "Shriram Mutual Fund",
  "Sundaram Mutual Fund",
  "Union Mutual Fund",
  "UTI Mutual Fund",
  "WhiteOak Capital Mutual Fund",
];

export default function MainContent() {
  const router = useRouter();

  const [mode, setMode] = useState("LUMPSUM");
  const [amount, setAmount] = useState(100000);
  const [sipAmount, setSipAmount] = useState(5000);
  const [tenure, setTenure] = useState(5);

  const [fundCategory, setFundCategory] = useState("Select Fund Category");
  const [amcPreference, setAmcPreference] = useState("Select AMC");

  const [loading, setLoading] = useState(false);

  const formatAmountLabel = (v) => `₹${(v / 100000).toFixed(1)}L`;
  const formatSipLabel = (v) => `₹${v.toLocaleString()}`;

  const handleSubmit = async () => {
    if (loading) return;

    if (fundCategory === "Select Fund Category") {
      alert("Please select a Fund Category.");
      return;
    }

    if (amcPreference === "Select AMC") {
      alert("Please select an AMC.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        amc_name: amcPreference,
        category: fundCategory,
        investment_amount: mode === "LUMPSUM" ? amount : null,
        sip_amount: mode === "SIP" ? sipAmount : null,
        tenure,
      };

      console.log("SENDING PAYLOAD:", payload);

      const token = localStorage.getItem("token");

      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("ML ERROR RESPONSE:", text);
        alert("Failed to generate recommendations. Please try again.");
        return;
      }

      const data = await res.json();

      localStorage.setItem("aiResults", JSON.stringify(data));

      router.push("/ai-recommendation/results");
    } catch (err) {
      console.error("Request failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg md:p-8">
      {/* Top Controls */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 text-xs font-medium text-slate-500">
            Fund Category
          </label>

          <select
            value={fundCategory}
            onChange={(e) => setFundCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
          >
            {fundCategories.map((category, index) => (
              <option key={category} value={category} disabled={index === 0}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 text-xs font-medium text-slate-500">
            AMC Preference
          </label>

          <select
            value={amcPreference}
            onChange={(e) => setAmcPreference(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
          >
            {amcOptions.map((amc, index) => (
              <option key={amc} value={amc} disabled={index === 0}>
                {amc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Investment Mode */}
      <div className="mb-6 flex justify-between">
        <p className="text-xs font-medium uppercase text-slate-500">
          Investment Mode
        </p>

        <div className="inline-flex rounded-full bg-slate-100 p-1">
          {["LUMPSUM", "SIP"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                mode === m ? "bg-emerald-500 text-white" : "text-slate-600"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Lumpsum */}
      <div className="mb-6">
        <label className="text-xs font-medium text-slate-600">
          Investment Amount
        </label>

        <input
          type="range"
          min="10000"
          max="2000000"
          step="10000"
          disabled={mode !== "LUMPSUM"}
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          className="w-full accent-emerald-500"
        />

        <div className="text-xs text-emerald-600">
          {formatAmountLabel(amount)}
        </div>
      </div>

      {/* SIP */}
      <div className="mb-6">
        <label className="text-xs font-medium text-slate-600">
          Monthly SIP
        </label>

        <input
          type="range"
          min="500"
          max="50000"
          step="500"
          disabled={mode !== "SIP"}
          value={sipAmount}
          onChange={(e) => setSipAmount(+e.target.value)}
          className="w-full accent-emerald-500"
        />

        <div className="text-xs text-emerald-600">
          {formatSipLabel(sipAmount)}
        </div>
      </div>

      {/* Tenure */}
      <div className="mb-6">
        <label className="text-xs font-medium text-slate-600">
          Tenure (Years)
        </label>

        <input
          type="range"
          min="1"
          max="50"
          value={tenure}
          onChange={(e) => setTenure(+e.target.value)}
          className="w-full accent-emerald-500"
        />

        <div className="text-xs text-emerald-600">{tenure} years</div>
      </div>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full rounded-full py-3.5 font-semibold text-white transition ${
          loading
            ? "cursor-not-allowed bg-emerald-300"
            : "bg-emerald-500 hover:bg-emerald-600"
        }`}
      >
        {loading ? "Generating Recommendations..." : "Get AI Recommendations"}
      </button>
    </section>
  );
}
