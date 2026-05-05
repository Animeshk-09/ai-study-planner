import { useState } from "react";
import { createPlan } from "../api";

const Home = ({ refresh }) => {
  const [form, setForm] = useState({
    subjects: "",
    topics: "",
    examDate: "",
    hours: 2,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createPlan({
      subjects: form.subjects.split(","),
      topics: form.topics.split(","),
      examDate: form.examDate,
      hours: Number(form.hours),
    });

    refresh();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Create Study Plan</h2>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          placeholder="Subjects (Math, Physics)"
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, subjects: e.target.value })}
        />

        <input
          placeholder="Topics (Algebra, Mechanics)"
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, topics: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, examDate: e.target.value })}
        />

        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Hours per day"
          onChange={(e) => setForm({ ...form, hours: e.target.value })}
        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition">
          Generate Plan
        </button>
      </form>
    </div>
  );
};

export default Home;