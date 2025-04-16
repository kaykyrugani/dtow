# Guia de Integração Frontend - Módulo de Pagamentos OnlyWave

## Índice
1. [Visão Geral](#visão-geral)
2. [Configuração](#configuração)
3. [Fluxo de Pagamento](#fluxo-de-pagamento)
4. [Exemplos de Implementação](#exemplos-de-implementação)
5. [Tratamento de Erros](#tratamento-de-erros)
6. [Boas Práticas](#boas-práticas)

## Visão Geral

O módulo de pagamentos do OnlyWave oferece três endpoints principais:

- `POST /payment/preference`: Cria uma preferência de pagamento
- `POST /payment/webhook`: Recebe notificações de status
- `POST /payment/refund/:paymentId`: Processa reembolsos (admin)

## Configuração

### 1. Variáveis de Ambiente
```typescript
// config.ts
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  PAYMENT_ENDPOINTS: {
    PREFERENCE: '/payment/preference',
    WEBHOOK: '/payment/webhook',
    REFUND: '/payment/refund'
  }
};
```

### 2. Tipos TypeScript
```typescript
// types/payment.ts
export interface PaymentPreferenceRequest {
  pedidoId: string;
  descricao: string;
  valor: number;
  formaPagamento: 'CREDIT_CARD' | 'PIX' | 'BANK_SLIP';
  comprador: {
    nome: string;
    email: string;
    cpf: string;
  };
  parcelas?: number;
}

export interface PaymentPreferenceResponse {
  id: string;
  init_point: string;
  valorOriginal: number;
  valorFinal: number;
  desconto: number;
}

export interface PaymentStatus {
  status: 'PENDING' | 'PAID' | 'REJECTED' | 'CANCELLED' | 'REFUNDED';
  paymentStatus: string;
  paymentType: string;
  paymentMethod: string;
  installments: number;
  transactionAmount: number;
}
```

## Fluxo de Pagamento

### 1. Criar Preferência
```typescript
// services/payment.service.ts
export class PaymentService {
  async createPreference(data: PaymentPreferenceRequest): Promise<PaymentPreferenceResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.PAYMENT_ENDPOINTS.PREFERENCE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro ao criar preferência de pagamento');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }
}
```

### 2. Redirecionar para Pagamento
```typescript
// components/PaymentButton.tsx
export const PaymentButton: React.FC<PaymentButtonProps> = ({ order }) => {
  const handlePayment = async () => {
    try {
      const paymentService = new PaymentService();
      const preference = await paymentService.createPreference({
        pedidoId: order.id,
        descricao: `Pedido #${order.id}`,
        valor: order.total,
        formaPagamento: 'CREDIT_CARD',
        comprador: {
          nome: order.customer.name,
          email: order.customer.email,
          cpf: order.customer.cpf
        }
      });

      // Redirecionar para página de pagamento
      window.location.href = preference.init_point;
    } catch (error) {
      // Tratar erro
    }
  };

  return (
    <button onClick={handlePayment}>
      Pagar com Mercado Pago
    </button>
  );
};
```

### 3. Verificar Status
```typescript
// hooks/usePaymentStatus.ts
export const usePaymentStatus = (orderId: string) => {
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/orders/${orderId}`);
        const data = await response.json();
        setStatus(data.payment);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(checkStatus, 5000); // Polling a cada 5s
    checkStatus();

    return () => clearInterval(interval);
  }, [orderId]);

  return { status, loading, error };
};
```

## Exemplos de Implementação

### 1. Página de Checkout
```typescript
// pages/checkout/[orderId].tsx
export default function CheckoutPage() {
  const { orderId } = useRouter().query;
  const { status, loading } = usePaymentStatus(orderId as string);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <PaymentButton order={order} />
      <PaymentStatus status={status} />
    </div>
  );
}
```

### 2. Componente de Status
```typescript
// components/PaymentStatus.tsx
export const PaymentStatus: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: 'yellow',
      PAID: 'green',
      REJECTED: 'red',
      CANCELLED: 'gray',
      REFUNDED: 'blue'
    };
    return colors[status] || 'gray';
  };

  return (
    <div className={`status-badge ${getStatusColor(status.status)}`}>
      {status.status}
    </div>
  );
};
```

## Tratamento de Erros

### 1. Erros Comuns
```typescript
// utils/paymentErrors.ts
export const PAYMENT_ERRORS = {
  INVALID_AMOUNT: 'Valor inválido',
  INVALID_PAYMENT_METHOD: 'Método de pagamento inválido',
  PAYMENT_FAILED: 'Falha no pagamento',
  NETWORK_ERROR: 'Erro de conexão',
  TIMEOUT: 'Tempo limite excedido'
};
```

### 2. Componente de Erro
```typescript
// components/PaymentError.tsx
export const PaymentError: React.FC<{ error: Error }> = ({ error }) => {
  const getErrorMessage = (error: Error) => {
    // Mapear erros para mensagens amigáveis
    const errorMessages = {
      [PAYMENT_ERRORS.INVALID_AMOUNT]: 'O valor do pagamento é inválido',
      [PAYMENT_ERRORS.NETWORK_ERROR]: 'Erro de conexão. Tente novamente',
      // ... outros mapeamentos
    };

    return errorMessages[error.message] || 'Ocorreu um erro inesperado';
  };

  return (
    <div className="error-container">
      <p>{getErrorMessage(error)}</p>
      <button onClick={() => window.location.reload()}>
        Tentar Novamente
      </button>
    </div>
  );
};
```

## Boas Práticas

### 1. Validação de Dados
```typescript
// utils/validation.ts
export const validatePaymentData = (data: PaymentPreferenceRequest) => {
  const errors = [];

  if (data.valor <= 0) {
    errors.push('Valor deve ser maior que zero');
  }

  if (!data.comprador.cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
    errors.push('CPF inválido');
  }

  if (!data.comprador.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push('Email inválido');
  }

  return errors;
};
```

### 2. Cache e Performance
```typescript
// hooks/usePaymentCache.ts
export const usePaymentCache = (orderId: string) => {
  const cache = useRef<Map<string, PaymentStatus>>(new Map());

  const getCachedStatus = (orderId: string) => {
    return cache.current.get(orderId);
  };

  const setCachedStatus = (orderId: string, status: PaymentStatus) => {
    cache.current.set(orderId, status);
  };

  return { getCachedStatus, setCachedStatus };
};
```

### 3. Testes
```typescript
// __tests__/PaymentButton.test.tsx
describe('PaymentButton', () => {
  it('should create preference and redirect', async () => {
    const mockPreference = {
      id: '123',
      init_point: 'https://mp.com/checkout'
    };

    // Mock do serviço
    jest.spyOn(PaymentService.prototype, 'createPreference')
      .mockResolvedValue(mockPreference);

    // Mock do window.location
    const mockLocation = { href: '' };
    Object.defineProperty(window, 'location', { value: mockLocation });

    render(<PaymentButton order={mockOrder} />);
    
    await userEvent.click(screen.getByText('Pagar com Mercado Pago'));
    
    expect(mockLocation.href).toBe(mockPreference.init_point);
  });
});
```

## Recursos Adicionais

1. [Documentação Swagger](/api-docs)
2. [Exemplos de Payloads](./test-payloads.md)
3. [Checklist de Ambiente](./environment-checklist.md)
4. [Changelog](../CHANGELOG.md) 