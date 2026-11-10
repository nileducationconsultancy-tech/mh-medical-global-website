import React from "react";
import { Link } from "react-router-dom";
import { Scale, X, ArrowRight } from "lucide-react";
import { universitiesData } from "../../data/universitiesData";

export function CompareDrawer({ selectedIds = [], onRemove, onClear }) {
  if (!selectedIds || selectedIds.length === 0) return null;

  const selectedUnis = selectedIds.map((id) =>
    universitiesData.find((u) => u.id === id)
  ).filter(Boolean);

  const compareUrl = `/compare-universities?unis=${selectedIds.join(",")}`;

  return (
    <aside aria-label="Selected universities comparison drawer" className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl font-sans">
      <div className="bg-[#041B44] text-white p-4 sm:p-5 rounded-3xl border-2 border-[#9ABAD9]/40 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-6 duration-200">
        {/* Left Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#063280] border border-[#9ABAD9]/30 flex items-center justify-center text-[#9ABAD9] shrink-0">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-extrabold text-sm text-white flex items-center gap-2">
              <span>Compare Universities ({selectedUnis.length}/3)</span>
            </p>
            <p className="text-[11px] text-slate-300 hidden sm:block">
              Select up to 3 medical academies for side-by-side fee and hospital bed comparison.
            </p>
          </div>
        </div>

        {/* Selected University Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedUnis.map((uni) => (
            <div
              key={uni.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white shadow-xs"
            >
              <span className="truncate max-w-[120px]">{uni.name.split(" ")[0]}</span>
              <button
                onClick={() => onRemove(uni.id)}
                className="hover:text-rose-300 p-0.5 rounded-full cursor-pointer"
                title={`Remove ${uni.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClear}
            className="text-[11px] font-bold text-slate-300 hover:text-white px-2 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            Clear All
          </button>

          <Link
            to={compareUrl}
            className="px-5 py-2.5 bg-[#9B193A] hover:bg-[#7E142F] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default CompareDrawer;
