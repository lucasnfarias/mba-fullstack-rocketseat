import dayjs from "dayjs";

const morningPeriod = document.getElementById("period-morning")
const afternoonPeriod = document.getElementById("period-afternoon")
const nightPeriod = document.getElementById("period-night")

export function showSchedules({ dailySchedules }) {
  try {
    morningPeriod.innerHTML = ""
    afternoonPeriod.innerHTML = ""
    nightPeriod.innerHTML = ""

    dailySchedules.forEach(({ id, name: clientName, scheduledDate }) => {
      const item = document.createElement("li")
      const time = document.createElement("strong")
      const name = document.createElement("span")

      item.setAttribute("data-id", id)
      time.textContent = dayjs(scheduledDate).format("HH:mm")
      name.textContent = clientName

      const cancelIcon = document.createElement("img")
      cancelIcon.classList.add("cancel-icon")
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
      cancelIcon.setAttribute("alt", "Cancelar")

      item.append(time, name, cancelIcon)

      const hour = dayjs(scheduledDate).hour()

      if (hour <= 12) {
        morningPeriod.appendChild(item)
      }
      else if (hour > 12 && hour <= 18) {
        afternoonPeriod.appendChild(item)
      }
      else {
        nightPeriod.appendChild(item)
      }
    })
  } catch (error) {
    console.error(error)
    alert("Não foi possível exibir os agendamentos")
  }
}