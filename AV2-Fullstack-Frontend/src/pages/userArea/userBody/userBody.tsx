import { useState } from "react";
import { ShoppingListType } from "../../../interfaces/shoppingListInterfaces";
import ShoppingListArea from "./shoppingLists/ShoppingListArea"
import ButtonArea from "./buttonArea/ButtonArea";
import "../UserPage"
function userBody() {
  const [lists, setLists] = useState<ShoppingListType[]>([]);
  const [count, setCount] = useState(0);
  return (
    <div className="user-body">
      <ShoppingListArea lists={lists} setLists={setLists} />
      <ButtonArea setLists={setLists} setCount={setCount} />
    </div>
  );
}
export default userBody;