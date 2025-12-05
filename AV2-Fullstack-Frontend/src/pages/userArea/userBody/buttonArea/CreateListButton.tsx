import React, { useState } from "react";
import { ShoppingListType } from "../../../../interfaces/shoppingListInterfaces";
import { useNavigate } from "react-router-dom";

interface ShoppingListProps {
  setLists: React.Dispatch<React.SetStateAction<ShoppingListType[]>>;
}

function CreateListButton({ setLists }: ShoppingListProps) {
  const navigate = useNavigate();

  function handleCreateList() {
    navigate('/shopping-list/new')
  }

  return (
    <>
      <button onClick={handleCreateList} className="button-area-button">Create New List</button>
    </>
  );
}

export default CreateListButton;
