import { useState, useEffect } from "react";
import { Network, Play, RefreshCw } from "lucide-react";

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  u: string;
  v: string;
  weight: number;
}

export default function GraphVisualization() {
  const [activeTab, setActiveTab] = useState<"traverse" | "advanced">("traverse");
  
  // Nodes & Edges
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // Traversals & Algorithms
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [frontierNodes, setFrontierNodes] = useState<string[]>([]); // queue/stack contents
  const [pathEdges, setPathEdges] = useState<[string, string][]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState("Click empty space to add nodes. Click two nodes to add an undirected edge.");
  const [algorithmLog, setAlgorithmLog] = useState<string[]>([]);

  // Load a default graph for ease of study
  const initDefaultGraph = () => {
    setIsAnimating(false);
    setVisitedNodes([]);
    setFrontierNodes([]);
    setPathEdges([]);
    setAlgorithmLog([]);
    setMessage("Initialized default weighted graph. Ready for traversals!");

    const defaultNodes = [
      { id: "A", x: 120, y: 70 },
      { id: "B", x: 260, y: 50 },
      { id: "C", x: 90, y: 190 },
      { id: "D", x: 280, y: 180 },
      { id: "E", x: 190, y: 240 }
    ];

    const defaultEdges = [
      { u: "A", v: "B", weight: 4 },
      { u: "A", v: "C", weight: 2 },
      { u: "B", v: "D", weight: 5 },
      { u: "C", v: "D", weight: 1 },
      { u: "C", v: "E", weight: 3 },
      { u: "D", v: "E", weight: 8 }
    ];

    setNodes(defaultNodes);
    setEdges(defaultEdges);
  };

  useEffect(() => {
    initDefaultGraph();
  }, []);

  // Add a node on canvas click
  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isAnimating) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Prevent node placement too close to border or other nodes
    if (x < 20 || x > rect.width - 20 || y < 20 || y > rect.height - 20) return;
    const closeNode = nodes.find(n => Math.hypot(n.x - x, n.y - y) < 40);
    if (closeNode) return;

    const nextId = String.fromCharCode(65 + nodes.length); // A, B, C, D...
    if (nodes.length >= 8) {
      setMessage("Max limit of 8 nodes reached for visual clarity.");
      return;
    }

    setNodes([...nodes, { id: nextId, x, y }]);
    setMessage(`Added vertex Node ${nextId}.`);
  };

  // Click a node to draw edge
  const handleNodeClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (isAnimating) return;

    if (selectedNodeId === null) {
      setSelectedNodeId(nodeId);
      setMessage(`Selected Node ${nodeId}. Now click another node to draw an edge.`);
    } else {
      if (selectedNodeId === nodeId) {
        setSelectedNodeId(null);
        return;
      }

      // Check if edge already exists
      const edgeExists = edges.some(
        edge => (edge.u === selectedNodeId && edge.v === nodeId) || (edge.u === nodeId && edge.v === selectedNodeId)
      );

      if (edgeExists) {
        setMessage("Edge already exists between these nodes.");
        setSelectedNodeId(null);
        return;
      }

      // Compute weight based on pixel distance / 50 (rounded)
      const uNode = nodes.find(n => n.id === selectedNodeId)!;
      const vNode = nodes.find(n => n.id === nodeId)!;
      const weight = Math.round(Math.hypot(uNode.x - vNode.x, uNode.y - vNode.y) / 40);

      const newEdge = { u: selectedNodeId, v: nodeId, weight: Math.max(1, weight) };
      setEdges([...edges, newEdge]);
      setSelectedNodeId(null);
      setMessage(`Added undirected edge: ${selectedNodeId} ── (${newEdge.weight}) ── ${nodeId}`);
    }
  };

  // Graph Adjacency List compiler
  const getAdjacencyList = () => {
    const list: Record<string, string[]> = {};
    nodes.forEach(n => { list[n.id] = []; });
    edges.forEach(e => {
      list[e.u]?.push(e.v);
      list[e.v]?.push(e.u);
    });
    return list;
  };

  const adj = getAdjacencyList();

  // Run BFS or DFS
  const runTraversal = async (algo: "bfs" | "dfs") => {
    if (nodes.length === 0 || isAnimating) return;
    setIsAnimating(true);
    setVisitedNodes([]);
    setFrontierNodes([]);
    setPathEdges([]);
    setAlgorithmLog([]);
    
    const startNode = nodes[0].id;
    const visitedSet = new Set<string>();
    const frontier: string[] = [startNode];
    const sequence: string[] = [];

    setFrontierNodes([...frontier]);
    setMessage(`Started ${algo.toUpperCase()} traversal from Node ${startNode}.`);
    await new Promise(resolve => setTimeout(resolve, 800));

    while (frontier.length > 0) {
      // Dequeue (BFS) vs Pop (DFS)
      const curr = algo === "bfs" ? frontier.shift()! : frontier.pop()!;
      
      if (!visitedSet.has(curr)) {
        visitedSet.add(curr);
        sequence.push(curr);
        setVisitedNodes([...sequence]);
        setAlgorithmLog(prev => [...prev, `Visited Node ${curr}`]);
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Find neighbors
        const neighbors = adj[curr] || [];
        neighbors.forEach(n => {
          if (!visitedSet.has(n) && !frontier.includes(n)) {
            frontier.push(n);
            setPathEdges(prev => [...prev, [curr, n]]);
          }
        });

        setFrontierNodes([...frontier]);
        setMessage(`${algo.toUpperCase()} frontier queue: [${frontier.join(", ")}]`);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }

    setFrontierNodes([]);
    setIsAnimating(false);
    setMessage(`Completed ${algo.toUpperCase()} traversal: [${sequence.join(" → ")}]`);
  };

  // Advanced Algorithm: Dijkstra's Shortest Path
  const runDijkstra = async () => {
    if (nodes.length === 0 || isAnimating) return;
    setIsAnimating(true);
    setVisitedNodes([]);
    setFrontierNodes([]);
    setPathEdges([]);
    setAlgorithmLog([]);

    const start = "A";
    const dest = "E";
    
    const dist: Record<string, number> = {};
    const parent: Record<string, string | null> = {};
    const unvisited = new Set<string>();

    nodes.forEach(n => {
      dist[n.id] = Infinity;
      parent[n.id] = null;
      unvisited.add(n.id);
    });
    dist[start] = 0;

    setMessage(`Dijkstra: Starting shortest path from ${start} to ${dest}. Set dist[A] = 0.`);
    setAlgorithmLog([`Initialize: dist[A]=0, all other nodes=∞`]);
    await new Promise(resolve => setTimeout(resolve, 1000));

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      let u: string | null = null;
      unvisited.forEach(nodeId => {
        if (u === null || dist[nodeId] < dist[u]) {
          u = nodeId;
        }
      });

      if (u === null || dist[u] === Infinity) break;
      const activeNode: string = u;
      unvisited.delete(activeNode);
      setVisitedNodes(prev => [...prev, activeNode]);
      setAlgorithmLog(prev => [...prev, `Relaxing neighbors of Node ${activeNode} (dist = ${dist[activeNode]})`]);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Relax neighbors
      const neighbors = adj[activeNode] || [];
      for (const v of neighbors) {
        if (unvisited.has(v)) {
          const edge = edges.find(
            e => (e.u === activeNode && e.v === v) || (e.u === v && e.v === activeNode)
          );
          if (edge) {
            const newDist = dist[activeNode] + edge.weight;
            if (newDist < dist[v]) {
              dist[v] = newDist;
              parent[v] = activeNode;
              setAlgorithmLog(prev => [
                ...prev,
                `  → Found shorter path to ${v}: ${activeNode}→${v} (Weight: ${edge.weight}) | New dist[${v}] = ${newDist}`
              ]);
              setPathEdges(prev => [...prev, [activeNode, v]]);
              await new Promise(resolve => setTimeout(resolve, 800));
            }
          }
        }
      }
    }

    // Trace path back from E
    const path: string[] = [];
    let pathNode: string | null = dest;
    while (pathNode) {
      path.unshift(pathNode);
      pathNode = parent[pathNode];
    }

    setIsAnimating(false);
    if (dist[dest] === Infinity) {
      setMessage(`No path found between ${start} and ${dest}.`);
    } else {
      // Filter out path edges to show final shortest path in gold
      const finalEdges: [string, string][] = [];
      for (let i = 0; i < path.length - 1; i++) {
        finalEdges.push([path[i], path[i + 1]]);
      }
      setPathEdges(finalEdges);
      setMessage(`🎉 Dijkstra Completed! Shortest Path: ${path.join(" → ")} (Total Cost: ${dist[dest]})`);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Network className="text-blue-600 dark:text-blue-400 h-5.5 w-5.5 animate-pulse" /> Graph Algorithms Workspace
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Build adjacency connections and visualize BFS, DFS, and Dijkstra's Shortest Path routing.
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setActiveTab("traverse")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "traverse" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            Traversals (BFS/DFS)
          </button>
          <button
            onClick={() => setActiveTab("advanced")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "advanced" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            Routing (Dijkstra)
          </button>
        </div>
      </div>

      {/* Controller Buttons */}
      <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-wrap justify-between items-center gap-4 shadow-sm">
        <div className="flex gap-2">
          {activeTab === "traverse" ? (
            <>
              <button
                onClick={() => runTraversal("bfs")}
                disabled={isAnimating || nodes.length === 0}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-850 text-white rounded-lg transition-colors"
              >
                <Play className="h-3.5 w-3.5" /> Run BFS
              </button>
              <button
                onClick={() => runTraversal("dfs")}
                disabled={isAnimating || nodes.length === 0}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-850 text-white rounded-lg transition-colors"
              >
                <Play className="h-3.5 w-3.5" /> Run DFS
              </button>
            </>
          ) : (
            <button
              onClick={runDijkstra}
              disabled={isAnimating || nodes.length === 0}
              className="flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 bg-yellow-600 hover:bg-yellow-550 disabled:bg-slate-200 dark:disabled:bg-slate-850 text-white rounded-lg transition-colors"
            >
              <Play className="h-3.5 w-3.5" /> Run Dijkstra's Path (A → E)
            </button>
          )}
        </div>

        <button
          onClick={initDefaultGraph}
          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 rounded-lg transition-all"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Reset Graph
        </button>
      </div>

      {/* Message Info Box */}
      <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-400">
        {message}
      </div>

      {/* Main Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG Drawing Canvas */}
        <div className="lg:col-span-2 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl min-h-[300px] relative overflow-hidden shadow-inner">
          <svg
            onClick={handleCanvasClick}
            className="w-full h-72 cursor-crosshair"
          >
            {/* Draw Edges */}
            {edges.map((edge, idx) => {
              const uNode = nodes.find(n => n.id === edge.u);
              const vNode = nodes.find(n => n.id === edge.v);
              if (!uNode || !vNode) return null;

              // Check if edge is part of active traversal path
              const isPath = pathEdges.some(
                p => (p[0] === edge.u && p[1] === edge.v) || (p[0] === edge.v && p[1] === edge.u)
              );

              return (
                <g key={idx}>
                  <line
                    x1={uNode.x}
                    y1={uNode.y}
                    x2={vNode.x}
                    y2={vNode.y}
                    className={`transition-colors duration-300 ${isPath ? "stroke-yellow-500" : "stroke-slate-300 dark:stroke-slate-700"}`}
                    strokeWidth={isPath ? "4" : "2"}
                  />
                  {/* Draw Edge Weight Label at midpoint */}
                  <rect
                    x={(uNode.x + vNode.x) / 2 - 8}
                    y={(uNode.y + vNode.y) / 2 - 8}
                    width="16"
                    height="16"
                    rx="4"
                    className="fill-white dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800"
                    strokeWidth="1"
                  />
                  <text
                    x={(uNode.x + vNode.x) / 2}
                    y={(uNode.y + vNode.y) / 2 + 4}
                    className="fill-slate-500 dark:fill-slate-400 font-bold font-mono"
                    fontSize="9px font-bold font-mono"
                    textAnchor="middle"
                  >
                    {edge.weight}
                  </text>
                </g>
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node) => {
              const isVisited = visitedNodes.includes(node.id);
              const isFrontier = frontierNodes.includes(node.id);
              const isSelected = selectedNodeId === node.id;

              let colorClass = "fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 text-slate-800 dark:text-slate-200";
              if (isSelected) {
                colorClass = "fill-blue-50 dark:fill-blue-950/30 stroke-blue-500 text-blue-600 dark:text-blue-300";
              } else if (isFrontier) {
                colorClass = "fill-purple-50 dark:fill-purple-950/30 stroke-purple-500 text-purple-600 dark:text-purple-300";
              } else if (isVisited) {
                colorClass = "fill-emerald-50 dark:fill-emerald-950/30 stroke-emerald-500 text-emerald-600 dark:text-emerald-450";
              }

              const r = 16;

              return (
                <g
                  key={node.id}
                  onClick={(e) => handleNodeClick(e, node.id)}
                  className="cursor-pointer group select-none"
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r}
                    className={`transition-colors duration-300 stroke-[2.5px] ${colorClass}`}
                  />
                  <text
                    x={node.x}
                    y={node.y + 3.5}
                    className={`text-xs font-bold text-center select-none pointer-events-none fill-current ${colorClass}`}
                    fontSize="10 font-bold"
                    textAnchor="middle"
                  >
                    {node.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Algorithm Console / Log */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between max-h-[300px] shadow-sm">
          <div className="space-y-3 overflow-hidden flex flex-col h-full">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block shrink-0">
              Algorithm Execution Log
            </span>

            <div className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl p-3 font-mono text-[10px] text-slate-600 dark:text-slate-400 overflow-y-auto space-y-1 shadow-inner">
              {algorithmLog.map((log, idx) => (
                <div key={idx} className="border-b border-slate-200/60 dark:border-slate-900/60 pb-1 text-slate-700 dark:text-slate-300">
                  {log}
                </div>
              ))}
              {algorithmLog.length === 0 && (
                <div className="text-slate-400 dark:text-slate-600 italic py-16 text-center">
                  // Console inactive. Click Run algorithms.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}