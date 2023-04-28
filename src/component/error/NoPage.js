import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <>
      <div className="py-5  text-uppercase text-center border rounded-8 shadow">
        <p className="fs-3">404, Not found</p>
        <Link className="mb-0 border-bottom" to="/">Back</Link>
      </div>
    </>
  );
};

export default NoPage;
