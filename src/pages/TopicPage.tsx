import { useParams } from "react-router-dom";
// Corrected import path and removed .js
import { topics } from "../content/dsaData";

// Corrected component imports: removed the .js extensions
import ArrayVisualizer from "../components/ArrayVisualizer";
import LinkedListVisualization from "../components/LinkedListVisualization";
import StackVisualization from "../components/StackVisualization";
import QueueVisualization from "../components/QueueVisualization";
import HashTable from "../components/HashTable";
import TreeVisualization from "../components/TreeVisualization";
import GraphVisualization from "../components/GraphVisualization";
import SortingVisualization from "../components/SortingVisualization";
import SearchingVisualization from "../components/SearchingVisualization";

export default function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const topicData = topics[topicId || ""];

  if (!topicData) {
    return (
      <div className="p-8 text-xl font-bold text-red-500">
        Topic not found! Please select a valid topic from the sidebar.
      </div>
    );
  }

  // FACTORY PATTERN
  const renderVisualizer = () => {
    switch (topicId) {
      case "arrays": return <ArrayVisualizer />;
      case "linked-list": return <LinkedListVisualization />;
      case "stack": return <StackVisualization />;
      case "queue": return <QueueVisualization />;
      case "hash-table": return <HashTable />;
      case "trees": return <TreeVisualization />;
      case "graphs": return <GraphVisualization />;
      case "sorting": return <SortingVisualization />;
      case "searching": return <SearchingVisualization />;
      default: return <div>Visualizer coming soon!</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">{topicData.title}</h1>
        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
          {topicData.difficulty}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Theory Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-2">Explanation</h3>
            <p className="text-slate-600 leading-relaxed">{topicData.explanation}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-2">Real-World Use Cases</h3>
            <ul className="list-disc pl-5 text-slate-600 space-y-1">
              {topicData.useCases.map((uc, i) => <li key={i}>{uc}</li>)}
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-2">Complexity</h3>
            <p className="text-slate-600"><strong>Time (Avg):</strong> {topicData.timeComplexity.average}</p>
            <p className="text-slate-600"><strong>Space:</strong> {topicData.spaceComplexity}</p>
          </div>
        </div>

        {/* Visualizer Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[500px]">
             {renderVisualizer()}
          </div>
        </div>
      </div>
    </div>
  );
}