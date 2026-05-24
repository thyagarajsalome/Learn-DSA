import { useState } from "react";
import { ArrowDown, ArrowUp, ToggleLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StackVisualization() {
  const [mode, setMode] = useState<"standard" | "multiple">("standard");
  const [newItem, setNewItem] = useState("");
  const [message, setMessage] = useState("Push elements to see LIFO stack execution.");
  
  // Standard Stack State
  const [stack, setStack] = useState<string[]>(["10", "20"]);

  // Multiple Stacks State
  const MAX_SIZE = 8;
  const [sharedArray, setSharedArray] = useState<(string | null)[]>(
    Array(MAX_SIZE).fill(null)
  );
  const [top1, setTop1] = useState<number>(-1);
  const [top2, setTop2] = useState<number>(MAX_SIZE);

  // Standard Stack push
  const handlePush = () => {
    if (!newItem.trim()) return;
    const val = newItem.trim();
    if (stack.length >= 6) {
      setMessage("Overflow: Stack reached maximum capacity limit of 6!");
      return;
    }
    setStack([...stack, val]);
    setNewItem("");
    setMessage(`Pushed "${val}" onto the stack.`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setMessage("Underflow: Cannot pop from an empty stack!");
      return;
    }
    const popped = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setMessage(`Popped "${popped}" from the stack.`);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setMessage("Stack is empty. Top is NULL.");
      return;
    }
    setMessage(`Top element (at index ${stack.length - 1}) is "${stack[stack.length - 1]}".`);
  };

  // Shared Array (Multiple Stacks) actions
  const handlePushStack1 = () => {
    if (!newItem.trim()) return;
    const val = newItem.trim();
    if (top1 + 1 === top2) {
      setMessage("Overflow: Stack 1 collided with Stack 2! Array is full.");
      return;
    }
    const newIdx = top1 + 1;
    const copy = [...sharedArray];
    copy[newIdx] = val;
    setSharedArray(copy);
    setTop1(newIdx);
    setNewItem("");
    setMessage(`Stack 1: Pushed "${val}" to index ${newIdx}.`);
  };

  const handlePopStack1 = () => {
    if (top1 === -1) {
      setMessage("Underflow: Stack 1 is empty.");
      return;
    }
    const popped = sharedArray[top1];
    const copy = [...sharedArray];
    copy[top1] = null;
    setSharedArray(copy);
    setTop1(top1 - 1);
    setMessage(`Stack 1: Popped "${popped}" from index ${top1}.`);
  };

  const handlePushStack2 = () => {
    if (!newItem.trim()) return;
    const val = newItem.trim();
    if (top1 + 1 === top2) {
      setMessage("Overflow: Stack 2 collided with Stack 1! Array is full.");
      return;
    }
    const newIdx = top2 - 1;
    const copy = [...sharedArray];
    copy[newIdx] = val;
    setSharedArray(copy);
    setTop2(newIdx);
    setNewItem("");
    setMessage(`Stack 2: Pushed "${val}" to index ${newIdx}.`);
  };

  const handlePopStack2 = () => {
    if (top2 === MAX_SIZE) {
      setMessage("Underflow: Stack 2 is empty.");
      return;
    }
    const popped = sharedArray[top2];
    const copy = [...sharedArray];
    copy[top2] = null;
    setSharedArray(copy);
    setTop2(top2 + 1);
    setMessage(`Stack 2: Popped "${popped}" from index ${top2}.`);
  };

  const handleResetMultiple = () => {
    setSharedArray(Array(MAX_SIZE).fill(null));
    setTop1(-1);
    setTop2(MAX_SIZE);
    setMessage("Multiple Stacks reset. Array is clear.");
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <ToggleLeft className="text-purple-650 dark:text-purple-400 h-5.5 w-5.5" /> Stacks (LIFO) & Multiple Stacks
          </h2>
          <p className="text-xs text-slate-555 text-slate-500 dark:text-slate-400">
            A LIFO linear storage structure. Multiple Stacks optimize memory sharing in single static buffers.
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shrink-0">
          <button
            onClick={() => {
              setMode("standard");
              setMessage("Switched to Standard Stack mode.");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
              mode === "standard" ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Standard Stack
          </button>
          <button
            onClick={() => {
              setMode("multiple");
              setMessage("Switched to Multiple Stacks (Shared Array) mode.");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
              mode === "multiple" ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Multiple Stacks
          </button>
        </div>
      </div>

      {/* Visual Arena */}
      <div className="flex-1 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[300px] flex items-center justify-center shadow-sm">
        
        {/* STANDARD STACK VIEW */}
        {mode === "standard" && (
          <div className="flex flex-col items-center">
            {/* Cup open at the top */}
            <div className="w-56 border-b-8 border-x-8 border-slate-400 dark:border-slate-700 bg-white dark:bg-slate-950/60 p-4 rounded-b-2xl flex flex-col-reverse justify-end min-h-[220px] relative shadow-inner">
              <AnimatePresence initial={false}>
                {stack.map((val, idx) => {
                  const isTop = idx === stack.length - 1;
                  return (
                    <motion.div
                      key={idx + "-" + val}
                      initial={{ y: -100, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ x: 100, opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className={`h-12 border-2 rounded-xl flex items-center justify-center relative my-1 bg-white dark:bg-slate-900 ${
                        isTop 
                          ? "border-purple-600 dark:border-purple-500 shadow-sm" 
                          : "border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <span className="absolute left-2.5 text-[9px] text-slate-450 dark:text-slate-550 font-mono font-bold">[{idx}]</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{val}</span>
                      {isTop && (
                        <span className="absolute -right-16 text-[9px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded font-mono font-bold">
                          ← TOP
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {stack.length === 0 && (
                <div className="text-center text-slate-400 dark:text-slate-650 italic text-xs py-16">
                  Stack is empty
                </div>
              )}
            </div>
          </div>
        )}

        {/* MULTIPLE STACKS IN ONE ARRAY VIEW */}
        {mode === "multiple" && (
          <div className="w-full space-y-8">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block text-center">
              Shared Linear Buffer Array Memory [0 to 7]
            </span>

            <div className="flex flex-wrap justify-center items-center gap-3">
              {sharedArray.map((val, idx) => {
                const isStack1Node = idx <= top1 && top1 !== -1;
                const isStack2Node = idx >= top2 && top2 !== MAX_SIZE;
                const isTop1 = idx === top1;
                const isTop2 = idx === top2;

                return (
                  <div key={idx} className="flex flex-col items-center">
                    
                    {/* Headers indicators */}
                    <div className="h-6 flex flex-col justify-end text-[9px] font-bold font-mono">
                      {isTop1 && <span className="text-purple-600 dark:text-purple-450">TOP 1 →</span>}
                      {isTop2 && <span className="text-pink-600 dark:text-pink-450">← TOP 2</span>}
                    </div>

                    <motion.div
                      animate={{
                        borderColor: isTop1 
                          ? "#a855f7" 
                          : isTop2 
                          ? "#ec4899" 
                          : isStack1Node 
                          ? "#d8b4fe" 
                          : isStack2Node 
                          ? "#fbcfe8" 
                          : "transparent"
                      }}
                      className="w-14 h-14 rounded-lg border-2 flex items-center justify-center font-bold text-xs relative bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
                    >
                      <span className="absolute top-1 left-1.5 text-[8px] text-slate-400 dark:text-slate-600 font-mono">[{idx}]</span>
                      <span className="text-slate-800 dark:text-slate-100 mt-2">{val || "nil"}</span>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center gap-8 text-[10px] font-mono text-slate-500 dark:text-slate-400">
              <span className="text-purple-600 dark:text-purple-400 font-bold">Stack 1 (Grow Right): Top1 = {top1}</span>
              <span className="text-pink-600 dark:text-pink-400 font-bold">Stack 2 (Grow Left): Top2 = {top2}</span>
            </div>
          </div>
        )}

      </div>

      {/* Message notification */}
      <div className="p-3 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-855 rounded-xl text-xs text-slate-500 dark:text-slate-400 shadow-sm">
        {message}
      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap gap-4">
        
        {/* Input box */}
        <div className="flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex-1 min-w-[200px] shadow-sm">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Item value (e.g. 55)..."
            className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-purple-500 w-full"
          />
        </div>

        {/* Standard Stack Operations */}
        {mode === "standard" ? (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handlePush}
              className="flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-750 text-white transition-colors shadow-sm"
            >
              <ArrowDown className="h-3.5 w-3.5" /> Push
            </button>
            <button
              onClick={handlePop}
              className="flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-750 text-white transition-colors shadow-sm"
            >
              <ArrowUp className="h-3.5 w-3.5" /> Pop
            </button>
            <button
              onClick={handlePeek}
              className="text-xs font-bold px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
            >
              Peek
            </button>
          </div>
        ) : (
          /* Multiple Stacks Operations */
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={handlePushStack1}
              className="flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-750 text-white transition-colors shadow-sm"
            >
              Push Stack 1
            </button>
            <button
              onClick={handlePopStack1}
              className="flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-xl border border-purple-200 hover:border-purple-300 dark:border-purple-800 text-purple-600 dark:text-purple-400 transition-colors"
            >
              Pop Stack 1
            </button>
            <button
              onClick={handlePushStack2}
              className="flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-750 text-white transition-colors shadow-sm"
            >
              Push Stack 2
            </button>
            <button
              onClick={handlePopStack2}
              className="flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-xl border border-pink-200 hover:border-pink-300 dark:border-pink-850 text-pink-600 dark:text-pink-400 transition-colors"
            >
              Pop Stack 2
            </button>
            <button
              onClick={handleResetMultiple}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 dark:border-slate-700 text-slate-500 dark:text-slate-400 shadow-sm"
            >
              Reset
            </button>
          </div>
        )}

      </div>
      
    </div>
  );
}