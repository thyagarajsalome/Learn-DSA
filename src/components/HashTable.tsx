import React, { useState, useEffect } from "react";

const ARRAY_SIZE = 10;

const HashTable = () => {
  const [table, setTable] = useState<[string, string][][]>(
    Array(ARRAY_SIZE).fill(null).map(() => [])
  );
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const hash = (key: string) => {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % ARRAY_SIZE;
  };

  const handleSet = () => {
    if (key && value) {
      const index = hash(key);
      setTable((prevTable) => {
        const newTable = [...prevTable];
        const existingPairIndex = newTable[index].findIndex(([k]) => k === key);
        if (existingPairIndex !== -1) {
          newTable[index][existingPairIndex] = [key, value];
        } else {
          newTable[index] = [...newTable[index], [key, value]];
        }
        return newTable;
      });
      setHighlightIndex(index);
      setKey("");
      setValue("");
    }
  };

  const handleGet = () => {
    if (searchKey) {
      const index = hash(searchKey);
      setHighlightIndex(index);
      const found = table[index].find(([k]) => k === searchKey);
      setSearchResult(found ? found[1] : "Not found");
    }
  };

  useEffect(() => {
    if (highlightIndex !== null) {
      const timer = setTimeout(() => setHighlightIndex(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [highlightIndex]);

  return (
    <div className="bg-white rounded-lg p-6 w-full h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Interactive Hash Table</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleSet} className="bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700">
            Set (Hash & Store)
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Search key"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button onClick={handleGet} className="bg-emerald-600 text-white rounded-md py-2 font-medium hover:bg-emerald-700">
            Get (Lookup)
          </button>
        </div>
      </div>

      {searchResult !== null && (
        <div className="mb-6 bg-slate-100 border-l-4 border-slate-500 p-4 rounded-md">
          <strong className="block text-slate-800 mb-1">Search Result</strong>
          <p className="text-slate-600">{searchResult === "Not found" ? "Key not found" : `Value: ${searchResult}`}</p>
        </div>
      )}

      <div className="flex-1 border-2 border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-slate-700">Hash Table Structure (Buckets)</h3>
        <div className="grid grid-cols-2 gap-4">
          {table.map((bucket, index) => (
            <div
              key={index}
              className={`p-3 border rounded-md transition-colors duration-300 ${
                highlightIndex === index ? "bg-amber-100 border-amber-400" : "bg-white border-slate-200"
              }`}
            >
              <strong className="text-slate-700">Index {index}:</strong>
              {bucket.length === 0 ? (
                <span className="text-slate-400 ml-2 italic">Empty</span>
              ) : (
                <ul className="list-disc list-inside mt-1">
                  {bucket.map(([k, v], i) => (
                    <li key={i} className="text-sm text-slate-600">
                      {k}: <span className="font-bold text-slate-800">{v}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HashTable;