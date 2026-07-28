import { authHandlers } from './auth.handlers'
import { clubHandlers } from './club.handlers'

export const handlers = [...authHandlers, ...clubHandlers]
