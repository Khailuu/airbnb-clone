import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { ReactToastifyProvider } from "./contexts/ReactToastifyProvider.jsx";
import { ReactQueryProvider } from "./contexts/ReactQueryProvider.jsx";
import { RefetchProvider } from "./contexts/RefetchProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReactToastifyProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ReactQueryProvider>
          <RefetchProvider>
            <App />
          </RefetchProvider>
        </ReactQueryProvider>
      </BrowserRouter>
    </Provider>
  </ReactToastifyProvider>
);
