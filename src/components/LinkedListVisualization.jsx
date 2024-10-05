import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Node = ({ data, isLast }) => (
  <div className="flex items-center">
    <div className="border-2 border-blue-500 rounded-lg p-2 w-24 h-24 flex items-center justify-center bg-blue-100">
      <span className="text-lg font-bold">{data}</span>
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

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Linked List Visualization</h2>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item to append"
          className="mr-2"
        />
        <Button onClick={appendItem}>Append</Button>
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
