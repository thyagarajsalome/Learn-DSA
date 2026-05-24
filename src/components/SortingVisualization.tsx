import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RefreshCw, BarChart2 } from "lucide-react";

export default function SortingVisualization() {
  const [algorithm, setAlgorithm] = useState<"bubble" | "selection" | "insertion" | "quick" | "merge">("bubble");
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(12);
  const [delay, setDelay] = useState(150); // ms delay
  
  // Highlight indices
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [statusLog, setStatusLog] = useState<string>("Click Start to begin sorting the array.");
  
  // To abort animations if reset is clicked
  const isSortingRef = useRef(false);

  const generateRandomArray = (size: number) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 15);
  };

  const handleReset = () => {
    isSortingRef.current = false;
    setIsSorting(false);
    setArray(generateRandomArray(arraySize));
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setStatusLog("New random array generated.");
  };

  useEffect(() => {
    handleReset();
  }, [arraySize]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Bubble Sort
  const bubbleSort = async () => {
    let arr = [...array];
    let n = arr.length;
    let tempSorted: number[] = [];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSortingRef.current) return;
        setComparing([j, j + 1]);
        setStatusLog(`Comparing values at index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]})`);
        await sleep(delay);

        if (arr[j] > arr[j + 1]) {
          setStatusLog(`Swap required: ${arr[j]} > ${arr[j + 1]}. Swapping elements.`);
          setSwapping([j, j + 1]);
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await sleep(delay);
          setSwapping([]);
        }
      }
      tempSorted.push(n - 1 - i);
      setSorted([...tempSorted]);
    }
    tempSorted.push(0);
    setSorted([...tempSorted]);
    setComparing([]);
  };

  // Selection Sort
  const selectionSort = async () => {
    let arr = [...array];
    let n = arr.length;
    let tempSorted: number[] = [];

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      setStatusLog(`Outer loop: Setting minimum candidate at index ${i} (${arr[i]})`);
      
      for (let j = i + 1; j < n; j++) {
        if (!isSortingRef.current) return;
        setComparing([minIdx, j]);
        await sleep(delay);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setStatusLog(`New minimum found: Value ${arr[j]} at index ${j}`);
          await sleep(delay);
        }
      }

      if (minIdx !== i) {
        setStatusLog(`Swapping min value ${arr[minIdx]} with slot index ${i} (${arr[i]})`);
        setSwapping([i, minIdx]);
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        setArray([...arr]);
        await sleep(delay);
        setSwapping([]);
      }

      tempSorted.push(i);
      setSorted([...tempSorted]);
    }
    setComparing([]);
  };

  // Insertion Sort
  const insertionSort = async () => {
    let arr = [...array];
    let n = arr.length;
    let tempSorted: number[] = [0];
    setSorted([...tempSorted]);

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      setStatusLog(`Picking key element ${key} at index ${i}`);
      setComparing([i]);
      await sleep(delay);

      while (j >= 0 && arr[j] > key) {
        if (!isSortingRef.current) return;
        setComparing([j, j + 1]);
        setStatusLog(`Shifting element ${arr[j]} right because it's greater than key ${key}`);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        await sleep(delay);
        j--;
      }

      arr[j + 1] = key;
      setArray([...arr]);
      setStatusLog(`Placed key ${key} into position index ${j + 1}`);
      
      // Update sorted array trackers
      const newSorted = [];
      for (let k = 0; k <= i; k++) newSorted.push(k);
      setSorted(newSorted);
      
      await sleep(delay);
    }
    setComparing([]);
  };

  // Quick Sort (Lomuto Partition)
  const quickSort = async () => {
    let arr = [...array];
    
    const partition = async (low: number, high: number): Promise<number> => {
      let pivot = arr[high];
      setStatusLog(`Selected Pivot element = ${pivot} at index ${high}`);
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (!isSortingRef.current) return -1;
        setComparing([j, high]);
        await sleep(delay);

        if (arr[j] < pivot) {
          i++;
          setStatusLog(`Element ${arr[j]} < Pivot ${pivot}. Swapping to left partition.`);
          setSwapping([i, j]);
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setArray([...arr]);
          await sleep(delay);
          setSwapping([]);
        }
      }

      setStatusLog(`Placing pivot ${pivot} into its correct middle position index ${i + 1}`);
      setSwapping([i + 1, high]);
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      setArray([...arr]);
      await sleep(delay);
      setSwapping([]);
      return i + 1;
    };

    const runQuick = async (low: number, high: number) => {
      if (low < high) {
        const pi = await partition(low, high);
        if (pi === -1) return;
        
        // Pivot sorted
        setSorted(prev => [...prev, pi]);
        
        await runQuick(low, pi - 1);
        await runQuick(pi + 1, high);
      } else if (low === high) {
        setSorted(prev => [...prev, low]);
      }
    };

    await runQuick(0, arr.length - 1);
    
    // Set all sorted
    const all = Array.from({ length: arr.length }, (_, k) => k);
    setSorted(all);
    setComparing([]);
  };

  // Merge Sort simulation
  const mergeSort = async () => {
    let arr = [...array];

    const merge = async (l: number, m: number, r: number) => {
      let n1 = m - l + 1;
      let n2 = r - m;
      let L = arr.slice(l, m + 1);
      let R = arr.slice(m + 1, r + 1);

      let i = 0, j = 0, k = l;
      setStatusLog(`Merging segments: Left [${L.join(",")}] and Right [${R.join(",")}]`);

      while (i < n1 && j < n2) {
        if (!isSortingRef.current) return;
        setComparing([l + i, m + 1 + j]);
        await sleep(delay);

        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        setArray([...arr]);
        k++;
        await sleep(delay);
      }

      while (i < n1) {
        if (!isSortingRef.current) return;
        arr[k] = L[i];
        setArray([...arr]);
        i++;
        k++;
        await sleep(delay);
      }

      while (j < n2) {
        if (!isSortingRef.current) return;
        arr[k] = R[j];
        setArray([...arr]);
        j++;
        k++;
        await sleep(delay);
      }
    };

    const runMerge = async (l: number, r: number) => {
      if (l < r) {
        let m = Math.floor((l + r) / 2);
        await runMerge(l, m);
        await runMerge(m + 1, r);
        await merge(l, m, r);
      }
    };

    await runMerge(0, arr.length - 1);
    
    // Set all sorted
    const all = Array.from({ length: arr.length }, (_, k) => k);
    setSorted(all);
    setComparing([]);
  };

  const handleStartSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    isSortingRef.current = true;
    setSorted([]);

    if (algorithm === "bubble") await bubbleSort();
    else if (algorithm === "selection") await selectionSort();
    else if (algorithm === "insertion") await insertionSort();
    else if (algorithm === "quick") await quickSort();
    else if (algorithm === "merge") await mergeSort();

    setIsSorting(false);
    isSortingRef.current = false;
    setComparing([]);
    setSwapping([]);
    setStatusLog(`Array sorted using ${algorithm.toUpperCase()}!`);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <BarChart2 className="text-blue-600 dark:text-blue-400 h-5.5 w-5.5 animate-pulse" /> Sorting Visualizer Arena
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare partitioning, pivoting, and swapping behaviors across multiple algorithms.
          </p>
        </div>

        {/* Algorithm Switcher */}
        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 gap-1 shrink-0">
          {["bubble", "selection", "insertion", "quick", "merge"].map((algo) => (
            <button
              key={algo}
              disabled={isSorting}
              onClick={() => setAlgorithm(algo as any)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider disabled:opacity-50 transition-all ${
                algorithm === algo ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {algo}
            </button>
          ))}
        </div>
      </div>

      {/* Adjusters Toolbar */}
      <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-850 text-xs text-slate-550 text-slate-500 dark:text-slate-400">
            <span>Size:</span>
            <input
              type="range"
              min={6}
              max={24}
              value={arraySize}
              disabled={isSorting}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              className="accent-blue-600 cursor-pointer w-20"
            />
            <span className="text-blue-600 dark:text-blue-400 font-bold w-4">{arraySize}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-850 text-xs text-slate-550 text-slate-500 dark:text-slate-400">
            <span>Delay:</span>
            <input
              type="range"
              min={20}
              max={1500}
              step={20}
              value={delay}
              onChange={(e) => setDelay(parseInt(e.target.value))}
              className="accent-blue-600 cursor-pointer w-20"
            />
            <span className="text-blue-600 dark:text-blue-400 font-bold w-12 text-right">{delay}ms</span>
          </div>
        </div>

        <div className="flex gap-2">
          {!isSorting ? (
            <button
              onClick={handleStartSort}
              className="flex items-center gap-1 text-xs font-bold px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-sm"
            >
              <Play className="h-3.5 w-3.5" /> Start Sorting
            </button>
          ) : (
            <button
              onClick={() => {
                isSortingRef.current = false;
                setIsSorting(false);
                setStatusLog("Sorting aborted.");
              }}
              className="flex items-center gap-1 text-xs font-bold px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
            >
              <Pause className="h-3.5 w-3.5" /> Stop
            </button>
          )}

          <button
            onClick={handleReset}
            disabled={isSorting}
            className="flex items-center gap-1 text-xs font-bold px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 rounded-lg transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Generate Array
          </button>
        </div>
      </div>

      {/* Info Status Board */}
      <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-400 font-medium shadow-sm">
        {statusLog}
      </div>

      {/* Bars Chart View */}
      <div className="flex-1 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex items-end justify-center gap-2 min-h-[300px] overflow-x-auto shadow-inner">
        {array.map((value, idx) => {
          const isComparing = comparing.includes(idx);
          const isSwapping = swapping.includes(idx);
          const isSorted = sorted.includes(idx);

          let barColor = "from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 border-blue-500/20"; // default
          if (isComparing) barColor = "from-yellow-600 to-yellow-400 dark:from-yellow-500 dark:to-yellow-300 border-yellow-500/50 shadow-md shadow-yellow-500/20";
          if (isSwapping) barColor = "from-red-600 to-red-400 dark:from-red-500 dark:to-red-300 border-red-500/50 shadow-md shadow-red-500/20";
          if (isSorted) barColor = "from-emerald-600 to-emerald-400 dark:from-emerald-500 dark:to-emerald-300 border-emerald-500/30";

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 select-none shrink-0 w-8 md:w-10">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold">{value}</span>
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`bg-gradient-to-t ${barColor} w-full rounded-t-lg border shadow-inner flex items-end justify-center`}
                style={{ height: `${value * 2.2}px` }}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
}