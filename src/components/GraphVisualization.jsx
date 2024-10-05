import React, { useState, useEffect } from "react";

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addNode(node) {
    if (!this.adjacencyList[node]) {
      this.adjacencyList[node] = [];
    }
  }

  addEdge(node1, node2) {
    if (!this.adjacencyList[node1] || !this.adjacencyList[node2]) {
      return false;
    }
    if (!this.adjacencyList[node1].includes(node2)) {
      this.adjacencyList[node1].push(node2);
      this.adjacencyList[node2].push(node1);
    }
    return true;
  }

  showGraph() {
    return Object.entries(this.adjacencyList).map(
      ([node, connections]) => `${node} -> ${connections.join(", ")}`
    );
  }
}

const GraphVisualization = () => {
  const [graph, setGraph] = useState(new Graph());
  const [newNode, setNewNode] = useState("");
  const [node1, setNode1] = useState("");
  const [node2, setNode2] = useState("");
  const [graphDisplay, setGraphDisplay] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setGraphDisplay(graph.showGraph());
  }, [graph]);

  const handleAddNode = () => {
    if (newNode && !graph.adjacencyList[newNode]) {
      const updatedGraph = new Graph();
      Object.assign(updatedGraph.adjacencyList, graph.adjacencyList);
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
    Object.assign(updatedGraph.adjacencyList, graph.adjacencyList);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Graph Visualization</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newNode}
          onChange={(e) => setNewNode(e.target.value)}
          placeholder="Enter node name"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddNode}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Node
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={node1}
          onChange={(e) => setNode1(e.target.value)}
          placeholder="Enter first node"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={node2}
          onChange={(e) => setNode2(e.target.value)}
          placeholder="Enter second node"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddEdge}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Edge
        </button>
      </div>

      <button
        onClick={handleReset}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
      >
        Reset Graph
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Graph Structure:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {graphDisplay.length > 0 ? (
            graphDisplay.map((line, index) => <div key={index}>{line}</div>)
          ) : (
            <div>Graph is empty</div>
          )}
        </pre>
      </div>
    </div>
  );
};

export default GraphVisualization;
