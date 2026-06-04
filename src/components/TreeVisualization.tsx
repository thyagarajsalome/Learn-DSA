import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Eye, RefreshCw } from "lucide-react";

// BST Node Structure
interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
  x?: number;
  y?: number;
}

export default function TreeVisualization() {
  const [activeTab, setActiveTab] = useState<"bst" | "avl">("bst");
  const [insertVal, setInsertVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [message, setMessage] = useState("Insert numbers (1-99) to build your Binary Search Tree.");
  
  // BST State
  const [root, setRoot] = useState<BSTNode | null>(null);
  const [activeSearchPath, setActiveSearchPath] = useState<number[]>([]);
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize with some default nodes
  const initDefaultBST = () => {
    let newRoot: BSTNode | null = null;
    const defaults = [40, 20, 60, 10, 30, 50, 70];
    
    const insertNode = (node: BSTNode | null, val: number): BSTNode => {
      if (!node) return { value: val, left: null, right: null };
      if (val < node.value) node.left = insertNode(node.left, val);
      else if (val > node.value) node.right = insertNode(node.right, val);
      return node;
    };

    defaults.forEach(d => {
      newRoot = insertNode(newRoot, d);
    });
    setRoot(newRoot);
    setMessage("Initialized default Binary Search Tree.");
    setTraversalResult([]);
    setActiveSearchPath([]);
  };

  useEffect(() => {
    initDefaultBST();
  }, []);

  // Compute node coordinates recursively for SVG positioning
  // Canvas width = 500, height = 300
  const computeCoordinates = (node: BSTNode | null, x: number, y: number, offset: number) => {
    if (!node) return;
    node.x = x;
    node.y = y;
    computeCoordinates(node.left, x - offset, y + 55, offset / 1.8);
    computeCoordinates(node.right, x + offset, y + 55, offset / 1.8);
  };

  if (root) {
    computeCoordinates(root, 250, 40, 95);
  }

  // Insert a node into the BST
  const handleInsert = () => {
    const val = parseInt(insertVal);
    if (isNaN(val) || val < 1 || val > 99) {
      setMessage("Enter a valid number between 1 and 99.");
      return;
    }

    const insertNode = (node: BSTNode | null, v: number): BSTNode => {
      if (!node) return { value: v, left: null, right: null };
      if (v < node.value) node.left = insertNode(node.left, v);
      else if (v > node.value) node.right = insertNode(node.right, v);
      return node;
    };

    setRoot(prev => insertNode(prev, val));
    setInsertVal("");
    setMessage(`Inserted node ${val} into BST.`);
  };

  // Search a node
  const handleSearch = async () => {
    const val = parseInt(searchVal);
    if (isNaN(val)) return;
    
    setIsAnimating(true);
    const path: number[] = [];
    let curr = root;
    let found = false;

    while (curr) {
      path.push(curr.value);
      setActiveSearchPath([...path]);
      setMessage(`Searching BST: Comparing target ${val} with current node ${curr.value}...`);
      await new Promise(resolve => setTimeout(resolve, 800));

      if (curr.value === val) {
        found = true;
        break;
      }
      curr = val < curr.value ? curr.left : curr.right;
    }

    if (found) {
      setMessage(`Found node ${val} in BST! Path: ${path.join(" → ")}`);
    } else {
      setMessage(`Node ${val} not found in BST.`);
    }

    setIsAnimating(false);
    setSearchVal("");
  };

  // Traversals: Inorder, Preorder, Postorder, BFS
  const runTraversal = async (mode: "inorder" | "preorder" | "postorder" | "bfs") => {
    if (isAnimating || !root) return;
    setIsAnimating(true);
    setTraversalResult([]);
    const nodesList: BSTNode[] = [];

    // Helper recursions
    const inorder = (node: BSTNode | null) => {
      if (!node) return;
      inorder(node.left);
      nodesList.push(node);
      inorder(node.right);
    };

    const preorder = (node: BSTNode | null) => {
      if (!node) return;
      nodesList.push(node);
      preorder(node.left);
      preorder(node.right);
    };

    const postorder = (node: BSTNode | null) => {
      if (!node) return;
      postorder(node.left);
      postorder(node.right);
      nodesList.push(node);
    };

    const bfs = () => {
      const q: BSTNode[] = [root];
      while (q.length > 0) {
        const curr = q.shift()!;
        nodesList.push(curr);
        if (curr.left) q.push(curr.left);
        if (curr.right) q.push(curr.right);
      }
    };

    if (mode === "inorder") inorder(root);
    else if (mode === "preorder") preorder(root);
    else if (mode === "postorder") postorder(root);
    else if (mode === "bfs") bfs();

    // Animate traversal sequence
    const result: number[] = [];
    for (let i = 0; i < nodesList.length; i++) {
      const node = nodesList[i];
      setActiveSearchPath([node.value]);
      result.push(node.value);
      setTraversalResult([...result]);
      setMessage(`Traversal ${mode.toUpperCase()}: Visited Node ${node.value}`);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setActiveSearchPath([]);
    setIsAnimating(false);
    setMessage(`Completed ${mode.toUpperCase()} traversal! Sorted output: [${result.join(", ")}]`);
  };

  // AVL Tree rotations states
  const [avlState, setAvlState] = useState<"unbalanced" | "ll" | "rr" | "lr" | "rl">("unbalanced");
  const [avlMessage, setAvlMessage] = useState("Select a rotation type below to visualize AVL self-balancing.");
  
  const renderLines = (node: BSTNode | null): JSX.Element[] => {
    if (!node) return [];
    const lines: JSX.Element[] = [];
    if (node.left && node.left.x && node.left.y) {
      lines.push(
        <line
          key={`l-${node.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.left.x}
          y2={node.left.y}
          className="stroke-slate-400 dark:stroke-slate-650"
          stroke="#94a3b8"
          strokeWidth="2.5"
        />
      );
      lines.push(...renderLines(node.left));
    }
    if (node.right && node.right.x && node.right.y) {
      lines.push(
        <line
          key={`r-${node.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.right.x}
          y2={node.right.y}
          className="stroke-slate-400 dark:stroke-slate-650"
          stroke="#94a3b8"
          strokeWidth="2.5"
        />
      );
      lines.push(...renderLines(node.right));
    }
    return lines;
  };

  const renderNodes = (node: BSTNode | null): JSX.Element[] => {
    if (!node) return [];
    const isSearched = activeSearchPath.includes(node.value);
    const isSearchEnd = activeSearchPath[activeSearchPath.length - 1] === node.value;
    
    let colorClass = "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200";
    if (isSearched) colorClass = "bg-blue-50 dark:bg-indigo-950 border-blue-500 dark:border-indigo-500 text-blue-600 dark:text-indigo-300";
    if (isSearchEnd) colorClass = "bg-yellow-100 dark:bg-yellow-500 border-yellow-400 text-yellow-800 dark:text-slate-950";

    const list = [
      <div
        key={`n-${node.value}`}
        className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs select-none transition-all duration-300 shadow-md ${colorClass}`}
        style={{ left: `${node.x}px`, top: `${node.y}px` }}
      >
        {node.value}
      </div>
    ];
    list.push(...renderNodes(node.left));
    list.push(...renderNodes(node.right));
    return list;
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Tab select */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Eye className="text-blue-600 dark:text-blue-400 h-5.5 w-5.5" /> Binary Search Tree & AVL Rotations
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Visualize BST structure, Inorder/Preorder/Postorder traversals, and AVL self-balancing rotations.
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setActiveTab("bst")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "bst" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            BST Simulator
          </button>
          <button
            onClick={() => setActiveTab("avl")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "avl" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            AVL Rotations
          </button>
        </div>
      </div>

      {/* Tab: BST SIMULATOR */}
      {activeTab === "bst" && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Insertion */}
            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Insert Element</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={insertVal}
                  onChange={(e) => setInsertVal(e.target.value)}
                  placeholder="Val (1-99)..."
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button
                  onClick={handleInsert}
                  className="flex items-center gap-0.5 text-xs font-bold px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Insert
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Search Element</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Target..."
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-yellow-500 w-full"
                />
                <button
                  onClick={handleSearch}
                  disabled={isAnimating}
                  className="flex items-center gap-0.5 text-xs font-bold px-3 py-1.5 bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-200 dark:disabled:bg-slate-850 text-white rounded-lg transition-colors"
                >
                  <Search className="h-3.5 w-3.5" /> Search
                </button>
              </div>
            </div>

            {/* Traversal triggers */}
            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-col justify-between shadow-sm">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">Tree Traversals</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => runTraversal("inorder")}
                  disabled={isAnimating}
                  className="text-[10px] font-bold py-1.5 px-2 bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 rounded text-slate-700 dark:text-slate-300 w-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                >
                  Inorder
                </button>
                <button
                  onClick={() => runTraversal("preorder")}
                  disabled={isAnimating}
                  className="text-[10px] font-bold py-1.5 px-2 bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 rounded text-slate-700 dark:text-slate-300 w-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                >
                  Preorder
                </button>
                <button
                  onClick={() => runTraversal("postorder")}
                  disabled={isAnimating}
                  className="text-[10px] font-bold py-1.5 px-2 bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 rounded text-slate-700 dark:text-slate-300 w-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                >
                  Postorder
                </button>
                <button
                  onClick={() => runTraversal("bfs")}
                  disabled={isAnimating}
                  className="text-[10px] font-bold py-1.5 px-2 bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 rounded text-slate-700 dark:text-slate-300 w-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                >
                  BFS
                </button>
              </div>
            </div>

          </div>

          {/* Info bar */}
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-400">
            <span>{message}</span>
            <button
              onClick={initDefaultBST}
              className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded transition-colors"
            >
              <RefreshCw className="h-3 w-3" /> Reset Tree
            </button>
          </div>

          {/* Graphical Tree display box */}
          <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 min-h-[320px] relative overflow-hidden flex flex-col justify-between shadow-inner">
            <div className="overflow-x-auto w-full">
              <div className="relative w-[500px] h-[280px] mx-auto shrink-0">
                <svg className="absolute inset-0 w-full h-full">
                  {renderLines(root)}
                </svg>
                <div className="absolute inset-0">
                  {renderNodes(root)}
                </div>
              </div>
            </div>

            {/* Traversal Output Log */}
            {traversalResult.length > 0 && (
              <div className="mt-4 bg-slate-100 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-850 flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0 font-mono">Traversal List:</span>
                <div className="flex gap-1.5 overflow-x-auto py-1">
                  {traversalResult.map((val, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-xs bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold font-mono px-2 py-0.5 rounded"
                    >
                      {val}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: AVL ROTATIONS DEMO */}
      {activeTab === "avl" && (
        <div className="space-y-6">
          
          {/* Rotations triggers */}
          <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-wrap gap-3 items-center justify-between shadow-sm">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setAvlState("ll");
                  setAvlMessage("LL Rotation: An unbalanced node's left child gets another left child. Root balances by rotating RIGHT.");
                }}
                className="text-xs font-bold px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
              >
                LL Rotation (Right Rotate)
              </button>
              <button
                onClick={() => {
                  setAvlState("rr");
                  setAvlMessage("RR Rotation: An unbalanced node's right child gets another right child. Root balances by rotating LEFT.");
                }}
                className="text-xs font-bold px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
              >
                RR Rotation (Left Rotate)
              </button>
              <button
                onClick={() => {
                  setAvlState("lr");
                  setAvlMessage("LR Rotation: Left-Right case. Rotate left child LEFT first, then parent node RIGHT.");
                }}
                className="text-xs font-bold px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
              >
                LR Rotation (Double)
              </button>
              <button
                onClick={() => {
                  setAvlState("rl");
                  setAvlMessage("RL Rotation: Right-Left case. Rotate right child RIGHT first, then parent node LEFT.");
                }}
                className="text-xs font-bold px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
              >
                RL Rotation (Double)
              </button>
            </div>
            <button
              onClick={() => {
                setAvlState("unbalanced");
                setAvlMessage("AVL unbalance triggers when a node's balance factor BF gets to ±2. Choose a rotation to resolve.");
              }}
              className="text-xs font-bold px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
            >
              Reset Rotations
            </button>
          </div>

          {/* Info bar */}
          <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-400">
            {avlMessage}
          </div>

          {/* SVG AVL rotation visualizer box */}
          <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 min-h-[300px] flex items-center justify-center shadow-inner">
            <div className="relative w-80 h-64 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 p-6 rounded-xl flex items-center justify-center shadow-sm">
              
              {/* Render small AVL subtrees based on states */}
              {avlState === "unbalanced" && (
                <div className="relative w-full h-full">
                  {/* Root 30 */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-red-500 bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-xs font-bold text-red-600 dark:text-red-300">30</div>
                  <line x1="160" y1="80" x2="110" y2="130" stroke="#94a3b8" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="2.5" />
                  <div className="absolute top-28 left-20 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold">20</div>
                  {/* Unbalanced left leaf */}
                  <line x1="80" y1="150" x2="50" y2="200" stroke="#94a3b8" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="2.5" />
                  <div className="absolute top-44 left-8 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold">10</div>
                  
                  {/* Balance factor indicators */}
                  <span className="absolute top-4 left-[180px] text-[8px] bg-red-500/10 text-red-600 dark:text-red-400 font-mono font-bold px-1 py-0.2 rounded">BF: +2 (Unbalanced)</span>
                  <span className="absolute top-24 left-[110px] text-[8px] text-slate-500 dark:text-slate-400 font-mono font-bold">BF: +1</span>
                  <span className="absolute top-40 left-[45px] text-[8px] text-slate-500 dark:text-slate-400 font-mono font-bold">BF: 0</span>
                </div>
              )}

              {avlState === "ll" && (
                <div className="relative w-full h-full">
                  {/* Rotated: Root 20 */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-300">20</div>
                  {/* Left 10 */}
                  <line x1="160" y1="80" x2="110" y2="130" stroke="#94a3b8" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="2.5" />
                  <div className="absolute top-28 left-20 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold">10</div>
                  {/* Right 30 */}
                  <line x1="160" y1="80" x2="210" y2="130" stroke="#94a3b8" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="2.5" />
                  <div className="absolute top-28 left-52 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold">30</div>

                  {/* Balanced BF */}
                  <span className="absolute top-4 left-[180px] text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold px-1 py-0.2 rounded">BF: 0 (Balanced!)</span>
                  <span className="absolute top-24 left-[110px] text-[8px] text-slate-500 dark:text-slate-400 font-mono font-bold">BF: 0</span>
                  <span className="absolute top-24 left-[225px] text-[8px] text-slate-500 dark:text-slate-400 font-mono font-bold">BF: 0</span>
                </div>
              )}

              {/* RR, LR, RL generic balancing diagrams rendered dynamically */}
              {avlState === "rr" && (
                <div className="relative w-full h-full">
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-300">20</div>
                  <line x1="160" y1="80" x2="110" y2="130" stroke="#94a3b8" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="2.5" />
                  <div className="absolute top-28 left-20 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold">10</div>
                  <line x1="160" y1="80" x2="210" y2="130" stroke="#94a3b8" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="2.5" />
                  <div className="absolute top-28 left-52 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold">30</div>
                  <span className="absolute top-4 left-[180px] text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold px-1 py-0.2 rounded">BF: 0 (Balanced!)</span>
                </div>
              )}

              {avlState === "lr" && (
                <div className="relative w-full h-full">
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-300">25</div>
                  <line x1="160" y1="80" x2="110" y2="130" stroke="#94a3b8" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="2.5" />
                  <div className="absolute top-28 left-20 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold">20</div>
                  <line x1="160" y1="80" x2="210" y2="130" stroke="#94a3b8" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="2.5" />
                  <div className="absolute top-28 left-52 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold">30</div>
                  <span className="absolute top-4 left-[180px] text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold px-1 py-0.2 rounded">Double Balance Complete</span>
                </div>
              )}

              {avlState === "rl" && (
                <div className="relative w-full h-full">
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-300">25</div>
                  <line x1="160" y1="80" x2="110" y2="130" stroke="#94a3b8" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="2.5" />
                  <div className="absolute top-28 left-20 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold">20</div>
                  <line x1="160" y1="80" x2="210" y2="130" stroke="#94a3b8" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="2.5" />
                  <div className="absolute top-28 left-52 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold">30</div>
                  <span className="absolute top-4 left-[180px] text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold px-1 py-0.2 rounded">Double Balance Complete</span>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
}