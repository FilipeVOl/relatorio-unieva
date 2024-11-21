import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";

const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<DefaultLayout />} />
      </Routes>
  );
};

export default Router;
