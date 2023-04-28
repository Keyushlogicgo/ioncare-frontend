import React, { useEffect, useState } from "react";
import { getLabAppoinment, postPayment } from "../../helper/backend_helper";
import { Card, Col, Row } from "react-bootstrap";

const LabTestAppoinment = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getLabAppoinment()
      .then((res) => {
        if (res.status === 200) {
          setData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
  };
  const handlePayment = (id, price) => {
    postPayment({
      order_id: id,
      user_id: "6447a8b1916e6593de3ea4bf",
      transaction_id: "9876754645",
      amount: price,
      status: "COMPELETED",
      payment_method: "card",
    })
      .then((res) => {
        if (res.status === 201) {
          console.log("res", res);
          getData();
        }
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
  };

  

  return (
    <div>
      <Card>
        <Card.Header>
          <h2>Appoinments</h2>
        </Card.Header>
        <Card.Body>
          <Row>
            {data.map((item, key) => {
              return (
                <Col key={key} md={6} className="mb-3">
                  <Card>
                    <Card.Header className="bg-primary">
                      <p className="mb-0 text-white">{item.test_title}</p>
                    </Card.Header>
                    <Card.Body>
                      <p>Time: {`${item.start_time}-${item.end_time}`}</p>

                      <p>Date: {item.date}</p>
                    </Card.Body>
                    <Card.Footer className="d-flex align-items-center justify-content-between">
                      <p className="mb-0">
                        MRP Price:
                        {item.price}
                      </p>
                      <div>
                        {item.payment_status === "PENDING" ? (
                          <button
                            className="btn btn-info ms-2"
                            onClick={() => {
                              handlePayment(item.order_id, item.price);
                            }}
                            to={`/lab/${item._id}`}
                          >
                            Pay now
                          </button>
                        ) : (
                          "Payment Status: " + item.payment_status
                        )}
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LabTestAppoinment;
