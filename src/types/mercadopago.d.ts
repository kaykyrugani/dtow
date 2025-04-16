declare module 'mercadopago' {
  export interface MercadoPagoConfig {
    accessToken: string;
    options?: {
      timeout?: number;
    };
  }

  export class MercadoPagoConfig {
    constructor(config: { accessToken: string; options?: { timeout?: number } });
  }

  export interface Payment {
    id: string;
    status: string;
    external_reference?: string;
    payment_method_id?: string;
    payment_type_id?: string;
    installments?: number;
    transaction_amount?: number;
    init_point?: string;
    create: (data: { body: any }) => Promise<any>;
    get: (data: { id: string }) => Promise<any>;
    cancel: (id: string) => Promise<any>;
  }

  export class Payment {
    constructor(config: MercadoPagoConfig);
    create: (data: { body: any }) => Promise<any>;
    get: (data: { id: string }) => Promise<any>;
    cancel: (id: string) => Promise<any>;
  }

  export interface Payments {
    create: (data: { body: any }) => Promise<any>;
    get: (data: { id: string }) => Promise<any>;
    cancel: (id: string) => Promise<any>;
  }

  export class Payments {
    constructor(config: MercadoPagoConfig);
    create: (data: { body: any }) => Promise<any>;
    get: (data: { id: string }) => Promise<any>;
    cancel: (id: string) => Promise<any>;
  }

  export interface Preference {
    id: string;
    init_point: string;
    items: Array<{
      id: string;
      title: string;
      quantity: number;
      unit_price: number;
      currency_id?: string;
    }>;
    payer?: {
      name?: string;
      email: string;
      identification?: {
        type: string;
        number: string;
      };
    };
    payment_methods?: {
      excluded_payment_types?: Array<any>;
      installments?: number;
      default_payment_method_id?: string;
    };
    back_urls?: {
      success: string;
      failure: string;
      pending: string;
    };
    external_reference?: string;
    notification_url?: string;
    statement_descriptor?: string;
    binary_mode?: boolean;
  }
} 