import listEndpoints from "express-list-endpoints";

export const printRoutes = (app) => {
  const endpoints = listEndpoints(app);

  console.log("📋 Registered Endpoints:");
  endpoints.forEach((endpoint) => {
    const methods = endpoint.methods.join(", ");
    const path = endpoint.path;

    // Patch relative paths like "/register" under "/auth"
    console.log(`🔹 ${methods.padEnd(10)} ${path}`);
  });
};
