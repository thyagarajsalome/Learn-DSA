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
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Interactive Hash Table
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
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
          <Button
            onClick={handleSet}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Set
          </Button>
        </div>
        <div>
          <Input
            type="text"
            placeholder="Search key"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="mb-2"
          />
          <Button
            onClick={handleGet}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Get
          </Button>
        </div>
      </div>

      {searchResult !== null && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Search Result</AlertTitle>
          <AlertDescription>
            {searchResult === "Not found"
              ? "Key not found"
              : `Value: ${searchResult}`}
          </AlertDescription>
        </Alert>
      )}

      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Hash Table Structure
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {table.map((bucket, index) => (
            <div
              key={index}
              className={`p-3 border rounded-md ${
                highlightIndex === index ? "bg-yellow-100" : "bg-white"
              } transition-colors duration-300`}
            >
              <strong className="text-gray-700">Index {index}:</strong>
              {bucket.length === 0 ? (
                <span className="text-gray-400 ml-2">Empty</span>
              ) : (
                <ul className="list-disc list-inside mt-1">
                  {bucket.map(([k, v], i) => (
                    <li key={i} className="text-sm">
                      {k}: <span className="font-medium">{v}</span>
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
