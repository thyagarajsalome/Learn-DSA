import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const Node = ({ data, isLast }) => (
  <div className="flex items-center">
    <div className="border-2 border-blue-500 rounded-lg p-2 w-16 h-16 flex items-center justify-center bg-blue-100">
      <span className="text-sm font-bold">{data}</span>
    </div>
    {!isLast && <ArrowRight className="mx-2" />}
  </div>
);

const LinkedListVisualization = () => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");

  const appendItem = () => {
    if (newItem.trim() !== "") {
      setList([...list, newItem.trim()]);
      setNewItem("");
    }
  };

  const resetList = () => {
    setList([]);
    setNewItem("");
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item to append"
          className="flex-grow mr-2 px-2 py-1 border rounded"
        />
        <button
          onClick={appendItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Append
        </button>
        <button
          onClick={resetList}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
      <div className="flex flex-wrap items-center mt-4">
        {list.map((item, index) => (
          <Node key={index} data={item} isLast={index === list.length - 1} />
        ))}
        {list.length === 0 && (
          <span className="text-gray-500">List is empty</span>
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualization;
