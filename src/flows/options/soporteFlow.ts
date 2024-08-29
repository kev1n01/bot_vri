import { EVENTS, addKeyword } from "@builderbot/bot"
import sendMessageFromChatWood from "../../services/chatwood-conexion";

export const soporteFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { endFlow }) => {
        const time = new Date().toLocaleTimeString();
        console.log(time);
        console.log(time <= '07:59:00' || time >= '12:00:00');
        if (time <= '07:59:00' || time >= '13:00:00') {
            return endFlow(`En estos momentos el soporte no está disponibilida, por estar fuera de horario de atención (Lunes a viernes de 8am - 1pm y de 3pm - 6pm), envienos un "*Hola*" más tarde`)
        }

        try {
            await sendMessageFromChatWood(`Necesito soporte personalizado para: ${ctx.name} con número de contacto: ${ctx.from}`, 'incoming')
        } catch (error) {
            console.log(error)
        }
        return endFlow(`En unos momentos, nuestro soporte de VRI se pondrá en contacto con usted`)
    })