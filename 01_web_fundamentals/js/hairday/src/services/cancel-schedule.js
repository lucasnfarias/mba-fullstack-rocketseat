import { apiConfig } from "./api.config"

export async function cancelSchedule({ id }) {
  try {
    await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE"
    })

    alert("Agendamento cancelado com sucesso!")
  } catch (error) {
    console.error(error)
    alert("Não foi possível cancelar o agendamento.")
  }
}