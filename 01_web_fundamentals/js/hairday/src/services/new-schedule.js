import { apiConfig } from "./api.config";

export async function newSchedule({ id, name, scheduledDate }) {
  try {
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, name, scheduledDate })
    })

    alert("Agendamento realizado com sucesso!")
  } catch (error) {
    alert("Não foi possível agendar. Tente novamente.")
  }
}