import React, { useState } from "react";
import "./ShoppingListArea.css";
import { ShoppingListType } from "../../../../interfaces/shoppingListInterfaces";
import DeleteListButton from "./DeleteListButton";
import EditListButton from "./EditListButton";
import EditListModal from "../../listBody/ListBody";
import { useNavigate } from "react-router-dom";

interface ShoppingListProps {
  list: ShoppingListType;
  setLists: React.Dispatch<React.SetStateAction<ShoppingListType[]>>;
}
function unitNameHandler(productQuantity: number, productUnit: string): string {
  const pluralMap: Record<string, string> = {
    Kg: "Kg",
    g: "g",
    L: "L",
    ml: "ml",
    Unit: "Units",
    Package: "Packages",
    Box: "Boxes",
  };
  if (productQuantity <= 1) return productUnit;
  return pluralMap[productUnit] ?? productUnit + "s";
}

function ShoppingList({ list, setLists }: ShoppingListProps) {
  const formattedDate = list.date ? list.date.slice(0, 10) : "";
  const navigate = useNavigate();

  // Group products by category
  const productsByCategory: { [category: string]: typeof list.products } = {};
  list.products.forEach((product) => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = [];
    }
    productsByCategory[product.category].push(product);
  });

  return (
    <div className="shopping-list">
      <div className="shopping-list-header">
        <h2>Shopping List - {formattedDate}</h2>
        <div className="shopping-list-header-buttons">
          <EditListButton
            onEdit={() => navigate(`/shopping-list/${list._id}`)}
          />
          <DeleteListButton listId={list._id} setLists={setLists} />
        </div>
      </div>
      {Object.entries(productsByCategory).map(([category, products]) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {products.map((product, idx) => (
              <li key={idx}>
                {product.name} ({product.quantity} {unitNameHandler(product.quantity, product.unit)})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ShoppingList;
