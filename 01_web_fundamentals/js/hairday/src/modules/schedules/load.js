import { fetchScheduleByDay } from "../../services/schedule-fetch-by-day.js"
import { hoursLoad } from "../form/hours-load.js"
import { showSchedules } from "./show.js"

const dateInput = document.getElementById("date") 

export async function schedulesDay() {
  const date = dateInput.value

  const dailySchedules = await fetchScheduleByDay({ date })

  showSchedules({ dailySchedules })

  hoursLoad({ date, dailySchedules })
}

