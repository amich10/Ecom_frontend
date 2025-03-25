//single page application //index.html
//<div id="root">.......html webapp

import '@ant-design/v5-patch-for-react-19';
import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/main.css";
import RouterConfig from './config/router.config';


createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterConfig></RouterConfig>
  </React.StrictMode>
);
