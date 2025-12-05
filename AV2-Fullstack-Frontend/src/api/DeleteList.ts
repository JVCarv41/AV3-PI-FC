import axios from "axios";
import ErrorHandler from "./ErrorHandler";

export interface DeleteListResponse {
  message: string;
  success?: boolean;
}

async function DeleteList(
  apiUrl: string,
  token: string,
  listId: string
): Promise<DeleteListResponse> {
  const fullUrl = `${apiUrl}/api/shopping/${listId}`;
  const timeoutSeconds = 20;

  try {
    console.log("Deleting list", {
      url: fullUrl,
      token: token,
      listId: listId,
    });
    const response = await axios.delete<DeleteListResponse>(
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

    console.log("List successfully deleted");
    return response.data;
  } catch (error) {
    ErrorHandler("DeleteList", error);
    throw error;
  }
}

export default DeleteList;