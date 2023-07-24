import React, { useEffect } from "react";
import { UsersList } from "../../features/Users";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { user } from "../../app/atoms";
import { useState } from "react";

const List = () => {
  const navigate = useNavigate();
  const [permission, setPermission] = useState(false);
  const [authUser, setAuthUser] = useAtom(user);

  useEffect(() => {
    if (authUser?.owner === true) {
      setPermission(true);
    } else {
      navigate("/dashboard");
    }
  }, []);

  return permission ? <UsersList /> : null;
};

export default List;
