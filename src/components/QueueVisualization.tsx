import { useState } from "react";
import { ToggleRight, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QueueVisualization() {
  const [type, setType] = useState<"linear" | "circular" | "dequeue">("linear");
  const [newItem, setNewItem] = useState("");
  const [message, setMessage] = useState("Enqueue elements to trace FIFO queue operations.");

  // Linear / Dequeue State
  const [queue, setQueue] = useState<string[]>(["10", "20"]);

  // Circular Queue State (Fixed size: 6)
  const CIRCULAR_SIZE = 6;
  const [circularQueue, setCircularQueue] = useState<(string | null)[]>(
    ["A", "B", null, null, null, null]
  );
  const [front, setFront] = useState<number>(0);
  const [rear, setRear] = useState<number>(1);

  // Linear actions
  const handleEnqueue = () => {
    if (!newItem.trim()) return;
    const val = newItem.trim();
    if (queue.length >= 6) {
      setMessage("Overflow: Queue is full! (Max limit is 6 nodes)");
      return;
    }
    setQueue([...queue, val]);
    setNewItem("");
    setMessage(`Enqueued "${val}" to the rear.`);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setMessage("Underflow: Queue is empty!");
      return;
    }
    const dequeued = queue[0];
    setQueue(queue.slice(1));
    setMessage(`Dequeued "${dequeued}" from the front.`);
  };

  // Dequeue actions
  const handleEnqueueFront = () => {
    if (!newItem.trim()) return;
    const val = newItem.trim();
    if (queue.length >= 6) {
      setMessage("Overflow: Dequeue is full!");
      return;
    }
    setQueue([val, ...queue]);
    setNewItem("");
    setMessage(`Dequeue Front: Enqueued "${val}" at Front.`);
  };

  const handleDequeueRear = () => {
    if (queue.length === 0) {
      setMessage("Underflow: Dequeue is empty!");
      return;
    }
    const popped = queue[queue.length - 1];
    setQueue(queue.slice(0, -1));
    setMessage(`Dequeue Rear: Dequeued "${popped}" from Rear.`);
  };

  // Circular Queue actions
  const handleCircularEnqueue = () => {
    if (!newItem.trim()) return;
    const val = newItem.trim();

    if ((rear + 1) % CIRCULAR_SIZE === front) {
      setMessage("Overflow: Circular Queue is FULL! (rear + 1) % SIZE == front");
      return;
    }

    const nextRear = (rear + 1) % CIRCULAR_SIZE;
    const copy = [...circularQueue];
    copy[nextRear] = val;
    setCircularQueue(copy);
    setRear(nextRear);

    if (front === -1) {
      setFront(0);
    }

    setNewItem("");
    setMessage(`Circular Enqueue: Enqueued "${val}" at index ${nextRear}. rear index updated.`);
  };

  const handleCircularDequeue = () => {
    const isEmpty = circularQueue.every(item => item === null);
    if (isEmpty) {
      setMessage("Underflow: Circular Queue is empty!");
      return;
    }

    const val = circularQueue[front];
    const copy = [...circularQueue];
    copy[front] = null;
    setCircularQueue(copy);

    if (front === rear) {
      setFront(-1);
      setRear(-1);
      setMessage(`Circular Dequeue: Dequeued "${val}". Queue is now empty.`);
    } else {
      const nextFront = (front + 1) % CIRCULAR_SIZE;
      setFront(nextFront);
      setMessage(`Circular Dequeue: Dequeued "${val}" from index ${front}. front index updated.`);
    }
  };

  const handleResetCircular = () => {
    setCircularQueue(Array(CIRCULAR_SIZE).fill(null));
    setFront(-1);
    setRear(-1);
    setMessage("Circular queue cleared.");
  };

  const getRingCoordinates = (idx: number) => {
    const angle = (idx * 360) / CIRCULAR_SIZE;
    const radius = 90;
    const x = 125 + radius * Math.cos((angle - 90) * (Math.PI / 180));
    const y = 125 + radius * Math.sin((angle - 90) * (Math.PI / 180));
    return { x, y };
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <ToggleRight className="text-emerald-600 dark:text-emerald-450 h-5.5 w-5.5" /> Queues & Circular Ring Buffers
          </h2>
          <p className="text-xs text-slate-555 text-slate-500 dark:text-slate-400">
            A FIFO structure. Circular queues wrap indexes via modulo arithmetic to avoid empty memory gaps.
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shrink-0">
          {["linear", "circular", "dequeue"].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setType(mode as any);
                setMessage(`Switched to ${mode.toUpperCase()} queue model.`);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                type === mode ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="flex-1 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[320px] flex items-center justify-center shadow-sm">
        
        {/* LINEAR & DEQUEUE VIEW */}
        {(type === "linear" || type === "dequeue") && (
          <div className="w-full flex flex-col justify-center items-center py-8">
            <div className="flex justify-between w-full max-w-lg mb-2 text-slate-400 dark:text-slate-500 font-bold text-[9px] tracking-wider uppercase font-mono">
              <span>Front (Out)</span>
              <span>Back (In)</span>
            </div>

            <div className="flex items-center justify-start border-b-4 border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-950/40 w-full max-w-lg rounded-t-xl p-6 overflow-x-auto min-h-[120px] gap-2 shadow-inner">
              <AnimatePresence initial={false}>
                {queue.map((val, idx) => {
                  const isFront = idx === 0;
                  const isBack = idx === queue.length - 1;

                  return (
                    <motion.div
                      key={idx + "-" + val}
                      initial={{ opacity: 0, scale: 0.8, x: 50 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -50 }}
                      className={`h-16 w-16 border-2 rounded-xl flex flex-col items-center justify-center shrink-0 relative bg-white dark:bg-slate-900 ${
                        isFront 
                          ? "border-emerald-600 dark:border-emerald-500 shadow-sm" 
                          : isBack 
                          ? "border-blue-600 dark:border-blue-500 shadow-sm" 
                          : "border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <span className="text-[8px] text-slate-400 dark:text-slate-655 font-mono absolute top-1 left-2">[{idx}]</span>
                      <span className="font-bold text-slate-850 dark:text-slate-100 mt-1">{val}</span>
                      
                      {isFront && (
                        <span className="absolute -bottom-6 text-[8px] text-emerald-650 dark:text-emerald-400 font-mono font-bold uppercase">
                          FRONT
                        </span>
                      )}
                      {isBack && (
                        <span className="absolute -bottom-6 text-[8px] text-blue-650 dark:text-blue-400 font-mono font-bold uppercase">
                          REAR
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {queue.length === 0 && (
                <div className="text-center text-slate-400 dark:text-slate-650 italic text-xs py-8 w-full">
                  Queue is empty
                </div>
              )}
            </div>
          </div>
        )}

        {/* CIRCULAR QUEUE VIEW */}
        {type === "circular" && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full">
            
            {/* SVG Circular Ring */}
            <div className="relative w-[250px] h-[250px] shrink-0">
              <svg className="w-full h-full animate-fade-in" viewBox="0 0 250 250">
                {/* Outter Ring boundaries */}
                <circle cx="125" cy="125" r="110" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-800" />
                <circle cx="125" cy="125" r="70" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-200 dark:text-slate-800" />

                {/* Slots dividers */}
                {Array.from({ length: CIRCULAR_SIZE }).map((_, i) => {
                  const angle = (i * 360) / CIRCULAR_SIZE;
                  const x1 = 125 + 70 * Math.cos((angle - 90) * (Math.PI / 180));
                  const y1 = 125 + 70 * Math.sin((angle - 90) * (Math.PI / 180));
                  const x2 = 125 + 110 * Math.cos((angle - 90) * (Math.PI / 180));
                  const y2 = 125 + 110 * Math.sin((angle - 90) * (Math.PI / 180));
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="3" className="text-slate-200 dark:text-slate-800" />
                  );
                })}
              </svg>

              {/* Slots rendering */}
              {circularQueue.map((val, idx) => {
                const { x, y } = getRingCoordinates(idx);
                const isFront = idx === front;
                const isRear = idx === rear;
                const isOccupied = val !== null;

                return (
                  <div
                    key={idx}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
                    style={{ left: `${x}px`, top: `${y}px` }}
                  >
                    <motion.div
                      animate={{
                        scale: isFront || isRear ? 1.05 : 1,
                        borderColor: isFront 
                          ? "#10b981" 
                          : isRear 
                          ? "#3b82f6" 
                          : isOccupied 
                          ? "#60a5fa" 
                          : "transparent"
                      }}
                      className={`w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center shadow text-xs relative select-none bg-white dark:bg-slate-900 ${
                        isOccupied ? "border-slate-205" : "border-slate-200 dark:border-slate-800 border-dashed"
                      }`}
                    >
                      <span className="text-[7px] text-slate-400 dark:text-slate-655 font-mono absolute top-0.5 font-bold">[{idx}]</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100 mt-1">{val || "•"}</span>

                      {isFront && (
                        <span className="absolute -top-4 text-[7px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-1 rounded font-bold">
                          F
                        </span>
                      )}
                      {isRear && (
                        <span className="absolute -bottom-4 text-[7px] bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-1 rounded font-bold">
                          R
                        </span>
                      )}
                    </motion.div>
                  </div>
                );
              })}

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center select-none pointer-events-none">
                <RotateCw className="h-6 w-6 text-slate-300 dark:text-slate-800 mx-auto" />
                <span className="text-[8px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-wider block mt-1">Ring Buffer</span>
              </div>
            </div>

            {/* List coordinates summary */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-4 rounded-xl space-y-2 text-xs font-mono w-44 shadow-sm">
              <div className="text-slate-400 dark:text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800 pb-1.5 uppercase text-[9px]">Pointers state</div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Front (F):</span> <strong className="text-emerald-600 dark:text-emerald-400">{front === -1 ? "NULL" : front}</strong>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Rear (R):</span> <strong className="text-blue-600 dark:text-blue-400">{rear === -1 ? "NULL" : rear}</strong>
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-600 pt-1.5 border-t border-slate-200 dark:border-slate-800">
                <span>Full when:</span>
                <span>(R+1)%S == F</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Info Display */}
      <div className="p-3 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-855 rounded-xl text-xs text-slate-500 dark:text-slate-400 shadow-sm">
        {message}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4">
        
        {/* Value Input */}
        <div className="flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex-1 min-w-[200px] shadow-sm">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enqueue value (e.g. B)..."
            className="bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500 w-full"
          />
        </div>

        {/* Action Button layout based on model */}
        {type === "linear" && (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleEnqueue}
              className="flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
            >
              Enqueue
            </button>
            <button
              onClick={handleDequeue}
              className="flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-750 text-white transition-colors shadow-sm"
            >
              Dequeue
            </button>
          </div>
        )}

        {type === "dequeue" && (
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={handleEnqueueFront}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              Enqueue Front
            </button>
            <button
              onClick={handleEnqueue}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              Enqueue Rear
            </button>
            <button
              onClick={handleDequeue}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-750 text-white shadow-sm"
            >
              Dequeue Front
            </button>
            <button
              onClick={handleDequeueRear}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-750 text-white shadow-sm"
            >
              Dequeue Rear
            </button>
          </div>
        )}

        {type === "circular" && (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleCircularEnqueue}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-750 text-white shadow-sm"
            >
              Circular Enqueue
            </button>
            <button
              onClick={handleCircularDequeue}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-750 text-white shadow-sm"
            >
              Circular Dequeue
            </button>
            <button
              onClick={handleResetCircular}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 dark:border-slate-700 text-slate-550 dark:text-slate-400 shadow-sm"
            >
              Reset
            </button>
          </div>
        )}

      </div>

    </div>
  );
}