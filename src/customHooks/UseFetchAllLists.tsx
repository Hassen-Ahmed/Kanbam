import { useEffect } from "react";
import { getAllLists } from "../utils/api/gets";
import { IActionBoard } from "../types/actions.type";

const UseFetchAllLists = ({
  dispatch,
}: {
  dispatch: React.Dispatch<IActionBoard>;
}) => {
  const fetchAllLists = async () => {
    try {
      const res = await getAllLists();

      res?.sort((a, b) => a.indexNumber - b.indexNumber);

      res?.map((listsObj) => {
        const sortedlist = listsObj.list.sort(
          (a, b) => a.indexNumber - b.indexNumber
        );
        return { ...listsObj, list: sortedlist };
      });

      // save res to localStorage for later we compare this storedLists/res to lists and for PUT request.

      localStorage.setItem("storedLists", JSON.stringify(res));
      console.log("UseFetchAllLists ---->", res);

      dispatch({ type: "ADD_ALL_LISTS", payload: res });
    } catch (err) {
      console.log(`Error message: ${err}`);
    } finally {
      console.log("Sent GetAllLists request from UseFetchAllLists.");
    }
  };

  useEffect(() => {
    fetchAllLists();
  }, []);
};

export default UseFetchAllLists;
