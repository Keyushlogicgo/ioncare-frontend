import React, { useEffect, useState } from "react";
import {
  deletePrescription,
  deletePrescriptionImage,
  getPrescription,
  getPrescriptionImage,
  postPrescription,
  postPrescriptionImage,
} from "../../helper/backend_helper";
import { Row, Col, Modal, Button, Card } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Prescription = () => {
  const [prescriptionImage, setPrescriptionImage] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [prescriptionImagedata, setPrescriptionImageData] = useState([]);
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [imageData, setImageData] = useState({
    base: "https://e7.pngegg.com/pngimages/187/201/png-clipart-upload-file-transfer-protocol-form-jquery-upload-button-miscellaneous-blue.png",
    encoded: "",
  });

  useEffect(() => {
    getPrescriptionImageData();
  }, []);

  const getPrescriptionImageData = () => {
    getPrescriptionImage()
      .then((res) => {
        if (res.status === 200) {
          setPrescriptionImage(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("err ?? ", err);
      });
    getPrescription()
      .then((res) => {
        if (res.status === 200) {
          setPrescription(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("err ?? ", err);
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
  const handleFileUpload = () => {
    postPrescriptionImage({ image: imageData.encoded })
      .then((res) => {
        if (res.status === 201) {
          setShow(false);
          getPrescriptionImageData();
          setImageData({
            base: "https://e7.pngegg.com/pngimages/187/201/png-clipart-upload-file-transfer-protocol-form-jquery-upload-button-miscellaneous-blue.png",
            encoded: "",
          });
        }
      })
      .catch((err) => {
        console.log("err ?? ", err);
      });
  };
  const handleFileDelete = (id) => {
    deletePrescriptionImage(id)
      .then((res) => {
        if (res.status === 200) {
          console.log("Delete Done");
          getPrescriptionImageData();
        }
      })
      .catch((err) => {
        console.log("err ?? ", err);
      });
  };
  const handlePrescriptionDelete = (id) => {
    deletePrescription(id)
      .then((res) => {
        if (res.status === 200) {
          console.log("Delete Done");
          getPrescriptionImageData();
        }
      })
      .catch((err) => {
        console.log("err ?? ", err);
      });
  };
  const handleImageId = (id) => {
    if (prescriptionImagedata.includes(id)) {
      const index = prescriptionImagedata.indexOf(id);
      if (index > -1) {
        prescriptionImagedata.splice(index, 1);
      }
    } else {
      setPrescriptionImageData([...prescriptionImagedata, id]);
    }
  };
  const handlePrescriptionUpload = () => {
    postPrescription({ images: prescriptionImagedata, phone: phone })
      .then((res) => {
        if (res.status === 201) {
          console.log("Added Done");
          getPrescriptionImageData();
        }
      })
      .catch((err) => {
        console.log("err ?? ", err);
      });
  };
  return (
    <>
      <Card className="mb-4">
        <Card.Header className="d-flex align-items-center justify-content-between">
          <h3>Prescription</h3>
        </Card.Header>
        <Card.Body>
          <Row className="mt-3">
            {prescription?.map((item, key) => {
              return (
                <Col key={key} md={2} className="mb-2">
                  <Card>
                    <Card.Body>
                      {item.phone}
                      {item?.image?.length !== 1 ? (
                        <Carousel>
                          {item.image?.map((children, key) => {
                            return (
                              <div>
                                <img
                                  src={children}
                                  key={key}
                                  alt="..."
                                  className="w-100 h-200 object-contain border  border-3 p-1 cursor-pointer"
                                />
                              </div>
                            );
                          })}
                        </Carousel>
                      ) : (
                        <img
                          src={item?.image[0]}
                          key={key}
                          alt="..."
                          className="w-100 h-200 object-contain border  border-3 p-1 cursor-pointer"
                        />
                      )}
                    </Card.Body>
                    <Card.Footer>
                      <button
                        onClick={() => {
                          handlePrescriptionDelete(item._id);
                        }}
                        className="btn btn-danger ms-1 w-100"
                      >
                        Delete
                      </button>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header className="d-flex align-items-center justify-content-between">
          <h3>Prescription Image</h3>
          <button
            onClick={() => {
              setShow(true);
            }}
            className="btn btn-primary"
          >
            Upload image
          </button>
        </Card.Header>
        <Card.Body>
          <Row className="mt-3">
            {prescriptionImage?.map((item, key) => {
              return (
                <Col key={key} md={2} className="mb-2">
                  <img
                    src={item.image}
                    alt="..."
                    className="w-100 h-200 object-contain border  border-3 p-1 cursor-pointer"
                  />
                  <div className="text-center mt-2 d-flex align-items-center justify-content-center">
                    {prescriptionImagedata.includes(item._id) ? (
                      <button
                        onClick={() => {
                          handleImageId(item._id);
                        }}
                        className="btn btn-secondary me-1 w-100"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleImageId(item._id);
                        }}
                        className="btn btn-info me-1 w-100"
                      >
                        Select
                      </button>
                    )}
                    <button
                      onClick={() => {
                        handleFileDelete(item._id);
                      }}
                      className="btn btn-danger ms-1 w-100"
                    >
                      Delete
                    </button>
                  </div>
                </Col>
              );
            })}
            
          </Row>
        </Card.Body>
        <Card.Footer className="d-flex align-items-center">
          <input
            type="number"
            className="form-control w-100"
            placeholder="Enter phone number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <button
            onClick={() => {
              handlePrescriptionUpload();
            }}
            className="btn btn-secondary ms-1"
          >
            Submit
          </button>
        </Card.Footer>
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
          <Button variant="primary" type="button" onClick={handleFileUpload}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Prescription;
