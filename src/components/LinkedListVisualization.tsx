import { useState } from "react";
import { ArrowRight, ArrowLeft, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NodeData {
  id: string;
  value: string;
}

export default function LinkedListVisualization() {
  const [listType, setListType] = useState<"singly" | "doubly" | "circular">("singly");
  const [nodes, setNodes] = useState<NodeData[]>([
    { id: "1", value: "10" },
    { id: "2", value: "20" },
    { id: "3", value: "30" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [traversingIdx, setTraversingIdx] = useState<number | null>(null);
  const [isTraversing, setIsTraversing] = useState(false);
  const [message, setMessage] = useState("Perform operations to see pointer adjustments.");

  const handleInsertHead = () => {
    if (!inputValue.trim()) return;
    const newNode = { id: Math.random().toString(), value: inputValue.trim() };
    setNodes([newNode, ...nodes]);
    setInputValue("");
    setMessage(`Inserted node "${newNode.value}" at Head.`);
  };

  const handleInsertTail = () => {
    if (!inputValue.trim()) return;
    const newNode = { id: Math.random().toString(), value: inputValue.trim() };
    setNodes([...nodes, newNode]);
    setInputValue("");
    setMessage(`Appended node "${newNode.value}" at Tail.`);
  };

  const handleInsertAtIndex = () => {
    if (!inputValue.trim()) return;
    const idx = parseInt(indexValue);
    if (isNaN(idx) || idx < 0 || idx > nodes.length) {
      setMessage(`Index must be between 0 and ${nodes.length}`);
      return;
    }
    const val = inputValue.trim();
    const newNode = { id: Math.random().toString(), value: val };
    const copy = [...nodes];
    copy.splice(idx, 0, newNode);
    setNodes(copy);
    setInputValue("");
    setIndexValue("");
    setMessage(`Inserted node "${val}" at index ${idx}.`);
  };

  const handleDeleteHead = () => {
    if (nodes.length === 0) {
      setMessage("List is empty!");
      return;
    }
    const removed = nodes[0];
    setNodes(nodes.slice(1));
    setMessage(`Deleted Head node "${removed.value}".`);
  };

  const handleDeleteTail = () => {
    if (nodes.length === 0) {
      setMessage("List is empty!");
      return;
    }
    const removed = nodes[nodes.length - 1];
    setNodes(nodes.slice(0, -1));
    setMessage(`Deleted Tail node "${removed.value}".`);
  };

  const handleDeleteAtIndex = () => {
    const idx = parseInt(indexValue);
    if (isNaN(idx) || idx < 0 || idx >= nodes.length) {
      setMessage(`Index must be between 0 and ${nodes.length - 1}`);
      return;
    }
    const removed = nodes[idx];
    const copy = [...nodes];
    copy.splice(idx, 1);
    setNodes(copy);
    setIndexValue("");
    setMessage(`Deleted node "${removed.value}" at index ${idx}.`);
  };

  // Traversal simulation step-by-step
  const handleTraverse = async () => {
    if (isTraversing || nodes.length === 0) return;
    setIsTraversing(true);
    setTraversingIdx(0);
    setMessage("Traversal started: Pointer curr points to Head.");

    for (let i = 0; i < nodes.length; i++) {
      setTraversingIdx(i);
      setMessage(`Visiting node at index ${i}: Value = ${nodes[i].value}`);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    if (listType === "circular") {
      setMessage(`Circular linked list: Tail wraps back to Head (Value: ${nodes[0].value})!`);
      setTraversingIdx(0);
      await new Promise(resolve => setTimeout(resolve, 800));
    } else {
      setMessage("Reached NULL. Traversal completed.");
    }
    setTraversingIdx(null);
    setIsTraversing(false);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Interactive Linked List</h2>
          <p className="text-xs text-slate-555 text-slate-500 dark:text-slate-400">
            Simulate node links, pointers, and traversal in Singly, Doubly, and Circular configurations.
          </p>
        </div>

        {/* List type toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shrink-0">
          {["singly", "doubly", "circular"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setListType(type as any);
                setMessage(`Switched list model to ${type.toUpperCase()}`);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                listType === type ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Arena */}
      <div className="flex-1 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex items-center overflow-x-auto min-h-[220px] shadow-sm">
        <div className="flex items-center space-x-2 py-4">
          
          {/* Head Indicator */}
          <div className="flex flex-col items-center justify-center pr-2 shrink-0">
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-655 uppercase tracking-widest mb-1">HEAD</span>
            <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <ArrowRight className="h-4 w-4 text-blue-500 mt-1" />
          </div>

          <AnimatePresence initial={false}>
            {nodes.map((node, index) => {
              const isLast = index === nodes.length - 1;
              const isFirst = index === 0;
              const isCurrent = traversingIdx === index;

              return (
                <div key={node.id} className="flex items-center shrink-0">
                  
                  {/* Node representation */}
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -30 }}
                    animate={{
                      scale: isCurrent ? 1.05 : 1,
                      borderColor: isCurrent ? "#3b82f6" : "#60a5fa",
                      backgroundColor: isCurrent 
                        ? "rgba(59, 130, 246, 0.12)" 
                        : "rgba(96, 165, 250, 0.04)"
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="border-2 rounded-xl p-4 min-w-[5rem] h-20 flex flex-col justify-between shadow-sm relative z-10 bg-white dark:bg-slate-900"
                  >
                    <span className="text-[9px] text-slate-400 dark:text-slate-655 font-mono absolute top-1 left-2">[{index}]</span>
                    
                    <span className="text-base font-bold text-slate-850 dark:text-slate-100 text-center mt-2.5">{node.value}</span>
                    
                    {/* Next Pointer Block */}
                    <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-blue-500/20 rounded-r-xl border-l border-blue-500/10 flex items-center justify-center text-[9px] font-bold text-blue-500 select-none">
                      •
                    </div>
                  </motion.div>

                  {/* Connective Arrows */}
                  <div className="flex flex-col items-center justify-center px-2 shrink-0">
                    <div className="flex items-center text-blue-500">
                      {listType === "doubly" && !isFirst && (
                        <ArrowLeft className="h-4 w-4 -mr-1" />
                      )}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Circular wrapping arrow or NULL box */}
                  {isLast && (
                    <div className="shrink-0 pl-1 flex items-center">
                      {listType === "circular" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20 rounded-full px-2 py-0.5"
                        >
                          ↻ Head
                        </motion.div>
                      ) : (
                        <div className="text-xs font-mono font-bold text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-2 py-1 shadow-sm">
                          NULL
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </AnimatePresence>

          {nodes.length === 0 && (
            <span className="text-slate-400 dark:text-slate-600 italic text-sm text-center w-full py-8">
              List is empty. Use operations below to add nodes.
            </span>
          )}
        </div>
      </div>

      {/* Info notification */}
      <div className="p-3 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-855 rounded-xl text-xs text-slate-500 dark:text-slate-400 shadow-sm">
        {message}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Node Values */}
        <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-3 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
            Insert Value
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Value (e.g. 40)..."
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              onClick={handleInsertHead}
              className="flex items-center gap-0.5 text-[11px] font-bold px-2 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-755 text-white transition-colors shrink-0 shadow-sm"
            >
              + Head
            </button>
            <button
              onClick={handleInsertTail}
              className="flex items-center gap-0.5 text-[11px] font-bold px-2 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-755 text-white transition-colors shrink-0 shadow-sm"
            >
              + Tail
            </button>
          </div>
        </div>

        {/* Index insertions */}
        <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-3 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
            Index Insert & Delete
          </span>
          <div className="flex gap-2">
            <input
              type="number"
              value={indexValue}
              onChange={(e) => setIndexValue(e.target.value)}
              placeholder="Idx"
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-purple-500 w-14 text-center"
            />
            <button
              onClick={handleInsertAtIndex}
              disabled={!inputValue.trim() || !indexValue}
              className="text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-755 disabled:bg-slate-100 dark:disabled:bg-slate-850 disabled:text-slate-400 dark:disabled:text-slate-600 text-white transition-colors w-full shadow-sm"
            >
              Insert At
            </button>
            <button
              onClick={handleDeleteAtIndex}
              disabled={!indexValue}
              className="text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 disabled:border-slate-200 dark:disabled:border-slate-850 disabled:text-slate-400 dark:disabled:text-slate-655 transition-colors w-full"
            >
              Delete At
            </button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-col justify-between shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">
            Global Operations
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteHead}
              className="flex items-center justify-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/10 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30 w-full"
            >
              Del Head
            </button>
            <button
              onClick={handleDeleteTail}
              className="flex items-center justify-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/10 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30 w-full"
            >
              Del Tail
            </button>
            <button
              onClick={handleTraverse}
              disabled={isTraversing || nodes.length === 0}
              className="flex items-center justify-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-100 dark:disabled:bg-slate-850 disabled:text-slate-400 dark:disabled:text-slate-600 text-white w-full shadow-sm"
            >
              <Eye className="h-3.5 w-3.5" /> Traverse
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}