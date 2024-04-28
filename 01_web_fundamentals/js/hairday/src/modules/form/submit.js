import dayjs from "dayjs"
import { newSchedule } from "../../services/new-schedule.js"
import { schedulesDay } from "../schedules/load.js"

const form = document.querySelector("form")
const clientInput = document.getElementById("client")
const dateInput = document.getElementById("date")


const TODAY = dayjs(new Date()).format("YYYY-MM-DD")

dateInput.value = TODAY
dateInput.min = TODAY

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    const name = clientInput.value.trim()

    if (!name) {
      return alert("Informe o nome do cliente!")
    }

    const hourSelected = document.querySelector(".hour-selected")

    if (!hourSelected) {
      return alert("Selecione a hora!")
    }

    const [hour] = hourSelected.innerText.split(":")

    const scheduledDate = dayjs(dateInput.value).add(hour, "hour")
    
    const id = new Date().getTime()

    await newSchedule({
      id,
      name,
      scheduledDate
    })

    await schedulesDay()

    clientInput.value = ""
  } catch (error) {
    alert("Não foi possível realizar o agendamento")
    console.error(error)
  }
}