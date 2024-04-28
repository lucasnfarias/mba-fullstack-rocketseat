import dayjs from "dayjs";
import { apiConfig } from "./api.config";

export async function fetchScheduleByDay({ date }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`);
    const data = await response.json();

    const dailySchedules = data.filter(({ scheduledDate }) =>
      dayjs(date).isSame(scheduledDate, "day")
    );

    return dailySchedules;
  } catch (error) {
    console.error(error);
    alert("Não foi possível buscar os agendamentos do dia selecionado.");
  }
}
