import { useContext, useState } from "react";
import Ordercontext from "../context/ordercontext";

export default function Update_order({ onClose }) {

  const token = localStorage.getItem("token");

  const { order_id } = useContext(Ordercontext);

  const [order_status, setOrderStatus] = useState("");
  const [payment_status, setPaymentStatus] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const data = await fetch(
        "https://ai-crm-kb9x.onrender.com/api/v1/orders/update_order",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            order_id,
            order_status,
            payment_status,
          }),
        }
      );

      const res = await data.json();

      if (!data.ok) {
        setMsg(res.msg || "Update failed");
        setLoading(false);
        return;
      }

      setLoading(false);
      onClose();

    } catch (error) {
      setMsg("Something went wrong");
      setLoading(false);
    }
  };



  return (
    <>
      <div className="bg-white p-6 rounded-lg w-[420px]">

        <h2 className="text-2xl font-bold text-center mb-6">
          Update Order
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">


          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Order Status</label>

            <select
              className="border rounded-lg px-4 py-2"
              value={order_status}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
            </select>

          </div>



          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Payment Status</label>

            <select
              className="border rounded-lg px-4 py-2"
              value={payment_status}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>

          </div>



          {msg && (
            <div className="text-red-600 text-center">
              {msg}
            </div>
          )}



          <div className="flex justify-end gap-4 pt-4">

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
              {loading ? "Updating..." : "Update Order"}
            </button>

          </div>

        </form>

      </div>
    </>
  );
}