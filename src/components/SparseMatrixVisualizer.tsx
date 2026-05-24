import { useState } from "react";
import { motion } from "framer-motion";
import { Grid, Sparkles, HelpCircle } from "lucide-react";

export default function SparseMatrixVisualizer() {
  // 4x4 initial grid with mostly zero elements
  const [matrix, setMatrix] = useState<number[][]>([
    [0, 5, 0, 0],
    [0, 0, 0, 8],
    [3, 0, 0, 0],
    [0, 0, 0, 0]
  ]);
  const [hoveredTupleIdx, setHoveredTupleIdx] = useState<{ r: number; c: number } | null>(null);

  // Compute 3-tuple list
  const getSparseTuples = () => {
    const tuples: { r: number; c: number; v: number }[] = [];
    matrix.forEach((rowArr, rIdx) => {
      rowArr.forEach((val, cIdx) => {
        if (val !== 0) {
          tuples.push({ r: rIdx, c: cIdx, v: val });
        }
      });
    });
    return tuples;
  };

  const tuples = getSparseTuples();
  const rowsCount = matrix.length;
  const colsCount = matrix[0].length;
  const nonZeroCount = tuples.length;

  const handleCellChange = (r: number, c: number, newVal: number) => {
    const updated = matrix.map((rowArr, ri) =>
      rowArr.map((val, ci) => (ri === r && ci === c ? Math.max(0, Math.min(99, newVal)) : val))
    );
    setMatrix(updated);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Grid className="text-blue-600 dark:text-blue-400 h-5.5 w-5.5" /> Sparse Matrix Compression
          </h2>
          <p className="text-xs text-slate-555 text-slate-500 dark:text-slate-400">
            A matrix with mostly 0s is represented as a 3-tuple table to save memory. Click on cells to edit values.
          </p>
        </div>
        <button
          onClick={() => setMatrix([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])}
          className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 transition-all self-start md:self-auto"
        >
          Clear Grid
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Interactive Matrix Grid */}
        <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-4">
              2D Standard Matrix Grid
            </span>
            <div className="grid grid-cols-4 gap-3 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-850/60 max-w-sm mx-auto shadow-inner">
              {matrix.map((rowArr, rIdx) =>
                rowArr.map((val, cIdx) => {
                  const isHovered = hoveredTupleIdx?.r === rIdx && hoveredTupleIdx?.c === cIdx;
                  const isNonZero = val !== 0;

                  return (
                    <motion.div
                      key={`${rIdx}-${cIdx}`}
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        borderColor: isHovered
                          ? "#3b82f6" // active border
                          : isNonZero
                          ? "#3b82f6"
                          : "transparent",
                        backgroundColor: isHovered
                          ? "rgba(59, 130, 246, 0.15)"
                          : isNonZero
                          ? "rgba(59, 130, 246, 0.08)"
                          : "rgba(241, 245, 249, 0.5)"
                      }}
                      className="aspect-square rounded-lg border-2 flex flex-col items-center justify-center p-1 relative group cursor-pointer transition-all duration-150 bg-slate-100 dark:bg-slate-900"
                    >
                      <span className="absolute top-1 left-1.5 text-[8px] text-slate-400 dark:text-slate-600 font-mono">
                        {rIdx},{cIdx}
                      </span>
                      
                      {/* Input field to edit cell value */}
                      <input
                        type="number"
                        value={val === 0 ? "" : val}
                        onChange={(e) => {
                          const parsed = parseInt(e.target.value);
                          handleCellChange(rIdx, cIdx, isNaN(parsed) ? 0 : parsed);
                        }}
                        placeholder="0"
                        className="w-full text-center bg-transparent border-none text-base font-bold text-slate-800 dark:text-slate-100 outline-none focus:ring-0 placeholder-slate-350 dark:placeholder-slate-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />

                      {/* Small action pad on cell focus */}
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 flex gap-0.5 bg-white dark:bg-slate-800 rounded shadow border border-slate-200 dark:border-slate-700 px-1 py-0.2 transition-opacity z-10 pointer-events-none">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCellChange(rIdx, cIdx, val + 1);
                          }}
                          className="text-[9px] font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 pointer-events-auto"
                        >
                          +
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCellChange(rIdx, cIdx, val - 1);
                          }}
                          className="text-[9px] font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 pointer-events-auto"
                        >
                          -
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-850/60 text-xs text-slate-500 dark:text-slate-400 space-y-2 shadow-sm">
            <div className="flex items-start gap-2">
              <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">How to use:</p>
                <p>Click on any box and enter a number (1-99). The 3-tuple table will instantly add rows to map coordinates. Set a cell to 0 to remove it.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Tuple Table representation */}
        <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                Compressed 3-Tuple Table
              </span>
              <span className="text-[9px] bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Row 0 holds size metadata
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <th className="py-2.5 px-4 font-mono">Row Index</th>
                    <th className="py-2.5 px-4">Row (r)</th>
                    <th className="py-2.5 px-4">Column (c)</th>
                    <th className="py-2.5 px-4">Value (v)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-xs font-mono">
                  {/* Row 0 Metadata row */}
                  <tr className="bg-blue-500/5 text-blue-800 dark:text-blue-200 border-l-2 border-blue-500">
                    <td className="py-2.5 px-4 font-bold">0 (Header)</td>
                    <td className="py-2.5 px-4 font-bold text-blue-600 dark:text-blue-400">{rowsCount} <span className="text-[9px] text-slate-400 block font-sans">(Total Rows)</span></td>
                    <td className="py-2.5 px-4 font-bold text-blue-600 dark:text-blue-400">{colsCount} <span className="text-[9px] text-slate-400 block font-sans">(Total Cols)</span></td>
                    <td className="py-2.5 px-4 font-bold text-blue-600 dark:text-blue-400">{nonZeroCount} <span className="text-[9px] text-slate-400 block font-sans">(Non-Zero)</span></td>
                  </tr>

                  {/* Tuples rows */}
                  {tuples.map((t, idx) => (
                    <tr
                      key={idx}
                      onMouseEnter={() => setHoveredTupleIdx({ r: t.r, c: t.c })}
                      onMouseLeave={() => setHoveredTupleIdx(null)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-350 transition-colors"
                    >
                      <td className="py-2.5 px-4 text-slate-400 dark:text-slate-650 font-bold">{idx + 1}</td>
                      <td className="py-2.5 px-4">{t.r}</td>
                      <td className="py-2.5 px-4">{t.c}</td>
                      <td className="py-2.5 px-4 font-bold text-blue-600 dark:text-blue-400">{t.v}</td>
                    </tr>
                  ))}

                  {tuples.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400 dark:text-slate-600 italic">
                        No non-zero elements. Click cells to populate!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-6 text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/30 p-3 rounded-lg border border-slate-200 dark:border-slate-800/60 font-mono">
            <span className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Savings Calculation:</span>
            Uncompressed: {rowsCount * colsCount} integers. Compressed (3-tuple): {(tuples.length + 1) * 3} integers.
          </div>
        </div>

      </div>
    </div>
  );
}
