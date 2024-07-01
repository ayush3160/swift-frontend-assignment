import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import API from "../../constants/apiConstants";

export const useUserName = () => {
  const [userName, setUserName] = useState<string>("");

  const fetchUserInformation = useCallback(() => {
    axios
      .get(API.UserAPI)
      .then((r) => {
        return r.data.name;
      })
      .then(setUserName);
  }, [setUserName]);

  useEffect(() => {
    fetchUserInformation();
  }, []);

  return { userName };
};
