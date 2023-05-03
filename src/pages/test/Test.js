import React, { useState } from "react";
import { useEffect } from "react";
import {
  deleteTest,
  getTestList,
  patchTest,
  postTest,
} from "../../helper/backend_helper";
import { Button, Card, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const Test = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState({});
  const [updateId, setUpdateId] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getTestList()
      .then((res) => {
        console.log("res ==>", res);
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
  };
  const handleDelete = (id) => {
    deleteTest(id)
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
      title: "",
      price: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      price: Yup.number().required(),
    }),
    onSubmit: (value) => {
      postTest(value)
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
      title: editData.title || "",
      price: editData.price || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      price: Yup.number().required(),
    }),
    onSubmit: (value) => {
      patchTest({ data: value, id: updateId })
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
      <h2>Test</h2>
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
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={validate.values.title}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.title}</span>
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={validate.values.price}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.price}</span>
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
                  <p className="mb-0">title: {item.title}</p>
                  <p className="mb-0">Price: {item.price}</p>
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

export default Test;
