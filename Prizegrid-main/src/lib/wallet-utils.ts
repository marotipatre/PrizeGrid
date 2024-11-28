import type { PeraWalletConnect } from '@perawallet/connect'

export async function initializeWallet(): Promise<PeraWalletConnect> {
  // Ensure we're in a browser environment
  if (typeof window === 'undefined') {
    throw new Error('Cannot initialize wallet in server environment')
  }

  try {
    // Dynamically import the wallet
    const { PeraWalletConnect } = await import('@perawallet/connect')
    
    // Initialize with proper configuration
    const wallet = new PeraWalletConnect({
      shouldShowSignTxnToast: false,
      chainId: 416002, // Testnet chain ID
    })

    return wallet
  } catch (error) {
    console.error('Failed to initialize Pera Wallet:', error)
    throw new Error('Failed to initialize wallet. Please ensure your browser supports WebAssembly and has cookies enabled.')
  }
}

