import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginUser from "../../api/LoginUser";

function LoginArea({ backendUrl }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      setIsLoading(true);

      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const response = await LoginUser(backendUrl, email, password);

      console.log("Login successful:", response.message);
      toast.success("Login successful!");

      // Store the JWT token in localStorage
      localStorage.setItem("authToken", response.token);

      // Redirect to shopping list page after login
      navigate("/shopping-list"); // Change the path as needed
    } catch (err: any) {
      // ErrorHandler in LoginUser handles errors and toasts
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <p>Log-in with your account. If you don't have one, then create one.</p>
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginArea;
