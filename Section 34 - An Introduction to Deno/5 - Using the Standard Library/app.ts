// Outdated course material 
import { serve } from 'https://deno.land/std/http/server.ts';

// const server = serve({ port: 3000 });
const server = serve((_req: Request): Response => new Response("Hello Deno!"), { port: 3000 });

// for await (const req of server) {
//     req.respond({ body: 'Hello World\n' });
// }

// The new way
// Deno.serve( { port: 3000 }, (_req) => new Response('Hello World'));