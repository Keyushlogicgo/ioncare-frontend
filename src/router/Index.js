import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoute } from "./allRouter";
import Layout from "../component/layout/Index";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        {publicRoute.map((item, key) => {
          return (
            <Route
              key={key}
              path={item.path}
              element={<Layout>{item.element}</Layout>}
            />
          );
        })}
      </Routes>
    </React.Fragment>
  );
};

export default Index;
