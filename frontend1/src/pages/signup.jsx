import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [organization_id, setOrganizationId] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [sales_region, setSalesRegion] = useState("");
  const [preferred_language, setPreferredLanguage] = useState("en");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("https://ai-crm-kb9x.onrender.com/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization_id,
          full_name,
          email,
          password,
          employee_id,
          sales_region,
          preferred_language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Signup failed");

        if (response.status === 409) {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } else {
        setSuccess("Account created successfully Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 mb-6">
          Join your organization’s CRM dashboard
        </p>

        {error && (
          <div className="mb-4 text-center text-red-600 font-medium bg-red-50 py-2 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-center text-green-600 font-medium bg-green-50 py-2 rounded-lg">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSignup}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Organization ID
            </label>
            <input
              type="text"
              value={organization_id}
              onChange={(e) => setOrganizationId(e.target.value)}
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Employee ID
            </label>
            <input
              type="text"
              value={employee_id}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Sales Region
            </label>
            <input
              type="text"
              value={sales_region}
              onChange={(e) => setSalesRegion(e.target.value)}
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Preferred Language
            </label>
            <select
              value={preferred_language}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </select>
          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={"w-full py-3 rounded-lg font-semibold text-gray-400 bg-slate-500 transition duration-200 shadow-2xl hover:text-white"}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}