import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { getPlans } from "./api";

function App() {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    const data = await getPlans();
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h1 className="text-3xl font-bold text-gray-800">
            📚 AI Study Planner
          </h1>
          <p className="text-gray-500 mt-1">
            Plan smarter. Study better.
          </p>
        </div>

        {/* Form */}
        <Home refresh={fetchPlans} />

        {/* Plans */}
        <Dashboard plans={plans} refresh={fetchPlans} />
      </div>
    </div>
  );
}

export default App;