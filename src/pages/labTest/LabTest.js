import React, { useState } from "react";
import { useEffect } from "react";
import {
  deleteLab,
  getCategoryList,
  getLabList,
  postLab,
} from "../../helper/backend_helper";
import { Card, Col,  Row } from "react-bootstrap";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const LabTest = () => {
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [data, setData] = useState([]);

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

    getCategoryList()
      .then((res) => {
        if (res.status === 200) {
          var arrObj = [];
          for (let i = 0; i < res?.data?.data.length; i++) {
            const { _id, title } = res?.data?.data[i];
            arrObj.push({ value: _id, label: title });
          }
          setCategory(arrObj);
        }
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
  };

  console.log(category);
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
      price: "",
      discount: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      price: Yup.number().required(),
      discount: Yup.number().max(100).required(),
    }),
    onSubmit: (value) => {
      postLab({ ...value, category: categoryList })
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

  return (
    <>
      <h2>Lab Test</h2>
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
              <label>Category</label>
              <Select
                options={category}
                isMulti
                name="category"
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(val) => {
                  console.log("val", val);
                  var arrCatObj = [];
                  for (let j = 0; j < val.length; j++) {
                    arrCatObj.push(val[j].value);
                  }
                  setCategoryList(arrCatObj);
                }}
              />

              <span className="text-danger">{validate.errors.category}</span>
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
          <Row>
            {data.map((item, key) => {
              return (
                <Col key={key} md={6} className="mb-3">
                  <Card>
                    <Card.Header className="bg-primary">
                      <p className="mb-0 text-white">{item.title}</p>
                    </Card.Header>
                    <Card.Body>
                      <p>Includes : Following {item.category.length} Tests</p>
                      <div>
                        {item.category?.map((item, key) => {
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
    </>
  );
};

export default LabTest;
