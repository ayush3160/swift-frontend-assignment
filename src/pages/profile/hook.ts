import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import API from "../../constants/apiConstants";

interface ProfileDetails {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const useProfileDetails = () => {
  const [user, setUser] = useState<ProfileDetails | null>(null);

  const fetchUserInformation = useCallback(() => {
    axios
      .get(API.UserAPI)
      .then((r) => {
        return r.data;
      })
      .then(setUser);
  }, [setUser]);

  useEffect(() => {
    fetchUserInformation();
  }, []);

  return { user };
};
