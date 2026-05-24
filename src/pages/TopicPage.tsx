import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { topics } from "../content/dsaData";
import { Terminal, FileText, CheckSquare, Lightbulb, Code2, Check, X, Award, RefreshCw } from "lucide-react";

// Components Imports
import LinkedListVisualization from "../components/LinkedListVisualization";
import StackVisualization from "../components/StackVisualization";
import QueueVisualization from "../components/QueueVisualization";
import HashTable from "../components/HashTable";
import TreeVisualization from "../components/TreeVisualization";
import GraphVisualization from "../components/GraphVisualization";
import SortingVisualization from "../components/SortingVisualization";
import SearchingVisualization from "../components/SearchingVisualization";

// New Components
import SparseMatrixVisualizer from "../components/SparseMatrixVisualizer";
import TowersOfHanoiVisualizer from "../components/TowersOfHanoiVisualizer";
import FileOrganizationTheory from "../components/FileOrganizationTheory";
import ComplexityVisualizer from "../components/ComplexityVisualizer";

export default function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const topicData = topics[topicId || ""];

  // Tab State
  const [activeTab, setActiveTab] = useState<"visualizer" | "theory" | "quiz">("visualizer");

  // Code snippet Language state
  const [selectedLangIdx, setSelectedLangIdx] = useState<number>(0);

  // Quiz States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // Reset tab and states when topic changes
  useEffect(() => {
    setActiveTab("visualizer");
    setSelectedLangIdx(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
  }, [topicId]);

  if (!topicData) {
    return (
      <div className="p-8 text-xl font-bold text-rose-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-center">
        Topic not found! Please select a valid topic from the sidebar.
      </div>
    );
  }

  // FACTORY PATTERN for Visualizers
  const renderVisualizer = () => {
    switch (topicId) {
      case "complexity": return <ComplexityVisualizer />;
      case "sparse-matrix": return <SparseMatrixVisualizer />;
      case "hanoi": return <TowersOfHanoiVisualizer />;
      case "linked-list": return <LinkedListVisualization />;
      case "stack": return <StackVisualization />;
      case "queue": return <QueueVisualization />;
      case "hash-table": return <HashTable />;
      case "trees": return <TreeVisualization />;
      case "graphs": return <GraphVisualization />;
      case "sorting": return <SortingVisualization />;
      case "searching": return <SearchingVisualization />;
      case "file-org": return <FileOrganizationTheory />;
      default: return <div className="text-slate-400 text-center py-16">Visualizer coming soon.</div>;
    }
  };

  // Handle Quiz Option selection
  const handleSelectOption = (qIdx: number, oIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qIdx]: oIdx
    }));
  };

  // Submit and validate quiz
  const handleSubmitQuiz = () => {
    if (quizSubmitted) return;
    
    let allCorrect = true;
    topicData.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] !== q.answerIndex) {
        allCorrect = false;
      }
    });

    setQuizSubmitted(true);
    setQuizPassed(allCorrect);

    // If quiz is successfully completed/passed, update localStorage
    if (allCorrect) {
      try {
        const stored = localStorage.getItem("dsa_completed_quizzes");
        const completed: string[] = stored ? JSON.parse(stored) : [];
        if (!completed.includes(topicData.id)) {
          completed.push(topicData.id);
          localStorage.setItem("dsa_completed_quizzes", JSON.stringify(completed));
          // Dispatch custom event to notify sidebar progress reload
          window.dispatchEvent(new Event("dsa_progress_updated"));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header section - Google Styled */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
        <div>
          <span className="text-[10px] bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {topicData.difficulty}
          </span>
          <h1 className="text-3xl font-extrabold mt-3 tracking-tight text-slate-900 dark:text-white">
            {topicData.title}
          </h1>
        </div>

        {/* Tab Selection Navigation (Google Style) */}
        <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shrink-0">
          <button
            onClick={() => setActiveTab("visualizer")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "visualizer" 
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Terminal className="h-3.5 w-3.5" /> Simulation
          </button>
          <button
            onClick={() => setActiveTab("theory")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "theory" 
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <FileText className="h-3.5 w-3.5" /> Simple Theory
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "quiz" 
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" /> Practice Quiz
          </button>
        </div>
      </div>

      {/* Main tab contents */}
      <div className="min-h-[500px]">
        
        {/* TAB 1: VISUALIZER */}
        {activeTab === "visualizer" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm min-h-[480px] theme-transition">
            {renderVisualizer()}
          </div>
        )}

        {/* TAB 2: DETAILED SIMPLE THEORY */}
        {activeTab === "theory" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left theory container */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4 shadow-sm theme-transition">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" /> Simplified Explanation
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {topicData.explanation}
                </p>
              </div>

              {/* Applications grid */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-3 shadow-sm theme-transition">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Real-World Applications</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {topicData.useCases.map((useCase, idx) => (
                    <li key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 p-3.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Study Tips */}
              <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200/50 dark:border-blue-900/30 p-6 rounded-2xl space-y-3 shadow-sm">
                <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Study Tips & Key Insights
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-blue-300 leading-relaxed list-disc list-inside">
                  {topicData.examTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right code container */}
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col h-fit shadow-sm theme-transition">
              <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Code2 className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Code Snippet
                </span>
                
                {/* Languages selector buttons */}
                <div className="flex gap-1">
                  {topicData.codeSnippets.map((snippet, idx) => (
                    <button
                      key={snippet.language}
                      onClick={() => setSelectedLangIdx(idx)}
                      className={`text-[9px] font-bold px-2 py-0.5 rounded transition-all uppercase ${
                        selectedLangIdx === idx ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      {snippet.language}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code blocks */}
              <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-900 overflow-x-auto">
                <pre className="text-[11px] text-slate-200 font-mono leading-relaxed select-text">
                  <code>{topicData.codeSnippets[selectedLangIdx]?.code || "// Code snippet not loaded."}</code>
                </pre>
              </div>

              {/* Complexity cards */}
              <div className="mt-6 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900 p-4 rounded-xl space-y-3 font-mono text-xs">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-900 pb-1.5">Complexity Table</div>
                <div className="flex justify-between border-b border-slate-200/40 dark:border-slate-900/40 pb-1">
                  <span className="text-slate-500">Best Case:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{topicData.timeComplexity.best}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/40 dark:border-slate-900/40 pb-1">
                  <span className="text-slate-500">Avg Case:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{topicData.timeComplexity.average}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/40 dark:border-slate-900/40 pb-1">
                  <span className="text-slate-500">Worst Case:</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">{topicData.timeComplexity.worst}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Space Complexity:</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">{topicData.spaceComplexity}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PRACTICE QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-8 max-w-3xl mx-auto theme-transition">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" /> Interactive Practice Quiz
                </h3>
                <p className="text-xs text-slate-500 mt-1">Review your understanding of key details. Answer all questions to master this unit.</p>
              </div>
              {quizSubmitted && (
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold ${
                  quizPassed ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                }`}>
                  {quizPassed ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  <span>{quizPassed ? "Passed!" : "Review required"}</span>
                </div>
              )}
            </div>

            {/* Questions list */}
            <div className="space-y-6">
              {topicData.quiz.map((q, qIdx) => {
                const selectedOpt = selectedAnswers[qIdx];
                const isSubmitted = quizSubmitted;
                const isCorrect = selectedOpt === q.answerIndex;

                return (
                  <div key={qIdx} className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900 p-5 rounded-xl space-y-4">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                      {qIdx + 1}. {q.question}
                    </h4>
                    
                    {/* Options list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {q.options.map((opt, oIdx) => {
                        const isThisSelected = selectedOpt === oIdx;
                        const isThisCorrect = q.answerIndex === oIdx;
                        
                        let optStyle = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/10";
                        if (isThisSelected) {
                          optStyle = "border-blue-600 dark:border-blue-500 bg-blue-50/20 dark:bg-blue-950/10 text-blue-700 dark:text-blue-400";
                        }
                        if (isSubmitted) {
                          if (isThisCorrect) {
                            optStyle = "border-emerald-600 dark:border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-600 dark:text-emerald-400";
                          } else if (isThisSelected) {
                            optStyle = "border-rose-600 dark:border-rose-500 bg-rose-50/20 dark:bg-rose-950/10 text-rose-600 dark:text-rose-400";
                          } else {
                            optStyle = "border-slate-100 dark:border-slate-950 text-slate-400 dark:text-slate-600 opacity-60 pointer-events-none";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(qIdx, oIdx)}
                            className={`p-3 text-left rounded-lg text-xs font-semibold border-2 transition-all flex justify-between items-center ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && isThisCorrect && <Check className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />}
                            {isSubmitted && isThisSelected && !isThisCorrect && <X className="h-4.5 w-4.5 text-rose-600 dark:text-rose-500" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {isSubmitted && (
                      <div className="mt-3 bg-white dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200 dark:border-slate-850 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        <strong className={isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                          {isCorrect ? "Correct!" : "Incorrect."}
                        </strong>{" "}
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom quiz actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
              {quizSubmitted ? (
                <button
                  onClick={handleRetakeQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-750 text-xs font-bold text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Retake Quiz
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < topicData.quiz.length}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 dark:disabled:bg-slate-850 disabled:text-slate-400 dark:disabled:text-slate-600 text-xs font-bold text-white rounded-lg transition-colors"
                >
                  <Award className="h-4 w-4" /> Submit Answers
                </button>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}