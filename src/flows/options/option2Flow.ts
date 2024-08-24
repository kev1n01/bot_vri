import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../continueFlow"
import { join } from "path"
import { typing } from "~/utils/presence"

export const option2Flow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { gotoFlow, flowDynamic, provider }) => {
        await typing(ctx, provider)
        const MENSAJE = 'Ingresa a la plataforma tu coach desde el enlace *https://tucoach.udh.edu.pe/* y sigue el siguiente manual de usuario:'
        await flowDynamic(MENSAJE)
        await flowDynamic([{ body: 'waaaaa', media: join(process.cwd(), 'assets', 'manual_de_usuario_tu_coach.pdf') }])
        return gotoFlow(continueFlow)
    })