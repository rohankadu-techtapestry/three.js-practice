import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Leva } from "leva";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Leva />
    <App />
  </StrictMode>
);
