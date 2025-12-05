import axios from "axios";
import { ShoppingListType } from "../interfaces/shoppingListInterfaces";
import ErrorHandler from "./ErrorHandler";

export interface GetAllListsResponse {
  data: ShoppingListType[];
  count: number;
}
async function GetAllLists(
  apiUrl: string,
  token: string
): Promise<GetAllListsResponse> {
  const fullUrl = `${apiUrl}/api/shopping`;
  const timeoutSeconds = 20;

  try {
    console.log("Requesting all lists from user", {
      url: fullUrl,
      token: token,
    });
    const response = await axios.get<ShoppingListType[]>(
      fullUrl,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1000 * timeoutSeconds,
      }
    );

    console.log("Response from backend:", response.data);
    const listCount: number = response.data.length;

    return {
      data: response.data,
      count: listCount,
    };
  } catch (error) {
    ErrorHandler("GetAllLists", error);
    throw error;
  }
}

export default GetAllLists;
