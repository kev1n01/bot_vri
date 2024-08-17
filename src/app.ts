import "dotenv/config"

import { createBot, createProvider, createFlow, addKeyword, EVENTS, utils } from '@builderbot/bot'
import { JsonFileDB as Database } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { toAsk, httpInject } from "@builderbot-plugins/openai-assistants"
import { join } from "path";
import ServerHttp from "./http/index"
import sendMessageFromChatWood from "./services/chatwood-conexion";

const PORT = process.env?.PORT ?? 3008
const ASSISTANT_ID = process.env?.ASSISTANT_ID ?? ''

const aiFlow = addKeyword<Provider, Database>(utils.setEvent('AI_FLOW'))
    .addAnswer(`Con qué otra consulta te puedo ayudar? `, { capture: true }, async (ctx, { state }) => {
        await state.update({ consultai: ctx.body })
    })
    .addAction(async (_, { flowDynamic, gotoFlow, state, provider }) => {
        // await typing(ctx, provider)
        const response = await toAsk(ASSISTANT_ID, state.get('consultai'), state)
        // const chunks = response.split(/\n\n+/);
        await flowDynamic([{ body: response.trim() }]);
        // for (const chunk of chunks) {
        // }
    })

const flowContinueMenu = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(`Quieres escoger otra opción?\n 1. Si\n 2. No`, { capture: true }, async (ctx, { state, gotoFlow, flowDynamic }) => {
        if (ctx.body.toLocaleLowerCase().includes('1')) {
            return gotoFlow(flowSelectOption)
        }
        return gotoFlow(byeFlow)
    })

const flowSelectOption = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(`Escoge una de las opciones: 1. Cómo registro en el concurso de proyectos de investigación?\n2. Cómo ingresar a tu coach?\n3. Quiero saber el estado de mi trámite\n4. Cuál es el procedimiento para la revisiones\n5. Porqué tengo observaciones?\n6. Comunicate con nuestro personal para una consulta más especifica`,
        { capture: true },
        async (ctx, { gotoFlow, flowDynamic }) => {
            switch (ctx.body) {
                case '1':
                    return gotoFlow(flowToOption1)
                case '2':
                    return gotoFlow(flowToOption2)
                case '3':
                    return gotoFlow(flowToOption3)
                case '4':
                    return gotoFlow(flowToOption4)
                case '5':
                    return gotoFlow(flowToOption5)
                case '6':
                    return gotoFlow(flowToOption6)
                default:
                    return gotoFlow(aiFlow)
            }
        }
    )

const byeFlow = addKeyword<Provider, Database>(['bye', 'gracias', 'adios', 'hasta pronto', 'ok', EVENTS.ACTION])
    .addAction(async (ctx, { flowDynamic }) => {
        const name = ctx.name
        await flowDynamic([`Fue un placer estimado(a) ${name}`])
    })

const flowToOption1 = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer('Tienes que entrar a la plataforma https://sigep.udh.edu.pe/, registrarte para poder iniciar el proceso de registro', null, async (ctx, { gotoFlow }) => {
        return gotoFlow(flowContinueMenu)
    })


const flowToOption2 = addKeyword<Provider, Database>(EVENTS.ACTION)
    // .addAnswer(
    //     'Ingresa a la plataforma tu coach desde el enlace https://tucoach.udh.edu.pe/ y sigue el manual de usuario',
    //     { media: join(process.cwd(), 'assets', 'manual_de_usuario_tu_coach.pdf') }, async (_, { gotoFlow }) => {
    //         await sendMessageFromChatWood('Ingresa a la plataforma tu coach desde el enlace https://tucoach.udh.edu.pe/ y sigue el manual de usuario', 'incoming')
    //         return gotoFlow(flowContinueMenu)
    //     }
    // )
    .addAction(async (_, { gotoFlow, flowDynamic }) => {
        const MENSAJE = 'Ingresa a la plataforma tu coach desde el enlace https://tucoach.udh.edu.pe/ y sigue el manual de usuario'
        await sendMessageFromChatWood(MENSAJE, 'incoming')
        await flowDynamic(MENSAJE)
        await flowDynamic([{ body: 'waa', media: join(process.cwd(), 'assets', 'manual_de_usuario_tu_coach.pdf')  }])
        return gotoFlow(flowContinueMenu)
    }
    )

const flowToOption3 = addKeyword<Provider, Database>(utils.setEvent('STATUS_FLOW'))
    .addAnswer(`Cuál es tu código?`, { capture: true }, async (ctx, { state, fallBack, gotoFlow }) => {
        await state.update({ code: ctx.body })
        if (ctx.body.length != 10) {
            return fallBack(`El código que ingreso es incorrecto`);
        }
        return gotoFlow(flowToOption3)
    })
    .addAction(async (_, { flowDynamic, gotoFlow, state }) => {
        await state.update({ status: 'sin revisar' })
        await flowDynamic(`El estado de tu trámite es: ${state.get('status')}`)
        return gotoFlow(flowContinueMenu)
    })

