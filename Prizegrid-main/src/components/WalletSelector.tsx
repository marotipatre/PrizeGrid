'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/WalletProvider"
import { Loader2, Wallet } from 'lucide-react'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export function WalletConnectButton() {
  const { 
    connect, 
    disconnect, 
    isConnected, 
    isConnecting, 
    accountAddress, 
    error, 
    peraWallet,
    isInitializing 
  } = useWallet()
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (error) {
      setShowError(true)
    }
  }, [error])

  function formatAddress(address: string | null) {
    if (!address) return ''
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  function handleRetry() {
    setShowError(false)
    if (!isConnected) {
      connect()
    }
  }

  const isDisabled = isConnecting || isInitializing || !peraWallet

  return (
    <>
      <Button
        onClick={isConnected ? disconnect : connect}
        disabled={isDisabled}
        variant={isConnected ? "outline" : "default"}
        className="min-w-[160px]"
      >
        {isInitializing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Initializing...
          </>
        ) : isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting
          </>
        ) : isConnected ? (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            {formatAddress(accountAddress)}
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>

      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connection Error</DialogTitle>
            <DialogDescription>
              {error?.message || 'Failed to connect to wallet. Please ensure you have the Pera Wallet browser extension installed and try again.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleRetry}>
              Try Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

