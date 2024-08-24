import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../continueFlow"
import { join } from "path"

export const option5Flow = addKeyword(EVENTS.ACTION)
    .addAnswer('Es posible que usted no hay cumplido con el formato del documento, asegurese de revisar lo siguiente:')
    .addAnswer('Activar esta herramienta en su archivo ', { media: join(process.cwd(), 'assets', 'activar_antes_de_enviar_tesis_para_su_revision.jpeg') })
    .addAnswer('Verificar en su archivos que no haya estos errores:')
    .addAnswer('waa', { media: join(process.cwd(), 'assets', 'que_debo_evitar_en_mi_informe_final.pdf') })
    .addAction(async (ctx, { gotoFlow}) => {
        return gotoFlow(continueFlow)
    })
