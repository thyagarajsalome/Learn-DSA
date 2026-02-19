import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white overflow-y-auto">
        <div className="p-4 text-2xl font-bold border-b border-slate-700">Learn DSA</div>
        <nav className="p-4 space-y-2">
          <div className="text-slate-400 text-sm uppercase font-bold mt-4">Data Structures</div>
          <Link to="/topic/arrays" className="block hover:bg-slate-800 p-2 rounded">Arrays</Link>
          <Link to="/topic/linked-list" className="block hover:bg-slate-800 p-2 rounded">Linked List</Link>
          <Link to="/topic/stack" className="block hover:bg-slate-800 p-2 rounded">Stack</Link>
          <Link to="/topic/queue" className="block hover:bg-slate-800 p-2 rounded">Queue</Link>
          <Link to="/topic/hash-table" className="block hover:bg-slate-800 p-2 rounded">Hash Table</Link>
          <Link to="/topic/trees" className="block hover:bg-slate-800 p-2 rounded">Trees</Link>
          <Link to="/topic/graphs" className="block hover:bg-slate-800 p-2 rounded">Graphs</Link>

          <div className="text-slate-400 text-sm uppercase font-bold mt-4">Algorithms</div>
          <Link to="/topic/sorting" className="block hover:bg-slate-800 p-2 rounded">Sorting</Link>
          <Link to="/topic/searching" className="block hover:bg-slate-800 p-2 rounded">Searching</Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}