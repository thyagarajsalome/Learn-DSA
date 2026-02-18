import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const QueueItem = ({ value }) => (
  <div className="border-2 border-green-500 rounded-lg p-2 w-24 h-24 flex items-center justify-center bg-green-100 mx-1">
    <span className="text-lg font-bold">{value}</span>
  </div>
);

const QueueVisualization = () => {
  const [queue, setQueue] = useState([]);
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
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Queue Visualization (FIFO)</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item to enqueue"
          className="mr-2 p-2 border rounded"
        />
        <button
          onClick={enqueue}
          className="mr-2 p-2 bg-blue-500 text-white rounded flex items-center"
        >
          <ArrowRight className="mr-2 h-4 w-4" /> Enqueue
        </button>
        <button
          onClick={dequeue}
          className="p-2 border border-gray-300 rounded flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Dequeue
        </button>
      </div>
      {message && (
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          {message}
        </div>
      )}
      <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
        <div className="flex items-center justify-start overflow-x-auto">
          {queue.length === 0 ? (
            <div className="text-center text-gray-500 w-full">
              Queue is empty
            </div>
          ) : (
            <>
              {queue.map((item, index) => (
                <QueueItem key={index} value={item} />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>Front (Dequeue)</div>
        <div>Back (Enqueue)</div>
      </div>
    </div>
  );
};

export default QueueVisualization;
