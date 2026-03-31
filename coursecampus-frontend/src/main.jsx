import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import logo from "./assets/logo.png";
import "./index.css";
import "./styles/theme.css";

const faviconLink =
  document.querySelector("link[rel='icon']") || document.createElement("link");
faviconLink.setAttribute("rel", "icon");
faviconLink.setAttribute("type", "image/png");
faviconLink.setAttribute("href", logo);
document.head.appendChild(faviconLink);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
