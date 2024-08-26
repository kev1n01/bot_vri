import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../../continueFlow"
import sendMessageFromChatWood from "../../../services/chatwood-conexion";
import { typing } from "~/utils/presence";
import { start } from "../../idle-custom";

export const option6Flow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { flowDynamic, gotoFlow, provider }) => {
        await typing(ctx, provider)
        const MENSAJE = 'En unos momentos nuestro soporte, se pondrá en contacto con usted'
        await flowDynamic(MENSAJE)
        try {
            await sendMessageFromChatWood(`Necesito soporte personalizado para: ${ctx.name} con número de contacto: ${ctx.from}`, 'incoming')
        } catch (error) {
            console.log(error)
        }
        start(ctx, gotoFlow, 20000)
        return gotoFlow(continueFlow)
    })