import React, { useEffect, useState } from "react";
import { getLabList } from "../../helper/backend_helper";
import { Button, Card, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const PackageDetails = () => {
  const [data, setData] = useState({});
  const [ratingShow, setRatingShow] = useState(false);
  const [remarkShow, setRemarkShow] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getLabList(id)
      .then((res) => {
        if (res.status === 200) {
          setData(res?.data?.data[0]);
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
      //   postLab(value)
      //     .then((res) => {
      //       if (res.status === 201) {
      //         getData();
      //         validate.resetForm();
      //         setShow(false);
      //       }
      //     })
      //     .catch((err) => {
      //       console.log("err ==> ", err);
      //     });
    },
  });

  return (
    <div>
      <Card>
        <Card.Header className="bg-primary">
          <p className="mb-0 text-white">{data?.title}</p>
        </Card.Header>
        <Card.Body>
          <p>Includes : Following {data?.Test?.length} Tests</p>
          <div>
            {data?.Test?.map((item, key) => {
              return (
                <span key={key} className="px-2 border rounded py-1 shadow m-1">
                  {item}
                </span>
              );
            })}
          </div>
        </Card.Body>
        <Card.Footer className="d-flex align-items-center justify-content-between">
          <p className="mb-0">
            MRP Price:
            <span className="line-through me-2"> {data?.price}</span>
            {data?.selling_price}
          </p>
        </Card.Footer>
      </Card>
      <Modal
        show={remarkShow}
        onHide={() => {
          setRemarkShow(false);
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setRemarkShow(false);
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
    </div>
  );
};

export default PackageDetails;
