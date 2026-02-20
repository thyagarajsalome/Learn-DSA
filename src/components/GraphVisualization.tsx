import { useState, useEffect } from "react";

// Add TypeScript interface for the Adjacency List
interface AdjacencyList {
  [key: string]: string[];
}

class Graph {
  adjacencyList: AdjacencyList;

  constructor() {
    this.adjacencyList = {};
  }

  addNode(node: string) {
    if (!this.adjacencyList[node]) {
      this.adjacencyList[node] = [];
    }
  }

  addEdge(node1: string, node2: string) {
    if (!this.adjacencyList[node1] || !this.adjacencyList[node2]) {
      return false;
    }
    if (!this.adjacencyList[node1].includes(node2)) {
      this.adjacencyList[node1].push(node2);
      this.adjacencyList[node2].push(node1); // Undirected graph
    }
    return true;
  }

  showGraph(): string[] {
    return Object.entries(this.adjacencyList).map(
      ([node, connections]) => `${node} -> [ ${connections.join(", ")} ]`
    );
  }
}

const GraphVisualization = () => {
  const [graph, setGraph] = useState(new Graph());
  const [newNode, setNewNode] = useState("");
  const [node1, setNode1] = useState("");
  const [node2, setNode2] = useState("");
  const [graphDisplay, setGraphDisplay] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setGraphDisplay(graph.showGraph());
  }, [graph]);

  const handleAddNode = () => {
    if (newNode && !graph.adjacencyList[newNode]) {
      const updatedGraph = new Graph();
      Object.assign(updatedGraph.adjacencyList, JSON.parse(JSON.stringify(graph.adjacencyList)));
      updatedGraph.addNode(newNode);
      setGraph(updatedGraph);
      setNewNode("");
      setError("");
    } else {
      setError("Invalid node name or node already exists");
    }
  };

  const handleAddEdge = () => {
    const updatedGraph = new Graph();
    Object.assign(updatedGraph.adjacencyList, JSON.parse(JSON.stringify(graph.adjacencyList)));
    if (updatedGraph.addEdge(node1, node2)) {
      setGraph(updatedGraph);
      setNode1("");
      setNode2("");
      setError("");
    } else {
      setError("Invalid nodes or edge already exists");
    }
  };

  const handleReset = () => {
    setGraph(new Graph());
    setNewNode("");
    setNode1("");
    setNode2("");
    setError("");
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Graph (Adjacency List)</h2>

      {/* Node Control */}
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          value={newNode}
          onChange={(e) => setNewNode(e.target.value)}
          placeholder="New Node (e.g., A)"
          className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleAddNode} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
          Add Node
        </button>
      </div>

      {/* Edge Control */}
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          value={node1}
          onChange={(e) => setNode1(e.target.value)}
          placeholder="From Node"
          className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 w-32"
        />
        <input
          type="text"
          value={node2}
          onChange={(e) => setNode2(e.target.value)}
          placeholder="To Node"
          className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 w-32"
        />
        <button onClick={handleAddEdge} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
          Add Edge
        </button>
      </div>

      <button onClick={handleReset} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md font-medium transition-colors w-fit mb-4">
        Reset Graph
      </button>

      {error && <div className="text-rose-600 bg-rose-50 p-3 rounded-md mb-4 font-medium border-l-4 border-rose-500">{error}</div>}

      {/* Visual Workspace */}
      <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-6 min-h-[250px]">
        <h3 className="text-lg font-semibold mb-3 text-slate-700">Internal Structure</h3>
        <div className="bg-slate-900 text-green-400 font-mono p-4 rounded-lg shadow-inner min-h-[150px]">
          {graphDisplay.length > 0 ? (
            graphDisplay.map((line, index) => <div key={index} className="mb-1">{line}</div>)
          ) : (
            <div className="text-slate-500 italic">// Graph is empty</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;