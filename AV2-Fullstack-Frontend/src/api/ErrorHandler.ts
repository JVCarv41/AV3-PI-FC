import { toast } from "react-toastify";

function ErrorHandler(requestType: string, error: any) {
    // Log detailed error info
    console.error(`Error in ${requestType}:`, error);

    // Try to extract a user-friendly message
    let message = "An unexpected error occurred.";
    if (error?.response?.data?.error) {
        message = error.response.data.error;
    } else if (error?.response?.data?.message) {
        message = error.response.data.message;
    } else if (error?.message) {
        message = error.message;
    }
    // Handling the message cases
    if (message === "Token inválido"){
        localStorage.removeItem("authToken");
        window.location.href = "/"
        console.log("User logout because of invalid token.")
    }else if (message === "Path `unit` is required."){
        toast.error('Please, ensure you have chosen a unit for all products.')
    }else{
        // Show toast notification
        console.error(`${requestType} failed: ${message}`);
        toast.error(`Erro: ${message}`);
    }
}

export default ErrorHandler;