import { EVENTS, addKeyword } from "@builderbot/bot"

export const soporteFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { flowDynamic, state, blacklist }) => {
        const time = new Date().toLocaleTimeString([], { hour12: false });
        console.log(time);
        const isBeforeOpening = time <= '07:59:00';
        const isDuringLunchBreak = time >= '13:55:00' && time <= '14:59:00';
        const isAfterClosing = time >= '17:55:00';
        if (isBeforeOpening || isDuringLunchBreak || isAfterClosing) {
            await flowDynamic(`En estos momentos el soporte no está disponible, por estar fuera de horario de atención (Lunes a viernes de 8am - 1pm y de 3pm - 6pm), accede a las opciones escribiendo "*Opciones*"`)
        }

        try {
            await state.update({ soporte: true })
            if (state.get('soporte')) {
                blacklist.add(ctx.from)
                console.log(ctx.from + ' blacklisted');
            }
            await flowDynamic(`🆘🆘🆘🆘‼ Un momento por favor, nuestro soporte se pondrá en contacto con usted estimado(a) ${ctx.name} `)
        } catch (error) {
            console.log(error)
        }
    })