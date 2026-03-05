import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function UserProfile() {
   const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [orgInfo, setOrgInfo] = useState(null);

  useEffect(() => {

    async function fetchData() {

      const token = localStorage.getItem("token");

      const userRes = await fetch(
        "http://localhost:3000/api/v1/user/user_info",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = await userRes.json();

      if (userData?.data) {

        const data = userData.data;

        const filteredUser = {
          name: data.admin_name || data.full_name,
          email: data.admin_email || data.email,
          role: data.role || "Admin",
          employee_id: data.employee_id || null,
          sales_region: data.sales_region || null,
          preferred_language: data.preferred_language || null
        };

        setUserInfo(filteredUser);
      }

      const orgRes = await fetch(
        "http://localhost:3000/api/v1/organization/organization_info",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orgData = await orgRes.json();

      if (orgData?.data) {

        const data = orgData.data;

        const filteredOrg = {
          name: data.organization_name,
          email: data.organization_email,
          industry: data.industry_type,
          country: data.country,
          language: data.preferred_language
        };

        setOrgInfo(filteredOrg);
      }

    }

    fetchData();

  }, []);

  return (
    <div className="p-6 space-y-6">

      <div className="bg-white shadow-md rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-3">User Information</h2>

        {userInfo && (
          <div className="space-y-2">
            <p><b>Name:</b> {userInfo.name}</p>
            <p><b>Email:</b> {userInfo.email}</p>
            <p><b>Role:</b> {userInfo.role}</p>

            {userInfo.employee_id && <p><b>Employee ID:</b> {userInfo.employee_id}</p>}
            {userInfo.sales_region && <p><b>Sales Region:</b> {userInfo.sales_region}</p>}
            {userInfo.preferred_language && <p><b>Preferred Language:</b> {userInfo.preferred_language}</p>}
          </div>
        )}
      </div>


      <div className="bg-white shadow-md rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-3">Organization Information</h2>

        {orgInfo && (
          <div className="space-y-2">
            <p><b>Name:</b> {orgInfo.name}</p>
            <p><b>Email:</b> {orgInfo.email}</p>
            <p><b>Industry:</b> {orgInfo.industry}</p>
            <p><b>Country:</b> {orgInfo.country}</p>
            <p><b>Preferred Language:</b> {orgInfo.language}</p>
          </div>
        )}

      </div>
      <button
  onClick={() => {
    localStorage.removeItem("token");
    navigate("/");
  }}
  className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
>
  Logout
</button>
    </div>
  );
}