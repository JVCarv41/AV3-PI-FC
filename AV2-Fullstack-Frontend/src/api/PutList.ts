import axios from "axios";
import { ShoppingListType } from "../interfaces/shoppingListInterfaces";
import ErrorHandler from "./ErrorHandler";

export interface PutListResponse {
  data: ShoppingListType;
}

async function PutList(
  apiUrl: string,
  token: string,
  listId: string,
  updatedList: ShoppingListType
): Promise<PutListResponse> {
  const fullUrl = `${apiUrl}/api/shopping/${listId}`;
  const timeoutSeconds = 20;

  console.log(`[PutList] PUT ${fullUrl}`);
  console.log(`[PutList] Payload:`, updatedList);
  try {
    const response = await axios.put<ShoppingListType>(
      fullUrl,
      updatedList,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1000 * timeoutSeconds,
      }
    );
    console.log(`[PutList] Success:`, response.data);
    return { data: response.data };
  } catch (error) {
    ErrorHandler("PutList", error);
    throw error;
  }
}

export default PutList;