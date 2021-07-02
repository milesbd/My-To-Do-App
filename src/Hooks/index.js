import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const todoHook = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const setInitial = async () => {
      const jsonListUnparsed = await AsyncStorage.getItem("list");
      const jsonList =
        jsonListUnparsed !== null && typeof jsonListUnparsed !== undefined
          ? JSON.parse(jsonListUnparsed)
          : [];
      setList(jsonList);
    };
    setInitial();
  }, [list, setList]);

  const addNewItem = async (item) => {
    try {
      list.push({
        content: item,
        checked: false,
        createTime: Date.now(),
      });
      const jsonValue = JSON.stringify(list);
      await AsyncStorage.setItem("list", jsonValue);
      return list;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const markItemComplete = async (createTime) => {
    try {
      const jsonList = list.map((li, i) => {
        if (li.createTime === createTime) {
          li.checked = !li.checked;
          li.completeItem = Date.now();
        }
        return li;
      });
      const jsonValue = JSON.stringify(jsonList);
      await AsyncStorage.setItem("list", jsonValue);
      return jsonList;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const deleteListItem = async (createTime) => {
    try {
      const jsonList = list.filter((li, i) => {
        return li.createTime !== createTime;
      });
      const jsonValue = JSON.stringify(jsonList);
      await AsyncStorage.setItem("list", jsonValue);
      return jsonList;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const deleteCompletedListItems = async () => {
    try {
      const jsonList = list.filter((li, i) => {
        return !li.checked;
      });
      const jsonValue = JSON.stringify(jsonList);
      await AsyncStorage.setItem("list", jsonValue);
      return jsonList;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return {
    list,
    addItem: async (item) => {
      if (item.length > 0) {
        const updatedList = await addNewItem(item);
        return updatedList === null ? setList(list) : setList(updatedList);
      }
    },
    completeItem: async (createTime) => {
      const updatedList = await markItemComplete(createTime);
      return updatedList === null ? setList(list) : setList(updatedList);
    },
    deleteItem: async (createTime) => {
      const updatedList = await deleteListItem(createTime);
      return updatedList === null ? setList(list) : setList(updatedList);
    },
    deleteCompletedItems: async () => {
      const updatedList = await deleteCompletedListItems(list);
      return updatedList === null ? setList(list) : setList(updatedList);
    },
  };
};
