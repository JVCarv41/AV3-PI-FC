import GetAllLists from "../../../../api/GetAllLists";

function ReloadListsButton({ setLists, setCount }: { setLists: any, setCount: any }) {
  async function handleGetLists() {
    const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
    const token = localStorage.getItem("authToken") || "";
    try {
      const result = await GetAllLists(apiUrl, token);
      setLists(result.data);
      setCount(result.count);
      console.log(`Number of lists found: ${result.count}`);
    } catch (err) {
      // ErrorHandler will handle errors in GetAllLists
    }
  }

  return (
    <button onClick={handleGetLists} className="button-area-button">
      Reload Shopping Lists
    </button>
  );
}

export default ReloadListsButton;