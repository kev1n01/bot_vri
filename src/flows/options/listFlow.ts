import { EVENTS, addKeyword } from "@builderbot/bot";
import { JsonFileDB as Database } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { option1Flow } from "./option1Flow";
import { option3Flow } from "./option3Flow";
import { option2Flow } from "./option2Flow";
import { option7Flow } from "./option7Flow";
import { option6Flow } from "./option6Flow";
import { option5Flow } from "./option5Flow";
import { option4Flow } from "./option4Flow";
import { reset, start, stop } from "../idle-custom";


export const listFlow = addKeyword<Provider, Database>([EVENTS.ACTION, "Opciones"])
    .addAnswer(
        `*Solo puedes escoger una opción*:\n1️⃣ ¿Cómo me registro en el concurso de proyectos de investigación?\n2️⃣ ¿Cómo ingreso a tu coach?\n3️⃣ Quiero saber el estado de mi trámite\n4️⃣ ¿Cuál es el procedimiento para la revisiones?\n5️⃣ ¿Porqué tengo observaciones?\n6️⃣ Quiero hablar con el soporte\n7️⃣ Quiero hacer una pregunta más específica\n0️⃣ Cancelar`,
        { capture: true }, async (ctx, { fallBack, endFlow, gotoFlow }) => {
            if (!['1', '2', '3', '4', '5', '6', '7', '0'].includes(ctx.body)) {
                reset(ctx, gotoFlow, 200000)
                return fallBack('Por favor elige una opción válida (0-7)')
            }
            if (ctx.body === '0') {
                stop(ctx)
                return endFlow('Cancelado, Accede a las opciones escribiendo "Opciones"')
            }
            switch (ctx.body) {
                case '1':
                    stop(ctx)
                    return gotoFlow(option1Flow)
                case '2':
                    stop(ctx)
                    return gotoFlow(option2Flow)
                case '3':
                    start(ctx, gotoFlow, 200000)
                    return gotoFlow(option3Flow)
                case '4':
                    stop(ctx)
                    return gotoFlow(option4Flow)
                case '5':
                    stop(ctx)
                    return gotoFlow(option5Flow)
                case '6':
                    stop(ctx)
                    return gotoFlow(option6Flow)
                case '7':
                    start(ctx, gotoFlow, 400000)
                    return gotoFlow(option7Flow)
            }
        })