import { schedulesDay } from "../schedules/load"

const dateInput = document.getElementById("date")

dateInput.onchange = () => schedulesDay()