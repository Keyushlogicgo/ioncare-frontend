import React from "react";
import Header from "./Header";
// import Footer from "./Footer";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        <Container className="py-4">{children}</Container>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