const flowToOption4 = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer('el procedimiento es el siguiente:', { media: join(process.cwd(), 'assets', 'pasos_para_constancia_originalidad.jpg') })
    .addAnswer('El manual para la constancia de Tu Coach UDH, es el siguiente:', { media: join(process.cwd(), 'assets', 'manual_de_usuario_tu_coach.pdf') })
    .addAnswer('Luego de la recepción, la tesis primero pasa por la revisión de buenas prácticas, si no hay observaciones pasa a turnitin, caso contrario se le envía a su correo las observaciones para que pueda subsanarlas; lo que se revisa es lo siguiente:', { media: join(process.cwd(), 'assets', 'que_debo_evitar_en_mi_informe_final.pdf') })
    .addAnswer('Para que pueda revisar su tesis antes de enviar, active lo siguiente en su archivo', { media: join(process.cwd(), 'assets', 'activar_antes_de_enviar_tesis_para_su_revision.jpeg') }, async (_, { gotoFlow }) => {
        return gotoFlow(flowContinueMenu)
    })

const flowToOption5 = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer('Es posible que usted no hay cumplido con el formato del documento, asegurese de revisar lo siguiente:\n-Activar esta herramienta en su archivo ', { media: join(process.cwd(), 'assets', 'activar_antes_de_enviar_tesis_para_su_revision.jpeg') })
    .addAnswer('-Verificar en su archivos que no haya estos errores', { media: join(process.cwd(), 'assets', 'que_debo_evitar_en_mi_informe_final.pdf') }, async (_, { gotoFlow }) => {
        return gotoFlow(flowContinueMenu)
    })


const flowToOption6 = addKeyword<Provider, Database>([EVENTS.ACTION, 'comunicarme', 'hablar'])
    // .addAnswer(['Si deseas comunicarte con nuestro personal para una consulta más especifica contactanos al: \n-933865935\n-soporte_vri@udh.edu.pe'], null, async (_, { gotoFlow }) => {
    //     await gotoFlow(flowContinueMenu)
    // })
    .addAction(async (_, { gotoFlow, flowDynamic }) => {
        await flowDynamic('Si deseas comunicarte con nuestro personal para una consulta más especifica contactanos al: \n-933865935\n-soporte_vri@udh.edu.pe')
        return gotoFlow(flowContinueMenu)
    })

const welcomeFlow = addKeyword<Provider, Database>(EVENTS.WELCOME)
    .addAnswer(
        [
            `Hola!!🤗 Bienvenido al soporte virtual del VRI`,
            `Escoja la mejor opción para ayudarle en su consulta?\n1. Cómo registro en el concurso de proyectos de investigación?\n2. Cómo ingresar a tu coach?\n3. Quiero saber el estado de mi trámite\n4. Cuál es el procedimiento para la revisiones\n5. Porqué tengo observaciones?\n6. Comunicate con nuestro personal para una consulta más especifica`,
        ],
        { capture: true },
        async (ctx, { gotoFlow }) => {
            switch (ctx.body) {
                case '1':
                    return gotoFlow(flowToOption1)
                case '2':
                    return gotoFlow(flowToOption2)
                case '3':
                    return gotoFlow(flowToOption3)
                case '4':
                    return gotoFlow(flowToOption4)
                case '5':
                    return gotoFlow(flowToOption5)
                case '6':
                    return gotoFlow(flowToOption6)
                default:
                    return gotoFlow(aiFlow)
            }
        },
    )

const comunicationFlow = addKeyword<Provider, Database>(['comunicate', 'comunicarme', 'comunicar', 'hablar', 'charlar', 'conversar', 'comunico', EVENTS.ACTION])
    .addAnswer(['Si deseas comunicarte con nuestro personal para una consulta más especifica llama al número 933865935 o escribe a soporte_vri@udh.edu.pe'])



// Apagar el bot para un usuario
const flowOffOneUser = addKeyword<Provider>('apagar')
    .addAction(async (_, { state, endFlow }) => {
        const botOffForThisUser = state.get<boolean>('botOffForThisUser')
        await state.update({ botOffForThisUser: !botOffForThisUser })
        if (botOffForThisUser) return endFlow()
    })
    .addAnswer('Hello!')

// Apagar el bot para todos los usuarios
const flowOffEveryOne = addKeyword<Provider>('botoff')
    .addAction(async (_, { globalState, endFlow }) => {
        const botOffForEveryOne = globalState.get<boolean>('botOffForEveryOne')
        await globalState.update({ botOffForEveryOne: !botOffForEveryOne })
        if (botOffForEveryOne) return endFlow()
    })
    .addAnswer('Hello!')


const main = async () => {
    const adapterFlow = createFlow([welcomeFlow, comunicationFlow, flowToOption3, flowToOption6, flowToOption1, flowToOption2, flowToOption5, flowToOption4, flowOffOneUser, flowOffEveryOne, aiFlow, byeFlow, flowContinueMenu, flowSelectOption])
    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database({ filename: 'database.json' })

    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    httpInject(adapterProvider.server)
    httpServer(+PORT)

    const server = new ServerHttp(adapterProvider)
    server.start()
}

main()
