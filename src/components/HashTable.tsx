import { useState } from "react";
import { Hash, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const TABLE_SIZE = 8;

export default function HashTable() {
  const [resolutionMode, setResolutionMode] = useState<"chaining" | "probing">("chaining");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("Enter key and value to calculate hash offset.");
  const [hashCalculation, setHashCalculation] = useState<string>("");

  // Separate chaining table state
  const [chainingTable, setChainingTable] = useState<[string, string][][]>(
    Array(TABLE_SIZE).fill(null).map(() => [])
  );

  // Linear probing table state
  const [probingTable, setProbingTable] = useState<{ key: string; value: string }[]>(
    Array(TABLE_SIZE).fill({ key: "", value: "" })
  );

  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);

  // Custom Hash Function showing ASCII maths
  const calculateHash = (k: string): { index: number; breakdown: string } => {
    let sum = 0;
    const charCodes: string[] = [];
    for (let i = 0; i < k.length; i++) {
      const code = k.charCodeAt(i);
      sum += code;
      charCodes.push(`'${k[i]}'(${code})`);
    }
    const idx = sum % TABLE_SIZE;
    const breakdown = `${charCodes.join(" + ")} = ${sum} | Modulo size ${TABLE_SIZE}: ${sum} % ${TABLE_SIZE} = Index ${idx}`;
    return { index: idx, breakdown };
  };

  const handleSet = () => {
    if (!key.trim() || !value.trim()) return;
    const k = key.trim();
    const v = value.trim();
    const { index, breakdown } = calculateHash(k);
    setHashCalculation(breakdown);

    if (resolutionMode === "chaining") {
      setChainingTable(prev => {
        const copy = prev.map(arr => [...arr]);
        const existingIdx = copy[index].findIndex(([itemKey]) => itemKey === k);
        if (existingIdx !== -1) {
          copy[index][existingIdx] = [k, v];
          setMessage(`Collision resolved: Updated key "${k}" value to "${v}" at Index ${index}.`);
        } else {
          copy[index].push([k, v]);
          if (copy[index].length > 1) {
            setMessage(`Collision: Index ${index} is occupied! Appended key "${k}" via Separate Chaining.`);
          } else {
            setMessage(`Stored key "${k}" directly at Index ${index}.`);
          }
        }
        return copy;
      });
      setHighlightIdx(index);
    } else {
      // Linear Probing
      let probeIdx = index;
      let steps = 0;
      const copy = [...probingTable];
      
      while (copy[probeIdx].key !== "" && copy[probeIdx].key !== k && steps < TABLE_SIZE) {
        probeIdx = (probeIdx + 1) % TABLE_SIZE;
        steps++;
      }

      if (steps === TABLE_SIZE) {
        setMessage("Overflow: Hash Table is full! Linear probing failed.");
        return;
      }

      const isCollision = steps > 0;
      copy[probeIdx] = { key: k, value: v };
      setProbingTable(copy);
      setHighlightIdx(probeIdx);

      if (isCollision) {
        setMessage(`Collision: Probed ${steps} index step(s). Stored key "${k}" in next empty cell at Index ${probeIdx}.`);
      } else {
        setMessage(`Stored key "${k}" directly at Index ${probeIdx}.`);
      }
    }

    setKey("");
    setValue("");
  };

  const handleReset = () => {
    setChainingTable(Array(TABLE_SIZE).fill(null).map(() => []));
    setProbingTable(Array(TABLE_SIZE).fill({ key: "", value: "" }));
    setHighlightIdx(null);
    setHashCalculation("");
    setMessage("Hash Table cleared.");
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Hash className="text-yellow-600 dark:text-yellow-450 h-5.5 w-5.5" /> Hash Table Collision Resolver
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hash keys to buckets. Switch collision policies to see chaining vs linear probing.
          </p>
        </div>

        {/* Policy Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shrink-0 font-bold">
          <button
            onClick={() => {
              setResolutionMode("chaining");
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs uppercase transition-all ${
              resolutionMode === "chaining" ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Chaining
          </button>
          <button
            onClick={() => {
              setResolutionMode("probing");
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs uppercase transition-all ${
              resolutionMode === "probing" ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Linear Probing
          </button>
        </div>
      </div>

      {/* Input panel & Math breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-3 md:col-span-1 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
            Insert Record
          </span>
          <div className="space-y-2">
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Key (e.g. name, ID)..."
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-yellow-500 w-full"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Value (e.g. data)..."
              className="bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-yellow-500 w-full"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSet}
                disabled={!key || !value}
                className="w-full text-xs font-bold py-1.5 rounded-lg bg-yellow-600 hover:bg-yellow-750 disabled:bg-slate-100 dark:disabled:bg-slate-850 disabled:text-slate-400 dark:disabled:text-slate-655 text-white transition-colors shadow-sm"
              >
                Store
              </button>
              <button
                onClick={handleReset}
                className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-205 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-400"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* ASCII Hashing Math box */}
        <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl md:col-span-2 flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">
              Hash Function calculation breakdown
            </span>
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850/80 p-3.5 rounded-lg font-mono text-xs text-yellow-650 dark:text-yellow-400 min-h-[50px] flex items-center shadow-inner">
              {hashCalculation ? (
                <span>{hashCalculation}</span>
              ) : (
                <span className="text-slate-400 dark:text-slate-600 italic">// Awaiting key input to compute...</span>
              )}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mt-2">
            <HelpCircle className="h-3.5 w-3.5 text-slate-450 dark:text-slate-600" />
            <span>Formula: h(key) = (Sum of ASCII values of chars) % TABLE_SIZE</span>
          </div>
        </div>
      </div>

      {/* Message notification */}
      <div className="p-3 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-855 rounded-xl text-xs text-slate-500 dark:text-slate-400 shadow-sm">
        {message}
      </div>

      {/* Buckets visualization */}
      <div className="flex-1 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 overflow-y-auto shadow-sm">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-4">
          Hash Buckets Array (Slots 0 to {TABLE_SIZE - 1})
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: TABLE_SIZE }).map((_, idx) => {
            const isHit = highlightIdx === idx;
            
            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isHit ? 1.03 : 1,
                  borderColor: isHit ? "#eab308" : "transparent"
                }}
                className="border-2 rounded-xl p-4 min-h-[110px] flex flex-col relative overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-1.5 mb-2">
                  <span className="text-[9px] text-slate-450 dark:text-slate-550 font-mono font-bold">Bucket [{idx}]</span>
                  {isHit && (
                    <span className="text-[8px] font-bold bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.2 rounded uppercase">
                      Active
                    </span>
                  )}
                </div>

                {/* Render slot contents */}
                {resolutionMode === "chaining" ? (
                  <div className="space-y-1.5">
                    {chainingTable[idx].map(([k, v], cIdx) => (
                      <div key={cIdx} className="flex items-center gap-1.5 text-xs">
                        <span className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold shrink-0">
                          {k}
                        </span>
                        <span className="text-slate-400">→</span>
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold font-mono truncate">{v}</span>
                      </div>
                    ))}
                    {chainingTable[idx].length === 0 && (
                      <span className="text-slate-350 dark:text-slate-700 text-xs italic">// Empty</span>
                    )}
                  </div>
                ) : (
                  <div>
                    {probingTable[idx].key ? (
                      <div className="space-y-1">
                        <div className="text-[11px] text-slate-500">Key: <span className="text-slate-750 dark:text-slate-300 font-bold">{probingTable[idx].key}</span></div>
                        <div className="text-[11px] text-slate-500">Val: <span className="text-yellow-600 dark:text-yellow-400 font-bold">{probingTable[idx].value}</span></div>
                      </div>
                    ) : (
                      <span className="text-slate-350 dark:text-slate-700 text-xs italic">// Empty</span>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}