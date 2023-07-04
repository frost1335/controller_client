import React, { useEffect, useState } from "react";
import "./LidsContent.scss";
import ClientsList from "../components/ClientsList/ClientsList";
import ClientsCards from "../components/ClientsCards/ClientsCards";
import { MAX_WIDTH_TABLET } from "../../../../constants";
import { useNavigate } from "react-router-dom";
import { deleteLidApi } from "../../api";

const LidsContent = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const [listEnable, setListEnable] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/lids`
        ).then((res) => res.json());
        setClients(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

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

  const removeLid = async (id) => {
    try {
      await deleteLidApi(id);
      const filteredLids = clients.filter((c) => c._id !== id);
      setClients([...filteredLids]);
      document.activeElement.blur();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="clients_list">
      <div className="list_head">
        <h1 className="list_title">Lidlar</h1>
        <button className="list_button" onClick={() => navigate("/lids/new")}>
          <span>+</span> Lid qo'shish
        </button>
      </div>
      <div className="list_body">
        {listEnable ? (
          <ClientsList clients={clients} removeLid={removeLid} />
        ) : (
          <ClientsCards clients={clients} removeLid={removeLid} />
        )}
      </div>
    </div>
  );
};

export default LidsContent;
