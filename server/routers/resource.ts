import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { prisma } from '@/lib/prisma'

export const resourceRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.resource.findMany({
      where: { published: true }
    })
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await prisma.resource.findUnique({
        where: { id: input.id }
      })
    }),

  create: publicProcedure
    .input(z.object({
      title: z.string(),
      description: z.string().optional(),
      content: z.string().optional(),
      category: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.resource.create({
        data: input
      })
    }),
})
