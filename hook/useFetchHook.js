import { useEffect, useState } from "react";
import axios from "axios";

import { RAPID_API_KEY } from "@env";

const useFetchHook = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      ...query,
    },
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.request(options);
      // setData(response?.data?.data);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      alert("There was an error fetching the data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reFetchData = () => {
    setLoading(true);
    fetchData();
  };

  return { data, isLoading, isError, reFetchData };
};

export { useFetchHook };
