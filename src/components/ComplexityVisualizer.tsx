import { useState } from "react";
import { Activity, Compass } from "lucide-react";

interface ComplexityClass {
  name: string;
  notation: string;
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  textColorLight: string;
  textColorDark: string;
  calc: (n: number) => number;
  analogy: string;
  description: string;
}

export default function ComplexityVisualizer() {
  const [nVal, setNVal] = useState<number>(20);
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);

  const maxN = 50;
  const maxOpsLimit = 1500; // Cap for visual scale on graph

  const complexities: ComplexityClass[] = [
    {
      name: "Constant Time",
      notation: "O(1)",
      color: "#1a73e8", // Google Blue
      bgLight: "bg-blue-50",
      bgDark: "dark:bg-blue-950/20",
      borderLight: "border-blue-200",
      borderDark: "dark:border-blue-900/40",
      textColorLight: "text-blue-600",
      textColorDark: "dark:text-blue-400",
      calc: () => 1,
      description: "Execution time is always the same, regardless of input size.",
      analogy: "Looking up your home address. No matter how big the city is, you only have one address."
    },
    {
      name: "Logarithmic Time",
      notation: "O(log N)",
      color: "#10b981", // Google Green
      bgLight: "bg-emerald-50",
      bgDark: "dark:bg-emerald-955/20 dark:bg-emerald-950/20",
      borderLight: "border-emerald-200",
      borderDark: "dark:border-emerald-900/40",
      textColorLight: "text-emerald-600",
      textColorDark: "dark:text-emerald-450 dark:text-emerald-400",
      calc: (n) => Math.log2(n || 1),
      description: "Problem size halves with each step. Very efficient for large inputs.",
      analogy: "Finding a word in a dictionary. You open it in the middle, discard half, and repeat."
    },
    {
      name: "Linear Time",
      notation: "O(N)",
      color: "#f59e0b", // Google Yellow/Amber
      bgLight: "bg-amber-50",
      bgDark: "dark:bg-amber-950/20",
      borderLight: "border-amber-200",
      borderDark: "dark:border-amber-900/40",
      textColorLight: "text-amber-600",
      textColorDark: "dark:text-amber-400",
      calc: (n) => n,
      description: "Execution steps scale directly 1:1 with the input size.",
      analogy: "Reading a book page-by-page. If the book is twice as long, it takes twice as long to read."
    },
    {
      name: "Linearithmic Time",
      notation: "O(N log N)",
      color: "#8b5cf6", // Google Purple
      bgLight: "bg-purple-50",
      bgDark: "dark:bg-purple-950/20",
      borderLight: "border-purple-200",
      borderDark: "dark:border-purple-900/40",
      textColorLight: "text-purple-600",
      textColorDark: "dark:text-purple-400",
      calc: (n) => n * Math.log2(n || 1),
      description: "Common in efficient sorting algorithms like Merge Sort and Quick Sort.",
      analogy: "Sorting a deck of cards by splitting it into smaller piles, sorting them, and combining."
    },
    {
      name: "Quadratic Time",
      notation: "O(N²)",
      color: "#ef4444", // Google Red
      bgLight: "bg-red-50",
      bgDark: "dark:bg-red-950/20",
      borderLight: "border-red-200",
      borderDark: "dark:border-red-900/40",
      textColorLight: "text-red-655 text-red-600",
      textColorDark: "dark:text-red-400",
      calc: (n) => n * n,
      description: "Requires nested iterations. Performance degrades quickly for larger inputs.",
      analogy: "Shaking hands at a party. If there are N people, everyone must shake hands with everyone else."
    }
  ];

  // SVG dimensions
  const width = 450;
  const height = 280;
  const paddingLeft = 40;
  const paddingBottom = 40;
  const paddingTop = 20;
  const paddingRight = 20;

  const graphWidth = width - paddingLeft - paddingRight;
  const graphHeight = height - paddingTop - paddingBottom;

  // Helper to map (n, ops) to SVG coordinates
  const getCoordinates = (n: number, ops: number) => {
    const x = paddingLeft + (n / maxN) * graphWidth;
    const clampedOps = Math.min(ops, maxOpsLimit);
    const y = paddingTop + graphHeight - (clampedOps / maxOpsLimit) * graphHeight;
    return { x, y };
  };

  // Generate SVG Path for a complexity class
  const getPathData = (cClass: ComplexityClass) => {
    let path = "";
    for (let i = 1; i <= maxN; i++) {
      const ops = cClass.calc(i);
      const { x, y } = getCoordinates(i, ops);
      if (i === 1) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    }
    return path;
  };

  // Guide lines coordinate logic
  const guideX = paddingLeft + (nVal / maxN) * graphWidth;

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Activity className="text-blue-600 dark:text-blue-400 h-5.5 w-5.5" /> Complexity Growth Simulator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Slide the input size slider to see how computational steps grow across different mathematical efficiency classes.
          </p>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-850 text-xs text-slate-500 dark:text-slate-400 w-full md:w-fit shrink-0">
          <span className="font-bold">Input Size (N):</span>
          <input
            type="range"
            min={2}
            max={maxN}
            value={nVal}
            onChange={(e) => setNVal(parseInt(e.target.value))}
            className="accent-blue-600 cursor-pointer w-36"
          />
          <span className="text-blue-600 dark:text-blue-400 font-extrabold text-sm w-6 text-center">{nVal}</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          <Compass className="h-4 w-4 text-blue-500" />
          <span>Compare slopes: steeper slopes run slower!</span>
        </div>
      </div>

      {/* Main Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SVG Complexity Growth Line Chart */}
        <div className="bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl p-4 flex items-center justify-center shadow-inner relative overflow-hidden">
          <div className="relative w-full max-w-[450px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
              
              {/* Grid Lines */}
              <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft + graphWidth} y2={paddingTop} className="stroke-slate-200 dark:stroke-slate-900" strokeWidth="1" strokeDasharray="4 4" />
              <line x1={paddingLeft} y1={paddingTop + graphHeight / 2} x2={paddingLeft + graphWidth} y2={paddingTop + graphHeight / 2} className="stroke-slate-200 dark:stroke-slate-900" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Axes lines */}
              <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={paddingTop + graphHeight} className="stroke-slate-300 dark:stroke-slate-800" strokeWidth="2" />
              <line x1={paddingLeft} y1={paddingTop + graphHeight} x2={paddingLeft + graphWidth} y2={paddingTop + graphHeight} className="stroke-slate-300 dark:stroke-slate-800" strokeWidth="2" />

              {/* Y Axis Labels */}
              <text x={paddingLeft - 8} y={paddingTop + 4} className="fill-slate-400 font-mono text-[8px]" textAnchor="end">1500</text>
              <text x={paddingLeft - 8} y={paddingTop + graphHeight / 2 + 4} className="fill-slate-400 font-mono text-[8px]" textAnchor="end">750</text>
              <text x={paddingLeft - 8} y={paddingTop + graphHeight + 4} className="fill-slate-400 font-mono text-[8px]" textAnchor="end">0</text>
              <text x={paddingLeft - 22} y={paddingTop + graphHeight / 2} className="fill-slate-400 text-[8px] font-bold" textAnchor="middle" transform={`rotate(-90, ${paddingLeft - 22}, ${paddingTop + graphHeight / 2})`}>Operations Count</text>

              {/* X Axis Labels */}
              <text x={paddingLeft} y={paddingTop + graphHeight + 15} className="fill-slate-400 font-mono text-[8px]" textAnchor="middle">N=1</text>
              <text x={paddingLeft + graphWidth / 2} y={paddingTop + graphHeight + 15} className="fill-slate-400 font-mono text-[8px]" textAnchor="middle">N={maxN / 2}</text>
              <text x={paddingLeft + graphWidth} y={paddingTop + graphHeight + 15} className="fill-slate-400 font-mono text-[8px]" textAnchor="middle">N={maxN}</text>
              <text x={paddingLeft + graphWidth / 2} y={paddingTop + graphHeight + 28} className="fill-slate-400 text-[8px] font-bold" textAnchor="middle">Input Size (N)</text>

              {/* Plot Curves */}
              {complexities.map((cClass) => {
                const isHovered = hoveredClass === cClass.notation;
                const pathData = getPathData(cClass);

                return (
                  <path
                    key={cClass.notation}
                    d={pathData}
                    fill="none"
                    stroke={cClass.color}
                    strokeWidth={isHovered ? "4" : "2"}
                    className="transition-all duration-150 cursor-pointer"
                    onMouseEnter={() => setHoveredClass(cClass.notation)}
                    onMouseLeave={() => setHoveredClass(null)}
                  />
                );
              })}

              {/* Vertical Guide Line for Selected N */}
              <line
                x1={guideX}
                y1={paddingTop}
                x2={guideX}
                y2={paddingTop + graphHeight}
                className="stroke-blue-500/40 dark:stroke-blue-400/40"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Intersection Dots */}
              {complexities.map((cClass) => {
                const ops = cClass.calc(nVal);
                const isHovered = hoveredClass === cClass.notation;
                const { x, y } = getCoordinates(nVal, ops);

                return (
                  <circle
                    key={cClass.notation}
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 4}
                    fill={cClass.color}
                    className="stroke-white dark:stroke-slate-950 transition-all duration-150 cursor-pointer"
                    strokeWidth="1.5"
                    onMouseEnter={() => setHoveredClass(cClass.notation)}
                    onMouseLeave={() => setHoveredClass(null)}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Dynamic Calculator & Analogies */}
        <div className="space-y-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
            Operation Counts & Analogies
          </span>

          <div className="grid grid-cols-1 gap-2.5">
            {complexities.map((cClass) => {
              const ops = cClass.calc(nVal);
              const formattedOps = ops < 1 ? ops.toFixed(2) : Math.round(ops).toLocaleString();
              const isHovered = hoveredClass === cClass.notation;

              return (
                <div
                  key={cClass.notation}
                  onMouseEnter={() => setHoveredClass(cClass.notation)}
                  onMouseLeave={() => setHoveredClass(null)}
                  className={`border p-3.5 rounded-xl flex items-center justify-between transition-all select-none ${
                    isHovered 
                      ? `${cClass.bgLight} ${cClass.bgDark} ${cClass.borderLight} ${cClass.borderDark} shadow-sm` 
                      : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="space-y-1 max-w-[72%]">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${cClass.textColorLight} ${cClass.textColorDark}`}>
                        {cClass.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                        {cClass.notation}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                      {cClass.description}
                    </p>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 italic leading-normal pt-0.5">
                      <strong>Analogy:</strong> {cClass.analogy}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-extrabold text-slate-800 dark:text-slate-200">
                      {formattedOps}
                    </div>
                    <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                      Steps
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
