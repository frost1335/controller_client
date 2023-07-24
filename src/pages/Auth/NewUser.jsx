import React, { useEffect, useState } from "react";
import { UserForm } from "../../features/Users";
import { user } from "../../app/atoms";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

const NewUser = () => {
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

  return permission ? <UserForm /> : null;
};

export default NewUser;
