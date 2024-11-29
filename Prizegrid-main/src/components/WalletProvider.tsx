'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { initializeWallet } from '../lib/wallet-utils'
import type { PeraWalletConnect } from '@perawallet/connect'

type WalletContextType = {
  peraWallet: PeraWalletConnect | null
  accountAddress: string | null
  isConnected: boolean
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
  error: Error | null
  isInitializing: boolean
  network: string
  provider: any
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [peraWallet, setPeraWallet] = useState<PeraWalletConnect | null>(null)
  const [accountAddress, setAccountAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [network, setNetwork] = useState('testnet')
  const [provider, setProvider] = useState<any>(null)

  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        setIsInitializing(true)
        setError(null)

        const wallet = await initializeWallet()
        
        if (!mounted) return

        setPeraWallet(wallet)

        try {
          const accounts = await wallet.reconnectSession()
          if (mounted && accounts.length) {
            setAccountAddress(accounts[0])
          }
        } catch (reconnectError) {
          console.warn('Session reconnection failed:', reconnectError)
          // Don't throw here - just log the warning
        }
      } catch (err) {
        console.error('Wallet initialization failed:', err)
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize wallet'))
        }
      } finally {
        if (mounted) {
          setIsInitializing(false)
        }
      }
    }

    init()

    return () => {
      mounted = false
      if (peraWallet) {
        try {
          peraWallet.disconnect()
        } catch (err) {
          console.error('Error during cleanup:', err)
        }
      }
    }
  }, [])

  async function connect() {
    if (!peraWallet) {
      setError(new Error('Wallet not initialized'))
      return
    }

    try {
      setIsConnecting(true)
      setError(null)
      const accounts = await peraWallet.connect()
      setAccountAddress(accounts[0])
    } catch (err) {
      console.error('Connection error:', err)
      setError(err instanceof Error ? err : new Error('Failed to connect to wallet'))
    } finally {
      setIsConnecting(false)
    }
  }

  function disconnect() {
    if (peraWallet) {
      try {
        peraWallet.disconnect()
        setAccountAddress(null)
        setError(null)
      } catch (err) {
        console.error('Disconnect error:', err)
        setError(err instanceof Error ? err : new Error('Failed to disconnect wallet'))
      }
    }
  }

  return (
    <WalletContext.Provider
      value={{
        peraWallet,
        accountAddress,
        isConnected: !!accountAddress,
        isConnecting,
        connect,
        disconnect,
        error,
        isInitializing,
        network, 
        provider,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

