import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ShieldAlert } from "lucide-react";

export default function ArrayVisualizer() {
  const [array, setArray] = useState<string[]>(["A", "B", "C"]);
  const [capacity, setCapacity] = useState<number>(4);
  const [valueInput, setValueInput] = useState<string>("");
  const [indexInput, setIndexInput] = useState<string>("");
  const [message, setMessage] = useState<string>("Push items to see dynamic array resizing.");

  const checkResize = (newSize: number) => {
    if (newSize > capacity) {
      const doubleCap = capacity * 2;
      setCapacity(doubleCap);
      setMessage(`Capacity doubled from ${capacity} to ${doubleCap} (Resizing copies elements to a new array!).`);
      return true;
    }
    return false;
  };

  const handlePush = () => {
    if (!valueInput.trim()) return;
    const item = valueInput.trim();
    checkResize(array.length + 1);
    setArray([...array, item]);
    setValueInput("");
  };

  const handlePop = () => {
    if (array.length === 0) {
      setMessage("Underflow: Array is already empty!");
      return;
    }
    const popped = array[array.length - 1];
    setArray(array.slice(0, -1));
    setMessage(`Popped "${popped}" from index ${array.length - 1}.`);
  };

  const handleInsertAtIndex = () => {
    if (!valueInput.trim()) return;
    const idx = parseInt(indexInput);
    if (isNaN(idx) || idx < 0 || idx > array.length) {
      setMessage(`Index must be between 0 and ${array.length}`);
      return;
    }
    const val = valueInput.trim();
    checkResize(array.length + 1);
    
    const copy = [...array];
    copy.splice(idx, 0, val);
    setArray(copy);
    setMessage(`Inserted "${val}" at index ${idx}. Elements shifted right.`);
    setValueInput("");
    setIndexInput("");
  };

  const handleDeleteAtIndex = () => {
    const idx = parseInt(indexInput);
    if (isNaN(idx) || idx < 0 || idx >= array.length) {
      setMessage(`Index must be between 0 and ${array.length - 1}`);
      return;
    }
    const removed = array[idx];
    const copy = [...array];
    copy.splice(idx, 1);
    setArray(copy);
    setMessage(`Deleted "${removed}" at index ${idx}. Elements shifted left.`);
    setIndexInput("");
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Interactive Array Workspace</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Visualize contiguous allocation, shifting, and automatic capacity expansion.
        </p>
      </div>

      {/* Dynamic Memory Grid */}
      <div className="flex-1 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[220px] flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              RAM Memory Blocks
            </span>
            <div className="flex gap-4 text-xs font-bold font-mono text-slate-600 dark:text-slate-400">
              <span>Size: {array.length}</span>
              <span>Capacity: {capacity}</span>
            </div>
          </div>

          {/* Slots wrapper */}
          <div className="flex items-center overflow-x-auto py-6 gap-3">
            <AnimatePresence initial={false}>
              {Array.from({ length: capacity }).map((_, idx) => {
                const item = array[idx];
                const isOccupied = idx < array.length;

                return (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center relative shrink-0 transition-colors bg-white dark:bg-slate-900 ${
                      isOccupied
                        ? "border-blue-600 dark:border-blue-500 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 border-dashed"
                    }`}
                  >
                    <span className="absolute -top-6 text-[9px] text-slate-400 dark:text-slate-655 font-mono font-bold">
                      [{idx}]
                    </span>
                    {isOccupied ? (
                      <span className="font-bold text-slate-800 dark:text-slate-100 text-base">{item}</span>
                    ) : (
                      <span className="text-slate-300 dark:text-slate-700 font-bold font-mono text-xs select-none">NIL</span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Message board */}
        <div className="mt-4 p-3 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-855 rounded-xl text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 shadow-sm">
          <ShieldAlert className="h-4 w-4 text-blue-600 dark:text-blue-450 shrink-0" />
          <span>{message}</span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Basic actions */}
        <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-3 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
            End Array Actions
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              placeholder="Element value..."
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              onClick={handlePush}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-750 text-white transition-colors shrink-0 shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" /> Push
            </button>
            <button
              onClick={handlePop}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-750 text-white transition-colors shrink-0 shadow-sm"
            >
              <Trash2 className="h-3.5 w-3.5" /> Pop
            </button>
          </div>
        </div>

        {/* Index specific actions */}
        <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-3 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
            Index Insert & Delete
          </span>
          <div className="flex gap-2">
            <input
              type="number"
              value={indexInput}
              onChange={(e) => setIndexInput(e.target.value)}
              placeholder="Idx"
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-purple-500 w-16 text-center"
            />
            <button
              onClick={handleInsertAtIndex}
              disabled={!valueInput.trim() || !indexInput}
              className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-750 disabled:bg-slate-100 dark:disabled:bg-slate-850 disabled:text-slate-400 dark:disabled:text-slate-600 text-white transition-colors w-full shadow-sm"
            >
              Insert At Idx
            </button>
            <button
              onClick={handleDeleteAtIndex}
              disabled={!indexInput}
              className="text-xs font-bold px-3.5 py-1.5 rounded-lg border border-purple-200 hover:border-purple-300 dark:border-purple-800 text-purple-600 dark:text-purple-400 disabled:border-slate-200 dark:disabled:border-slate-850 disabled:text-slate-400 dark:disabled:text-slate-650 transition-colors w-full"
            >
              Delete At Idx
            </button>
          </div>
        </div>

      </div>

      {/* Complexity tracker */}
      <div className="text-[10px] text-slate-400 dark:text-slate-550 border-t border-slate-200 dark:border-slate-800/80 pt-3 flex flex-wrap justify-between font-mono gap-2">
        <span>Push / Pop (at end): O(1) avg / O(N) resize</span>
        <span>Insert / Delete (at index): O(N) due to shifts</span>
      </div>
    </div>
  );
}