'use client'

import { PropsWithChildren, useMemo } from 'react'
import {
  UrqlProvider,
  ssrExchange,
  fetchExchange,
  createClient,
} from '@urql/next'

// that creates a normalized cache
import { cacheExchange } from '@urql/exchange-graphcache'

import { url } from '@/utils/url'
import { getToken } from '@/utils/token'

export default function GQLProvider({ children }: PropsWithChildren) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      // to make sure it runs only on the client
      // so we are have that caching on the client
      isClient: typeof window !== 'undefined',
    })

    const client = createClient({
      url,
      // plugins
      // fetchExchange => to use fetch for the http requests
      exchanges: [cacheExchange({}), ssr, fetchExchange],
      fetchOptions: () => {
        const token = getToken()
        return token
          ? {
              headers: { authorization: `Bearer ${token}` },
            }
          : {}
      },
    })

    return [client, ssr]
  }, [])

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}
