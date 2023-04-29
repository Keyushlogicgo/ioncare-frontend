import React, { useState } from "react";
import { useEffect } from "react";
import {
  deleteMember,
  getMemberList,
  patchCategory,
  postCategory,
} from "../../helper/backend_helper";
import { Button, Card, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const Category = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState({});
  const [updateId, setUpdateId] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getMemberList()
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
  };
  const handleDelete = (id) => {
    deleteMember(id)
      .then((res) => {
        if (res.status === 200) {
          getData();
        }
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
  };

  const validate = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      dob: "",
      age: "",
      phone: "",
      gender: "",
      relations: "",
      address: "",
      area: "",
      city: "",
      state: "",
      country: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      dob: Yup.string().required(),
      age: Yup.number().required(),
      phone: Yup.number().required(),
      gender: Yup.string().required(),
      relations: Yup.string().required(),
      address: Yup.string().required(),
      area: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      country: Yup.string().required(),
    }),
    onSubmit: (value) => {
      postCategory(value)
        .then((res) => {
          if (res.status === 201) {
            getData();
            validate.resetForm();
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
  });
  const validateEdit = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      dob: "",
      age: "",
      phone: "",
      gender: "",
      relations: "",
      address: "",
      area: "",
      city: "",
      state: "",
      country: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      dob: Yup.string().required(),
      age: Yup.number().required(),
      phone: Yup.number().required(),
      gender: Yup.string().required(),
      relations: Yup.string().required(),
      address: Yup.string().required(),
      area: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      country: Yup.string().required(),
    }),
    onSubmit: (value) => {
      patchCategory({ data: value, id: updateId })
        .then((res) => {
          if (res.status === 200) {
            getData();
            validate.resetForm();
            setShow(false);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
  });

  return (
    <>
      <h2>Member</h2>
      <Card className="mb-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validate.handleSubmit();
            return false;
          }}
        >
          <Card.Body>
            <div>
              <label>email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={validate.values.email}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.email}</span>
            </div>
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                className="form-control"
                value={validate.values.first_name}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.first_name}</span>
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                value={validate.values.last_name}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.last_name}</span>
            </div>
          </Card.Body>
          <Card.Footer>
            <button className="btn btn-secondary">Submit</button>
          </Card.Footer>
        </form>
      </Card>
      <Card>
        <Card.Header>
          <h2>List</h2>
        </Card.Header>
        <Card.Body>
          <ul className="p-0 mb-0">
            {data.map((item, key) => {
              return (
                <li
                  key={key}
                  className="d-flex align-items-center justify-content-between border-bottom py-2"
                >
                  <p className="mb-0">
                    Name: {`${item.first_name} ${item.last_name}`}
                  </p>
                  <p className="mb-0">Email: {item.email}</p>
                  <div>
                    <button
                      type="button"
                      className="btn btn-info ms-2"
                      onClick={() => {
                        setShow(true);
                        setUpdateId(item._id);
                        setEditData({
                          title: item.title,
                          price: item.price,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateEdit.handleSubmit();
            return false;
          }}
        >
          <Modal.Body>
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={validateEdit.values.title}
                onChange={validateEdit.handleChange}
                onBlur={validateEdit.handleBlur}
              />
              <span className="text-danger">{validateEdit.errors.title}</span>
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={validateEdit.values.price}
                onChange={validateEdit.handleChange}
                onBlur={validateEdit.handleBlur}
              />
              <span className="text-danger">{validateEdit.errors.price}</span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShow(false);
              }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Category;
