import { EVENTS, addKeyword } from "@builderbot/bot";
import { JsonFileDB as Database } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { TIMEOUT_SMALL, reset, stop } from "../idle-custom";
import { procedimientoFlow } from "./procedimientoFlow";
import { estadoFlow } from "./estadoFlow";
import { problemaCoachFlow } from "./problemaCoachFlow";
import { soporteFlow } from "./soporteFlow";
import { atentionFlow } from "./atentionFlow";

export const listFlow = addKeyword<Provider, Database>([EVENTS.ACTION, "Menu"])
    .addAnswer(
        `*MENU PRINCIPAL*\n*Elige una opción entre (0-5)*:
1️⃣ Procedimiento para obtener CONSTANCIA DE ORIGINALIDAD
2️⃣ Estado de trámite
3️⃣ Problemas al acceder a TU COACH
4️⃣ Conversar con el soporte VRI
5️⃣ Horario de atención 🕑\n
0️⃣ Cancelar consulta`,
        { capture: true, delay: 1000 }, async (ctx, { fallBack, endFlow, gotoFlow }) => {
            if (!['1', '2', '3', '4', '5', '0'].includes(ctx.body)) {
                reset(ctx, gotoFlow, TIMEOUT_SMALL)
                return fallBack('Por favor elige una opción válida entre *(0-5)*')
            }
            if (ctx.body === '0') {
                stop(ctx)
                return endFlow('Cancelado, accede al menu principal escribiendo "*Menu*"')
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
                    return gotoFlow(atentionFlow)
            }
        })