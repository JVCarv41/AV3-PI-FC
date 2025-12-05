import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingListType,
  ProductType,
} from "../../../interfaces/shoppingListInterfaces";

import "./ListBody.css";

import ProductInput from "./ProductInput";
import DateInput from "./DateInput";

import PutList from "../../../api/PutList";
import PatchList from "../../../api/PatchList";
import CreateList from "../../../api/CreateList";
import GetListById from "../../../api/GetListById";

type ListBodyProps = {
  listId: string;
};

const defaultList: ShoppingListType = {
  _id: "",
  date: "",
  products: [],
};

function ListBody({ listId }: ListBodyProps) {
  const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
  const token = localStorage.getItem("authToken") || "";
  const navigate = useNavigate();

  const mode = listId === "new" ? "create" : "edit";

  const [list, setList] = useState<ShoppingListType>(defaultList);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (mode === "edit" && listId) {
      const fetchList = async () => {
        try {
          const response = await GetListById(apiUrl, token, listId);
          const listData = response.data;
          setList(listData);
          setProducts(listData.products);
          setYear(listData.date.slice(0, 4));
          setMonth(listData.date.slice(5, 7));
          setDay(listData.date.slice(8, 10));
        } catch (err) {
          console.error("Erro ao buscar lista:", err);
          alert("Erro ao carregar a lista. Verifique o ID.");
          navigate("/shopping-list");
        }
      };
      fetchList();
    }
  }, [apiUrl, token, listId, mode, navigate]);

  const handleProductChange = (
    idx: number,
    field: keyof ProductType,
    value: string | number
  ) => {
    setProducts((prev) =>
      prev.map((prod, i) => (i === idx ? { ...prod, [field]: value } : prod))
    );
  };

  const handleAddProduct = () => {
    setProducts((prev) => [
      ...prev,
      { name: "", category: "", quantity: 1, unit: "" },
    ]);
  };

  const handleRemoveProduct = (idx: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== idx));
  };

  const callApiEditList = (
    original: ShoppingListType,
    updated: ShoppingListType
  ) => {
    const listId: string = original._id;
    const dateChanged = original.date !== updated.date;
    const productsChanged =
      original.products.length !== updated.products.length ||
      original.products.some((prod, idx) => {
        const up = updated.products[idx];
        return (
          prod.name !== up.name ||
          prod.category !== up.category ||
          prod.quantity !== up.quantity ||
          prod.unit !== up.unit
        );
      });

    if (dateChanged && productsChanged) {
      return PutList(apiUrl, token, listId, updated);
    } else if (dateChanged) {
      return PatchList(apiUrl, token, listId, { date: updated.date });
    } else if (productsChanged) {
      return PatchList(apiUrl, token, listId, { products: updated.products });
    } else {
      return Promise.resolve();
    }
  };

  const callApiAddList = (list: ShoppingListType) => {
    return CreateList(apiUrl, token, list);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const composedDate = year && month && day ? `${year}-${month}-${day}` : "";

    const newList: ShoppingListType = {
      ...(list || defaultList),
      date: composedDate,
      products,
    };

    const apiPromise =
      mode === "create"
        ? callApiAddList(newList)
        : callApiEditList(list, newList);

    apiPromise
      .then(() => {
        console.log("Lista salva com sucesso.");
        navigate("/shopping-list");
      })
      .catch((err) => {
        console.error("Erro ao salvar a lista:", err);
      });
  };

  return (
    <div className="list-container">
      <h2>{mode === "edit" ? "Edit Shopping List" : "Create Shopping List"}</h2>
      <form onSubmit={handleSubmit}>
        <DateInput
          year={year}
          month={month}
          day={day}
          setYear={setYear}
          setMonth={setMonth}
          setDay={setDay}
        />
        <div>
          <strong>Products:</strong>
          <ul>
            {products.map((product, idx) => (
              <ProductInput
                key={idx}
                product={product}
                idx={idx}
                onChange={handleProductChange}
                onRemove={handleRemoveProduct}
              />
            ))}
          </ul>
          <button
            type="button"
            onClick={handleAddProduct}
            className="add-product-button"
          >
            Add Product
          </button>
        </div>
        <div className="submission-buttons">
          <button type="submit" className="submit-button">
            {mode === "edit" ? "Save" : "Create"}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/shopping-list")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListBody;
