// hooks.ts

import { useQuery } from '@tanstack/react-query'
import { fetchUserType, fetchBounties, fetchBountiesCount } from '../utils/apiFunctions'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export const useUserType = (address: string | undefined) => {
  const router = useRouter()

  return useQuery({
    queryKey: ['userType', address],
    queryFn: () => fetchUserType(address || ''),
    enabled: Boolean(address),
    retry: false,
    select: (data: any) => {
      console.log('Setting user type:', data.userType)
      localStorage.setItem('userType', data.userType)
      return data
    }
  })
}

export const useBounties = (address: string | undefined, userType: string | undefined) => {  
  return useQuery({
    queryKey: ['bounties', address, userType],
    queryFn: () => fetchBounties(address || "", userType || ""),
    // enabled: !!address && !!userType,
    retry: false,
  })
}

export const useBountiesCount = (address: string | undefined, userType: string | undefined) => {  
  return useQuery({
    queryKey: ['bountiesCount', address, userType],
    queryFn: () => fetchBountiesCount(address || "", userType || ""),
    // enabled: !!address && !!userType,
    retry: false,
  })
}