// DeleteListButton.tsx
import React from "react";
import { ShoppingListType } from "../../../../interfaces/shoppingListInterfaces";

interface DeleteListButtonProps {
  listId: string;
  setLists: React.Dispatch<React.SetStateAction<ShoppingListType[]>>;
}

interface EditListButtonProps {
  onEdit: () => void;
}

function EditListButton({ onEdit }: EditListButtonProps) {
  return (
    <button onClick={onEdit}>Edit List</button>
  );
}

export default EditListButton;