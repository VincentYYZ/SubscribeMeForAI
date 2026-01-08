import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { prisma } from '@/lib/prisma'

export const courseRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.course.findMany({
      where: { published: true }
    })
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await prisma.course.findUnique({
        where: { id: input.id }
      })
    }),

  create: publicProcedure
    .input(z.object({
      title: z.string(),
      description: z.string().optional(),
      price: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.course.create({
        data: input
      })
    }),
})
