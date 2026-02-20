import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Node = ({ data, isLast }: { data: string; isLast: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center"
  >
    <div className="border-2 border-indigo-500 rounded-xl p-4 min-w-[4rem] h-16 flex items-center justify-center bg-indigo-50 shadow-sm relative">
      <span className="text-lg font-bold text-slate-800">{data}</span>
      {/* Pointer block */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-200 border-2 border-indigo-500 rounded-full"></div>
    </div>
    {!isLast && <ArrowRight className="mx-3 text-slate-400" size={24} />}
  </motion.div>
);

const LinkedListVisualization = () => {
  const [list, setList] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  const appendItem = () => {
    if (newItem.trim() !== "") {
      setList([...list, newItem.trim()]);
      setNewItem("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Interactive Linked List</h2>
      
      <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-8 flex items-center overflow-x-auto min-h-[200px]">
        <div className="flex items-center">
          <AnimatePresence>
            {list.map((item, index) => (
              <Node key={index + item} data={item} isLast={index === list.length - 1} />
            ))}
          </AnimatePresence>
          {list.length === 0 && (
            <span className="text-slate-400">List is empty. Append nodes below.</span>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Node value..."
          className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button onClick={appendItem} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Append Node
        </button>
      </div>
    </div>
  );
};

export default LinkedListVisualization;