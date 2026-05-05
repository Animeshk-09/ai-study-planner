import { markTaskDone } from "../api";

const Dashboard = ({ plans, refresh }) => {
  const handleDone = async (planId, taskId) => {
    await markTaskDone(planId, taskId);
    refresh();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">📅 Your Plans</h2>

      {plans.length === 0 && (
        <p className="text-gray-500">No plans yet</p>
      )}

      {plans.map((plan) => (
        <div
          key={plan._id}
          className="bg-white p-5 rounded-2xl shadow space-y-3"
        >
          <h3 className="font-bold text-lg text-gray-700">
            {plan.date}
          </h3>

          {plan.tasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded"
            >
              <span className="text-gray-700">
                {task.subject} - {task.topic}
              </span>

              <button
                onClick={() => handleDone(plan._id, task._id)}
                className={`px-3 py-1 rounded text-sm transition ${
                  task.status === "done"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {task.status}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;