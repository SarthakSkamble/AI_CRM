import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [role,setrole]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("https://ai-crm-kb9x.onrender.com/api/v1/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Login failed");
      }

      
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);
  
      setMessage("Login successful!");
      setEmail("");
      setPassword("");
      navigate("/home")
      

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gray-100  shadow-lg rounded-xl p-8 w-96 hover:bg-gray-400">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
                value={role}
                onChange={(e) => setrole(e.target.value)}
                className="input rounded w-full h-[30px]"
              >
                <option value="">Role</option>
                <option value="admin">Admin</option>
                <option value="Sales Executive">Sales Executive</option>
              </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message}
      </div>
    </div>
  );
}