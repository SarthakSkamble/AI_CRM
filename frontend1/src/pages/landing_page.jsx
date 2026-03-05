import { useNavigate } from "react-router-dom";
function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">AI Based CRM</h1>
        <div className="flex gap-4">
          <button onClick={()=>{navigate("/login")}} className="px-5 py-2 rounded-lg border border-white hover:bg-white hover:text-indigo-600 transition">
            Login
          </button>
          <button onClick={()=>{navigate("/signup")}} className="px-5 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 mt-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          AI-Based CRM Platform
        </h2>
        <p className="max-w-2xl text-lg text-indigo-100 mb-10">
          Smart customer relationship management powered by AI to help your sales
          team manage leads, close deals faster, and grow revenue.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <button onClick={()=>{navigate(`/register_organization`)}} className="px-8 py-3 rounded-xl border border-white font-semibold hover:bg-white hover:text-indigo-600 transition">
            Register Organization
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-800 mt-24 py-20 rounded-t-3xl">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-14">Key Features</h3>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature Card */}
            <div className="p-6 rounded-xl shadow-md border">
              <h4 className="text-xl font-semibold mb-3">User Management</h4>
              <p className="text-gray-600">
                Secure authentication with role-based access for Admins and Sales
                Executives.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow-md border">
              <h4 className="text-xl font-semibold mb-3">Lead Management</h4>
              <p className="text-gray-600">
                Centralized lead storage, assignment, and real-time status
                tracking across the sales pipeline.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow-md border">
              <h4 className="text-xl font-semibold mb-3">Sales Pipeline</h4>
              <p className="text-gray-600">
                Visualize lead stages, deal values, and progress from prospect to
                customer.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow-md border">
              <h4 className="text-xl font-semibold mb-3">AI Lead Scoring</h4>
              <p className="text-gray-600">
                AI scores leads from 0–100 and prioritizes them as High, Medium,
                or Low.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow-md border">
              <h4 className="text-xl font-semibold mb-3">Conversion Prediction</h4>
              <p className="text-gray-600">
                Predicts the likelihood of lead conversion using machine learning
                models.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow-md border">
              <h4 className="text-xl font-semibold mb-3">Smart Follow-ups</h4>
              <p className="text-gray-600">
                AI-driven follow-up recommendations based on inactivity and lead
                behavior.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      
    </div>
  );
}

export default LandingPage