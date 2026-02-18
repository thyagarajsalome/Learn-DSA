import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

const StackItem = ({ value }) => (
  <div className="border-2 border-purple-500 rounded-lg p-2 w-full h-12 flex items-center justify-center bg-purple-100 mb-1">
    <span className="text-lg font-bold">{value}</span>
  </div>
);

const StackVisualization = () => {
  const [stack, setStack] = useState([]);
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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Stack Visualization</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item to push"
          className="mr-2 p-2 border rounded"
        />
        <button
          onClick={push}
          className="mr-2 p-2 bg-blue-500 text-white rounded"
        >
          <ArrowDown className="mr-2 h-4 w-4 inline" /> Push
        </button>
        <button
          onClick={pop}
          className="mr-2 p-2 bg-red-500 text-white rounded"
        >
          <ArrowUp className="mr-2 h-4 w-4 inline" /> Pop
        </button>
        <button onClick={peek} className="p-2 bg-green-500 text-white rounded">
          Peek
        </button>
      </div>
      {message && (
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          {message}
        </div>
      )}
      <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
        {stack.length === 0 ? (
          <div className="text-center text-gray-500">Stack is empty</div>
        ) : (
          stack
            .slice()
            .reverse()
            .map((item, index) => <StackItem key={index} value={item} />)
        )}
      </div>
    </div>
  );
};

export default StackVisualization;
