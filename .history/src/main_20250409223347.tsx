//single page application //index.html
//<div id="root">.......html webapp

import '@ant-design/v5-patch-for-react-19';
import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/main.css";
import RouterConfig from './config/router.config';
import {Provider} from "react-redux"
import store from './config/store';


createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterConfig></RouterConfig>
    </Provider>
//   </React.StrictMode>
// );
