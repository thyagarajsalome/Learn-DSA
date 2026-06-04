import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Search, HardDrive, Hash, ListOrdered } from "lucide-react";

interface RecordItem {
  key: number;
  name: string;
  data: string;
  hashAddress?: number;
}

export default function FileOrganizationTheory() {
  const [activeModel, setActiveModel] = useState<"sequential" | "direct" | "isam">("sequential");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const [lookupMessage, setLookupMessage] = useState<string>("");

  const records: RecordItem[] = [
    { key: 101, name: "Alice", data: "Dept: HR, Sal: $5K" },
    { key: 104, name: "Bob", data: "Dept: Dev, Sal: $8K" },
    { key: 107, name: "Charlie", data: "Dept: Sales, Sal: $6K" },
    { key: 110, name: "David", data: "Dept: QA, Sal: $5K" },
    { key: 112, name: "Emma", data: "Dept: Exec, Sal: $12K" }
  ];

  const getDirectBuckets = (): (RecordItem | null)[] => {
    const buckets = Array(7).fill(null);
    records.forEach(rec => {
      const idx = rec.key % 7;
      buckets[idx] = { ...rec, hashAddress: idx };
    });
    return buckets;
  };
  const directBuckets = getDirectBuckets();

  const indexTable = [
    { startKey: 101, blockIdx: 0 },
    { startKey: 107, blockIdx: 1 },
    { startKey: 112, blockIdx: 2 }
  ];

  const dataBlocks: RecordItem[][] = [
    [
      { key: 101, name: "Alice", data: "Dept: HR" },
      { key: 104, name: "Bob", data: "Dept: Dev" }
    ],
    [
      { key: 107, name: "Charlie", data: "Dept: Sales" },
      { key: 110, name: "David", data: "Dept: QA" }
    ],
    [
      { key: 112, name: "Emma", data: "Dept: Exec" }
    ]
  ];

  const handleSearch = () => {
    const searchKey = parseInt(searchTerm);
    if (isNaN(searchKey)) {
      setLookupMessage("Enter a valid numerical record key.");
      return;
    }
    setHighlightIdx(null);
    setLookupMessage("");

    if (activeModel === "sequential") {
      let found = false;
      let steps = 0;
      for (let i = 0; i < records.length; i++) {
        steps++;
        if (records[i].key === searchKey) {
          setHighlightIdx(i);
          setLookupMessage(`Found record after scanning ${steps} item(s) sequentially.`);
          found = true;
          break;
        }
      }
      if (!found) setLookupMessage(`Scanned all ${records.length} records. Key not found.`);
    }

    else if (activeModel === "direct") {
      const hashIdx = searchKey % 7;
      setHighlightIdx(hashIdx);
      const item = directBuckets[hashIdx];
      if (item && item.key === searchKey) {
        setLookupMessage(`Hashed key: ${searchKey} % 7 = Index ${hashIdx}. Record found instantly (1 disk access).`);
      } else {
        setLookupMessage(`Hashed key: ${searchKey} % 7 = Index ${hashIdx}. Bucket is ${item ? "occupied by " + item.name + " (Collision)" : "empty"}.`);
      }
    }

    else if (activeModel === "isam") {
      let targetBlock = -1;
      for (let i = 0; i < indexTable.length; i++) {
        if (searchKey >= indexTable[i].startKey) {
          targetBlock = indexTable[i].blockIdx;
        }
      }

      if (targetBlock !== -1) {
        const block = dataBlocks[targetBlock];
        let foundIdxInBlock = -1;
        for (let j = 0; j < block.length; j++) {
          if (block[j].key === searchKey) {
            foundIdxInBlock = j;
            break;
          }
        }

        if (foundIdxInBlock !== -1) {
          setHighlightIdx(targetBlock * 10 + foundIdxInBlock);
          setLookupMessage(`Index lookup pointed to Data Block ${targetBlock}. Record found.`);
        } else {
          setLookupMessage(`Index pointed to Block ${targetBlock}, but key was not found within that block.`);
        }
      } else {
        setLookupMessage("Key is smaller than minimum index table entry. Key not found.");
      }
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Database className="text-emerald-600 dark:text-emerald-400 h-5.5 w-5.5" /> File Organization Simulator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare physical record layouts on disk storage. An essential theoretical topic.
          </p>
        </div>

        {/* Model Selector tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shrink-0">
          <button
            onClick={() => {
              setActiveModel("sequential");
              setHighlightIdx(null);
              setLookupMessage("");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeModel === "sequential" ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <ListOrdered className="h-3.5 w-3.5" /> Sequential
          </button>
          <button
            onClick={() => {
              setActiveModel("direct");
              setHighlightIdx(null);
              setLookupMessage("");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeModel === "direct" ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <Hash className="h-3.5 w-3.5" /> Direct
          </button>
          <button
            onClick={() => {
              setActiveModel("isam");
              setHighlightIdx(null);
              setLookupMessage("");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeModel === "isam" ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <HardDrive className="h-3.5 w-3.5" /> ISAM
          </button>
        </div>
      </div>

      {/* Simulator search panel */}
      <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-wrap gap-3 items-center shadow-sm">
        <input
          type="number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter key (e.g. 104, 110)..."
          className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500 w-44"
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
        >
          <Search className="h-3.5 w-3.5" /> Search Disk
        </button>
        {lookupMessage && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 ml-2 animate-fade-in">
            {lookupMessage}
          </span>
        )}
      </div>

      {/* Workspace Display Area */}
      <div className="bg-slate-50/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/85 p-6 rounded-2xl min-h-[300px] flex items-center justify-center shadow-sm">
        
        {/* SEQUENTIAL MODEL */}
        {activeModel === "sequential" && (
          <div className="w-full space-y-4">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest block text-center mb-2">
              Physical Record Stream (Contiguous Blocks)
            </span>
            <div className="flex flex-wrap justify-center gap-4">
              {records.map((rec, idx) => {
                const isHit = highlightIdx === idx;
                return (
                  <motion.div
                    key={rec.key}
                    animate={{
                      scale: isHit ? 1.03 : 1,
                      borderColor: isHit ? "#10b981" : "transparent",
                      boxShadow: isHit ? "0 0 10px rgba(16, 185, 129, 0.15)" : "none"
                    }}
                    className="p-4 w-40 rounded-2xl border-2 shadow-sm text-center relative bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  >
                    <span className="absolute top-1 right-2 text-[9px] text-slate-400 dark:text-slate-655 font-mono font-bold">#{idx}</span>
                    <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono font-bold px-1.5 py-0.5 rounded">
                      Key: {rec.key}
                    </span>
                    <h3 className="font-bold text-slate-850 dark:text-slate-200 mt-2 text-sm">{rec.name}</h3>
                    <p className="text-[9px] text-slate-500 dark:text-slate-450 mt-1">{rec.data}</p>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-550 dark:text-slate-400 text-center max-w-lg mx-auto pt-4 leading-relaxed font-mono">
              Search complexity is O(N). Fast sequential reading but editing requires copying the file.
            </p>
          </div>
        )}

        {/* DIRECT (HASHED) MODEL */}
        {activeModel === "direct" && (
          <div className="w-full space-y-4">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest block text-center mb-2">
              Hashed Address Slot Array (Modulo Index Mapping)
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {directBuckets.map((bucket, idx) => {
                const isHit = highlightIdx === idx;
                return (
                  <motion.div
                    key={idx}
                    animate={{
                      scale: isHit ? 1.03 : 1,
                      borderColor: isHit ? "#10b981" : "transparent"
                    }}
                    className="p-3 border-2 rounded-2xl flex flex-col justify-between min-h-[120px] text-center shadow-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  >
                    <span className="text-[9px] text-blue-600 dark:text-blue-400 font-mono font-bold">Bucket {idx}</span>
                    {bucket ? (
                      <div className="mt-2">
                        <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono px-1 py-0.5 rounded">
                          Key: {bucket.key}
                        </span>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mt-1.5 text-xs">{bucket.name}</h4>
                      </div>
                    ) : (
                      <span className="text-slate-350 dark:text-slate-700 text-xs italic mt-4">// Empty</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-550 dark:text-slate-400 text-center max-w-lg mx-auto pt-4 leading-relaxed font-mono">
              Search complexity is O(1) on average. Offsets mapped via hash formula instantly.
            </p>
          </div>
        )}

        {/* ISAM (INDEXED SEQUENTIAL) MODEL */}
        {activeModel === "isam" && (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Index Directory Table */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-4 rounded-xl shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-3">
                Index Directory File
              </span>
              <div className="space-y-2">
                {indexTable.map((entry) => (
                  <div key={entry.startKey} className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-2.5 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="text-slate-400">Key range:</span> <strong className="text-emerald-600 dark:text-emerald-450">≥ {entry.startKey}</strong>
                    </div>
                    <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-[9px] font-bold">
                      Block ptr: {entry.blockIdx}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data blocks sequential */}
            <div className="md:col-span-2 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Physical Ordered Data Blocks
              </span>
              
              <div className="space-y-3">
                {dataBlocks.map((block, blockIdx) => (
                  <div key={blockIdx} className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 p-3 rounded-xl flex items-center gap-3 shadow-sm">
                    <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1.5 rounded shrink-0 border border-slate-200 dark:border-slate-800">
                      Block {blockIdx}
                    </span>
                    <div className="flex gap-2 w-full overflow-x-auto">
                      {block.map((rec, subIdx) => {
                        const compoundId = blockIdx * 10 + subIdx;
                        const isHit = highlightIdx === compoundId;

                        return (
                          <motion.div
                            key={rec.key}
                            animate={{
                              borderColor: isHit ? "#10b981" : "transparent"
                            }}
                            className="p-2 border-2 rounded-lg min-w-[120px] text-xs bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                          >
                            <div className="flex justify-between text-[8px] font-mono text-slate-400">
                              <span>Key: {rec.key}</span>
                            </div>
                            <h4 className="font-bold text-slate-750 dark:text-slate-200 mt-0.5">{rec.name}</h4>
                            <p className="text-[9px] text-slate-500 dark:text-slate-450">{rec.data}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-3 text-[10px] text-slate-500 dark:text-slate-400 text-center max-w-lg mx-auto pt-2 leading-relaxed font-mono">
              ISAM combines sorted sequential data blocks with index headers. Search complexity is O(log(blocks)).
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
