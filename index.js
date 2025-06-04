import express from "express";
import initApp from "./src/index.router.js";
import { printRoutes } from "./src/printRoutes.js";

const app = express();

initApp(app, express);

app.listen(3000, () => {
  console.log("UMS server is running on port ... 3000");
 
  // setImmediate(() => {
  //   if (!app._router) {
  //     console.warn("⚠️ No router stack found! Is initApp mounting routes?");
  //     return;
  //   }

  //   console.log("DEBUG: Express stack:");
  //   app._router.stack.forEach((layer, i) => {
  //     if (layer.route) {
  //       console.log(`[${i}] Route:`, layer.route.path);
  //     } else if (layer.name === "router") {
  //       console.log(`[${i}] Nested router:`, layer.regexp);
  //     }
  //   });
  // });
  
  printRoutes(app);
});

