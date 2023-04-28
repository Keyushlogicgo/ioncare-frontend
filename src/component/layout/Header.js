import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="py-2 border-bottom bg-blur">
      <Container fluid>
        <Link className="me-2" to="/">LOGO</Link>
        <Link className="me-2" to="/category">Category</Link>
        <Link className="me-2" to="/lab">Lab Test</Link>

      </Container>
    </div>
  );
};

export default Header;
