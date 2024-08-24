import { addKeyword } from '@builderbot/bot';
/**
 *  Responde cuando el usuario se despide
 */
export const byeFlow = addKeyword(['bye', 'gracias', 'adios', 'adiós', 'listo', 'queda', 'ok'])
    .addAction(async (ctx, { endFlow }) => {
        return endFlow(`Fue un placer ayudarlo estimado(a) ${ctx.name}, accede a las opciones escribiendo *Opciones*`)
    }
    )
