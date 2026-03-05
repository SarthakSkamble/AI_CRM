import { useContext, useState, useEffect } from "react";
import Leadcontext from "../context/leadcontext";

export default function Search_lead() {
  const { setLeads } = useContext(Leadcontext);
  const [state, setLeadStatus] = useState("");

  useEffect(() => {
    const handle = async () => {
      if (!state) return;

      try {
        const token = localStorage.getItem("token");
        let res;

        if (state === "my_leads") {
          res = await fetch("https://ai-crm-kb9x.onrender.com/api/v1/lead/my_leads", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } 
        
        else if (state === "all_leads") {
          res = await fetch("https://ai-crm-kb9x.onrender.com/api/v1/lead/leads_search", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } 
        
        else {
          res = await fetch(
            "https://ai-crm-kb9x.onrender.com/api/v1/lead/controlled_search",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                type: state,
              }),
            }
          );
        }

        const data = await res.json();
        console.log(data);

        setLeads(data.reap || []);
      } catch (error) {
        console.log(error);
      }
    };

    handle();
  }, [state, setLeads]);

  return (
    <div>
      <label className="text-sm font-medium mb-2 text-gray-700">
        Search leads *
      </label>

      <select
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
        value={state}
        onChange={(e) => setLeadStatus(e.target.value)}
      >
        <option value="">Select</option>
        <option value="all_leads">All Leads</option>
        <option value="my_leads">My Leads</option>
        <option value="New">NEW</option>
        <option value="Connected">Connected</option>
        <option value="Interested">Interested</option>
        <option value="Follow_up">Follow-Up</option>
        <option value="Sales_ready">Sales Ready</option>
      </select>
    </div>
  );
}