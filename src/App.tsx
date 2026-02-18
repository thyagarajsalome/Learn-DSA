import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.js";
import TopicPage from "./pages/TopicPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/topic/arrays" replace />} />
          <Route path="topic/:topicId" element={<TopicPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;