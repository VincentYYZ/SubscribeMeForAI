import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers'
import type { Context } from '@/server/trpc'

const handler = (req: Request) =>
  fetchRequestHandler({
    req,
    router: appRouter,
    endpoint: '/api/trpc',
    createContext: (): Context => ({ req }),
  })

export { handler as GET, handler as POST }
