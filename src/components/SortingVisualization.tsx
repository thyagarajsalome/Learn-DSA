import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const generateRandomArray = (size = 15) => 
  Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);

const SortingVisualization = () => {
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    setArray(generateRandomArray());
  }, []);

  const resetArray = () => {
    if (isSorting) return;
    setArray(generateRandomArray());
    setSorted([]);
    setComparing([]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;
    let newSorted: number[] = [];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await sleep(100);

        if (arr[j] > arr[j + 1]) {
          // Swap
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await sleep(100);
        }
      }
      newSorted.push(n - 1 - i);
      setSorted([...newSorted]);
    }
    newSorted.push(0); // push the last remaining element
    setSorted([...newSorted]);
    setComparing([]);
    setIsSorting(false);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Bubble Sort Visualization</h2>
      
      <div className="flex gap-3 mb-6">
        <button 
          onClick={bubbleSort} 
          disabled={isSorting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Start Sorting
        </button>
        <button 
          onClick={resetArray} 
          disabled={isSorting}
          className="bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-800 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Generate New Array
        </button>
      </div>

      <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-8 flex items-end justify-center gap-2 min-h-[350px]">
        {array.map((value, idx) => {
          let bgColor = "bg-indigo-400"; // default
          if (comparing.includes(idx)) bgColor = "bg-rose-500"; // comparing
          if (sorted.includes(idx)) bgColor = "bg-emerald-500"; // sorted

          return (
            <motion.div
              key={idx}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`${bgColor} w-10 rounded-t-md flex items-end justify-center pb-2 text-white font-bold text-xs shadow-md`}
              style={{ height: `${value * 2.5}px` }}
            >
              {value}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SortingVisualization;