import { Wrench } from "lucide-react";

export default function After_sales_service() {
return ( <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">


  <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md border">

    <div className="flex justify-center mb-4">
      <Wrench className="w-12 h-12 text-blue-600" />
    </div>

    <h2 className="text-2xl font-semibold mb-2">
      After-Sales Service
    </h2>

    <p className="text-gray-600 mb-4">
      This module is currently under development.
      We're working hard to bring you powerful tools
      for managing customer support and service requests.
    </p>

    <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
      Coming Soon
    </span>

  </div>

</div>


);
}
