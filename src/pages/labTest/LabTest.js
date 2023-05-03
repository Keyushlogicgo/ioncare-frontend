import React, { useState } from "react";
import { useEffect } from "react";
import {
  deleteLab,
  getTestList,
  getLabList,
  postLab,
} from "../../helper/backend_helper";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const LabTest = () => {
  const [Test, setTest] = useState([]);
  const [TestList, setTestList] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [imageData, setImageData] = useState({
    base: "https://e7.pngegg.com/pngimages/187/201/png-clipart-upload-file-transfer-protocol-form-jquery-upload-button-miscellaneous-blue.png",
    encoded: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getLabList()
      .then((res) => {
        if (res.status === 200) {
          setData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("err ==>", err);
      });

    getTestList()
      .then((res) => {
        if (res.status === 200) {
          var arrObj = [];
          for (let i = 0; i < res?.data?.data.length; i++) {
            const { _id, title } = res?.data?.data[i];
            arrObj.push({ value: _id, label: title });
          }
          setTest(arrObj);
        }
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
  };

  const handleFilePreview = (input) => {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        const baseUrl = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "")
          .trim();
        setImageData({
          base: e.target.result,
          encoded: baseUrl,
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  const handleDelete = (id) => {
    deleteLab(id)
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
      discount: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      discount: Yup.number().max(100).required(),
    }),
    onSubmit: (value) => {
      postLab({ ...value, test: TestList, image: imageData.encoded })
        .then((res) => {
          if (res.status === 201) {
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
      <Card>
        <Card.Header className="d-flex align-items-center justify-content-between">
          <h2>Lab Checkup List</h2>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setShow(true);
            }}
          >
            Add
          </button>
        </Card.Header>
        <Card.Body>
          <Row>
            {data.map((item, key) => {
              return (
                <Col key={key} md={6} className="mb-3">
                  <Card>
                    <Card.Header className="bg-primary">
                      <p className="mb-0 text-white">{item.title}</p>
                    </Card.Header>
                    <Card.Body>
                      {item.image ? <img src={item.image} className="hw-42" /> : null}
                      <p>Includes : Following {item.test.length} Tests</p>
                      <div>
                        {item.test?.map((item, key) => {
                          return (
                            <span
                              key={key}
                              className="px-2 border rounded py-1 shadow m-1"
                            >
                              {item}
                            </span>
                          );
                        })}
                      </div>
                    </Card.Body>
                    <Card.Footer className="d-flex align-items-center justify-content-between">
                      <p className="mb-0">
                        MRP Price:
                        <span className="line-through me-2"> {item.price}</span>
                        {item.selling_price}
                      </p>
                      <div>
                        <Link
                          className="btn btn-info ms-2"
                          to={`/lab/${item._id}`}
                        >
                          Book
                        </Link>
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
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Checkup</Modal.Title>
        </Modal.Header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            validate.handleSubmit();
            return false;
          }}
        >
          <Modal.Body>
            <div>
              <input
                type="file"
                onChange={(e) => {
                  handleFilePreview(e.target);
                }}
                id="fileInput"
                hidden
              />
              <label htmlFor="fileInput" className="w-100">
                <img
                  src={imageData?.base}
                  alt="..."
                  className="h-200 w-100 object-contain border  border-3 p-1 cursor-pointer"
                />
              </label>
            </div>
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
              <label>Discount</label>
              <input
                type="number"
                name="discount"
                className="form-control"
                value={validate.values.discount}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.discount}</span>
            </div>
            <div>
              <label>Test</label>
              <Select
                options={Test}
                isMulti
                name="Test"
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(val) => {
                  console.log("val", val);
                  var arrCatObj = [];
                  for (let j = 0; j < val.length; j++) {
                    arrCatObj.push(val[j].value);
                  }
                  setTestList(arrCatObj);
                }}
              />

              <span className="text-danger">{validate.errors.Test}</span>
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

export default LabTest;
