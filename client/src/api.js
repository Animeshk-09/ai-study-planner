const BASE_URL = "http://localhost:5000/api";

export const createPlan = async (data) => {
  const res = await fetch(`${BASE_URL}/plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getPlans = async () => {
  const res = await fetch(`${BASE_URL}/plan`);
  return res.json();
};

export const markTaskDone = async (planId, taskId) => {
  await fetch(`${BASE_URL}/plan/${planId}/task/${taskId}`, {
    method: "PUT",
  });
};