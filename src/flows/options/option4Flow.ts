import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../continueFlow"
import { join } from "path"
import { typing } from "~/utils/presence"

export const option4Flow = addKeyword(EVENTS.ACTION)
    .addAnswer('El procedimiento es el siguiente:')
    .addAction(async (ctx, { gotoFlow, flowDynamic, provider}) => {
        await typing(ctx, provider)
        await flowDynamic([{ body: 'Es necesario cumplir con estos pasos', media: join(process.cwd(), 'assets', 'pasos_para_constancia_originalidad.jpg') }])
        await flowDynamic('El manual para ingresar a Tu Coach UDH, es el siguiente:')
        await flowDynamic([{ body: 'waaaaa', media: join(process.cwd(), 'assets', 'manual_de_usuario_tu_coach.pdf') }])
        await flowDynamic(`Luego de que que envié (con su correo institucional) a *gestion.turnitin@udh.edu.pe* los siguientes documentos:
\n- Informe Final en WORD. 
\n- Resolución de designación de su asesor. 
\n- Informe de conformidad del Informe Final (Asesor y Jurados). 
\n- Constancia de Tu Coach UDH, del curso de Buenas prácticas para la presentación de la tesis\n
La tesis primero pasa por la revisión de buenas prácticas, si no hay observaciones pasa a turnitin, caso contrario se le envía a su correo las observaciones para que pueda subsanarlas; lo que se revisa es lo siguiente:`)
        await flowDynamic([{ body: 'waaaaa', media: join(process.cwd(), 'assets', 'que_debo_evitar_en_mi_informe_final.pdf') }])
        await flowDynamic([{ body: 'Antes de enviar su tesis para su revisión, active esta herramienta en du archivo', media: join(process.cwd(), 'assets', 'activar_antes_de_enviar_tesis_para_su_revision.jpeg') }])
        return gotoFlow(continueFlow)
    })