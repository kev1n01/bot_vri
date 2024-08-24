import { createFlow } from '@builderbot/bot';
import { welcomeFlow } from './welcome.flow';
import { byeFlow } from './bye.flow';
import { continueFlow } from './continueFlow';
import { option1Flow } from './options/option1Flow';
import { option2Flow } from './options/option2Flow';
import { option3Flow } from './options/option3Flow';
import { listFlow } from './options/listFlow';
import { option4Flow } from './options/option4Flow';
import { option5Flow } from './options/option5Flow';
import { option6Flow } from './options/option6Flow';
import { option7Flow } from './options/option7Flow';
import { idleFlow } from './idle-custom';

export const flows = createFlow([welcomeFlow, byeFlow, continueFlow, option1Flow, option2Flow, option3Flow, option4Flow, option5Flow, option6Flow, option7Flow, listFlow, idleFlow])
