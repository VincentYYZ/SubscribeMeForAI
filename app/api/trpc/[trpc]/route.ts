import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers'

const handler = (req: Request) =>
  fetchRequestHandler({
    req,
    router: appRouter,
    endpoint: '/api/trpc',
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }
