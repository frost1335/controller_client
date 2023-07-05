import React, { useEffect, useState, useTransition } from "react";
import "./LidsContent.scss";
import ClientsList from "../components/ClientsList/ClientsList";
import ClientsCards from "../components/ClientsCards/ClientsCards";
import { MAX_WIDTH_TABLET } from "../../../../constants";
import { useNavigate } from "react-router-dom";
import { deleteLidApi, getAllLidsApi } from "../../api";

const LidsContent = () => {
  const [isPending, startTransition] = useTransition();
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const [listEnable, setListEnable] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLidsApi();
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

  const removeLid = (id) => {
    try {
      startTransition(async () => {
        await deleteLidApi(id);
      });
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
