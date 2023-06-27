import React, { useEffect, useState } from "react";
import "./LidsContent.scss";
import ClientsList from "../components/ClientsList/ClientsList";
import ClientsCards from "../components/ClientsCards/ClientsCards";
import { MAX_WIDTH_TABLET } from "../../../constants";

const LidsContent = () => {
  const [clients, setClients] = useState([
    {
      name: "Alfreds Futterkiste",
      info: "Telegram orqali aniqlandi",
      phone: "+998-93-189-73-18",
    },
    {
      name: "Centro comercial Moctezuma",
      info: "Instagramda podpiscik",
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
    <div className="clients_list">
      <div className="list_head">
        <h1 className="list_title">Lidlar</h1>
      </div>
      <div className="list_body">
        {listEnable ? (
          <ClientsList clients={clients} />
        ) : (
          <ClientsCards clients={clients} />
        )}
      </div>
    </div>
  );
};

export default LidsContent;
