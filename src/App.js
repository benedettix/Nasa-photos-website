import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./pages/Search/Search";
import Show from "./pages/Show/Show";
import Root from "./components/Root";
import NotFound from "./pages/NotFound/NotFound";
import { useState } from "react";

function App() {
  const [searchDataValue, setSearchDataValue] = useState("");

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Root setSearchDataValue={setSearchDataValue} />}
        >
          <Route
            path="search"
            element={<Search searchDataValue={searchDataValue} />}
          />
          <Route path="show/:id" element={<Show />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
