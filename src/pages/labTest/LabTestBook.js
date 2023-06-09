import React, { useEffect, useState } from "react";
import {
  getLabList,
  getMemberList,
  postLabAppoinment,
} from "../../helper/backend_helper";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import moment from "moment/moment";

const LabTestBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [member, setMember] = useState([]);
  const [time, setTime] = useState({
    start_time: "",
    end_time: "",
    date: "",
    package_id: "",
    member_id: "",
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getLabList(id)
      .then((res) => {
        if (res.status === 200) {
          setData(res?.data?.data[0]);
          console.log(data);
          setTime({ ...time, package_id: res?.data?.data[0]._id });
        }
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
    getMemberList()
      .then((res) => {
        if (res.status === 200) {
          setMember(res.data.data);
        }
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
  };
  const submitData = () => {
    postLabAppoinment(time)
      .then((res) => {
        if (res.status === 201) {
          console.log("res", res);
          navigate("/lab");
        }
      })
      .catch((err) => {
        console.log("err ==>", err);
      });
  };

  const timeArray = ["11:15AM-11:30PM", "11:30AM-11:45PM", "11:45AM-12:00PM"];

  return (
    <>
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
      <Card>
        <Card.Body>
          <input
            type="date"
            className="form-control"
            onChange={(e) => {
              setTime({
                ...time,
                date: moment(e.target.value).format("DD-MM-YYYY"),
              });
            }}
          />
          <select
            className="form-control"
            onChange={(e) => {
              setTime({
                ...time,
                member_id: e.target.value,
              });
            }}
          >
            <option selected disabled>
              Select Member
            </option>
            {member?.map((item, key) => {
              return <option value={item._id}>{item.first_name}</option>;
            })}
          </select>
          {timeArray?.map((item, key) => {
            return (
              <div key={key}>
                <input
                  type="radio"
                  name="time"
                  id={`time${key}`}
                  value={item}
                  onChange={(e) => {
                    setTime({
                      ...time,
                      start_time: e.target.value.split("-")[0],
                      end_time: e.target.value.split("-")[1],
                    });
                  }}
                />
                <label htmlFor={`time${key}`}>{item}</label>
              </div>
            );
          })}
        </Card.Body>
        <Card.Footer>
          <button className="btn btn-secondary" onClick={submitData}>
            Submit
          </button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default LabTestBook;
