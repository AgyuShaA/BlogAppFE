'use client'

import type { FC, ReactNode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from './get-query'

// interface
interface IProps {
  children: ReactNode
}

// component
const RestApiProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  const queryClient = getQueryClient()

  // return
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default RestApiProvider
