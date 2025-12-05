import axios from "axios";
import { ShoppingListType } from "../interfaces/shoppingListInterfaces";
import ErrorHandler from "./ErrorHandler";

export interface CreateListResponse {
  data: ShoppingListType;
}

async function CreateList(
  apiUrl: string,
  token: string,
  list: Omit<ShoppingListType, "_id">
): Promise<CreateListResponse> {
  const fullUrl = `${apiUrl}/api/shopping`;
  const timeoutSeconds = 20;

  // Prepare the payload as JSON
  const payload = {
    date: list.date,
    products: list.products.map(product => ({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      unit: product.unit,
    })),
  };

  console.log(`[CreateList] POST ${fullUrl}`);
  console.log(`[CreateList] Payload:`, payload);
  try {
    const response = await axios.post<ShoppingListType>(
      fullUrl,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1000 * timeoutSeconds,
      }
    );
    console.log(`[CreateList] Success:`, response.data);
    return { data: response.data };
  } catch (error) {
    ErrorHandler("CreateList", error);
    throw error;
  }
}

export default CreateList;