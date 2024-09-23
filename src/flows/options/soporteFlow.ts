import { EVENTS, addKeyword } from "@builderbot/bot"
import { startBotDesactive } from "../idle-custom";

export const soporteFlow = addKeyword(EVENTS.ACTION)
    .addAction({ delay: 3000 }, async (ctx, { endFlow }) => {
        const time = new Date().toLocaleTimeString([], { hour12: false });
        const day = new Date().getDay();

        const isWeekendNoWork = day === 0 || day === 6;
        const isBeforeOpening = time <= '07:59:00';
        const isDuringLunchBreak = time >= '12:55:00' && time <= '14:59:00';
        const isAfterClosing = time >= '17:55:00';
        if (isBeforeOpening || isDuringLunchBreak || isAfterClosing || isWeekendNoWork) {
            return endFlow(`En estos momentos nuestro soporte está recargando baterías💪🪫.\n\nNuestro *horario de atención es de Lunes a viernes de 8:00 am - 1:00 pm y de 3:00 pm - 6:00 pm*\n\nAccede al *menu principal* escribiendo "*Menu*"`)
        }

        try {
            await fetch(`${process.env?.SERVER_URL}/v1/message-to-support`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ number: process.env?.ADMIN_NUMBER, message: `bot ${ctx.from}`, name: ctx.name })
            })
            startBotDesactive(ctx)
            return endFlow(`🆘🆘🆘🆘‼ Un momento por favor, nuestro soporte se pondrá en contacto, estimado(a) ${ctx.name} `)
        } catch (error) {
            console.error('Error: de envio de mensaje de soporte', error)
        }
    })