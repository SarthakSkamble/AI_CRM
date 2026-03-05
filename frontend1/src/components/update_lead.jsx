import { useState, useContext, useEffect } from "react";
import Leadcontext from "../context/leadcontext";

export default function UpdateLeadModal({ onClose }) {
  const { leads, leadid, setLeads } = useContext(Leadcontext);

  const [Name, setName] = useState("");
  const [salutation, setSalutation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lead_status, setLeadStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [source, setSource] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const selectedLead = leads.find(
      (lead) => lead.lead_id === leadid
    );

    if (!selectedLead) return;

    setName(selectedLead.Name);
    setSalutation(selectedLead.salutation);
    setTitle(selectedLead.title);
    setDescription(selectedLead.description);
    setLeadStatus(selectedLead.lead_status);
    setPhone(selectedLead.phone);
    setEmail(selectedLead.email);
    setAddress(selectedLead.address);
    setSource(selectedLead.source);
  }, [leadid, leads]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:3000/api/v1/lead/update_lead",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            lead_id: leadid,   
            Name,
            salutation,
            title,
            description,
            lead_status,
            phone,
            email,
            address,
            source,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.msg || "Failed to update lead");
        setLoading(false);
        return;
      }

      
      setLeads((prev) =>
        prev.map((lead) =>
          lead.lead_id === leadid ? data.resp : lead
        )
      );

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
          Update Lead
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Name *</label>
            <input
              className="border rounded-lg px-4 py-2"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Salutation</label>
            <select
              className="border rounded-lg px-4 py-2"
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
              className="border rounded-lg px-4 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Phone *</label>
            <input
              className="border rounded-lg px-4 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Email *</label>
            <input
              className="border rounded-lg px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Lead Status *</label>
            <select
              className="border rounded-lg px-4 py-2"
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
              className="border rounded-lg px-4 py-2"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Address</label>
            <input
              className="border rounded-lg px-4 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Description</label>
            <textarea
              className="border rounded-lg px-4 py-2 h-28"
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
              className="px-6 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              {loading ? "Saving..." : "Update Lead"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}