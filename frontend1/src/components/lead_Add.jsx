import { useState } from "react";

export default function AddLeadModal({ onClose, onLeadCreated }) {
  const [Name, setName] = useState("");
  const [salutation, setSalutation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lead_status, setLeadStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [source, setSource] = useState("");
  const [age, setage] = useState("");
  const [city, setcity] = useState("");
  const [calls_made, setcalls] = useState("");
  const [emails_sent, setemails] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://ai-crm-kb9x.onrender.com/api/v1/lead/create_lead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            Name,
            salutation,
            title,
            description,
            lead_status,
            phone,
            email,
            address,
            source,
            age:Number(age),
      city,
      calls_made:Number(calls_made),
      emails_sent:Number(emails_sent)
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.msg || "Failed to create lead");
        setLoading(false);
        return;
      }

    
      onLeadCreated(data.lead);

      
      onClose();
    } catch (err) {
      setMsg("Server error");
    } finally {
      setLoading(false);
    }
  }
  return (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">

    <div className="bg-white w-[750px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8">

      <h2 className="text-2xl font-bold text-center mb-8">
        Create Lead
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

       
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Name *</label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

       
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Salutation</label>
          <select
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={salutation}
            onChange={(e) => setSalutation(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Dr.">Dr.</option>
            <option value="Prof.">Prof.</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Title</label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

       
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Phone *</label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Email *</label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

      
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Lead Status *</label>
          <select
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={lead_status}
            onChange={(e) => setLeadStatus(e.target.value)}
          >
            <option value="">Select</option>
            <option value="New">NEW</option>
            <option value="Connected">Connected</option>
            <option value="Interested">Interested</option>
            <option value="Follow_up">Follow-Up</option>
            <option value="Sales_ready">Sales Ready</option>
            <option value="Converted to opportunity">Converted to Opportunity</option>
            <option value="Not interested">Not Interested</option>
            <option value="Not reachable">Not Reachable </option>
          </select>
        </div>

       
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Source *</label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Age</label>
          <input
          type="number"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">City</label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={city}
            onChange={(e) => setcity(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Calls Count</label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={calls_made}
            onChange={(e) => setcalls(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Emails Sent</label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={emails_sent}
            onChange={(e) => setemails(e.target.value)}
          />
        </div>

       
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Address</label>
          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

       
        <div className="col-span-2 flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Description</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {msg && (
          <div className="col-span-2 text-red-600 text-center">
            {msg}
          </div>
        )}

       
        <div className="col-span-2 flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Saving..." : "Create Lead"}
          </button>
        </div>

      </form>
    </div>
  </div>
);

  
}