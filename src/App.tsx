import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import TopicPage from "./pages/TopicPage";
import TheoryPage from "./pages/TheoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/topic/arrays" replace />} />
          <Route path="topic/:topicId" element={<TopicPage />} />
          <Route path="theory/:theoryId" element={<TheoryPage />} />
          {/* Catch-all 404 Route */}
          <Route path="*" element={
            <div className="p-8 text-center text-xl font-bold text-slate-500">
              404 - Topic Not Found
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;