import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterOrganization() {
  const navigate = useNavigate();
  const resultRef = useRef(null);

  const [organization_name, setOrganizationName] = useState("");
  const [organization_email, setOrganizationEmail] = useState("");
  const [admin_name, setAdminName] = useState("");
  const [admin_email, setAdminEmail] = useState("");
  const [admin_password, setAdminPassword] = useState("");
  const [industry_type, setIndustryType] = useState("");
  const [country, setCountry] = useState("");
  const [preferred_language, setPreferredLanguage] = useState("");
  const [result, setResult] = useState("");

  const [services, setServices] = useState([]);

  const [service_name, setServiceName] = useState("");
  const [service_code, setServiceCode] = useState("");
  const [service_category, setServiceCategory] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [service_price, setprice] = useState(0);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [result]);

  const addService = () => {
    if (!service_name) return;

    const newService = {
      service_name,
      service_code,
      service_category,
      service_description,
      service_price
    };

    setServices([...services, newService]);

    setServiceName("");
    setServiceCode("");
    setServiceCategory("");
    setServiceDescription("");
    setprice(0)
  };

  const deleteService = (index) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("");

    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/orgnization_registration/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organization_name,
            organization_email,
            admin_name,
            admin_email,
            admin_password,
            industry_type,
            country,
            preferred_language,
            services,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 409) {
        setResult(data.msg || "User already exists. Redirecting to login...");
        setTimeout(() => navigate("/login"), 5000);
      } else if (res.status === 200 || res.status === 201) {
        setResult("User created successfully. Redirecting to login...");
        setTimeout(() => navigate("/login"), 5000);
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } catch (err) {
      setResult("Server not reachable. Please try later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Register Your Organization
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Organization */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Organization Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                placeholder="Organization Name"
                value={organization_name}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="input"
                required
              />

              <input
                placeholder="Organization Email"
                value={organization_email}
                onChange={(e) => setOrganizationEmail(e.target.value)}
                className="input"
                required
              />

              <input
                placeholder="Industry Type"
                value={industry_type}
                onChange={(e) => setIndustryType(e.target.value)}
                className="input"
              />

              <input
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="input"
              />
            </div>
          </div>

          {/* Admin */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Primary Admin Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                placeholder="Admin Name"
                value={admin_name}
                onChange={(e) => setAdminName(e.target.value)}
                className="input"
                required
              />

              <input
                placeholder="Admin Email"
                value={admin_email}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="input"
                required
              />

              <input
                type="password"
                placeholder="Admin Password"
                value={admin_password}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="input"
                required
              />

              <select
                value={preferred_language}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="input"
              >
                <option value="">Preferred Language</option>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Services Provided
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Service Name"
                value={service_name}
                onChange={(e) => setServiceName(e.target.value)}
                className="input"
              />

              <input
                placeholder="Service Code"
                value={service_code}
                onChange={(e) => setServiceCode(e.target.value)}
                className="input"
              />

              <input
                placeholder="Service Category"
                value={service_category}
                onChange={(e) => setServiceCategory(e.target.value)}
                className="input"
              />
              <input
                type="number"
                placeholder="Amount"
                value={service_price}
                onChange={(e) => setprice(e.target.value)}
                className="input"
                required
              />

              <input
                placeholder="Service Description"
                value={service_description}
                onChange={(e) => setServiceDescription(e.target.value)}
                className="input"
              />
            </div>

            <button
              type="button"
              onClick={addService}
              className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
            >
              Add Service
            </button>

            {/* Service List */}
            <div className="mt-6 space-y-2">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{service.service_name}</p>
                    <p className="text-sm text-gray-500">
                      {service.service_category}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteService(index)}
                    className="text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-white text-black font-semibold shadow-xl shadow-black/30"
            >
              Register Organization
            </button>
          </div>
        </form>

        {result && (
          <div ref={resultRef} className="flex justify-center mt-6">
            <p className="text-red-600 font-semibold bg-red-50 px-4 py-2 rounded-lg border">
              {result}
            </p>
          </div>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.2);
        }
      `}</style>
    </div>
  );
}