import { router } from '../trpc'
import { resourceRouter } from './resource'
import { courseRouter } from './course'
import { faqRouter } from './faq'
import { userRouter } from './user'

export const appRouter = router({
  resource: resourceRouter,
  course: courseRouter,
  faq: faqRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter


