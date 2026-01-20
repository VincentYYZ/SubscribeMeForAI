import { router, publicProcedure } from '../trpc'
import { prisma } from '@/lib/prisma'

export const faqRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.fAQ.findMany({
      orderBy: { order: 'asc' }
    })
  }),
})

