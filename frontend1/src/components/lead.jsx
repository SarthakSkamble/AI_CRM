import { useContext, useEffect, useState } from "react";
import Leadcontext from "../context/leadcontext";
import AddLeadModal from "./lead_Add";
import UpdateLeadModal from "./update_lead";
import CreateOpportunity from "./convert_to_opportunity";
import Search_lead from "./lead_search";

export default function Leads() {
  const { leads, setLeads, leadid, setleadid } = useContext(Leadcontext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://ai-crm-kb9x.onrender.com/api/v1/lead/leads_search",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || "Failed to fetch leads");
        }

        setLeads(data.reap || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [setLeads]);

  if (loading) {
    return <div className="p-6">Loading leads...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="relative">

      
      <div
        className={
          showAddModal || showUpdateModal || showConvertModal
            ? "blur-sm pointer-events-none"
            : ""
        }
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Leads</h2>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700"
          >
            Add Lead
          </button>
        </div>

        <div className="mb-4 max-w-md">
          <Search_lead />
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="max-h-[420px] overflow-y-auto">
            <table className="w-full table-fixed text-sm">

              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Salutation</th>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2 max-w-[180px]">Email</th>
                  <th className="border p-2 max-w-[220px]">Address</th>
                  <th className="border p-2">Source</th>
                  <th className="border p-2">Created</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.lead_id}
                    className="text-center hover:bg-gray-100"
                  >
                    <td className="border p-2 break-words">{lead.Name}</td>
                    <td className="border p-2">{lead.salutation}</td>
                    <td className="border p-2 break-words">{lead.title}</td>
                    <td className="border p-2 break-words">{lead.description}</td>
                    <td className="border p-2 font-semibold">
                      {lead.lead_status}
                    </td>
                    <td className="border p-2">{lead.phone}</td>

                    {/* EMAIL */}
                    <td
                      title={lead.email}
                      className="border p-2 break-all max-w-[180px]"
                    >
                      {lead.email}
                    </td>

                    
                    <td
                      title={lead.address}
                      className="border p-2 break-words max-w-[220px]"
                    >
                      {lead.address}
                    </td>

                    <td className="border p-2">{lead.source}</td>

                    <td className="border p-2">
                      {new Date(lead.createdAt).toLocaleString()}
                    </td>

                   
                    <td className="border p-2 space-y-1">
                      <button
                        onClick={() => {
                          setleadid(lead.lead_id);
                          setShowUpdateModal(true);
                        }}
                        className="w-full bg-blue-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => {
                          setleadid(lead.lead_id);
                          setShowConvertModal(true);
                        }}
                        className="w-full bg-green-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Convert
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {leads.length === 0 && (
          <p className="mt-4 text-center text-gray-500">
            No leads found
          </p>
        )}
      </div>

      {showAddModal && (
        <AddLeadModal
          onClose={() => setShowAddModal(false)}
          onLeadCreated={(newLead) =>
            setLeads((prev) => [newLead, ...prev])
          }
        />
      )}

      {showUpdateModal && (
        <UpdateLeadModal
          onClose={() => {
            setShowUpdateModal(false);
            setleadid(null);
          }}
        />
      )}

      
      {showConvertModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="relative max-h-[90vh] overflow-y-auto">
            <CreateOpportunity
              onClose={() => {
                setShowConvertModal(false);
                setleadid(null);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}