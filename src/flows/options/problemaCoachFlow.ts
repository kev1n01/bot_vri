import { EVENTS, addKeyword } from "@builderbot/bot"
import { join } from "path"
import { TIMEOUT_SMALL, reset } from "../idle-custom"
import { listFlow } from "./listFlow"

export const problemaCoachFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(`*Elige una opción:*\n1️⃣ No puedo iniciar sesión\n2️⃣ No carga la página Tu Coach\n3️⃣ No descarga la constancia\n4️⃣ Conversar con el soporte técnico\n\n 0️⃣ Volver`,
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
                    await flowDynamic(`Si el link es correcto, le pedimos que espere un tiempo y vuelva a intentar, gracias.`)

                    reset(ctx, gotoFlow, TIMEOUT_SMALL)
                    return gotoFlow(problemaCoachFlow)
                case '3':

                    await flowDynamic(`${ctx.name}, le pedimos que espere un tiempo y vuelva a intentar, si el problema persiste contacte con el soporte técnico👨‍💻.`)

                    reset(ctx, gotoFlow, TIMEOUT_SMALL)
                    return gotoFlow(problemaCoachFlow)
                case '4':
                    await flowDynamic(`${ctx.name}, los contactos del soporte técnico son los siguientes: 👇
👨‍💻 soporte 1
    📱 +51999999999
    📧 soporte-tecnico-tucoach@udh.edu.pe

👨‍💻 soporte 2
    📱 +51999999999
    📧 soporte-tecnico-tucoach@udh.edu.pe`)

                    reset(ctx, gotoFlow, TIMEOUT_SMALL)
                    return gotoFlow(problemaCoachFlow)
            }
        })