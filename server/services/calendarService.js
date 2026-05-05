import { google } from "googleapis";

export const pushPlanToCalendar = async (plan, tokens) => {
  if (!tokens) {
    throw new Error("No tokens found");
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials(tokens);

  const calendar = google.calendar({ version: "v3", auth });

  for (let day of plan) {
    let currentTime = new Date(`${day.date}T09:00:00`); // ✅ start once per day

    for (let task of day.tasks) {
      const startTime = new Date(currentTime);
      const endTime = new Date(startTime);

      endTime.setHours(endTime.getHours() + task.duration);

      // move time forward for next task
      currentTime = new Date(endTime);

      const event = {
        summary: `${task.subject} - ${task.topic}`,
        description: "Study Session",
        start: {
          dateTime: startTime.toISOString(),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: "Asia/Kolkata",
        },
      };

      await calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      console.log("📅 Event created:", event.summary);
    }
  }
};