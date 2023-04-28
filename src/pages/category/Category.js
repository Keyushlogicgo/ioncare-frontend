import React, { useState } from "react";
import { useEffect } from "react";
import {
  deleteCategory,
  getCategoryList,
  patchCategory,
  postCategory,
} from "../../helper/backend_helper";
import { Button, Card, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const Category = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [updateId, setUpdateId] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getCategoryList()
      .then((res) => {
        console.log("res ==>", res);
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
  };
  const handleDelete = (id) => {
    deleteCategory(id)
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
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
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
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
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
      <h2>Category</h2>
      <Card className="mb-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validate.handleSubmit();
            return false;
          }}
        >
          <Card.Body>
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
                  <p className="mb-0">{item.title}</p>
                  <div>
                    <button
                      type="button"
                      className="btn btn-info ms-2"
                      onClick={() => {
                        setShow(true);
                        setUpdateId(item._id);
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
            {" "}
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
