import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { getAdminConfig } from '@/lib/admin-config'

export const adminRouter = router({
  login: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(1),
      pin: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      const config = getAdminConfig()

      if (
        input.name === config.name &&
        input.email === config.email &&
        input.password === config.password &&
        input.pin === config.pin
      ) {
        return { success: true, name: config.name }
      }

      throw new Error('管理员账号信息不正确 / Invalid admin credentials')
    }),
})
