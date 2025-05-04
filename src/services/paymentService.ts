// src/services/paymentService.ts
import apiService from './api';
import { ethers } from 'ethers';

// Payment response types
interface CreatePaymentResponse {
  success: boolean;
  data: {
    payment: {
      id: string;
      status: string;
      amount: string;
      toUserId: string;
      fromUserId: string;
      type: string;
      createdAt: string;
    };
    transaction: {
      to: string;
      value: string;
      data: string;
      gasLimit?: string;
    };
  };
  message?: string;
}

interface PaymentHistoryResponse {
  success: boolean;
  data: {
    payments: Array<{
      id: string;
      status: string;
      amount: string;
      toUserId: string;
      fromUserId: string;
      type: string;
      createdAt: string;
      user?: {
        id: string;
        username: string;
      };
    }>;
  };
  message?: string;
}

interface UpdatePaymentResponse {
  success: boolean;
  data: {
    payment: {
      id: string;
      status: string;
    };
  };
  message?: string;
}

const paymentService = {
  /**
   * Create a new donation payment
   */
  createDonation: async (toUserId: string, amount: string): Promise<{ payment: any; transaction: any }> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apiService.post<CreatePaymentResponse>('/web3/payments', {
        toUserId,
        amount,
        type: 'donation'
      });
      
      if (response.data.success) {
        return {
          payment: response.data.data.payment,
          transaction: response.data.data.transaction
        };
      }
      
      throw new Error(response.data.message || 'Failed to create donation');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a new project purchase payment
   */
  createProjectPurchase: async (projectId: string, amount: string): Promise<{ payment: any; transaction: any }> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apiService.post<CreatePaymentResponse>('/web3/payments', {
        projectId,
        amount,
        type: 'project_purchase'
      });
      
      if (response.data.success) {
        return {
          payment: response.data.data.payment,
          transaction: response.data.data.transaction
        };
      }
      
      throw new Error(response.data.message || 'Failed to create project purchase');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get payment history
   */
  getPaymentHistory: async (): Promise<any[]> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apiService.get<PaymentHistoryResponse>('/web3/payments/history');
      
      if (response.data.success) {
        return response.data.data.payments;
      }
      
      throw new Error(response.data.message || 'Failed to get payment history');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update payment status after blockchain transaction
   */
  updatePaymentStatus: async (paymentId: string, transactionHash: string): Promise<any> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apiService.put<UpdatePaymentResponse>(`/web3/payments/${paymentId}`, {
        transactionHash,
        status: 'completed'
      });
      
      if (response.data.success) {
        return response.data.data.payment;
      }
      
      throw new Error(response.data.message || 'Failed to update payment status');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Execute a blockchain transaction
   */
  executeTransaction: async (transaction: any): Promise<string> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const walletProvider = window.avalanche || window.ethereum;
      
      if (!walletProvider) {
        throw new Error('No wallet provider found');
      }

      // Initialize provider
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();
      
      // Prepare transaction
      const tx = {
        to: transaction.to,
        value: transaction.value,
        data: transaction.data || '0x',
        gasLimit: transaction.gasLimit ? ethers.BigNumber.from(transaction.gasLimit) : undefined
      };
      
      // Send transaction
      const txResponse = await signer.sendTransaction(tx);
      
      // Wait for transaction to be mined
      const receipt = await txResponse.wait();
      
      return receipt.transactionHash;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Complete payment flow (create payment, execute transaction, update status)
   */
  completePayment: async (toUserId: string, amount: string, type: 'donation' | 'project_purchase', projectId?: string): Promise<any> => {
    // eslint-disable-next-line no-useless-catch
    try {
      // 1. Create payment
      const paymentData = type === 'donation' 
        ? await this.createDonation(toUserId, amount)
        : await this.createProjectPurchase(projectId!, amount);
      
      // 2. Execute blockchain transaction
      const transactionHash = await this.executeTransaction(paymentData.transaction);
      
      // 3. Update payment status
      const updatedPayment = await this.updatePaymentStatus(paymentData.payment.id, transactionHash);
      
      return {
        payment: updatedPayment,
        transactionHash
      };
    } catch (error) {
      throw error;
    }
  }
};

export default paymentService;