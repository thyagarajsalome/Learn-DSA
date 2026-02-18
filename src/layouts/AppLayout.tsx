import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white overflow-y-auto">
        <div className="p-4 text-2xl font-bold border-b border-slate-700">Learn DSA</div>
        <nav className="p-4 space-y-2">
          <div className="text-slate-400 text-sm uppercase font-bold mt-4">Fundamentals</div>
          <Link to="/topic/arrays" className="block hover:bg-slate-800 p-2 rounded">Arrays</Link>
          <Link to="/topic/linked-list" className="block hover:bg-slate-800 p-2 rounded">Linked List</Link>
          <Link to="/topic/stack" className="block hover:bg-slate-800 p-2 rounded">Stack</Link>
          <Link to="/topic/queue" className="block hover:bg-slate-800 p-2 rounded">Queue</Link>
          
          <div className="text-slate-400 text-sm uppercase font-bold mt-4">Medium</div>
          <Link to="/topic/hash-table" className="block hover:bg-slate-800 p-2 rounded">Hash Table</Link>
          <Link to="/topic/trees" className="block hover:bg-slate-800 p-2 rounded">Trees</Link>
          
          <div className="text-slate-400 text-sm uppercase font-bold mt-4">Advanced</div>
          <Link to="/topic/graphs" className="block hover:bg-slate-800 p-2 rounded">Graphs</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}