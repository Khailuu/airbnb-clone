import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            refetchOnMount: false,
            refetchOnReconnect: false
        }
    }
})

export const ReactQueryProvider = ({children}) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
  