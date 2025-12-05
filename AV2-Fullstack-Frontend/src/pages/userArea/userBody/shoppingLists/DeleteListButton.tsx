// DeleteListButton.tsx
import React from "react";
import DeleteList from "../../../../api/DeleteList";
import { ShoppingListType } from "../../../../interfaces/shoppingListInterfaces";

interface DeleteListButtonProps {
  listId: string;
  setLists: React.Dispatch<React.SetStateAction<ShoppingListType[]>>;
}

function DeleteListButton({ listId, setLists }: DeleteListButtonProps) {
  function handleDeleteList() {
    const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
    const token = localStorage.getItem("authToken") || "";
    console.log("Deleting list with params:", { apiUrl, token, listId });
    DeleteList(apiUrl, token, listId)
      .then((res) => {
        setLists((prevLists) => prevLists.filter((l) => l._id !== listId));
      })
      .catch((err) => {
        console.error("DeleteList error:", err);
      });
  }

  return (
    <button onClick={handleDeleteList}>Delete List</button>
  );
}

export default DeleteListButton;