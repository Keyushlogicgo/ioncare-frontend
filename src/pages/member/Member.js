import React, { useState } from "react";
import { useEffect } from "react";
import {
  deleteMember,
  getMemberList,
  patchTest,
  postMember,
  postTest,
} from "../../helper/backend_helper";
import { Button, Card, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";

const Member = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState({});
  const [imageData, setImageData] = useState({
    base: "https://e7.pngegg.com/pngimages/187/201/png-clipart-upload-file-transfer-protocol-form-jquery-upload-button-miscellaneous-blue.png",
    encoded: "",
  });
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
      image: "",
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
      image: Yup.string(),
    }),
    onSubmit: (value) => {
      console.log(value);
      value.dob = moment(value.dob).format("DD-MM-YYYY");
      value.image = imageData.encoded;
      postMember(value)
        .then((res) => {
          if (res.status === 201) {
            validate.resetForm();
            setShow(false);
            getData();
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
          <h2>List</h2>
          <button
            type="button"
            className="btn btn-info ms-2"
            onClick={() => {
              setShow(true);
            }}
          >
            Add member
          </button>
        </Card.Header>
        <Card.Body>
          <ul className="p-0 mb-0">
            {data.map((item, key) => {
              return (
                <li
                  key={key}
                  className="d-flex align-items-center justify-content-between border-bottom py-2"
                >
                  <div className="d-flex">
                    <img src={item.image} className="hw-42 rounded-circle me-2" />
                    <div>
                      <p className="mb-0">
                        {`${item.first_name} ${item.last_name}`}
                      </p>
                      <p className="mb-0">{item.email}</p>
                    </div>
                  </div>

                  <div>
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
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="form-control"
                value={validate.values.dob}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.dob}</span>
            </div>
            <div>
              <label>Age</label>
              <input
                type="number"
                name="age"
                className="form-control"
                value={validate.values.age}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.age}</span>
            </div>
            <div>
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                className="form-control"
                value={validate.values.phone}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.phone}</span>
            </div>
            <div>
              <label>Gender</label>
              <select
                name="gender"
                className="form-control"
                defaultValue={validate.values.gender}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              >
                <option disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">other</option>
              </select>
              <span className="text-danger">{validate.errors.gender}</span>
            </div>
            <div>
              <label>Relations</label>
              <select
                name="relations"
                className="form-control"
                defaultValue={validate.values.relations}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              >
                <option disabled>Select Relations</option>
                <option value="self">selfself</option>
                <option value="father">father</option>
                <option value="mother">mother</option>
                <option value="brother">brother</option>
                <option value="sister">sister</option>
                <option value="daughter">daughter</option>
              </select>
              <span className="text-danger">{validate.errors.relations}</span>
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={validate.values.address}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.address}</span>
            </div>
            <div>
              <label>Area</label>
              <input
                type="text"
                name="area"
                className="form-control"
                value={validate.values.area}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.area}</span>
            </div>
            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={validate.values.city}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.city}</span>
            </div>
            <div>
              <label>State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={validate.values.state}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.state}</span>
            </div>
            <div>
              <label>country</label>
              <input
                type="text"
                name="country"
                className="form-control"
                value={validate.values.country}
                onChange={validate.handleChange}
                onBlur={validate.handleBlur}
              />
              <span className="text-danger">{validate.errors.country}</span>
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
              Add member
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Member;
