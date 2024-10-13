import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});

export { 
  env
};