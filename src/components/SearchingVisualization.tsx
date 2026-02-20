import { useState } from "react";
import { motion } from "framer-motion";

const SearchingVisualization = () => {
  // Pre-sorted array for binary search
  const [array] = useState([2, 5, 8, 12, 16, 23, 38, 56, 72, 91]);
  const [target, setTarget] = useState("");
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [mid, setMid] = useState<number | null>(null);
  const [foundIdx, setFoundIdx] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const binarySearch = async () => {
    if (!target) return;
    setIsSearching(true);
    setMessage("Starting binary search...");
    setFoundIdx(null);
    
    let l = 0;
    let r = array.length - 1;
    const searchTarget = parseInt(target);

    while (l <= r) {
      setLeft(l);
      setRight(r);
      await sleep(800);

      let m = Math.floor((l + r) / 2);
      setMid(m);
      setMessage(`Checking middle element: ${array[m]} at index [${m}]`);
      await sleep(1000);

      if (array[m] === searchTarget) {
        setFoundIdx(m);
        setMessage(`Found target ${searchTarget} at index [${m}]!`);
        setIsSearching(false);
        return;
      }

      if (array[m] < searchTarget) {
        setMessage(`${array[m]} is less than ${searchTarget}. Moving Left pointer to ${m + 1}`);
        l = m + 1;
      } else {
        setMessage(`${array[m]} is greater than ${searchTarget}. Moving Right pointer to ${m - 1}`);
        r = m - 1;
      }
      await sleep(800);
    }

    setMessage(`Target ${searchTarget} not found in array.`);
    setLeft(null);
    setRight(null);
    setMid(null);
    setIsSearching(false);
  };

  const reset = () => {
    setLeft(null);
    setRight(null);
    setMid(null);
    setFoundIdx(null);
    setMessage("");
    setTarget("");
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Binary Search Visualization</h2>
      
      <div className="flex gap-3 mb-4">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target value..."
          className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none w-32"
          disabled={isSearching}
        />
        <button 
          onClick={binarySearch} 
          disabled={isSearching || !target}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Search
        </button>
        <button 
          onClick={reset} 
          disabled={isSearching}
          className="bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-800 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      {message && (
        <div className="mb-6 p-3 bg-slate-100 border-l-4 border-emerald-500 text-slate-700 rounded-r-md font-medium min-h-[50px]">
          {message}
        </div>
      )}

      <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-8 flex items-center justify-center min-h-[250px] overflow-x-auto">
        <div className="flex gap-2">
          {array.map((val, idx) => {
            let isLeft = left === idx;
            let isRight = right === idx;
            let isMid = mid === idx;
            let isFound = foundIdx === idx;
            let outOfBounds = (left !== null && idx < left) || (right !== null && idx > right);

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                {/* Pointer Indicators */}
                <div className="h-6 flex flex-col justify-end text-xs font-bold space-y-1">
                  {isMid && <span className="text-amber-500">MID</span>}
                  {isLeft && <span className="text-blue-500">L →</span>}
                  {isRight && <span className="text-rose-500">← R</span>}
                </div>
                
                {/* Array Block */}
                <motion.div
                  animate={{ 
                    scale: isMid ? 1.1 : 1, 
                    opacity: outOfBounds ? 0.3 : 1 
                  }}
                  className={`w-14 h-14 rounded-lg flex items-center justify-center font-bold text-lg border-2 shadow-sm transition-colors ${
                    isFound ? "bg-emerald-500 border-emerald-600 text-white shadow-emerald-200 shadow-lg" : 
                    isMid ? "bg-amber-100 border-amber-400 text-amber-900" :
                    "bg-white border-slate-300 text-slate-800"
                  }`}
                >
                  {val}
                </motion.div>
                
                {/* Index label */}
                <span className="text-xs text-slate-400">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchingVisualization;