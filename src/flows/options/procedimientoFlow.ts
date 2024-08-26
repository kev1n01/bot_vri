import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../continueFlow"
import { join } from "path"
import { TIMEOUT_SMALL, reset, start } from "../idle-custom"
import { typing } from "~/utils/presence"

export const procedimientoFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { gotoFlow, flowDynamic, provider }) => {
        await typing(ctx, provider)

        await flowDynamic(`🎓 *PASOS PARA OBTENER CONSTANCIA DE ORIGINALIDAD* 📜
✅ *INSCRIPCIÓN AL TURNITIN* 💻💵
    👉 Paga el monto determinado a través del sistema UDH para inscribirte en la plataforma Turnitin.

✅ *BUENAS PRÁCTICAS* 📚
    👉 Ingresa a Tu Coach UDH 🔗*https://tucoach.udh.edu.pe/* y completa el curso "Buenas prácticas para la presentación de la tesis". ¡No olvides descargar tu constancia! 🎓

✅ *DOCUMENTOS* 📝
    👉 Envía desde tu correo institucional a *gestion.turnitin@udh.edu.pe* los siguientes documentos:
    1️⃣ Informe Final en *WORD*
    2️⃣ Resolución de designación de tu *asesor*
    3️⃣Informe de conformidad del Informe Final (*Asesor y Jurados*)
    4️⃣Constancia del curso de *Buenas prácticas*

🧐👀 *Recuerda*: Si todo está en orden y cumple con el porcentaje de similitud permitido en Turnitin, recibirás tu constancia de originalidad. ¡Suerte! 🍀

📚 Curso Buenas prácticas: 🔗*https://acortar.link/ebZSZe*
📖 Manual de usuario Tu Coach UDH: 🔗https://tucoach.udh.edu.pe/Manual%20de%20usuario%20-%20Tu%20Coach%20UDH.pdf 👇
    `)

        await flowDynamic([{ body: 'manual_tu_coach', media: join(process.cwd(), 'assets', 'manual_de_usuario_tu_coach.pdf') }])

        start(ctx, gotoFlow, TIMEOUT_SMALL)

        return gotoFlow(continueFlow)
    })