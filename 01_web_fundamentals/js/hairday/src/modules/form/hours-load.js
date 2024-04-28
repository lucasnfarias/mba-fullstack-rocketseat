import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours";
import { hoursClick } from "./hours-click.js";

const hoursList = document.querySelector("ul#hours")

export function hoursLoad({ date, dailySchedules }) {
  hoursList.innerHTML = ""

  const unavailableHours = dailySchedules.map(({ scheduledDate }) => dayjs(scheduledDate).format("HH:mm"))

  const opening = openingHours.map((hour) => {
    const [scheduleHour] = hour.split(":");

    const isFutureHour = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs());

    const isHourAvailable = !unavailableHours.includes(hour)

    return {
      hour,
      available: isFutureHour && isHourAvailable,
    };
  });

  opening.forEach(({ hour, available }) => {
    const hourItem = document.createElement("li")

    hourItem.classList.add("hour")
    hourItem.classList.add(available ? "hour-available" : "hour-unavailable")

    hourItem.textContent = hour

    if (hour === "9:00") {
      addHeaderHour("Manhã")
    }
    else if (hour === "13:00") {
      addHeaderHour("Tarde")
    }
    else if (hour === "18:00") {
      addHeaderHour("Noite")
    }

    hoursList.append(hourItem)
  })

  hoursClick()
}


function addHeaderHour(title) {
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = title

  hoursList.append(header)
}