import axios from "axios";
import { ShoppingListType } from "../interfaces/shoppingListInterfaces";
import ErrorHandler from "./ErrorHandler";

export interface PatchListResponse {
  data: ShoppingListType;
}

async function PatchList(
  apiUrl: string,
  token: string,
  listId: string,
  partialList: Partial<ShoppingListType>
): Promise<PatchListResponse> {
  const fullUrl = `${apiUrl}/api/shopping/${listId}`;
  const timeoutSeconds = 20;

  console.log(`[PatchList] PATCH ${fullUrl}`);
  console.log(`[PatchList] Payload:`, partialList);
  try {
    const response = await axios.patch<ShoppingListType>(
      fullUrl,
      partialList,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1000 * timeoutSeconds,
      }
    );
    console.log(`[PatchList] Success:`, response.data);
    return { data: response.data };
  } catch (error) {
    ErrorHandler("PatchList", error);
    throw error;
  }
}

export default PatchList;