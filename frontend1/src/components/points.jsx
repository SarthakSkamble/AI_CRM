export default function Points() {
  return (
    <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Important Points</h2>

      <ul className="list-disc pl-5 space-y-2">
        <li>Two account types: <b>Admin</b> and <b>Sales Executive</b>.</li>
        <li>Sales Executives cannot access organizational settings.</li>
        <li>Admins can access both CRM features and organizational settings.</li>
        <li>Admin account is created while registering the organization.</li>
        <li>Admin provides the Organization ID to employees.</li>
      </ul>
    </div>
  );
}