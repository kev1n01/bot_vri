import { EVENTS, addKeyword } from "@builderbot/bot"
import sendMessageFromChatWood from "../../services/chatwood-conexion";
import { typing } from "~/utils/presence";

export const soporteFlow = addKeyword(EVENTS.ACTION)
    .addAnswer('En unos momentos, nuestro soporte de VRI, se pondrá en contacto con usted')
    .addAction(async (ctx, { provider, endFlow }) => {
        await typing(ctx, provider)

        try {
            await sendMessageFromChatWood(`Necesito soporte personalizado para: ${ctx.name} con número de contacto: ${ctx.from}`, 'incoming')
        } catch (error) {
            console.log(error)
        }

        return endFlow(`Necesito soporte personalizado para: ${ctx.name} con número de contacto: ${ctx.from} con ubicacion  ${ctx.message.locationMessage?.degreesLatitude} ${ctx.message.locationMessage?.degreesLongitude} `)
    })