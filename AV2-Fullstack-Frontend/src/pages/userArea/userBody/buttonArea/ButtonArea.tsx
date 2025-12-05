import { useEffect, useRef } from "react";
import "./ButtonArea.css";
import CreateListButton from "./CreateListButton";
import ReloadListsButton from "./ReloadListsButton";
import GetAllLists from "../../../../api/GetAllLists";
function ButtonArea({ setLists, setCount }) {
  const calledOnce = useRef(false);

  useEffect(() => {
    if (!calledOnce.current) {
      console.log('Calling "handleGetLists"');
      calledOnce.current = true;
      // Use the same logic as ReloadListsButton for initial load
      const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
      const token = localStorage.getItem("authToken") || "";
        GetAllLists(apiUrl, token).then(result => {
          setLists(result.data);
          setCount(result.count);
          console.log(`Number of lists found: ${result.count}`);
        });
    }
  }, [setLists, setCount]);

  return (
    <div className="button-area">
      <ReloadListsButton setLists={setLists} setCount={setCount} />
      <CreateListButton setLists={setLists} />
    </div>
  );
}

export default ButtonArea;