"use client";

export default function ProfessionModal({
  open,
  profession,
  setProfession,
  onContinue,
  onCancel,
}) {
  if (!open) return null;

  const professions = ["Student", "Working Professional", "Investor"];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold text-slate-900">
          Complete your profile
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          Please select your profession before continuing with Google.
        </p>

        <div className="mt-6 space-y-3">
          {professions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setProfession(item)}
              className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                profession === item
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 hover:border-emerald-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-300 py-2.5 text-sm font-medium"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!profession}
            onClick={onContinue}
            className="flex-1 rounded-lg bg-emerald-600 text-white py-2.5 text-sm font-medium disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
