import axios from "axios";
import { ShoppingListType } from "../interfaces/shoppingListInterfaces";
import ErrorHandler from "./ErrorHandler";

export interface GetListByIdResponse {
  data: ShoppingListType;
}

async function GetListById(
  apiUrl: string,
  token: string,
  listId: string
): Promise<GetListByIdResponse> {
  const fullUrl = `${apiUrl}/api/shopping/${listId}`;
  const timeoutSeconds = 20;

  try {
    console.log("Requesting list by ID", {
      url: fullUrl,
      token: token,
      listId: listId,
    });
    const response = await axios.get<ShoppingListType>(
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

    return {
      data: response.data,
    };
  } catch (error) {
    ErrorHandler("GetListById", error);
    throw error;
  }
}

export default GetListById;