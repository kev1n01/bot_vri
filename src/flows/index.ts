import { createFlow } from '@builderbot/bot';
import { welcomeFlow } from './welcome.flow';
import { byeFlow } from './bye.flow';
import { continueFlow } from './continueFlow';
import { listFlow } from './options/listFlow';
import { idleFlow } from './idle-custom';
import { procedimientoFlow } from './options/procedimientoFlow';
import { estadoFlow } from './options/estadoFlow';
import { problemaCoachFlow } from './options/problemaCoachFlow';
import { soporteFlow } from './options/soporteFlow';
import { soporteDeacheFlow } from './options/soporteDeacheFlow';

export const flows = createFlow([welcomeFlow, byeFlow, continueFlow, procedimientoFlow, estadoFlow, problemaCoachFlow, soporteFlow, soporteDeacheFlow, listFlow, idleFlow])
