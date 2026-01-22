import { router } from '../trpc'
import { resourceRouter } from './resource'
import { courseRouter } from './course'
import { faqRouter } from './faq'

export const appRouter = router({
  resource: resourceRouter,
  course: courseRouter,
  faq: faqRouter,
})

export type AppRouter = typeof appRouter


