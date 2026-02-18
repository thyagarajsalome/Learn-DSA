import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StackItem = ({ value }: { value: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -50, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, x: 50, scale: 0.8 }}
    className="border-2 border-purple-500 rounded-lg p-2 w-full h-14 flex items-center justify-center bg-purple-100 mb-2 shadow-sm"
  >
    <span className="text-lg font-bold text-purple-900">{value}</span>
  </motion.div>
);

const StackVisualization = () => {
  const [stack, setStack] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [message, setMessage] = useState("");

  const push = () => {
    if (newItem.trim() !== "") {
      setStack([...stack, newItem.trim()]);
      setNewItem("");
      setMessage(`Pushed "${newItem.trim()}" onto the stack.`);
    }
  };

  const pop = () => {
    if (stack.length > 0) {
      const poppedItem = stack[stack.length - 1];
      setStack(stack.slice(0, -1));
      setMessage(`Popped "${poppedItem}" from the stack.`);
    } else {
      setMessage("Cannot pop from an empty stack.");
    }
  };

  const peek = () => {
    if (stack.length > 0) {
      setMessage(`Top element is "${stack[stack.length - 1]}".`);
    } else {
      setMessage("Stack is empty. Cannot peek.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Interactive Stack (LIFO)</h2>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item..."
          className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <button onClick={push} className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <ArrowDown className="mr-2 h-4 w-4" /> Push
        </button>
        <button onClick={pop} className="flex items-center bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <ArrowUp className="mr-2 h-4 w-4" /> Pop
        </button>
        <button onClick={peek} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Peek
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700 rounded-r-md font-medium">
          {message}
        </div>
      )}

      <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-end min-h-[300px]">
        <div className="w-48 border-b-4 border-x-4 border-slate-400 rounded-b-lg p-2 flex flex-col-reverse relative">
          <AnimatePresence>
            {stack.map((item, index) => (
              <StackItem key={index + item} value={item} />
            ))}
          </AnimatePresence>
          {stack.length === 0 && (
            <div className="text-center text-slate-400 py-4 absolute bottom-0 left-0 w-full">Stack is empty</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StackVisualization;