import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { prisma } from '@/lib/prisma'

export const userRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }),

  register: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(1),
      pin: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: input,
      })
    }),

  login: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(1),
      pin: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      })

      if (
        !user ||
        user.password !== input.password ||
        user.pin !== input.pin ||
        user.name !== input.name
      ) {
        throw new Error('邮箱或密码错误 / Invalid email or password')
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.user.delete({
        where: { id: input.id },
      })
    }),
})
