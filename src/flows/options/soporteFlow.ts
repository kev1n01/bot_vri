import { EVENTS, addKeyword } from "@builderbot/bot"

export const soporteFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { flowDynamic }) => {
        const time = new Date().toLocaleTimeString([], { hour12: false });
        const day = new Date().getDay();

        const isWeekendNoWork = day === 0 || day === 6;
        const isBeforeOpening = time <= '07:59:00';
        const isDuringLunchBreak = time >= '12:55:00' && time <= '14:59:00';
        const isAfterClosing = time >= '17:55:00';
        if (isBeforeOpening || isDuringLunchBreak || isAfterClosing || isWeekendNoWork) {
            await flowDynamic(`En estos momentos el soporte no está disponible, por estar fuera de horario de atención (Lunes a viernes de 8am - 1pm y de 3pm - 6pm), accede al menu principal escribiendo "*Menu*"`)
        }

        await flowDynamic(`🆘🆘🆘🆘‼ Un momento por favor, nuestro soporte se pondrá en contacto, estimado(a) ${ctx.name} `)
    })