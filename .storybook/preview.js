import '../src/styles/styles.css'
import { RouterContext } from 'next/dist/shared/lib/router-context' // next 11.2

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
