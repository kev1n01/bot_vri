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
import { atentionFlow } from './options/atentionFlow';
import { userDisblock } from './options/userDisblock';

export const flows = createFlow([
    userDisblock
    // welcomeFlow, byeFlow, continueFlow, procedimientoFlow, estadoFlow, problemaCoachFlow, soporteFlow, listFlow, idleFlow, atentionFlow, userDisblock
])
