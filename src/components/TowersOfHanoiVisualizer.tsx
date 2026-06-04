import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, AlertCircle, Layers } from "lucide-react";

interface Disk {
  size: number;
  color: string;
}

const DISK_COLORS = [
  "bg-red-500 shadow-red-500/10",
  "bg-amber-500 shadow-amber-500/10",
  "bg-yellow-500 shadow-yellow-500/10",
  "bg-green-500 shadow-green-500/10",
  "bg-blue-500 shadow-blue-500/10",
];

export default function TowersOfHanoiVisualizer() {
  const [numDisks, setNumDisks] = useState<number>(3);
  const [rods, setRods] = useState<Record<string, Disk[]>>({
    A: [],
    B: [],
    C: [],
  });

  const [selectedRod, setSelectedRod] = useState<string | null>(null);
  const [message, setMessage] = useState("Solve the puzzle or click 'Auto-Solve' to see recursion!");
  const [errorMsg, setErrorMsg] = useState("");

  // Solver states
  const [isSolving, setIsSolving] = useState(false);
  const [speed, setSpeed] = useState(800); // ms delay
  const [virtualStack, setVirtualStack] = useState<string[]>([]);
  const solverTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize rods
  const initGame = (n: number) => {
    if (solverTimer.current) clearTimeout(solverTimer.current);
    setIsSolving(false);
    setSelectedRod(null);
    setErrorMsg("");
    setMessage(`Initialized with ${n} disks. Goal: Move all disks from Rod A to Rod C.`);
    setVirtualStack([]);
    
    const initialDisks: Disk[] = [];
    for (let i = n; i >= 1; i--) {
      initialDisks.push({
        size: i,
        color: DISK_COLORS[(i - 1) % DISK_COLORS.length],
      });
    }

    setRods({
      A: initialDisks,
      B: [],
      C: [],
    });
  };

  useEffect(() => {
    initGame(numDisks);
    return () => {
      if (solverTimer.current) clearTimeout(solverTimer.current);
    };
  }, [numDisks]);

  // Click handler for rods (Manual Play)
  const handleRodClick = (rodKey: string) => {
    if (isSolving) return;
    setErrorMsg("");

    if (selectedRod === null) {
      // Pick up top disk from this rod
      if (rods[rodKey].length === 0) {
        setErrorMsg("Selected rod is empty!");
        return;
      }
      setSelectedRod(rodKey);
    } else {
      // Try to place the picked disk onto the clicked rod
      if (selectedRod === rodKey) {
        setSelectedRod(null);
        return;
      }

      const sourceDisks = [...rods[selectedRod]];
      const targetDisks = [...rods[rodKey]];
      const diskToMove = sourceDisks[sourceDisks.length - 1];
      const topTargetDisk = targetDisks[targetDisks.length - 1];

      if (topTargetDisk && diskToMove.size > topTargetDisk.size) {
        setErrorMsg("Rule Violation: A larger disk cannot be placed on top of a smaller disk!");
        setSelectedRod(null);
        return;
      }

      // Perform move
      sourceDisks.pop();
      targetDisks.push(diskToMove);

      setRods({
        ...rods,
        [selectedRod]: sourceDisks,
        [rodKey]: targetDisks,
      });

      setSelectedRod(null);
      setMessage(`Moved disk from Rod ${selectedRod} to Rod ${rodKey}.`);

      // Check win condition
      if (targetDisks.length === numDisks && rodKey === "C") {
        setMessage("🎉 Perfect! You successfully solved the puzzle!");
      }
    }
  };

  // Generate recursive moves list for Auto-Solver
  const generateMoves = (n: number, from: string, to: string, aux: string): { disk: number; from: string; to: string; stackLog: string[] }[] => {
    const list: { disk: number; from: string; to: string; stackLog: string[] }[] = [];
    const activeStack: string[] = [];

    const hanoi = (d: number, f: string, t: string, a: string) => {
      const callSignature = `hanoi(${d}, '${f}', '${t}', '${a}')`;
      activeStack.push(callSignature);
      
      if (d === 1) {
        list.push({ disk: 1, from: f, to: t, stackLog: [...activeStack] });
        activeStack.pop();
        return;
      }

      hanoi(d - 1, f, a, t);
      
      // Move current disk
      list.push({ disk: d, from: f, to: t, stackLog: [...activeStack] });
      
      hanoi(d - 1, a, t, f);
      
      activeStack.pop();
    };

    hanoi(n, from, to, aux);
    return list;
  };

  const runAutoSolve = () => {
    if (isSolving) return;
    setIsSolving(true);
    setErrorMsg("");
    
    // Reset to start state before solving
    const startDisks: Disk[] = [];
    for (let i = numDisks; i >= 1; i--) {
      startDisks.push({
        size: i,
        color: DISK_COLORS[(i - 1) % DISK_COLORS.length],
      });
    }

    let tempRods = { A: startDisks, B: [], C: [] };
    setRods(tempRods);

    const moves = generateMoves(numDisks, "A", "C", "B");
    let step = 0;

    const executeNextStep = () => {
      if (step >= moves.length) {
        setIsSolving(false);
        setVirtualStack([]);
        setMessage("🎉 Recursive solver completed all operations!");
        return;
      }

      const { disk, from, to, stackLog } = moves[step];
      
      // Update rods state
      const source = [...tempRods[from as keyof typeof tempRods]];
      const target = [...tempRods[to as keyof typeof tempRods]];
      const diskObj = source.pop();
      if (diskObj) {
        target.push(diskObj);
      }

      tempRods = {
        ...tempRods,
        [from]: source,
        [to]: target,
      };

      setRods(tempRods);
      setVirtualStack(stackLog);
      setMessage(`Step ${step + 1}/${moves.length}: Recursive call moves disk ${disk} from ${from} to ${to}.`);

      step++;
      solverTimer.current = setTimeout(executeNextStep, speed);
    };

    executeNextStep();
  };

  const handleStopSolver = () => {
    if (solverTimer.current) clearTimeout(solverTimer.current);
    setIsSolving(false);
    setVirtualStack([]);
    setMessage("Solver paused. Click Reset or adjust parameters.");
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Configuration Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Layers className="text-red-500 dark:text-red-400 h-5.5 w-5.5" /> Towers of Hanoi & Stack Frames
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Understand recursion. Every recursive function call allocates a stack frame in RAM.
          </p>
        </div>

        {/* Speed & Size Settings */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-805 px-3 py-1.5 text-xs font-semibold rounded-xl">
            <span className="text-slate-500 dark:text-slate-400">Disks:</span>
            <select
              value={numDisks}
              disabled={isSolving}
              onChange={(e) => setNumDisks(parseInt(e.target.value))}
              className="bg-transparent border-none text-red-600 dark:text-red-400 focus:ring-0 cursor-pointer outline-none font-bold"
            >
              <option value={3} className="bg-white dark:bg-slate-900">3 Disks (7 steps)</option>
              <option value={4} className="bg-white dark:bg-slate-900">4 Disks (15 steps)</option>
              <option value={5} className="bg-white dark:bg-slate-900">5 Disks (31 steps)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-805 px-3 py-1.5 text-xs font-semibold rounded-xl">
            <span className="text-slate-500 dark:text-slate-400">Speed:</span>
            <input
              type="range"
              min={200}
              max={2000}
              step={100}
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-20 accent-red-500 cursor-pointer"
            />
            <span className="text-red-600 dark:text-red-400 w-12 text-right">{speed}ms</span>
          </div>

          <div className="flex gap-2">
            {!isSolving ? (
              <button
                onClick={runAutoSolve}
                className="flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-750 text-white shadow-sm transition-colors"
              >
                <Play className="h-3.5 w-3.5" /> Auto-Solve
              </button>
            ) : (
              <button
                onClick={handleStopSolver}
                className="flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white transition-colors"
              >
                <Pause className="h-3.5 w-3.5" /> Pause
              </button>
            )}

            <button
              onClick={() => initGame(numDisks)}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 transition-all shadow-sm"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Info Boxes */}
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/25 text-red-650 dark:text-red-400 text-xs font-semibold p-3 rounded-xl flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200/50 dark:border-blue-900/30 text-slate-600 dark:text-blue-250 text-xs font-medium p-3 rounded-xl">
        {message}
      </div>

      {/* Dual Column: Workspace & Call Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Rods Arena */}
        <div className="lg:col-span-2 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[350px] flex flex-col justify-end shadow-sm">
          
          {/* Canvas Area */}
          <div className="grid grid-cols-3 gap-4 items-end relative h-64 border-b-8 border-slate-350 dark:border-slate-700 rounded-b-md px-4">
            
            {["A", "B", "C"].map((rodKey) => {
              const diskList = rods[rodKey] || [];
              const isSelected = selectedRod === rodKey;

              return (
                <div
                  key={rodKey}
                  onClick={() => handleRodClick(rodKey)}
                  className="flex flex-col items-center h-full justify-end cursor-pointer group relative"
                >
                  
                  {/* Vertical Rod Pole */}
                  <div className={`absolute bottom-0 w-3 h-52 rounded-t-full transition-colors z-0 ${
                    isSelected 
                      ? "bg-red-500 shadow-glow shadow-red-500/30" 
                      : "bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400 dark:group-hover:bg-slate-650"
                  }`} />

                  {/* Rod label */}
                  <span className="absolute -bottom-7 font-bold text-slate-400 dark:text-slate-500 text-xs tracking-wider">
                    Rod {rodKey}
                  </span>

                  {/* Disks stacked vertically */}
                  <div className="flex flex-col-reverse items-center w-full z-10 mb-0.5">
                    <AnimatePresence initial={false}>
                      {diskList.map((disk, idx) => {
                        const isTop = idx === diskList.length - 1;
                        const widthPct = 25 + (disk.size / 5) * 70;

                        return (
                          <motion.div
                            key={disk.size}
                            layout
                            initial={{ y: -150, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -150, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className={`${disk.color} h-7 rounded-lg shadow-sm border border-black/10 flex items-center justify-center text-[10px] font-bold text-white select-none`}
                            style={{ 
                              width: `${widthPct}%`,
                              marginTop: "2px",
                              border: isTop && isSelected ? "2px solid white" : "none"
                            }}
                          >
                            Disk {disk.size}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-6" />
        </div>

        {/* Call Stack Panel */}
        <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
              Recursion Call Stack
            </span>

            <div className="flex flex-col-reverse gap-1.5 min-h-[220px] bg-white dark:bg-slate-950 rounded-xl p-3 border border-slate-200 dark:border-slate-850 shadow-inner max-h-[260px] overflow-y-auto">
              <AnimatePresence>
                {virtualStack.map((signature, idx) => (
                  <motion.div
                    key={`${signature}-${idx}`}
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20 }}
                    className={`p-2.5 rounded-lg border text-xs font-mono font-medium shadow-sm ${
                      idx === virtualStack.length - 1
                        ? "bg-red-50 dark:bg-red-950/20 border-red-500/30 text-red-600 dark:text-red-300"
                        : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{signature}</span>
                      {idx === virtualStack.length - 1 && (
                        <span className="text-[8px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded uppercase">
                          Active
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {virtualStack.length === 0 && (
                <div className="text-center text-slate-400 dark:text-slate-650 text-xs italic py-16">
                  Stack is empty. Run Auto-Solve to see stack frames.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-900 text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed shadow-sm rounded-xl">
            <span className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Key Insight:</span>
            Recursion uses the LIFO Call Stack. Each recursive step allocates another frame. Depth is proportional to tree levels.
          </div>
        </div>

      </div>
    </div>
  );
}
