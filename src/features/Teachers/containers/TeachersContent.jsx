import React, { useEffect, useState } from "react";
import TeachersCards from "../components/TeachersCards/TeachersCards";
import TeachersList from "../components/TeachersList/TeachersList";
import { MAX_WIDTH_TABLET } from "../../../constants";

import "./TeachersContent.scss";

const TeachersContent = () => {
  const [teachers, setTeachers] = useState([
    {
      name: "Alfreds Futterkiste",
      group: "Web dasturlash",
      phone: "+998-93-189-73-18",
    },
    {
      name: "Raximov Dilrozbek",
      group: "SMM",
      phone: "+998-93-189-73-18",
    },
  ]);
  const [listEnable, setListEnable] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (windowWidth > MAX_WIDTH_TABLET) {
      setListEnable(true);
    } else {
      setListEnable(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div className="teachers_list">
      <div className="list_head">
        <h1 className="list_title">O'qituvchilar</h1>
      </div>
      <div className="list_body">
        {listEnable ? (
          <TeachersList teachers={teachers} />
        ) : (
          <TeachersCards teachers={teachers} />
        )}
      </div>
    </div>
  );
};

export default TeachersContent;
