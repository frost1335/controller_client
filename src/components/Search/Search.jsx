import React, { useState } from "react";
import "./Search.scss";
import Modal from "../Modal/Modal";
import { BsSearch } from "react-icons/bs";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { searchStudents } from "../../api";
import { errorAtom } from "../../app/atoms";
import { useAtom } from "jotai";

const getExactText = (text, search) => {
  let first = text.trim().toLowerCase().indexOf(search.trim().toLowerCase());

  let second = first + search.length;

  return text.trim().substring(first, second);
};

const markAreas = (arr, search) => {
  const re = new RegExp(search, "gi");

  if (arr.length && search) {
    return arr.map((item) => {
      let firstName = item.name.first;
      let lastName = item.name.last;
      let phone = item.phone;
      let info = item.info;

      let firstText = getExactText(firstName, search);
      let lastText = getExactText(lastName, search);
      let phoneText = getExactText(phone, search);
      let infoText = getExactText(info, search);

      let newFirstName = firstName.replace(re, `<mark>${firstText}</mark>`);
      let newLastName = lastName.replace(re, `<mark>${lastText}</mark>`);
      let newPhone = phone.replace(re, `<mark>${phoneText}</mark>`);
      let newInfo = info.replace(re, `<mark>${infoText}</mark>`);

      return {
        name: {
          first: newFirstName,
          last: newLastName,
        },
        phone: newPhone,
        info: newInfo,
        _id: item._id,
      };
    });
  } else {
    return [];
  }
};

const Search = ({ dialog }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");

  const [error, setError] = useAtom(errorAtom);

  const onSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await searchStudents(search);

      const students = markAreas(data?.students, search);
      const teachers = markAreas(data?.teachers, search);
      const customers = markAreas(data?.customers, search);

      setSearchData({ students, teachers, customers });
      setLoading(false);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
      setLoading(false);
    }
  };

  const onClose = () => {
    setSearch("");
    setSearchData("");
    dialog?.current?.close();
  };

  return (
    <Modal dialog={dialog} onClose={onClose}>
      <div className="search_content">
        <div className="content_head">
          <form onSubmit={onSearch} className="head_input">
            <span>
              <BsSearch />
            </span>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Qidirish..."
              maxLength={16}
              required
            />
            <button disabled={!search} type="submit">
              Qidirish
            </button>
          </form>
        </div>
        <div className="content_body">
          {loading ? (
            <Loader />
          ) : searchData?.teachers?.length ||
            searchData?.students?.length ||
            searchData?.customers?.length ? (
            <div className="search_list">
              {searchData?.customers.length ? (
                <>
                  <h3>Mijozlar:</h3>
                  <ul>
                    {searchData?.customers.map((customer, index) => (
                      <Link key={index} to={`#`}>
                        <li>
                          <div className="item_head">
                            <span>
                              {parse(Object.values(customer?.name).join(" "))}
                            </span>
                            <h5>{parse(customer?.phone)}</h5>
                          </div>
                          <p>{parse(customer?.info)}</p>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </>
              ) : null}
              {searchData?.students.length ? (
                <>
                  <h3>O'quvchilar:</h3>
                  <ul>
                    {searchData?.students.map((student, index) => (
                      <Link
                        key={index}
                        onClick={onClose}
                        to={`/student/detail/${student?._id}`}
                      >
                        <li>
                          <div className="item_head">
                            <span>
                              {parse(Object.values(student?.name).join(" "))}
                            </span>
                            <h5>{parse(student?.phone)}</h5>
                          </div>
                          <p>{parse(student?.info)}</p>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </>
              ) : null}
              {searchData?.teachers.length ? (
                <>
                  <h3>O'qituvchilar:</h3>
                  <ul>
                    {searchData?.teachers.map((teacher, index) => (
                      <Link
                        onClick={onClose}
                        to={`/teacher/detail/${teacher?._id}`}
                        key={index}
                      >
                        <li>
                          <div className="item_head">
                            <span>
                              {parse(Object.values(teacher?.name).join(" "))}
                            </span>
                            <h5>{parse(teacher?.phone)}</h5>
                          </div>
                          <p>{parse(teacher?.info)}</p>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          ) : (
            <div className="empty_body">
              <div className="empty_box">
                <h2>Hech narsa toplimadi</h2>
                <h4>Qidiruv bo'limlari:</h4>
                <ul>
                  <li>
                    <Link onClick={onClose} to={"/customer/list"}>
                      Mijozlar
                    </Link>
                  </li>
                  <li>
                    <Link onClick={onClose} to={"/student/list"}>
                      O'quvchilar
                    </Link>
                  </li>
                  <li>
                    <Link onClick={onClose} to={"/teacher/list"}>
                      O'qituvchilar
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Search;
