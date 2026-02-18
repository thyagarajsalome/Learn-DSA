import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QueueItem = ({ value }: { value: string }) => (
  <motion.div
    initial={{ opacity: 0, x: 50, scale: 0.8 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: -50, scale: 0.8 }}
    className="border-2 border-green-500 rounded-lg p-2 min-w-[6rem] h-16 flex items-center justify-center bg-green-100 mx-1 shadow-sm shrink-0"
  >
    <span className="text-lg font-bold text-green-900">{value}</span>
  </motion.div>
);

const QueueVisualization = () => {
  const [queue, setQueue] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [message, setMessage] = useState("");

  const enqueue = () => {
    if (newItem.trim() !== "") {
      setQueue([...queue, newItem.trim()]);
      setNewItem("");
      setMessage(`Enqueued "${newItem.trim()}" to the queue.`);
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      const dequeuedItem = queue[0];
      setQueue(queue.slice(1));
      setMessage(`Dequeued "${dequeuedItem}" from the queue.`);
    } else {
      setMessage("Cannot dequeue from an empty queue.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Interactive Queue (FIFO)</h2>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item..."
          className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
        />
        <button onClick={enqueue} className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <ArrowRight className="mr-2 h-4 w-4" /> Enqueue
        </button>
        <button onClick={dequeue} className="flex items-center bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Dequeue
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700 rounded-r-md font-medium">
          {message}
        </div>
      )}

      <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-8 relative min-h-[250px] flex items-center">
        
        {/* Front and Back Labels */}
        <div className="absolute top-2 left-8 text-slate-500 font-bold uppercase text-sm">Front (Out)</div>
        <div className="absolute top-2 right-8 text-slate-500 font-bold uppercase text-sm">Back (In)</div>

        <div className="flex items-center justify-start overflow-x-auto w-full h-full pb-4 px-4 border-b-4 border-slate-300">
          <AnimatePresence>
            {queue.map((item, index) => (
              <QueueItem key={index + item} value={item} />
            ))}
          </AnimatePresence>
          {queue.length === 0 && (
            <div className="text-center text-slate-400 w-full">Queue is empty</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueueVisualization;