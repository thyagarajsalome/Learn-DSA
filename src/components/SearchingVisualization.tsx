import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Play, RefreshCw } from "lucide-react";

export default function SearchingVisualization() {
  const [array] = useState([5, 8, 12, 16, 23, 38, 56, 72, 85, 91]);
  const [target, setTarget] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState("Enter a target number and click Search to run side-by-side simulations.");

  // Linear search tracker states
  const [linearIdx, setLinearIdx] = useState<number | null>(null);
  const [linearComparisons, setLinearComparisons] = useState(0);
  const [linearFound, setLinearFound] = useState<boolean | null>(null);

  // Binary search tracker states
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [mid, setMid] = useState<number | null>(null);
  const [binaryComparisons, setBinaryComparisons] = useState(0);
  const [binaryFound, setBinaryFound] = useState<boolean | null>(null);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleReset = () => {
    setIsSearching(false);
    setTarget("");
    setLinearIdx(null);
    setLinearComparisons(0);
    setLinearFound(null);

    setLeft(null);
    setRight(null);
    setMid(null);
    setBinaryComparisons(0);
    setBinaryFound(null);
    setMessage("Simulators reset. Ready.");
  };

  const runDualSearch = async () => {
    if (!target) return;
    const searchTarget = parseInt(target);
    if (isNaN(searchTarget)) return;

    setIsSearching(true);
    setLinearIdx(null);
    setLinearComparisons(0);
    setLinearFound(null);

    setLeft(null);
    setRight(null);
    setMid(null);
    setBinaryComparisons(0);
    setBinaryFound(null);
    
    setMessage(`Searching for target ${searchTarget} in both lists...`);
    await sleep(600);

    // Initial search pointers
    let lLinear = 0;
    let lBin = 0;
    let rBin = array.length - 1;
    
    let linearDone = false;
    let binaryDone = false;

    let linearCompareCount = 0;
    let binaryCompareCount = 0;

    while (!linearDone || !binaryDone) {
      // Step 1: Linear search cycle
      if (!linearDone) {
        setLinearIdx(lLinear);
        linearCompareCount++;
        setLinearComparisons(linearCompareCount);

        if (array[lLinear] === searchTarget) {
          setLinearFound(true);
          linearDone = true;
        } else {
          lLinear++;
          if (lLinear >= array.length) {
            setLinearFound(false);
            linearDone = true;
          }
        }
      }

      // Step 2: Binary search cycle
      if (!binaryDone) {
        setLeft(lBin);
        setRight(rBin);
        const mBin = Math.floor((lBin + rBin) / 2);
        setMid(mBin);
        binaryCompareCount++;
        setBinaryComparisons(binaryCompareCount);

        if (array[mBin] === searchTarget) {
          setBinaryFound(true);
          binaryDone = true;
        } else {
          if (lBin > rBin) {
            setBinaryFound(false);
            binaryDone = true;
          } else if (array[mBin] < searchTarget) {
            lBin = mBin + 1;
          } else {
            rBin = mBin - 1;
          }
        }
      }

      await sleep(1000);
    }

    setIsSearching(false);
    setMessage(
      `Search complete! Linear Search took ${linearCompareCount} comparisons. Binary Search took only ${binaryCompareCount} comparisons.`
    );
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Search className="text-blue-600 dark:text-blue-400 h-5.5 w-5.5 animate-pulse" /> Linear vs Binary Search
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare O(N) sequential scans with O(log N) divide-and-conquer searches side-by-side.
          </p>
        </div>
      </div>

      {/* Control panel */}
      <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex gap-3 items-center shadow-sm">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter target (e.g. 56)..."
          className="bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 w-44"
          disabled={isSearching}
        />
        <button
          onClick={runDualSearch}
          disabled={isSearching || !target}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-850 text-white text-xs font-bold rounded-lg transition-colors"
        >
          <Play className="h-3.5 w-3.5" /> Start Search
        </button>
        <button
          onClick={handleReset}
          disabled={isSearching}
          className="flex items-center gap-1 px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs rounded-lg transition-all"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* Message Box */}
      <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-400 font-medium shadow-sm">
        {message}
      </div>

      {/* Dual Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LINEAR SEARCH SIDE */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between min-h-[220px] shadow-sm">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Linear Search (Unsorted/Sorted)
              </span>
              <div className="flex gap-3 text-xs font-bold font-mono">
                <span className="text-slate-500 dark:text-slate-400">Time: O(N)</span>
                <span className="text-blue-600 dark:text-blue-400">Comparisons: {linearComparisons}</span>
              </div>
            </div>

            {/* Array render */}
            <div className="flex flex-wrap gap-2 py-4 justify-center">
              {array.map((val, idx) => {
                const isActive = linearIdx === idx;
                const isMatch = linearFound && linearIdx === idx;
                const isChecked = linearIdx !== null && idx < linearIdx;

                let border = "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-800 dark:text-slate-200";
                if (isActive) border = "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-800 dark:text-yellow-400 animate-pulse";
                if (isMatch) border = "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
                if (isChecked) border = "border-slate-100 dark:border-slate-900 bg-slate-100 dark:bg-slate-900/10 text-slate-400 dark:text-slate-600";

                return (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[8px] text-slate-500 font-mono">[{idx}]</span>
                    <motion.div
                      animate={{ scale: isActive ? 1.05 : 1 }}
                      className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${border}`}
                    >
                      {val}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 text-center font-medium mt-4">
            {linearFound === true && <span className="text-emerald-600 dark:text-emerald-400 font-bold">Target found!</span>}
            {linearFound === false && <span className="text-red-600 dark:text-red-400 font-bold">Target not found.</span>}
            {linearFound === null && <span>Awaiting execution...</span>}
          </div>
        </div>

        {/* BINARY SEARCH SIDE */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between min-h-[220px] shadow-sm">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Binary Search (Must Be Sorted)
              </span>
              <div className="flex gap-3 text-xs font-bold font-mono">
                <span className="text-slate-500 dark:text-slate-400">Time: O(log N)</span>
                <span className="text-purple-600 dark:text-purple-400">Comparisons: {binaryComparisons}</span>
              </div>
            </div>

            {/* Array render */}
            <div className="flex flex-wrap gap-2 py-4 justify-center">
              {array.map((val, idx) => {
                const isMid = mid === idx;
                const isL = left === idx;
                const isR = right === idx;
                const isMatch = binaryFound && mid === idx;
                const outOfBounds = (left !== null && idx < left) || (right !== null && idx > right);

                let border = "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-800 dark:text-slate-200";
                if (isMid) border = "border-purple-500 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300";
                if (isMatch) border = "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
                if (outOfBounds) border = "border-slate-100 dark:border-slate-950/10 bg-slate-100/50 dark:bg-slate-950/10 text-slate-300 dark:text-slate-700";

                return (
                  <div key={idx} className="flex flex-col items-center">
                    {/* Header Pointers pointers */}
                    <div className="h-4 flex text-[8px] font-bold font-mono">
                      {isL && <span className="text-purple-600 dark:text-purple-400">L</span>}
                      {isMid && <span className="text-pink-600 dark:text-pink-400 mx-0.5">M</span>}
                      {isR && <span className="text-red-600 dark:text-red-400">R</span>}
                    </div>
                    <motion.div
                      animate={{ scale: isMid ? 1.05 : 1 }}
                      className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${border}`}
                    >
                      {val}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 text-center font-medium mt-4">
            {binaryFound === true && <span className="text-emerald-600 dark:text-emerald-400 font-bold">Target found!</span>}
            {binaryFound === false && <span className="text-red-600 dark:text-red-400 font-bold">Target not found.</span>}
            {binaryFound === null && <span>Awaiting execution...</span>}
          </div>
        </div>

      </div>

    </div>
  );
}