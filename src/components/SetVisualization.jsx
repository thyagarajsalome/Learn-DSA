import React, { useState } from "react";
import { PlusCircle, MinusCircle, Check, X } from "lucide-react";

const SetVisualization = () => {
  const [set, setSet] = useState(new Set());
  const [inputValue, setInputValue] = useState("");
  const [checkValue, setCheckValue] = useState("");
  const [message, setMessage] = useState("");

  const addElement = () => {
    if (inputValue.trim() !== "") {
      setSet((prevSet) => new Set(prevSet).add(inputValue.trim()));
      setInputValue("");
      setMessage(`Added ${inputValue.trim()} to the set.`);
    }
  };

  const removeElement = () => {
    if (inputValue.trim() !== "") {
      const newSet = new Set(set);
      const deleted = newSet.delete(inputValue.trim());
      setSet(newSet);
      setInputValue("");
      setMessage(
        deleted
          ? `Removed ${inputValue.trim()} from the set.`
          : `${inputValue.trim()} not found in the set.`
      );
    }
  };

  const checkElement = () => {
    if (checkValue.trim() !== "") {
      const exists = set.has(checkValue.trim());
      setMessage(
        exists
          ? `${checkValue.trim()} exists in the set.`
          : `${checkValue.trim()} does not exist in the set.`
      );
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Set Visualization
      </h2>

      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-md"
          placeholder="Enter an element"
        />
        <button
          onClick={addElement}
          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <PlusCircle size={24} />
        </button>
        <button
          onClick={removeElement}
          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          <MinusCircle size={24} />
        </button>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={checkValue}
          onChange={(e) => setCheckValue(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-md"
          placeholder="Check for an element"
        />
        <button
          onClick={checkElement}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Check size={24} />
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="font-semibold mb-2">Current Set:</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(set).map((item, index) => (
            <span
              key={index}
              className="bg-blue-200 px-2 py-1 rounded-md text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {message && (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
        >
          <p>{message}</p>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <p>Set size: {set.size}</p>
      </div>
    </div>
  );
};

export default SetVisualization;
