import React from "react";
import "./ShoppingListArea.css";
import ShoppingList from "./ShoppingList";
import { ShoppingListType } from "../../../../interfaces/shoppingListInterfaces";

interface ShoppingListAreaProps {
  lists: ShoppingListType[];
  setLists: React.Dispatch<React.SetStateAction<ShoppingListType[]>>;
}

function ShoppingListArea({ lists, setLists }: ShoppingListAreaProps) {
  return (
    <div className="shopping-list-area">
      <h2>Your Shopping Lists:</h2>
      {lists.map((list) => (
        <ShoppingList key={list._id} list={list} setLists={setLists} />
      ))}
    </div>
  );
}

export default ShoppingListArea;
