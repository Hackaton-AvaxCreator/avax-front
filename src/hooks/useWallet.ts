import { useWalletContext } from '../contexts/WalletContext';

export const useWallet = () => {
  const context = useWalletContext();

  const connectWallet = () => context.connectWallet();
  const disconnectWallet = () => context.disconnectWallet();
  const switchNetwork = (networkId: number) => context.switchNetwork(networkId);

  return {
    address: context.address,
    balance: context.balance,
    network: context.network,
    isConnecting: context.isConnecting,
    isConnected: context.isConnected,
    error: context.error,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  };
};
