import { useState, useContext } from "react";
import Leadcontext from "../context/leadcontext";

export default function CreateOpportunity({ onClose }) {
  const { leadid } = useContext(Leadcontext);

  const [closingDate, setClosingDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("");
  const [probability, setProbability] = useState("");
  const [forecastCategory, setForecastCategory] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [title, settitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    if (!leadid) {
      setMsg("No lead selected for conversion");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:3000/api/v1/lead/convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            lead_id: leadid,
            closing_date: closingDate
              ? new Date(closingDate).toISOString()
              : null,
            amount,
            title,
            description,
            stage,
            probability: Number(probability),
            forecast_category: forecastCategory,
            next_step: nextStep,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.msg || "Failed to create opportunity");
        return;
      }

      setMsg("Opportunity created successfully ✅");

      setClosingDate("");
      setAmount("");
      setDescription("");
      setStage("");
      setProbability("");
      setForecastCategory("");
      setNextStep("");
      settitle("");

      if (onClose) {
        setTimeout(onClose, 800);
      }
    } catch (err) {
      setMsg("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    /* CARD — NOT FULL SCREEN */
    <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-700">
          Create Opportunity
        </h2>

        {onClose && (
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Close
          </button>
        )}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Closing Date
          </label>
          <input
            type="date"
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Amount *
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Stage *
          </label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-gray-400 outline-none"
          >
            <option value="">Select</option>
            <option value="Qualify">Qualify</option>
            <option value="Meet & Present">Meet & Present</option>
            <option value="Propose">Propose</option>
            <option value="Negotiate">Negotiate</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Probability (%) *
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={probability}
            onChange={(e) => setProbability(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Forecast Category *
          </label>
          <select
            value={forecastCategory}
            onChange={(e) => setForecastCategory(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-gray-400 outline-none"
          >
            <option value="">Select</option>
            <option value="Omitted">Omitted</option>
            <option value="Pipeline">Pipeline</option>
            <option value="Best Case">Best Case</option>
            <option value="Commit">Commit</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Next Step
          </label>
          <input
            value={nextStep}
            onChange={(e) => setNextStep(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-gray-400 outline-none"
          />
        </div>

        {msg && (
          <div className="col-span-2 text-center text-sm text-red-600">
            {msg}
          </div>
        )}

        <div className="col-span-2 flex justify-end pt-2">
          <button
            type="submit"
            className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Creating..." : "Create Opportunity"}
          </button>
        </div>
      </form>
    </div>
  );
}