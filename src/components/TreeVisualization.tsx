import React, { useState } from "react";
import { ChevronRight, ChevronDown, Plus, Minus } from "lucide-react";

interface TreeNodeData {
  data: string;
  children: TreeNodeData[];
}

interface TreeNodeProps {
  node: TreeNodeData;
  onAddChild: (parent: TreeNodeData, childName: string) => void;
  onRemoveNode: (node: TreeNodeData) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onAddChild, onRemoveNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newChildName, setNewChildName] = useState("");

  const handleAddChild = () => {
    if (newChildName.trim()) {
      onAddChild(node, newChildName.trim());
      setNewChildName("");
    }
  };

  return (
    <div className="ml-6 border-l-2 border-slate-200 pl-4 py-2">
      <div className="flex items-center mb-2">
        {node.children.length > 0 && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="mr-2 text-slate-500 hover:text-slate-800">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
        )}
        <span className="font-semibold text-lg text-slate-800 bg-white border-2 border-indigo-500 px-3 py-1 rounded-lg shadow-sm">
          {node.data}
        </span>
        {node.data !== "root" && (
          <button onClick={() => onRemoveNode(node)} className="ml-3 text-rose-500 hover:bg-rose-100 p-1 rounded-full">
            <Minus size={16} />
          </button>
        )}
      </div>
      
      {isExpanded && (
        <div className="mt-2">
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} onAddChild={onAddChild} onRemoveNode={onRemoveNode} />
          ))}
        </div>
      )}
      
      <div className="flex items-center mt-3 mb-2">
        <input
          type="text"
          value={newChildName}
          onChange={(e) => setNewChildName(e.target.value)}
          placeholder="New child node..."
          className="border border-slate-300 rounded px-2 py-1 mr-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={handleAddChild} className="bg-indigo-500 hover:bg-indigo-600 text-white rounded px-2 py-1 text-sm flex items-center transition-colors">
          <Plus size={16} className="mr-1" /> Add
        </button>
      </div>
    </div>
  );
};

const Tree = () => {
  const [root, setRoot] = useState<TreeNodeData>({ data: "root", children: [] });

  const addChild = (parent: TreeNodeData, childName: string) => {
    const newChild: TreeNodeData = { data: childName, children: [] };
    const updateTree = (node: TreeNodeData): TreeNodeData => {
      if (node === parent) {
        return { ...node, children: [...node.children, newChild] };
      }
      return { ...node, children: node.children.map(updateTree) };
    };
    setRoot(updateTree(root));
  };

  const removeNode = (nodeToRemove: TreeNodeData) => {
    const updateTree = (node: TreeNodeData): TreeNodeData => ({
      ...node,
      children: node.children.filter((child) => child !== nodeToRemove).map(updateTree),
    });
    setRoot(updateTree(root));
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Interactive Tree</h2>
      <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-6 overflow-auto min-h-[400px]">
        <TreeNode node={root} onAddChild={addChild} onRemoveNode={removeNode} />
      </div>
    </div>
  );
};

export default Tree;