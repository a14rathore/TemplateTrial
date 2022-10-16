import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../Context/AuthContextProvider";

import { PrivateLayout, PublicLayout } from "./routes";
import PrivateRoute from "./routes/privateRoutes";
import PublicRoute from "./routes/publicRoutes";

export default function Approuter() {
  const isLogged = useAuth();

  useEffect(() => {
    if (!isLogged) {
      localStorage.removeItem("metaData");
    }
  }, [isLogged]);

  return (
    <Routes>
      {isLogged
        ? PrivateRoute.map((route) => (
            <Route
              key={`Route-${route.path}`}
              {...route}
              element={<PrivateLayout {...route} />}
            />
          ))
        : PublicRoute.map((route) => (
            <Route
              key={`Route-${route.path}`}
              {...route}
              element={<PublicLayout {...route} />}
            />
          ))}
    </Routes>
  );
}
