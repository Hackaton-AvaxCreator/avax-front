interface Window {
    avalanche?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      isAvalanche?: boolean;
      selectedAddress?: string;
      chainId?: string;
      // Métodos adicionales según necesidad
    };
  }