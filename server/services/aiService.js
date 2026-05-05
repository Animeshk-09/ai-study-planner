/*export const generateStudyPlan = async (data) => {
  console.log("Using MOCK AI");

  return [
    {
      date: "2026-05-03",
      tasks: [
        { subject: "Math", topic: "Algebra", duration: 2 },
        { subject: "Physics", topic: "Mechanics", duration: 2 }
      ]
    }
  ];
};*/


import OpenAI from "openai";

export const generateStudyPlan = async (data) => {
  if (!data) {
    throw new Error("No input data received");
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
  Return ONLY valid JSON. No explanation.

  Create a study plan:

  Subjects: ${data.subjects}
  Topics: ${data.topics}
  Exam Date: ${data.examDate}
  Daily Study Hours: ${data.hours}

  Format:
  [
    {
      "date": "YYYY-MM-DD",
      "tasks": [
        { "subject": "", "topic": "", "duration": 1 }
      ]
    }
  ]
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch (e) {
    console.error("❌ JSON PARSE ERROR:", content);
    throw new Error("Invalid JSON from AI");
  }
};