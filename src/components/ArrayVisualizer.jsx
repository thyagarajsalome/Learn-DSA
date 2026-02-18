import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArrayVisualizer = () => {
  const [array, setArray] = useState(["apple", "banana", "cherry"]);
  const [newItem, setNewItem] = useState("");

  // Hook-based logic (SAD: Controller decoupled from UI)
  const addItem = () => {
    if (newItem.trim()) {
      setArray((prev) => [...prev, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = () => setArray((prev) => prev.slice(0, -1));
  const shiftItem = () => setArray((prev) => prev.slice(1));
  const unshiftItem = () => {
    if (newItem.trim()) {
      setArray((prev) => [newItem.trim(), ...prev]);
      setNewItem("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Interactive Array Workspace</h2>
      
      {/* Visual Workspace */}
      <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-8 flex items-center overflow-x-auto min-h-[200px]">
        <div className="flex space-x-4">
          <AnimatePresence>
            {array.map((item, index) => (
              <motion.div
                key={item + index} // Unique key required for animation
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white border-2 border-blue-500 rounded-xl shadow-md w-24 h-24 flex items-center justify-center flex-col"
              >
                <span className="absolute -top-6 text-slate-400 text-xs font-mono">[{index}]</span>
                <span className="font-bold text-slate-800">{item}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {array.length === 0 && <span className="text-slate-400">Array is empty. Add elements below.</span>}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap gap-3">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Value..."
          className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button onClick={addItem} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Push</button>
        <button onClick={removeItem} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">Pop</button>
        <button onClick={unshiftItem} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">Unshift</button>
        <button onClick={shiftItem} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">Shift</button>
      </div>
    </div>
  );
};

export default ArrayVisualizer;