import React, { useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { createStudentApi, editStudentApi, getStudentApi } from "../api";
import "./Form.scss";
import { BsDot } from "react-icons/bs";
import { errorAtom, infoAtom, successAtom } from "../../../app/atoms";
import { useAtom } from "jotai";
import ReactInputMask from "react-input-mask";
import { FormLoader } from "../../../components";

const Form = () => {
  // atoms
  const [infoMsg, setInfoMsg] = useAtom(infoAtom);
  const [success, setSuccess] = useAtom(successAtom);
  const [error, setError] = useAtom(errorAtom);

  // component tools
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { studentId } = useParams();
  const [searchParams] = useSearchParams();

  // form variables
  const [name, setName] = useState({
    first: "",
    last: "",
  });
  const [phone, setPhone] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    if (studentId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await getStudentApi(studentId, controller);

          setName(
            data?.name || {
              first: "",
              last: "",
            }
          );
          setPhone(data?.phone || "");
          setInfo(data?.info || "");

          setLoading(false);
        } catch (e) {
          if (e.response) {
            setTimeout(() => {
              setError("");
            }, 5000);
            setError(e?.response?.data?.error || errorMessage);
            setLoading(false);
          }
        }
      };

      fetchData();
    }

    if (searchParams.size) {
      setName({
        first: searchParams?.get("firstName") || "",
        last: searchParams?.get("lastName") || "",
      });
      setPhone(searchParams?.get("phone") || "");
    }

    return () => controller.abort();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const controller = new AbortController();

    try {
      if (studentId) {
        const message = await editStudentApi(
          { name, phone, info },
          studentId,
          controller
        );

        if (message) {
          setTimeout(() => {
            setInfoMsg("");
          }, 5000);
          setInfoMsg(message);
        }
      } else {
        const message = await createStudentApi(
          { name, phone, info },
          controller
        );

        if (message) {
          setTimeout(() => {
            setSuccess("");
          }, 5000);
          setSuccess(message);
        }
      }

      setLoading(false);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
        setLoading(false);
      }
    }

    controller.abort();
    navigate(-1);
  };

  return (
    <div className="student_form">
      <div className="form_head">
        <div className="head_content">
          <h1 className="list_title">O'quvchi formasi</h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/student/list`}>O'quvchilar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              {studentId ? (
                <NavLink to={`/student/${studentId}/edit`}>
                  O'quvchini o'zgartirish
                </NavLink>
              ) : (
                <NavLink to={`/student/new`}>Yangi o'quvchi</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="form_box">
        <form onSubmit={submitHandler}>
          <div className="input_form">
            <label htmlFor="firstName">Ism:</label>
            <input
              type="text"
              id="firstName"
              value={name.first}
              onChange={(e) => setName({ ...name, first: e.target.value })}
              placeholder="Ism"
              disabled={loading}
              maxLength={22}
              required
            />
          </div>
          <div className="input_form">
            <label htmlFor="lastName">Familiya:</label>
            <input
              type="text"
              id="lastName"
              value={name.last}
              onChange={(e) => setName({ ...name, last: e.target.value })}
              placeholder="Familiya"
              disabled={loading}
              maxLength={22}
              required
            />
          </div>
          <div className="input_form">
            <label htmlFor="phone">Tel. raqam:</label>
            <ReactInputMask
              mask={`+999(99)-999-99-99`}
              value={phone}
              id="phone"
              maskChar={null}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tel. raqam"
              disabled={loading}
              required
            />
          </div>
          <div className="input_form">
            <label htmlFor="info">Ma'lumot:</label>
            <textarea
              type="text"
              id="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Ma'lumot"
              disabled={loading}
              maxLength={160}
              rows={5}
            />
          </div>
          <div className="submit_form">
            <input
              disabled={loading}
              type="submit"
              value={studentId ? "O`zgartirish" : "Qo`shish"}
            />
            {loading ? (
              <span>
                <FormLoader />
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
