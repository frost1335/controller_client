import React from "react";
import ReactDOM from "react-dom/client";
const App = React.lazy(() => import("./App.jsx"));
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { GlobalLoader } from "./components/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<GlobalLoader />}>
        <App />
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
