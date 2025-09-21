import { config } from 'dotenv';
config();

import '@/ai/flows/generate-code-from-description.ts';
import '@/ai/flows/suggest-features-from-description.ts';
import '@/ai/flows/enhance-generated-code-with-automated-tests.ts';