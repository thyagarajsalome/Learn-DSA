import React, { useState } from "react";

const ArrayVisualizer = () => {
  const [array, setArray] = useState(["apple", "banana", "cherry"]);
  const [newItem, setNewItem] = useState("");
  const [message, setMessage] = useState("");

  const addItem = () => {
    if (newItem.trim() !== "") {
      setArray([...array, newItem.trim()]);
      setNewItem("");
      setMessage(`Added "${newItem.trim()}" to the end of the array.`);
    }
  };

  const removeItem = () => {
    if (array.length > 0) {
      const removedItem = array[array.length - 1];
      setArray(array.slice(0, -1));
      setMessage(`Removed "${removedItem}" from the end of the array.`);
    } else {
      setMessage("Cannot remove from an empty array.");
    }
  };

  const shiftItem = () => {
    if (array.length > 0) {
      const shiftedItem = array[0];
      setArray(array.slice(1));
      setMessage(`Shifted "${shiftedItem}" from the beginning of the array.`);
    } else {
      setMessage("Cannot shift from an empty array.");
    }
  };

  const unshiftItem = () => {
    if (newItem.trim() !== "") {
      setArray([newItem.trim(), ...array]);
      setNewItem("");
      setMessage(
        `Unshifted "${newItem.trim()}" to the beginning of the array.`
      );
    }
  };

  const resetArray = () => {
    setArray([]);
    setNewItem("");
    setMessage("Array has been reset to an empty state.");
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {array.map((item, index) => (
          <div key={index} className="border p-2 rounded">
            <div className="text-xs text-gray-500">Index: {index}</div>
            <div>{item}</div>
          </div>
        ))}
        {array.length === 0 && (
          <div className="text-gray-500">Array is empty</div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
          className="flex-grow border rounded px-2 py-1"
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Push
        </button>
        <button
          onClick={removeItem}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Pop
        </button>
        <button
          onClick={unshiftItem}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Unshift
        </button>
        <button
          onClick={shiftItem}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Shift
        </button>
        <button
          onClick={resetArray}
          className="bg-purple-500 text-white px-3 py-1 rounded"
        >
          Reset
        </button>
      </div>
      {message && (
        <div
          className="bg-gray-100 border-l-4 border-blue-500 text-blue-700 p-4"
          role="alert"
        >
          <p className="font-bold">Action Result</p>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ArrayVisualizer;
