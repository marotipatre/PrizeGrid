"use client";

import React, { useState , useEffect } from "react";
import { useWallet, type Wallet } from "@txnlab/use-wallet-react";
import { Modal } from "@/app/Modal";
import { Button } from "@/components/ui/button"

export function WalletMenu() {
  const {
    algodClient,
    activeAddress,
    activeNetwork,
    setActiveNetwork,
    transactionSigner,
    wallets,
  } = useWallet();

  // const [isSending, setIsSending] = React.useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)

  const handleConnect = () => {
    setIsModalOpen(true)
  }

  const handleDisconnect = () => {
    const activeWallet = wallets.find(wallet => wallet.isConnected)
    if (activeWallet) {
      activeWallet.disconnect()
    }
  }


  useEffect(() => {
    const fetchBalance = async () => {
      if (activeAddress) {
        const accountInfo = await algodClient.accountInformation(activeAddress).do()
        setBalance(accountInfo.amount / 1_000_000) // Convert microAlgos to Algos
      } else {
        setBalance(null)
      }
    }
    fetchBalance()
  }, [activeAddress, algodClient])




  return (
    <>
      {activeAddress ? (
        <div className="flex items-center space-x-4">
          <Button onClick={handleDisconnect} variant="outline">
            Disconnect
          </Button>
          <div className="text-sm">
            Balance: {balance !== null ? `${balance.toFixed(2)} Algo` : 'Loading...'}
          </div>
        </div>
      ) : (
        <Button onClick={handleConnect}>Connect Wallet</Button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <WalletList onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  )
}

function WalletList({ onClose }: { onClose: () => void }) {
  const { wallets } = useWallet()

  const handleConnect = async (wallet: Wallet) => {
    await wallet.connect()
    onClose()
  }

  return (
    <div className="p-2">
      <h2 className="text-lg font-bold mb-4 text-center">Connect Your Wallet</h2>
      <div className="space-y-2">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="w-full mb-2 flex justify-center">
          <Button
            key={wallet.id}
            onClick={() => handleConnect(wallet)}
            className="w-[50%] justify-center"
          >
            {wallet.metadata.name}
            <span className="flex-1" />
            <img src={wallet.metadata.icon} alt="wallet icon" className="w-6 h-6 mr-2" />
            
          </Button>
          </div>
        ))}
      </div>
    </div>
  )
}