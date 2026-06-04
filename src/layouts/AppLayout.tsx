import { Link, Outlet, useLocation } from "react-router-dom";
import { BookOpen, Award, CheckCircle2, Sun, Moon, Sparkles, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SyllabusBlock {
  title: string;
  topics: {
    id: string;
    name: string;
    day: number;
    badge?: string;
  }[];
}

const TOPIC_GROUPS: SyllabusBlock[] = [
  {
    title: "1. Fundamentals & Basics",
    topics: [
      { id: "complexity", name: "Complexity Analysis", day: 1, badge: "Theory" },
      { id: "sparse-matrix", name: "Sparse Matrix", day: 2, badge: "3-Tuple" },
      { id: "hanoi", name: "Towers of Hanoi", day: 7, badge: "Recursion" },
    ]
  },
  {
    title: "2. Linear Data Structures",
    topics: [
      { id: "linked-list", name: "Linked Lists", day: 3, badge: "Singly/Doubly" },
      { id: "stack", name: "Stacks & Multi-Stack", day: 4, badge: "LIFO" },
      { id: "queue", name: "Queues & Dequeues", day: 5, badge: "FIFO" },
    ]
  },
  {
    title: "3. Non-Linear Structures",
    topics: [
      { id: "trees", name: "Trees & AVL Rotations", day: 6, badge: "BST/AVL" },
      { id: "graphs", name: "Graphs & Traversals", day: 8, badge: "DFS/BFS" },
    ]
  },
  {
    title: "4. Algorithms & Techniques",
    topics: [
      { id: "sorting", name: "Sorting Techniques", day: 9, badge: "Quick/Merge" },
      { id: "searching", name: "Searching (Linear/Binary)", day: 9, badge: "Log N" },
    ]
  },
  {
    title: "5. Hashing & Storage",
    topics: [
      { id: "hash-table", name: "Hash Tables", day: 10, badge: "Collisions" },
      { id: "file-org", name: "File Organization", day: 10, badge: "Index/Direct" },
    ]
  }
];

interface TheoryModule {
  id: string;
  name: string;
  moduleNum: number;
  badge?: string;
}

const THEORY_MODULES: TheoryModule[] = [
  { id: "0_table_of_content", name: "Table of Contents", moduleNum: 0, badge: "Roadmap" },
  { id: "1_c_programming_fundamentals", name: "C Fundamentals", moduleNum: 1 },
  { id: "2_algorithm_analysis", name: "Algorithm Analysis", moduleNum: 2 },
  { id: "3_arrays", name: "Arrays", moduleNum: 3 },
  { id: "4_strings_topics", name: "Strings & Patterns", moduleNum: 4 },
  { id: "5_linked_lists", name: "Linked Lists", moduleNum: 5 },
  { id: "6_stack_topics", name: "Stacks", moduleNum: 6 },
  { id: "7_queue", name: "Queues", moduleNum: 7 },
  { id: "8_recursion", name: "Recursion & Backtrack", moduleNum: 8 },
  { id: "9_searching_algorithms", name: "Searching", moduleNum: 9 },
  { id: "10_sorting_algorithms", name: "Sorting Techniques", moduleNum: 10 },
  { id: "11_hashing", name: "Hashing & Tables", moduleNum: 11 },
  { id: "12_trees", name: "Trees & BST", moduleNum: 12 },
  { id: "13_graphs", name: "Graphs & Traversals", moduleNum: 13 },
  { id: "14_advanced_algorithms", name: "Advanced Algorithms", moduleNum: 14, badge: "Bonus" }
];

export default function AppLayout() {
  const location = useLocation();
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("dsa_theme") as "light" | "dark") || "light";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<"visualizers" | "theory">(() => {
    return location.pathname.startsWith("/theory") ? "theory" : "visualizers";
  });

  // Auto-sync sidebar mode when location changes
  useEffect(() => {
    if (location.pathname.startsWith("/theory")) {
      setSidebarMode("theory");
    } else {
      setSidebarMode("visualizers");
    }
  }, [location.pathname]);

  // Toggle Theme helper
  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("dsa_theme", nextTheme);
  };

  // Sync theme class to <html> element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Reload completed quizzes from localStorage to calculate progress dynamically
  const reloadProgress = () => {
    try {
      const stored = localStorage.getItem("dsa_completed_quizzes");
      if (stored) {
        setCompletedQuizzes(JSON.parse(stored));
      } else {
        setCompletedQuizzes([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    reloadProgress();
    // Add window listener to reload when quizzes are submitted
    window.addEventListener("dsa_progress_updated", reloadProgress);
    return () => window.removeEventListener("dsa_progress_updated", reloadProgress);
  }, []);

  const totalTopics = TOPIC_GROUPS.flatMap(b => b.topics).length;
  const completedCount = completedQuizzes.length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-slate-100 overflow-hidden font-sans theme-transition">
      
      {/* Backdrop overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Google Styled */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-805 flex flex-col h-full shrink-0 shadow-xl lg:shadow-sm transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } theme-transition`}>
        
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-md">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight tracking-tight text-slate-900 dark:text-white">Learn DSA</h1>
              <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">Visual Guide</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {/* Light/Dark mode toggler */}
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              title="Toggle theme mode"
            >
              {theme === "light" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-yellow-400" />}
            </button>
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 lg:hidden"
              title="Close sidebar"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider flex items-center">
              <Award className="h-3.5 w-3.5 mr-1.5 text-blue-600 dark:text-blue-400" /> Learning Progress
            </span>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
              {progressPercent}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Mastered {completedCount} of {totalTopics} core topics
          </p>
        </div>

        {/* Navigation Mode Switcher */}
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10">
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-850">
            <button
              onClick={() => setSidebarMode("visualizers")}
              className={`w-full py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all ${
                sidebarMode === "visualizers"
                  ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-205"
              }`}
            >
              Visualizers
            </button>
            <button
              onClick={() => setSidebarMode("theory")}
              className={`w-full py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all ${
                sidebarMode === "theory"
                  ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-205"
              }`}
            >
              Theory Modules
            </button>
          </div>
        </div>

        {/* Navigation Area */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {sidebarMode === "visualizers" ? (
            TOPIC_GROUPS.map((block, bIdx) => (
              <div key={bIdx} className="space-y-2">
                <div className="text-[11px] text-slate-500 dark:text-slate-555 uppercase font-bold tracking-widest px-2">
                  {block.title}
                </div>
                
                <div className="space-y-0.5">
                  {block.topics.map((topic) => {
                    const path = `/topic/${topic.id}`;
                    const isActive = location.pathname === path;
                    const isCompleted = completedQuizzes.includes(topic.id);

                    return (
                      <Link
                        key={topic.id}
                        to={path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`group flex items-center justify-between p-2 rounded-xl transition-all duration-150 ${
                          isActive
                            ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 font-semibold"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-205"
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <div className={`h-4 w-4 rounded-full border shrink-0 flex items-center justify-center ${
                              isActive ? "border-blue-600 dark:border-blue-500" : "border-slate-300 dark:border-slate-700 group-hover:border-slate-400 dark:group-hover:border-slate-650"
                            }`}>
                              <div className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-blue-600 dark:bg-blue-500" : "bg-transparent"}`} />
                            </div>
                          )}
                          <span className="text-xs font-semibold truncate leading-none">
                            {topic.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 shrink-0 pl-1">
                          {topic.badge && (
                            <span className="text-[8px] px-1 rounded font-bold bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                              {topic.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-3">
              <div className="text-[11px] text-slate-500 dark:text-slate-550 uppercase font-bold tracking-widest px-2 mb-2">
                Course Theory
              </div>
              <div className="space-y-0.5">
                {THEORY_MODULES.map((module) => {
                  const path = `/theory/${module.id}`;
                  const isActive = location.pathname === path;

                  return (
                    <Link
                      key={module.id}
                      to={path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`group flex items-center justify-between p-2 rounded-xl transition-all duration-150 ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 font-semibold"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className={`h-6 w-6 rounded-lg flex items-center justify-center text-[9px] font-mono font-bold border shrink-0 transition-colors ${
                          isActive
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-slate-50 dark:bg-slate-955 border-slate-205 dark:border-slate-850 text-slate-500 dark:text-slate-400 group-hover:bg-slate-100 dark:group-hover:bg-slate-800"
                        }`}>
                          M{module.moduleNum}
                        </div>
                        <span className="text-xs font-semibold truncate leading-none">
                          {module.name}
                        </span>
                      </div>
                      
                      {module.badge && (
                        <div className="flex items-center space-x-1 shrink-0 pl-1">
                          <span className="text-[8px] px-1 rounded font-bold bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                            {module.badge}
                          </span>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 text-center">
          <div className="inline-flex items-center text-[10px] font-bold text-slate-400 dark:text-slate-500">
            <Sparkles className="h-3 w-3 mr-1 text-yellow-500" /> Google Inspired Design
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between lg:hidden shrink-0 z-30 transition-colors">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">Learn DSA</span>
            </div>
          </div>
          
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-full border border-slate-200 dark:border-slate-805 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            title="Toggle theme mode"
          >
            {theme === "light" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-yellow-400" />}
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6 md:p-8 flex flex-col min-w-0 theme-transition">
          <Outlet />
        </main>
      </div>
    </div>
  );
}