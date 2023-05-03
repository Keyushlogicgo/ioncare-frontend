import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const arrObj = [
    { url: "/", title: "LOGO" },
    { url: "/category", title: "Category" },
    { url: "/lab", title: "Lab Test" },
    { url: "/lab/appoinment", title: "Appoinment" },
    { url: "/member", title: "Member" },
    { url: "/prescription", title: "Prescription" },
  ];

  return (
    <div className="py-2 border-bottom bg-blur">
      <Container fluid>
        {arrObj.map((item, key) => {
          return (
            <Link
              className="me-2 border rounded px-1 shadow"
              to={item.url}
              key={key}
            >
              {item.title}
            </Link>
          );
        })}
      </Container>
    </div>
  );
};

export default Header;
