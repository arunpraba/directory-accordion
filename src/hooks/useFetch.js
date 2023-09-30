import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../constants";

const addChildren = (array, next) => {
  // Base case
  if (!array) return;

  // If parent id is available push to parent directory
  if (next.parentId) {
    const index = array.findIndex((f) => f.id === next.parentId);
    if (index !== -1) {
      if (!array[index].children?.length) {
        array[index].children = [];
      }
      array[index].children.push(next);
    } else {
      array.forEach((element) => {
        addChildren(element.children, next);
      });
    }
  } else {
    array.push(next);
  }
};

const formatData = (data) => {
  return data.reduce((acc, next) => {
    addChildren(acc, next);
    return acc;
  }, []);
};

export const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((d) => {
        setData(formatData(d.data.data));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    data
  };
};
