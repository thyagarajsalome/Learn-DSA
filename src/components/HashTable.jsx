import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ARRAY_SIZE = 10;

const HashTable = () => {
  const [table, setTable] = useState(
    Array(ARRAY_SIZE)
      .fill(null)
      .map(() => [])
  );
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(null);

  const hash = (key) => {
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
        newTable[index] = [...newTable[index], [key, value]];
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
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Interactive Hash Table</h2>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleSet} className="w-full">
          Set
        </Button>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search key"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleGet} className="w-full">
          Get
        </Button>
      </div>

      {searchResult !== null && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Search Result</AlertTitle>
          <AlertDescription>
            {searchResult === "Not found"
              ? "Key not found"
              : `Value: ${searchResult}`}
          </AlertDescription>
        </Alert>
      )}

      <div className="border rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Hash Table Structure</h3>
        {table.map((bucket, index) => (
          <div
            key={index}
            className={`mb-2 p-2 border rounded ${
              highlightIndex === index ? "bg-yellow-200" : ""
            }`}
          >
            <strong>Index {index}:</strong>
            {bucket.length === 0 ? (
              <span className="text-gray-500 ml-2">Empty</span>
            ) : (
              <ul className="list-disc list-inside">
                {bucket.map(([k, v], i) => (
                  <li key={i}>
                    {k}: {v}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashTable;
