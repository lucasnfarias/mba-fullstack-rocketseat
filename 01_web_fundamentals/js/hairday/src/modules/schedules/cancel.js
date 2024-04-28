import { cancelSchedule } from "../../services/cancel-schedule"
import { schedulesDay } from "./load"

const periods = document.querySelectorAll(".period")

periods.forEach(period => {
  period.addEventListener("click", async (event) => {
    const clickedElement = event.target
    if (clickedElement.classList.contains("cancel-icon")) {
      const { id } = clickedElement.closest("li").dataset

      if (id) {
        const hasConfirmed = confirm("Tem certeza que deseja cancelar esse agendamento?")

        if (hasConfirmed) {
          await cancelSchedule({ id })
          await schedulesDay()
        }
      }
    }
  })
})