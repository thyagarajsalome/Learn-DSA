import React from "react";
import ArrayVisualizer from "./components/ArrayVisualizer";
import GraphVisualization from "./components/GraphVisualization";

function App() {
  return (
    <div className="app-container bg-slate-200 m-4 p-4">
      <ArrayVisualizer />
      <GraphVisualization />
    </div>
  );
}

export default App;
