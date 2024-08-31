import { EVENTS, addKeyword } from "@builderbot/bot"
import { join } from "path"
import { TIMEOUT_SMALL, reset } from "../idle-custom"
import { listFlow } from "./listFlow"

export const problemaCoachFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(`*Elige una opción entre (0-4):*
1️⃣ No puedo iniciar sesión
2️⃣ No carga la página Tu Coach
3️⃣ No descarga la constancia
4️⃣ Apoyo del soporte técnico\n
0️⃣ Volver al menu principal`,
        { capture: true }, async (ctx, { fallBack, gotoFlow, flowDynamic }) => {
            if (!['1', '2', '3', '4', '0'].includes(ctx.body)) {
                reset(ctx, gotoFlow, TIMEOUT_SMALL)
                return fallBack('Por favor elige una opción válida entre *(0-4)*')
            }
            if (ctx.body === '0') {
                reset(ctx, gotoFlow, TIMEOUT_SMALL)
                return gotoFlow(listFlow)
            }
            switch (ctx.body) {
                case '1':
                    await flowDynamic(`${ctx.name}, asegurate de haber seguido correctamente el manual de usuario 👇`)
                    await flowDynamic([{ body: 'manual_tu_coach', media: join(process.cwd(), 'assets', 'manual_de_usuario_tu_coach.pdf') }])

                    reset(ctx, gotoFlow, TIMEOUT_SMALL)
                    return gotoFlow(problemaCoachFlow)
                case '2':
                    await flowDynamic(`${ctx.name}, asegurate de haber entrado a la página oficial aqui el link:👉🔗 https://tucoach.udh.edu.pe/`)
                    await flowDynamic(`Si el link es correcto, le pedimos que vuelva a intentarlo más tarde, gracias por su comprensión 🥹🥹`)

                    reset(ctx, gotoFlow, TIMEOUT_SMALL)
                    return gotoFlow(problemaCoachFlow)
                case '3':
                    await flowDynamic(`${ctx.name}, le pedimos que vuelva a intentarlo más tarde, si el problema persiste contacte al soporte técnico\n 👨‍💻 Soporte Abimael\n 📱 901231876.`)

                    reset(ctx, gotoFlow, TIMEOUT_SMALL)
                    return gotoFlow(problemaCoachFlow)
                case '4':
                    await flowDynamic(`${ctx.name}, los contactos del soporte técnico son los siguientes: 👇
👨‍💻 Soporte Abimael
    📱 901231876
`)

                    reset(ctx, gotoFlow, TIMEOUT_SMALL)
                    return gotoFlow(problemaCoachFlow)
            }
        })