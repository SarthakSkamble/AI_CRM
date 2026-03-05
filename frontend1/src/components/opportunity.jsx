import { useContext, useEffect, useState } from "react";
import Opportunitycontext from "../context/opportunitycontext";
import Opportunity_search from "./opportunity_search";
import Update_opportunity from "./opportunity_update";
import CreateOrder from "./convert_to_order";

export default function Opportunity() {
  const {
    opportunity,
    setopportunity,
    opportunityid,
    setopportunityid,
    leadid,
    setleadid
  } = useContext(Opportunitycontext);

  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const token = localStorage.getItem("token");

       
        const oppRes = await fetch(
          "https://ai-crm-kb9x.onrender.com/api/v1/opportunity/get_opportunity",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const oppJson = await oppRes.json();
        const opportunities = oppJson.data;

        
        const mergedData = await Promise.all(
          opportunities.map(async (opp) => {
            const leadRes = await fetch(
              `https://ai-crm-kb9x.onrender.com/api/v1/lead/leadid_search`,
              {
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    lead_id:opp.lead_id
                })
              }
            );

            const leadJson = await leadRes.json();
            const lead = leadJson.data;

            
            return {
              ...opp,
              salutation: lead?.salutation,
              phone: lead?.phone,
              email: lead?.email,
              address: lead?.address,
            };
          })
        );

        
        setopportunity(mergedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching merged data:", error);
        setLoading(false);
      }
    };

    fetch_data();
  }, [showUpdateModal]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  
  return (<>
    <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Opportunites</h2>
          </div>
          <div className="mb-4 max-w-md">
                    <Opportunity_search />
                  </div>
    <div className="p-6 overflow-x-auto">
      <table className="min-w-full border border-gray-300 shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Salutation</th>
            <th className="p-2 border">Opportunity Name</th>
            <th className="p-10 border">Title</th>
            <th className="p-2 border">Closing Date</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Stage</th>
            <th className="p-2 border">Probability</th>
            <th className="p-2 border">Forecast</th>
            <th className="p-2 border">Next Step</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {opportunity?.map((item) => (
            <tr
              key={item.opportunity_id}
              className="hover:bg-gray-100"
              onClick={() => setopportunityid(item.opportunity_id)}
            >
              <td className="p-2 border">{item.salutation}</td>
              <td className="p-2 border">{item.opportunity_name}</td>
              <td className="p-2 border">{item.title}</td>
              <td className="p-2 border">
                {new Date(item.closing_date).toLocaleDateString()}
              </td>
              <td className="p-2 border">₹{item.amount}</td>
              <td className="p-2 border">{item.stage}</td>
              <td className="p-2 border">{item.probability}%</td>
              <td className="p-2 border">{item.forecast_category}</td>
              <td className="p-2 border">{item.next_step}</td>
              <td className="p-2 border">{item.phone}</td>
              <td className="p-2 border">{item.email}</td>
              <td className="p-2 border">{item.address}</td>
              <td className="border p-2 space-y-1">
                      <button
                        onClick={(e) => {
    e.stopPropagation();
    setleadid(item.lead_id);
    setopportunityid(item.opportunity_id)
    setShowUpdateModal(true)
  }}
                        className="w-full bg-blue-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Update
                      </button>
                      <button
                        onClick={(e) => {
    e.stopPropagation();
    setleadid(item.lead_id);
    setopportunityid(item.opportunity_id)
    setShowConvertModal(true)
  }}
                        className="w-full bg-blue-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Create Order
                      </button>
                 </td>     
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {showUpdateModal && (
            <Update_opportunity
            onClose={() => {
            setShowUpdateModal(false);
            setopportunityid(null);
          }}
    
              
              
            />
          )}
    {showConvertModal && (
            <CreateOrder
            onClose={() => {
            setShowConvertModal(false);
            setopportunityid(null);
          }}
    
              
              
            />
          )}
    
    </>
  );
}