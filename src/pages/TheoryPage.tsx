import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { BookOpen, ChevronUp, Clock, AlignLeft } from "lucide-react";

export default function TheoryPage() {
  const { theoryId } = useParams<{ theoryId: string }>();
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Scroll to top and load content when module changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!theoryId) return;

    setLoading(true);
    setError(false);

    fetch(`/theory/${theoryId}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
        // Estimate word count for reading time
        const words = text.trim().split(/\s+/).length;
        setWordCount(words);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading theory module:", err);
        setError(true);
        setLoading(false);
      });
  }, [theoryId]);

  const readTime = Math.max(1, Math.round(wordCount / 200)); // ~200 WPM

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading module contents...</span>
      </div>
    );
  }

  if (error || !markdown) {
    return (
      <div className="p-8 text-xl font-bold text-rose-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-center max-w-2xl mx-auto my-12">
        Error: Theory module not found! Please check the module path.
      </div>
    );
  }

  // Friendly title cleanup
  const friendlyTitle = theoryId
    ? theoryId
        .replace(/^\d+_/g, "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Theory Module";

  const moduleNumber = theoryId?.match(/^\d+/)?.[0] || "0";

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 relative">
      
      {/* Module Meta Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm theme-transition flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            <BookOpen className="h-3 w-3" /> Module {moduleNumber}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {friendlyTitle}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-3 py-1.5 rounded-xl">
            <Clock className="h-3.5 w-3.5 text-blue-500" />
            <span>{readTime} Min Read</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-3 py-1.5 rounded-xl">
            <AlignLeft className="h-3.5 w-3.5 text-blue-500" />
            <span>{wordCount.toLocaleString()} Words</span>
          </div>
        </div>
      </div>

      {/* Main Theory Markdown Content */}
      <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-10 rounded-3xl shadow-sm theme-transition">
        <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 pb-2 border-b border-slate-100 dark:border-slate-850 tracking-tight" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-bold text-slate-805 dark:text-slate-100 mt-8 mb-4 tracking-tight" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3 tracking-tight" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="my-3 leading-relaxed text-[14px]" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside pl-4 space-y-2 my-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside pl-4 space-y-2 my-4" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-slate-705 dark:text-slate-300 inline-block w-full" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code className="bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded font-mono text-[12px] text-rose-600 dark:text-rose-400 border border-slate-200/50 dark:border-slate-855/50" {...props} />
              ),
              hr: ({ node, ...props }) => (
                <hr className="my-8 border-slate-100 dark:border-slate-800" {...props} />
              ),
              pre: ({ node, ...props }) => (
                <pre className="bg-slate-955 rounded-xl p-4 border border-slate-900 overflow-x-auto text-[11px] leading-relaxed font-mono text-slate-200 my-4" {...props} />
              )
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </article>

      {/* Floating back-to-top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-750 text-white rounded-full shadow-lg transition-all focus:outline-none z-50 hover:scale-105"
        title="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

    </div>
  );
}
