import { EVENTS, addKeyword } from "@builderbot/bot";
import { JsonFileDB as Database } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { TIMEOUT_SMALL, reset, stop } from "../idle-custom";
import { procedimientoFlow } from "./procedimientoFlow";
import { estadoFlow } from "./estadoFlow";
import { problemaCoachFlow } from "./problemaCoachFlow";
import { soporteFlow } from "./soporteFlow";
import { soporteDeacheFlow } from "./soporteDeacheFlow";


export const listFlow = addKeyword<Provider, Database>([EVENTS.ACTION, "Opciones"])
    .addAnswer(
        `*Elige una opción*:\n1️⃣ Procedimiento para obtener constancia de originalidad\n2️⃣ Estado de trámite\n3️⃣ Problemas al acceder a Tu Coach \n4️⃣ Conversar con el soporte VRI\n5️⃣ Conversar con DEACHE BOT  *Inteligencia Artificial* 😎\n\n 0️⃣ Cancelar consulta`,
        { capture: true }, async (ctx, { fallBack, endFlow, gotoFlow }) => {
            if (!['1', '2', '3', '4', '5', '0'].includes(ctx.body)) {
                reset(ctx, gotoFlow, TIMEOUT_SMALL)
                return fallBack('Por favor elige una opción válida entre *(0-5)*')
            }
            if (ctx.body === '0') {
                stop(ctx)
                return endFlow('Cancelado, accede a las opciones escribiendo "*Opciones*"')
            }
            switch (ctx.body) {
                case '1':
                    stop(ctx)
                    return gotoFlow(procedimientoFlow)
                case '2':
                    reset(ctx, gotoFlow, TIMEOUT_SMALL)
                    return gotoFlow(estadoFlow)
                case '3':
                    reset(ctx, gotoFlow, TIMEOUT_SMALL)
                    return gotoFlow(problemaCoachFlow)
                case '4':
                    stop(ctx)
                    return gotoFlow(soporteFlow)
                case '5':
                    reset(ctx, gotoFlow, TIMEOUT_SMALL)
                    return gotoFlow(soporteDeacheFlow)
            }
        })