/**
 * Client
 **/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Usuario
 *
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>;
/**
 * Model Endereco
 *
 */
export type Endereco = $Result.DefaultSelection<Prisma.$EnderecoPayload>;
/**
 * Model Produto
 *
 */
export type Produto = $Result.DefaultSelection<Prisma.$ProdutoPayload>;
/**
 * Model Avaliacao
 *
 */
export type Avaliacao = $Result.DefaultSelection<Prisma.$AvaliacaoPayload>;
/**
 * Model Pedido
 *
 */
export type Pedido = $Result.DefaultSelection<Prisma.$PedidoPayload>;
/**
 * Model PedidoItem
 *
 */
export type PedidoItem = $Result.DefaultSelection<Prisma.$PedidoItemPayload>;
/**
 * Model Cupom
 *
 */
export type Cupom = $Result.DefaultSelection<Prisma.$CupomPayload>;
/**
 * Model RefreshToken
 *
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>;
/**
 * Model WebhookLog
 *
 */
export type WebhookLog = $Result.DefaultSelection<Prisma.$WebhookLogPayload>;
/**
 * Model Payment
 *
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>;
/**
 * Model AuditLog
 *
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const UserType: {
    ADMIN: 'ADMIN';
    CLIENTE: 'CLIENTE';
  };

  export type UserType = (typeof UserType)[keyof typeof UserType];

  export const AddressType: {
    RESIDENCIAL: 'RESIDENCIAL';
    COMERCIAL: 'COMERCIAL';
  };

  export type AddressType = (typeof AddressType)[keyof typeof AddressType];

  export const OrderStatus: {
    PENDING: 'PENDING';
    PAID: 'PAID';
    SHIPPED: 'SHIPPED';
    DELIVERED: 'DELIVERED';
    CANCELLED: 'CANCELLED';
  };

  export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

  export const PaymentType: {
    CREDIT_CARD: 'CREDIT_CARD';
    PIX: 'PIX';
    BANK_SLIP: 'BANK_SLIP';
  };

  export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];
}

export type UserType = $Enums.UserType;

export const UserType: typeof $Enums.UserType;

export type AddressType = $Enums.AddressType;

export const AddressType: typeof $Enums.AddressType;

export type OrderStatus = $Enums.OrderStatus;

export const OrderStatus: typeof $Enums.OrderStatus;

export type PaymentType = $Enums.PaymentType;

export const PaymentType: typeof $Enums.PaymentType;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void,
  ): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs>;

  /**
   * `prisma.endereco`: Exposes CRUD operations for the **Endereco** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Enderecos
   * const enderecos = await prisma.endereco.findMany()
   * ```
   */
  get endereco(): Prisma.EnderecoDelegate<ExtArgs>;

  /**
   * `prisma.produto`: Exposes CRUD operations for the **Produto** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Produtos
   * const produtos = await prisma.produto.findMany()
   * ```
   */
  get produto(): Prisma.ProdutoDelegate<ExtArgs>;

  /**
   * `prisma.avaliacao`: Exposes CRUD operations for the **Avaliacao** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Avaliacaos
   * const avaliacaos = await prisma.avaliacao.findMany()
   * ```
   */
  get avaliacao(): Prisma.AvaliacaoDelegate<ExtArgs>;

  /**
   * `prisma.pedido`: Exposes CRUD operations for the **Pedido** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Pedidos
   * const pedidos = await prisma.pedido.findMany()
   * ```
   */
  get pedido(): Prisma.PedidoDelegate<ExtArgs>;

  /**
   * `prisma.pedidoItem`: Exposes CRUD operations for the **PedidoItem** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more PedidoItems
   * const pedidoItems = await prisma.pedidoItem.findMany()
   * ```
   */
  get pedidoItem(): Prisma.PedidoItemDelegate<ExtArgs>;

  /**
   * `prisma.cupom`: Exposes CRUD operations for the **Cupom** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Cupoms
   * const cupoms = await prisma.cupom.findMany()
   * ```
   */
  get cupom(): Prisma.CupomDelegate<ExtArgs>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more RefreshTokens
   * const refreshTokens = await prisma.refreshToken.findMany()
   * ```
   */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs>;

  /**
   * `prisma.webhookLog`: Exposes CRUD operations for the **WebhookLog** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more WebhookLogs
   * const webhookLogs = await prisma.webhookLog.findMany()
   * ```
   */
  get webhookLog(): Prisma.WebhookLogDelegate<ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Payments
   * const payments = await prisma.payment.findMany()
   * ```
   */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more AuditLogs
   * const auditLogs = await prisma.auditLog.findMany()
   * ```
   */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;
  export import NotFoundError = runtime.NotFoundError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
    ReturnType<T>
  >;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends bigint
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I,
  ) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends boolean, B2 extends boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> =
    IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
    T,
    MaybeTupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: 'User';
    Usuario: 'Usuario';
    Endereco: 'Endereco';
    Produto: 'Produto';
    Avaliacao: 'Avaliacao';
    Pedido: 'Pedido';
    PedidoItem: 'PedidoItem';
    Cupom: 'Cupom';
    RefreshToken: 'RefreshToken';
    WebhookLog: 'WebhookLog';
    Payment: 'Payment';
    AuditLog: 'AuditLog';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs; clientOptions: PrismaClientOptions },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    ClientOptions = {},
  > = {
    meta: {
      modelProps:
        | 'user'
        | 'usuario'
        | 'endereco'
        | 'produto'
        | 'avaliacao'
        | 'pedido'
        | 'pedidoItem'
        | 'cupom'
        | 'refreshToken'
        | 'webhookLog'
        | 'payment'
        | 'auditLog';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>;
        fields: Prisma.UsuarioFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[];
          };
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[];
          };
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUsuario>;
          };
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UsuarioGroupByOutputType>[];
          };
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>;
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number;
          };
        };
      };
      Endereco: {
        payload: Prisma.$EnderecoPayload<ExtArgs>;
        fields: Prisma.EnderecoFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.EnderecoFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.EnderecoFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>;
          };
          findFirst: {
            args: Prisma.EnderecoFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.EnderecoFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>;
          };
          findMany: {
            args: Prisma.EnderecoFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>[];
          };
          create: {
            args: Prisma.EnderecoCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>;
          };
          createMany: {
            args: Prisma.EnderecoCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.EnderecoCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>[];
          };
          delete: {
            args: Prisma.EnderecoDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>;
          };
          update: {
            args: Prisma.EnderecoUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>;
          };
          deleteMany: {
            args: Prisma.EnderecoDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.EnderecoUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.EnderecoUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>;
          };
          aggregate: {
            args: Prisma.EnderecoAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateEndereco>;
          };
          groupBy: {
            args: Prisma.EnderecoGroupByArgs<ExtArgs>;
            result: $Utils.Optional<EnderecoGroupByOutputType>[];
          };
          count: {
            args: Prisma.EnderecoCountArgs<ExtArgs>;
            result: $Utils.Optional<EnderecoCountAggregateOutputType> | number;
          };
        };
      };
      Produto: {
        payload: Prisma.$ProdutoPayload<ExtArgs>;
        fields: Prisma.ProdutoFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProdutoFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProdutoFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>;
          };
          findFirst: {
            args: Prisma.ProdutoFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProdutoFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>;
          };
          findMany: {
            args: Prisma.ProdutoFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[];
          };
          create: {
            args: Prisma.ProdutoCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>;
          };
          createMany: {
            args: Prisma.ProdutoCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProdutoCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[];
          };
          delete: {
            args: Prisma.ProdutoDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>;
          };
          update: {
            args: Prisma.ProdutoUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>;
          };
          deleteMany: {
            args: Prisma.ProdutoDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProdutoUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.ProdutoUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>;
          };
          aggregate: {
            args: Prisma.ProdutoAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProduto>;
          };
          groupBy: {
            args: Prisma.ProdutoGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProdutoGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProdutoCountArgs<ExtArgs>;
            result: $Utils.Optional<ProdutoCountAggregateOutputType> | number;
          };
        };
      };
      Avaliacao: {
        payload: Prisma.$AvaliacaoPayload<ExtArgs>;
        fields: Prisma.AvaliacaoFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AvaliacaoFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AvaliacaoPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AvaliacaoFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AvaliacaoPayload>;
          };
          findFirst: {
            args: Prisma.AvaliacaoFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AvaliacaoPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AvaliacaoFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AvaliacaoPayload>;
          };
          findMany: {
            args: Prisma.AvaliacaoFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AvaliacaoPayload>[];
          };
          create: {
            args: Prisma.AvaliacaoCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AvaliacaoPayload>;
          };
          createMany: {
            args: Prisma.AvaliacaoCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AvaliacaoCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AvaliacaoPayload>[];
          };
          delete: {
            args: Prisma.AvaliacaoDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AvaliacaoPayload>;
          };
          update: {
            args: Prisma.AvaliacaoUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AvaliacaoPayload>;
          };
          deleteMany: {
            args: Prisma.AvaliacaoDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AvaliacaoUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.AvaliacaoUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AvaliacaoPayload>;
          };
          aggregate: {
            args: Prisma.AvaliacaoAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAvaliacao>;
          };
          groupBy: {
            args: Prisma.AvaliacaoGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AvaliacaoGroupByOutputType>[];
          };
          count: {
            args: Prisma.AvaliacaoCountArgs<ExtArgs>;
            result: $Utils.Optional<AvaliacaoCountAggregateOutputType> | number;
          };
        };
      };
      Pedido: {
        payload: Prisma.$PedidoPayload<ExtArgs>;
        fields: Prisma.PedidoFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PedidoFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PedidoFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>;
          };
          findFirst: {
            args: Prisma.PedidoFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PedidoFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>;
          };
          findMany: {
            args: Prisma.PedidoFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[];
          };
          create: {
            args: Prisma.PedidoCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>;
          };
          createMany: {
            args: Prisma.PedidoCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PedidoCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[];
          };
          delete: {
            args: Prisma.PedidoDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>;
          };
          update: {
            args: Prisma.PedidoUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>;
          };
          deleteMany: {
            args: Prisma.PedidoDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PedidoUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.PedidoUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>;
          };
          aggregate: {
            args: Prisma.PedidoAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePedido>;
          };
          groupBy: {
            args: Prisma.PedidoGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PedidoGroupByOutputType>[];
          };
          count: {
            args: Prisma.PedidoCountArgs<ExtArgs>;
            result: $Utils.Optional<PedidoCountAggregateOutputType> | number;
          };
        };
      };
      PedidoItem: {
        payload: Prisma.$PedidoItemPayload<ExtArgs>;
        fields: Prisma.PedidoItemFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PedidoItemFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PedidoItemFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>;
          };
          findFirst: {
            args: Prisma.PedidoItemFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PedidoItemFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>;
          };
          findMany: {
            args: Prisma.PedidoItemFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>[];
          };
          create: {
            args: Prisma.PedidoItemCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>;
          };
          createMany: {
            args: Prisma.PedidoItemCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PedidoItemCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>[];
          };
          delete: {
            args: Prisma.PedidoItemDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>;
          };
          update: {
            args: Prisma.PedidoItemUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>;
          };
          deleteMany: {
            args: Prisma.PedidoItemDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PedidoItemUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.PedidoItemUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>;
          };
          aggregate: {
            args: Prisma.PedidoItemAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePedidoItem>;
          };
          groupBy: {
            args: Prisma.PedidoItemGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PedidoItemGroupByOutputType>[];
          };
          count: {
            args: Prisma.PedidoItemCountArgs<ExtArgs>;
            result: $Utils.Optional<PedidoItemCountAggregateOutputType> | number;
          };
        };
      };
      Cupom: {
        payload: Prisma.$CupomPayload<ExtArgs>;
        fields: Prisma.CupomFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CupomFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CupomPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CupomFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CupomPayload>;
          };
          findFirst: {
            args: Prisma.CupomFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CupomPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CupomFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CupomPayload>;
          };
          findMany: {
            args: Prisma.CupomFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CupomPayload>[];
          };
          create: {
            args: Prisma.CupomCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CupomPayload>;
          };
          createMany: {
            args: Prisma.CupomCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CupomCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CupomPayload>[];
          };
          delete: {
            args: Prisma.CupomDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CupomPayload>;
          };
          update: {
            args: Prisma.CupomUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CupomPayload>;
          };
          deleteMany: {
            args: Prisma.CupomDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CupomUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.CupomUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CupomPayload>;
          };
          aggregate: {
            args: Prisma.CupomAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCupom>;
          };
          groupBy: {
            args: Prisma.CupomGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CupomGroupByOutputType>[];
          };
          count: {
            args: Prisma.CupomCountArgs<ExtArgs>;
            result: $Utils.Optional<CupomCountAggregateOutputType> | number;
          };
        };
      };
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>;
        fields: Prisma.RefreshTokenFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
          };
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
          };
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRefreshToken>;
          };
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[];
          };
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>;
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number;
          };
        };
      };
      WebhookLog: {
        payload: Prisma.$WebhookLogPayload<ExtArgs>;
        fields: Prisma.WebhookLogFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.WebhookLogFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.WebhookLogFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>;
          };
          findFirst: {
            args: Prisma.WebhookLogFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.WebhookLogFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>;
          };
          findMany: {
            args: Prisma.WebhookLogFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>[];
          };
          create: {
            args: Prisma.WebhookLogCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>;
          };
          createMany: {
            args: Prisma.WebhookLogCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.WebhookLogCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>[];
          };
          delete: {
            args: Prisma.WebhookLogDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>;
          };
          update: {
            args: Prisma.WebhookLogUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>;
          };
          deleteMany: {
            args: Prisma.WebhookLogDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.WebhookLogUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.WebhookLogUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>;
          };
          aggregate: {
            args: Prisma.WebhookLogAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateWebhookLog>;
          };
          groupBy: {
            args: Prisma.WebhookLogGroupByArgs<ExtArgs>;
            result: $Utils.Optional<WebhookLogGroupByOutputType>[];
          };
          count: {
            args: Prisma.WebhookLogCountArgs<ExtArgs>;
            result: $Utils.Optional<WebhookLogCountAggregateOutputType> | number;
          };
        };
      };
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>;
        fields: Prisma.PaymentFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[];
          };
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[];
          };
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePayment>;
          };
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PaymentGroupByOutputType>[];
          };
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>;
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number;
          };
        };
      };
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>;
        fields: Prisma.AuditLogFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
          };
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
          };
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAuditLog>;
          };
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AuditLogGroupByOutputType>[];
          };
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>;
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition
    ? T['emit'] extends 'event'
      ? T['level']
      : never
    : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    pedidos: number;
    avaliacoes: number;
    refreshTokens: number;
  };

  export type UsuarioCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    pedidos?: boolean | UsuarioCountOutputTypeCountPedidosArgs;
    avaliacoes?: boolean | UsuarioCountOutputTypeCountAvaliacoesArgs;
    refreshTokens?: boolean | UsuarioCountOutputTypeCountRefreshTokensArgs;
  };

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountPedidosArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PedidoWhereInput;
  };

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountAvaliacoesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AvaliacaoWhereInput;
  };

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountRefreshTokensArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RefreshTokenWhereInput;
  };

  /**
   * Count Type ProdutoCountOutputType
   */

  export type ProdutoCountOutputType = {
    avaliacoes: number;
    pedidoItems: number;
  };

  export type ProdutoCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    avaliacoes?: boolean | ProdutoCountOutputTypeCountAvaliacoesArgs;
    pedidoItems?: boolean | ProdutoCountOutputTypeCountPedidoItemsArgs;
  };

  // Custom InputTypes
  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProdutoCountOutputType
     */
    select?: ProdutoCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountAvaliacoesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AvaliacaoWhereInput;
  };

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountPedidoItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PedidoItemWhereInput;
  };

  /**
   * Count Type PedidoCountOutputType
   */

  export type PedidoCountOutputType = {
    itens: number;
  };

  export type PedidoCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    itens?: boolean | PedidoCountOutputTypeCountItensArgs;
  };

  // Custom InputTypes
  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoCountOutputType
     */
    select?: PedidoCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeCountItensArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PedidoItemWhereInput;
  };

  /**
   * Count Type CupomCountOutputType
   */

  export type CupomCountOutputType = {
    pedidos: number;
  };

  export type CupomCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    pedidos?: boolean | CupomCountOutputTypeCountPedidosArgs;
  };

  // Custom InputTypes
  /**
   * CupomCountOutputType without action
   */
  export type CupomCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CupomCountOutputType
     */
    select?: CupomCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * CupomCountOutputType without action
   */
  export type CupomCountOutputTypeCountPedidosArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PedidoWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    role: string | null;
    twoFactorSecret: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    role: string | null;
    twoFactorSecret: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    password: number;
    role: number;
    twoFactorSecret: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    twoFactorSecret?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    twoFactorSecret?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    twoFactorSecret?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: UserWhereInput;
      orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[];
      by: UserScalarFieldEnum[] | UserScalarFieldEnum;
      having?: UserScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: UserCountAggregateInputType | true;
      _min?: UserMinAggregateInputType;
      _max?: UserMaxAggregateInputType;
    };

  export type UserGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    twoFactorSecret: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        email?: boolean;
        password?: boolean;
        role?: boolean;
        twoFactorSecret?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
      },
      ExtArgs['result']['user']
    >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      password?: boolean;
      role?: boolean;
      twoFactorSecret?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    twoFactorSecret?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'User';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        twoFactorSecret: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<
    Prisma.$UserPayload,
    S
  >;

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    UserFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User']; meta: { name: 'User' } };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly name: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
    readonly password: FieldRef<'User', 'String'>;
    readonly role: FieldRef<'User', 'String'>;
    readonly twoFactorSecret: FieldRef<'User', 'String'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
    readonly updatedAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Filter, which Users to fetch.
       */
      where?: UserWhereInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Users to fetch.
       */
      orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Users.
       */
      cursor?: UserWhereUniqueInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Users from the position of the cursor.
       */
      take?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Users.
       */
      skip?: number;
      distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
    };

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
    };

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null;
    _avg: UsuarioAvgAggregateOutputType | null;
    _sum: UsuarioSumAggregateOutputType | null;
    _min: UsuarioMinAggregateOutputType | null;
    _max: UsuarioMaxAggregateOutputType | null;
  };

  export type UsuarioAvgAggregateOutputType = {
    id: number | null;
  };

  export type UsuarioSumAggregateOutputType = {
    id: number | null;
  };

  export type UsuarioMinAggregateOutputType = {
    id: number | null;
    nome: string | null;
    email: string | null;
    senha: string | null;
    cpf: string | null;
    tipoUsuario: $Enums.UserType | null;
    criadoEm: Date | null;
    atualizadoEm: Date | null;
  };

  export type UsuarioMaxAggregateOutputType = {
    id: number | null;
    nome: string | null;
    email: string | null;
    senha: string | null;
    cpf: string | null;
    tipoUsuario: $Enums.UserType | null;
    criadoEm: Date | null;
    atualizadoEm: Date | null;
  };

  export type UsuarioCountAggregateOutputType = {
    id: number;
    nome: number;
    email: number;
    senha: number;
    cpf: number;
    tipoUsuario: number;
    criadoEm: number;
    atualizadoEm: number;
    _all: number;
  };

  export type UsuarioAvgAggregateInputType = {
    id?: true;
  };

  export type UsuarioSumAggregateInputType = {
    id?: true;
  };

  export type UsuarioMinAggregateInputType = {
    id?: true;
    nome?: true;
    email?: true;
    senha?: true;
    cpf?: true;
    tipoUsuario?: true;
    criadoEm?: true;
    atualizadoEm?: true;
  };

  export type UsuarioMaxAggregateInputType = {
    id?: true;
    nome?: true;
    email?: true;
    senha?: true;
    cpf?: true;
    tipoUsuario?: true;
    criadoEm?: true;
    atualizadoEm?: true;
  };

  export type UsuarioCountAggregateInputType = {
    id?: true;
    nome?: true;
    email?: true;
    senha?: true;
    cpf?: true;
    tipoUsuario?: true;
    criadoEm?: true;
    atualizadoEm?: true;
    _all?: true;
  };

  export type UsuarioAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Usuarios
     **/
    _count?: true | UsuarioCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: UsuarioAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: UsuarioSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UsuarioMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UsuarioMaxAggregateInputType;
  };

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
    [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>;
  };

  export type UsuarioGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UsuarioWhereInput;
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[];
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum;
    having?: UsuarioScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UsuarioCountAggregateInputType | true;
    _avg?: UsuarioAvgAggregateInputType;
    _sum?: UsuarioSumAggregateInputType;
    _min?: UsuarioMinAggregateInputType;
    _max?: UsuarioMaxAggregateInputType;
  };

  export type UsuarioGroupByOutputType = {
    id: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario: $Enums.UserType;
    criadoEm: Date;
    atualizadoEm: Date;
    _count: UsuarioCountAggregateOutputType | null;
    _avg: UsuarioAvgAggregateOutputType | null;
    _sum: UsuarioSumAggregateOutputType | null;
    _min: UsuarioMinAggregateOutputType | null;
    _max: UsuarioMaxAggregateOutputType | null;
  };

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UsuarioGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
          : GetScalarType<T[P], UsuarioGroupByOutputType[P]>;
      }
    >
  >;

  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        nome?: boolean;
        email?: boolean;
        senha?: boolean;
        cpf?: boolean;
        tipoUsuario?: boolean;
        criadoEm?: boolean;
        atualizadoEm?: boolean;
        endereco?: boolean | Usuario$enderecoArgs<ExtArgs>;
        pedidos?: boolean | Usuario$pedidosArgs<ExtArgs>;
        avaliacoes?: boolean | Usuario$avaliacoesArgs<ExtArgs>;
        refreshTokens?: boolean | Usuario$refreshTokensArgs<ExtArgs>;
        _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['usuario']
    >;

  export type UsuarioSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      nome?: boolean;
      email?: boolean;
      senha?: boolean;
      cpf?: boolean;
      tipoUsuario?: boolean;
      criadoEm?: boolean;
      atualizadoEm?: boolean;
    },
    ExtArgs['result']['usuario']
  >;

  export type UsuarioSelectScalar = {
    id?: boolean;
    nome?: boolean;
    email?: boolean;
    senha?: boolean;
    cpf?: boolean;
    tipoUsuario?: boolean;
    criadoEm?: boolean;
    atualizadoEm?: boolean;
  };

  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    endereco?: boolean | Usuario$enderecoArgs<ExtArgs>;
    pedidos?: boolean | Usuario$pedidosArgs<ExtArgs>;
    avaliacoes?: boolean | Usuario$avaliacoesArgs<ExtArgs>;
    refreshTokens?: boolean | Usuario$refreshTokensArgs<ExtArgs>;
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UsuarioIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Usuario';
      objects: {
        endereco: Prisma.$EnderecoPayload<ExtArgs> | null;
        pedidos: Prisma.$PedidoPayload<ExtArgs>[];
        avaliacoes: Prisma.$AvaliacaoPayload<ExtArgs>[];
        refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[];
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: number;
          nome: string;
          email: string;
          senha: string;
          cpf: string;
          tipoUsuario: $Enums.UserType;
          criadoEm: Date;
          atualizadoEm: Date;
        },
        ExtArgs['result']['usuario']
      >;
      composites: {};
    };

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> =
    $Result.GetResult<Prisma.$UsuarioPayload, S>;

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    UsuarioFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: UsuarioCountAggregateInputType | true;
  };

  export interface UsuarioDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario']; meta: { name: 'Usuario' } };
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(
      args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(
      args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     *
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UsuarioFindManyArgs>(
      args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     *
     */
    create<T extends UsuarioCreateArgs>(
      args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UsuarioCreateManyArgs>(
      args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     *
     */
    delete<T extends UsuarioDeleteArgs>(
      args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UsuarioUpdateArgs>(
      args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(
      args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UsuarioUpdateManyArgs>(
      args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(
      args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
     **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UsuarioAggregateArgs>(
      args: Subset<T, UsuarioAggregateArgs>,
    ): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>;

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Usuario model
     */
    readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    endereco<T extends Usuario$enderecoArgs<ExtArgs> = {}>(
      args?: Subset<T, Usuario$enderecoArgs<ExtArgs>>,
    ): Prisma__EnderecoClient<
      $Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null,
      null,
      ExtArgs
    >;
    pedidos<T extends Usuario$pedidosArgs<ExtArgs> = {}>(
      args?: Subset<T, Usuario$pedidosArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    avaliacoes<T extends Usuario$avaliacoesArgs<ExtArgs> = {}>(
      args?: Subset<T, Usuario$avaliacoesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    refreshTokens<T extends Usuario$refreshTokensArgs<ExtArgs> = {}>(
      args?: Subset<T, Usuario$refreshTokensArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<'Usuario', 'Int'>;
    readonly nome: FieldRef<'Usuario', 'String'>;
    readonly email: FieldRef<'Usuario', 'String'>;
    readonly senha: FieldRef<'Usuario', 'String'>;
    readonly cpf: FieldRef<'Usuario', 'String'>;
    readonly tipoUsuario: FieldRef<'Usuario', 'UserType'>;
    readonly criadoEm: FieldRef<'Usuario', 'DateTime'>;
    readonly atualizadoEm: FieldRef<'Usuario', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput;
  };

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput;
  };

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[];
  };

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[];
  };

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Usuarios.
     */
    skip?: number;
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[];
  };

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>;
  };

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>;
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput;
  };

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>;
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput;
  };

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput;
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>;
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>;
  };

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput;
  };

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput;
  };

  /**
   * Usuario.endereco
   */
  export type Usuario$enderecoArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null;
    where?: EnderecoWhereInput;
  };

  /**
   * Usuario.pedidos
   */
  export type Usuario$pedidosArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null;
    where?: PedidoWhereInput;
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[];
    cursor?: PedidoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[];
  };

  /**
   * Usuario.avaliacoes
   */
  export type Usuario$avaliacoesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
    where?: AvaliacaoWhereInput;
    orderBy?: AvaliacaoOrderByWithRelationInput | AvaliacaoOrderByWithRelationInput[];
    cursor?: AvaliacaoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AvaliacaoScalarFieldEnum | AvaliacaoScalarFieldEnum[];
  };

  /**
   * Usuario.refreshTokens
   */
  export type Usuario$refreshTokensArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    where?: RefreshTokenWhereInput;
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[];
    cursor?: RefreshTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[];
  };

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
  };

  /**
   * Model Endereco
   */

  export type AggregateEndereco = {
    _count: EnderecoCountAggregateOutputType | null;
    _avg: EnderecoAvgAggregateOutputType | null;
    _sum: EnderecoSumAggregateOutputType | null;
    _min: EnderecoMinAggregateOutputType | null;
    _max: EnderecoMaxAggregateOutputType | null;
  };

  export type EnderecoAvgAggregateOutputType = {
    id: number | null;
    usuarioId: number | null;
  };

  export type EnderecoSumAggregateOutputType = {
    id: number | null;
    usuarioId: number | null;
  };

  export type EnderecoMinAggregateOutputType = {
    id: number | null;
    rua: string | null;
    numero: string | null;
    complemento: string | null;
    bairro: string | null;
    cidade: string | null;
    estado: string | null;
    cep: string | null;
    tipo: $Enums.AddressType | null;
    principal: boolean | null;
    usuarioId: number | null;
    criadoEm: Date | null;
    atualizadoEm: Date | null;
  };

  export type EnderecoMaxAggregateOutputType = {
    id: number | null;
    rua: string | null;
    numero: string | null;
    complemento: string | null;
    bairro: string | null;
    cidade: string | null;
    estado: string | null;
    cep: string | null;
    tipo: $Enums.AddressType | null;
    principal: boolean | null;
    usuarioId: number | null;
    criadoEm: Date | null;
    atualizadoEm: Date | null;
  };

  export type EnderecoCountAggregateOutputType = {
    id: number;
    rua: number;
    numero: number;
    complemento: number;
    bairro: number;
    cidade: number;
    estado: number;
    cep: number;
    tipo: number;
    principal: number;
    usuarioId: number;
    criadoEm: number;
    atualizadoEm: number;
    _all: number;
  };

  export type EnderecoAvgAggregateInputType = {
    id?: true;
    usuarioId?: true;
  };

  export type EnderecoSumAggregateInputType = {
    id?: true;
    usuarioId?: true;
  };

  export type EnderecoMinAggregateInputType = {
    id?: true;
    rua?: true;
    numero?: true;
    complemento?: true;
    bairro?: true;
    cidade?: true;
    estado?: true;
    cep?: true;
    tipo?: true;
    principal?: true;
    usuarioId?: true;
    criadoEm?: true;
    atualizadoEm?: true;
  };

  export type EnderecoMaxAggregateInputType = {
    id?: true;
    rua?: true;
    numero?: true;
    complemento?: true;
    bairro?: true;
    cidade?: true;
    estado?: true;
    cep?: true;
    tipo?: true;
    principal?: true;
    usuarioId?: true;
    criadoEm?: true;
    atualizadoEm?: true;
  };

  export type EnderecoCountAggregateInputType = {
    id?: true;
    rua?: true;
    numero?: true;
    complemento?: true;
    bairro?: true;
    cidade?: true;
    estado?: true;
    cep?: true;
    tipo?: true;
    principal?: true;
    usuarioId?: true;
    criadoEm?: true;
    atualizadoEm?: true;
    _all?: true;
  };

  export type EnderecoAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Endereco to aggregate.
     */
    where?: EnderecoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: EnderecoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Enderecos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Enderecos
     **/
    _count?: true | EnderecoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: EnderecoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: EnderecoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: EnderecoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: EnderecoMaxAggregateInputType;
  };

  export type GetEnderecoAggregateType<T extends EnderecoAggregateArgs> = {
    [P in keyof T & keyof AggregateEndereco]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEndereco[P]>
      : GetScalarType<T[P], AggregateEndereco[P]>;
  };

  export type EnderecoGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: EnderecoWhereInput;
    orderBy?: EnderecoOrderByWithAggregationInput | EnderecoOrderByWithAggregationInput[];
    by: EnderecoScalarFieldEnum[] | EnderecoScalarFieldEnum;
    having?: EnderecoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EnderecoCountAggregateInputType | true;
    _avg?: EnderecoAvgAggregateInputType;
    _sum?: EnderecoSumAggregateInputType;
    _min?: EnderecoMinAggregateInputType;
    _max?: EnderecoMaxAggregateInputType;
  };

  export type EnderecoGroupByOutputType = {
    id: number;
    rua: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    tipo: $Enums.AddressType;
    principal: boolean;
    usuarioId: number;
    criadoEm: Date;
    atualizadoEm: Date;
    _count: EnderecoCountAggregateOutputType | null;
    _avg: EnderecoAvgAggregateOutputType | null;
    _sum: EnderecoSumAggregateOutputType | null;
    _min: EnderecoMinAggregateOutputType | null;
    _max: EnderecoMaxAggregateOutputType | null;
  };

  type GetEnderecoGroupByPayload<T extends EnderecoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnderecoGroupByOutputType, T['by']> & {
        [P in keyof T & keyof EnderecoGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], EnderecoGroupByOutputType[P]>
          : GetScalarType<T[P], EnderecoGroupByOutputType[P]>;
      }
    >
  >;

  export type EnderecoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        rua?: boolean;
        numero?: boolean;
        complemento?: boolean;
        bairro?: boolean;
        cidade?: boolean;
        estado?: boolean;
        cep?: boolean;
        tipo?: boolean;
        principal?: boolean;
        usuarioId?: boolean;
        criadoEm?: boolean;
        atualizadoEm?: boolean;
        usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['endereco']
    >;

  export type EnderecoSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      rua?: boolean;
      numero?: boolean;
      complemento?: boolean;
      bairro?: boolean;
      cidade?: boolean;
      estado?: boolean;
      cep?: boolean;
      tipo?: boolean;
      principal?: boolean;
      usuarioId?: boolean;
      criadoEm?: boolean;
      atualizadoEm?: boolean;
      usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['endereco']
  >;

  export type EnderecoSelectScalar = {
    id?: boolean;
    rua?: boolean;
    numero?: boolean;
    complemento?: boolean;
    bairro?: boolean;
    cidade?: boolean;
    estado?: boolean;
    cep?: boolean;
    tipo?: boolean;
    principal?: boolean;
    usuarioId?: boolean;
    criadoEm?: boolean;
    atualizadoEm?: boolean;
  };

  export type EnderecoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
    };
  export type EnderecoIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
  };

  export type $EnderecoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Endereco';
      objects: {
        usuario: Prisma.$UsuarioPayload<ExtArgs>;
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: number;
          rua: string;
          numero: string;
          complemento: string | null;
          bairro: string;
          cidade: string;
          estado: string;
          cep: string;
          tipo: $Enums.AddressType;
          principal: boolean;
          usuarioId: number;
          criadoEm: Date;
          atualizadoEm: Date;
        },
        ExtArgs['result']['endereco']
      >;
      composites: {};
    };

  type EnderecoGetPayload<S extends boolean | null | undefined | EnderecoDefaultArgs> =
    $Result.GetResult<Prisma.$EnderecoPayload, S>;

  type EnderecoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    EnderecoFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: EnderecoCountAggregateInputType | true;
  };

  export interface EnderecoDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Endereco'];
      meta: { name: 'Endereco' };
    };
    /**
     * Find zero or one Endereco that matches the filter.
     * @param {EnderecoFindUniqueArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnderecoFindUniqueArgs>(
      args: SelectSubset<T, EnderecoFindUniqueArgs<ExtArgs>>,
    ): Prisma__EnderecoClient<
      $Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Endereco that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnderecoFindUniqueOrThrowArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnderecoFindUniqueOrThrowArgs>(
      args: SelectSubset<T, EnderecoFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__EnderecoClient<
      $Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Endereco that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoFindFirstArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnderecoFindFirstArgs>(
      args?: SelectSubset<T, EnderecoFindFirstArgs<ExtArgs>>,
    ): Prisma__EnderecoClient<
      $Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Endereco that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoFindFirstOrThrowArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnderecoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EnderecoFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__EnderecoClient<
      $Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Enderecos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enderecos
     * const enderecos = await prisma.endereco.findMany()
     *
     * // Get first 10 Enderecos
     * const enderecos = await prisma.endereco.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const enderecoWithIdOnly = await prisma.endereco.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EnderecoFindManyArgs>(
      args?: SelectSubset<T, EnderecoFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Endereco.
     * @param {EnderecoCreateArgs} args - Arguments to create a Endereco.
     * @example
     * // Create one Endereco
     * const Endereco = await prisma.endereco.create({
     *   data: {
     *     // ... data to create a Endereco
     *   }
     * })
     *
     */
    create<T extends EnderecoCreateArgs>(
      args: SelectSubset<T, EnderecoCreateArgs<ExtArgs>>,
    ): Prisma__EnderecoClient<
      $Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Enderecos.
     * @param {EnderecoCreateManyArgs} args - Arguments to create many Enderecos.
     * @example
     * // Create many Enderecos
     * const endereco = await prisma.endereco.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EnderecoCreateManyArgs>(
      args?: SelectSubset<T, EnderecoCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Enderecos and returns the data saved in the database.
     * @param {EnderecoCreateManyAndReturnArgs} args - Arguments to create many Enderecos.
     * @example
     * // Create many Enderecos
     * const endereco = await prisma.endereco.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Enderecos and only return the `id`
     * const enderecoWithIdOnly = await prisma.endereco.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EnderecoCreateManyAndReturnArgs>(
      args?: SelectSubset<T, EnderecoCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Endereco.
     * @param {EnderecoDeleteArgs} args - Arguments to delete one Endereco.
     * @example
     * // Delete one Endereco
     * const Endereco = await prisma.endereco.delete({
     *   where: {
     *     // ... filter to delete one Endereco
     *   }
     * })
     *
     */
    delete<T extends EnderecoDeleteArgs>(
      args: SelectSubset<T, EnderecoDeleteArgs<ExtArgs>>,
    ): Prisma__EnderecoClient<
      $Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Endereco.
     * @param {EnderecoUpdateArgs} args - Arguments to update one Endereco.
     * @example
     * // Update one Endereco
     * const endereco = await prisma.endereco.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EnderecoUpdateArgs>(
      args: SelectSubset<T, EnderecoUpdateArgs<ExtArgs>>,
    ): Prisma__EnderecoClient<
      $Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Enderecos.
     * @param {EnderecoDeleteManyArgs} args - Arguments to filter Enderecos to delete.
     * @example
     * // Delete a few Enderecos
     * const { count } = await prisma.endereco.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EnderecoDeleteManyArgs>(
      args?: SelectSubset<T, EnderecoDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Enderecos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enderecos
     * const endereco = await prisma.endereco.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EnderecoUpdateManyArgs>(
      args: SelectSubset<T, EnderecoUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Endereco.
     * @param {EnderecoUpsertArgs} args - Arguments to update or create a Endereco.
     * @example
     * // Update or create a Endereco
     * const endereco = await prisma.endereco.upsert({
     *   create: {
     *     // ... data to create a Endereco
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Endereco we want to update
     *   }
     * })
     */
    upsert<T extends EnderecoUpsertArgs>(
      args: SelectSubset<T, EnderecoUpsertArgs<ExtArgs>>,
    ): Prisma__EnderecoClient<
      $Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Enderecos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoCountArgs} args - Arguments to filter Enderecos to count.
     * @example
     * // Count the number of Enderecos
     * const count = await prisma.endereco.count({
     *   where: {
     *     // ... the filter for the Enderecos we want to count
     *   }
     * })
     **/
    count<T extends EnderecoCountArgs>(
      args?: Subset<T, EnderecoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnderecoCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Endereco.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends EnderecoAggregateArgs>(
      args: Subset<T, EnderecoAggregateArgs>,
    ): Prisma.PrismaPromise<GetEnderecoAggregateType<T>>;

    /**
     * Group by Endereco.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends EnderecoGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnderecoGroupByArgs['orderBy'] }
        : { orderBy?: EnderecoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, EnderecoGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetEnderecoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Endereco model
     */
    readonly fields: EnderecoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Endereco.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnderecoClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Endereco model
   */
  interface EnderecoFieldRefs {
    readonly id: FieldRef<'Endereco', 'Int'>;
    readonly rua: FieldRef<'Endereco', 'String'>;
    readonly numero: FieldRef<'Endereco', 'String'>;
    readonly complemento: FieldRef<'Endereco', 'String'>;
    readonly bairro: FieldRef<'Endereco', 'String'>;
    readonly cidade: FieldRef<'Endereco', 'String'>;
    readonly estado: FieldRef<'Endereco', 'String'>;
    readonly cep: FieldRef<'Endereco', 'String'>;
    readonly tipo: FieldRef<'Endereco', 'AddressType'>;
    readonly principal: FieldRef<'Endereco', 'Boolean'>;
    readonly usuarioId: FieldRef<'Endereco', 'Int'>;
    readonly criadoEm: FieldRef<'Endereco', 'DateTime'>;
    readonly atualizadoEm: FieldRef<'Endereco', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Endereco findUnique
   */
  export type EnderecoFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null;
    /**
     * Filter, which Endereco to fetch.
     */
    where: EnderecoWhereUniqueInput;
  };

  /**
   * Endereco findUniqueOrThrow
   */
  export type EnderecoFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null;
    /**
     * Filter, which Endereco to fetch.
     */
    where: EnderecoWhereUniqueInput;
  };

  /**
   * Endereco findFirst
   */
  export type EnderecoFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null;
    /**
     * Filter, which Endereco to fetch.
     */
    where?: EnderecoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Enderecos.
     */
    cursor?: EnderecoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Enderecos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Enderecos.
     */
    distinct?: EnderecoScalarFieldEnum | EnderecoScalarFieldEnum[];
  };

  /**
   * Endereco findFirstOrThrow
   */
  export type EnderecoFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null;
    /**
     * Filter, which Endereco to fetch.
     */
    where?: EnderecoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Enderecos.
     */
    cursor?: EnderecoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Enderecos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Enderecos.
     */
    distinct?: EnderecoScalarFieldEnum | EnderecoScalarFieldEnum[];
  };

  /**
   * Endereco findMany
   */
  export type EnderecoFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null;
    /**
     * Filter, which Enderecos to fetch.
     */
    where?: EnderecoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Enderecos.
     */
    cursor?: EnderecoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Enderecos.
     */
    skip?: number;
    distinct?: EnderecoScalarFieldEnum | EnderecoScalarFieldEnum[];
  };

  /**
   * Endereco create
   */
  export type EnderecoCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null;
    /**
     * The data needed to create a Endereco.
     */
    data: XOR<EnderecoCreateInput, EnderecoUncheckedCreateInput>;
  };

  /**
   * Endereco createMany
   */
  export type EnderecoCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Enderecos.
     */
    data: EnderecoCreateManyInput | EnderecoCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Endereco createManyAndReturn
   */
  export type EnderecoCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Enderecos.
     */
    data: EnderecoCreateManyInput | EnderecoCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Endereco update
   */
  export type EnderecoUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null;
    /**
     * The data needed to update a Endereco.
     */
    data: XOR<EnderecoUpdateInput, EnderecoUncheckedUpdateInput>;
    /**
     * Choose, which Endereco to update.
     */
    where: EnderecoWhereUniqueInput;
  };

  /**
   * Endereco updateMany
   */
  export type EnderecoUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Enderecos.
     */
    data: XOR<EnderecoUpdateManyMutationInput, EnderecoUncheckedUpdateManyInput>;
    /**
     * Filter which Enderecos to update
     */
    where?: EnderecoWhereInput;
  };

  /**
   * Endereco upsert
   */
  export type EnderecoUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null;
    /**
     * The filter to search for the Endereco to update in case it exists.
     */
    where: EnderecoWhereUniqueInput;
    /**
     * In case the Endereco found by the `where` argument doesn't exist, create a new Endereco with this data.
     */
    create: XOR<EnderecoCreateInput, EnderecoUncheckedCreateInput>;
    /**
     * In case the Endereco was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnderecoUpdateInput, EnderecoUncheckedUpdateInput>;
  };

  /**
   * Endereco delete
   */
  export type EnderecoDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null;
    /**
     * Filter which Endereco to delete.
     */
    where: EnderecoWhereUniqueInput;
  };

  /**
   * Endereco deleteMany
   */
  export type EnderecoDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Enderecos to delete
     */
    where?: EnderecoWhereInput;
  };

  /**
   * Endereco without action
   */
  export type EnderecoDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null;
  };

  /**
   * Model Produto
   */

  export type AggregateProduto = {
    _count: ProdutoCountAggregateOutputType | null;
    _avg: ProdutoAvgAggregateOutputType | null;
    _sum: ProdutoSumAggregateOutputType | null;
    _min: ProdutoMinAggregateOutputType | null;
    _max: ProdutoMaxAggregateOutputType | null;
  };

  export type ProdutoAvgAggregateOutputType = {
    id: number | null;
    preco: number | null;
    desconto: number | null;
    estoque: number | null;
  };

  export type ProdutoSumAggregateOutputType = {
    id: number | null;
    preco: number | null;
    desconto: number | null;
    estoque: number | null;
  };

  export type ProdutoMinAggregateOutputType = {
    id: number | null;
    nome: string | null;
    descricao: string | null;
    preco: number | null;
    desconto: number | null;
    marca: string | null;
    categoria: string | null;
    subcategoria: string | null;
    imagem: string | null;
    imagens: string | null;
    tamanhos: string | null;
    estoque: number | null;
    ativo: boolean | null;
    criadoEm: Date | null;
    atualizadoEm: Date | null;
  };

  export type ProdutoMaxAggregateOutputType = {
    id: number | null;
    nome: string | null;
    descricao: string | null;
    preco: number | null;
    desconto: number | null;
    marca: string | null;
    categoria: string | null;
    subcategoria: string | null;
    imagem: string | null;
    imagens: string | null;
    tamanhos: string | null;
    estoque: number | null;
    ativo: boolean | null;
    criadoEm: Date | null;
    atualizadoEm: Date | null;
  };

  export type ProdutoCountAggregateOutputType = {
    id: number;
    nome: number;
    descricao: number;
    preco: number;
    desconto: number;
    marca: number;
    categoria: number;
    subcategoria: number;
    imagem: number;
    imagens: number;
    tamanhos: number;
    estoque: number;
    ativo: number;
    criadoEm: number;
    atualizadoEm: number;
    _all: number;
  };

  export type ProdutoAvgAggregateInputType = {
    id?: true;
    preco?: true;
    desconto?: true;
    estoque?: true;
  };

  export type ProdutoSumAggregateInputType = {
    id?: true;
    preco?: true;
    desconto?: true;
    estoque?: true;
  };

  export type ProdutoMinAggregateInputType = {
    id?: true;
    nome?: true;
    descricao?: true;
    preco?: true;
    desconto?: true;
    marca?: true;
    categoria?: true;
    subcategoria?: true;
    imagem?: true;
    imagens?: true;
    tamanhos?: true;
    estoque?: true;
    ativo?: true;
    criadoEm?: true;
    atualizadoEm?: true;
  };

  export type ProdutoMaxAggregateInputType = {
    id?: true;
    nome?: true;
    descricao?: true;
    preco?: true;
    desconto?: true;
    marca?: true;
    categoria?: true;
    subcategoria?: true;
    imagem?: true;
    imagens?: true;
    tamanhos?: true;
    estoque?: true;
    ativo?: true;
    criadoEm?: true;
    atualizadoEm?: true;
  };

  export type ProdutoCountAggregateInputType = {
    id?: true;
    nome?: true;
    descricao?: true;
    preco?: true;
    desconto?: true;
    marca?: true;
    categoria?: true;
    subcategoria?: true;
    imagem?: true;
    imagens?: true;
    tamanhos?: true;
    estoque?: true;
    ativo?: true;
    criadoEm?: true;
    atualizadoEm?: true;
    _all?: true;
  };

  export type ProdutoAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Produto to aggregate.
     */
    where?: ProdutoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProdutoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Produtos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Produtos
     **/
    _count?: true | ProdutoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProdutoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProdutoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProdutoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProdutoMaxAggregateInputType;
  };

  export type GetProdutoAggregateType<T extends ProdutoAggregateArgs> = {
    [P in keyof T & keyof AggregateProduto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduto[P]>
      : GetScalarType<T[P], AggregateProduto[P]>;
  };

  export type ProdutoGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProdutoWhereInput;
    orderBy?: ProdutoOrderByWithAggregationInput | ProdutoOrderByWithAggregationInput[];
    by: ProdutoScalarFieldEnum[] | ProdutoScalarFieldEnum;
    having?: ProdutoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProdutoCountAggregateInputType | true;
    _avg?: ProdutoAvgAggregateInputType;
    _sum?: ProdutoSumAggregateInputType;
    _min?: ProdutoMinAggregateInputType;
    _max?: ProdutoMaxAggregateInputType;
  };

  export type ProdutoGroupByOutputType = {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    desconto: number | null;
    marca: string;
    categoria: string;
    subcategoria: string;
    imagem: string;
    imagens: string;
    tamanhos: string;
    estoque: number;
    ativo: boolean;
    criadoEm: Date;
    atualizadoEm: Date;
    _count: ProdutoCountAggregateOutputType | null;
    _avg: ProdutoAvgAggregateOutputType | null;
    _sum: ProdutoSumAggregateOutputType | null;
    _min: ProdutoMinAggregateOutputType | null;
    _max: ProdutoMaxAggregateOutputType | null;
  };

  type GetProdutoGroupByPayload<T extends ProdutoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProdutoGroupByOutputType, T['by']> & {
        [P in keyof T & keyof ProdutoGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
          : GetScalarType<T[P], ProdutoGroupByOutputType[P]>;
      }
    >
  >;

  export type ProdutoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        nome?: boolean;
        descricao?: boolean;
        preco?: boolean;
        desconto?: boolean;
        marca?: boolean;
        categoria?: boolean;
        subcategoria?: boolean;
        imagem?: boolean;
        imagens?: boolean;
        tamanhos?: boolean;
        estoque?: boolean;
        ativo?: boolean;
        criadoEm?: boolean;
        atualizadoEm?: boolean;
        avaliacoes?: boolean | Produto$avaliacoesArgs<ExtArgs>;
        pedidoItems?: boolean | Produto$pedidoItemsArgs<ExtArgs>;
        _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['produto']
    >;

  export type ProdutoSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      nome?: boolean;
      descricao?: boolean;
      preco?: boolean;
      desconto?: boolean;
      marca?: boolean;
      categoria?: boolean;
      subcategoria?: boolean;
      imagem?: boolean;
      imagens?: boolean;
      tamanhos?: boolean;
      estoque?: boolean;
      ativo?: boolean;
      criadoEm?: boolean;
      atualizadoEm?: boolean;
    },
    ExtArgs['result']['produto']
  >;

  export type ProdutoSelectScalar = {
    id?: boolean;
    nome?: boolean;
    descricao?: boolean;
    preco?: boolean;
    desconto?: boolean;
    marca?: boolean;
    categoria?: boolean;
    subcategoria?: boolean;
    imagem?: boolean;
    imagens?: boolean;
    tamanhos?: boolean;
    estoque?: boolean;
    ativo?: boolean;
    criadoEm?: boolean;
    atualizadoEm?: boolean;
  };

  export type ProdutoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avaliacoes?: boolean | Produto$avaliacoesArgs<ExtArgs>;
    pedidoItems?: boolean | Produto$pedidoItemsArgs<ExtArgs>;
    _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ProdutoIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $ProdutoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Produto';
      objects: {
        avaliacoes: Prisma.$AvaliacaoPayload<ExtArgs>[];
        pedidoItems: Prisma.$PedidoItemPayload<ExtArgs>[];
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: number;
          nome: string;
          descricao: string;
          preco: number;
          desconto: number | null;
          marca: string;
          categoria: string;
          subcategoria: string;
          imagem: string;
          imagens: string;
          tamanhos: string;
          estoque: number;
          ativo: boolean;
          criadoEm: Date;
          atualizadoEm: Date;
        },
        ExtArgs['result']['produto']
      >;
      composites: {};
    };

  type ProdutoGetPayload<S extends boolean | null | undefined | ProdutoDefaultArgs> =
    $Result.GetResult<Prisma.$ProdutoPayload, S>;

  type ProdutoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    ProdutoFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: ProdutoCountAggregateInputType | true;
  };

  export interface ProdutoDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Produto']; meta: { name: 'Produto' } };
    /**
     * Find zero or one Produto that matches the filter.
     * @param {ProdutoFindUniqueArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProdutoFindUniqueArgs>(
      args: SelectSubset<T, ProdutoFindUniqueArgs<ExtArgs>>,
    ): Prisma__ProdutoClient<
      $Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Produto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProdutoFindUniqueOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProdutoFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProdutoFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ProdutoClient<
      $Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Produto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProdutoFindFirstArgs>(
      args?: SelectSubset<T, ProdutoFindFirstArgs<ExtArgs>>,
    ): Prisma__ProdutoClient<
      $Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Produto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProdutoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProdutoFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ProdutoClient<
      $Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produtos
     * const produtos = await prisma.produto.findMany()
     *
     * // Get first 10 Produtos
     * const produtos = await prisma.produto.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const produtoWithIdOnly = await prisma.produto.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProdutoFindManyArgs>(
      args?: SelectSubset<T, ProdutoFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Produto.
     * @param {ProdutoCreateArgs} args - Arguments to create a Produto.
     * @example
     * // Create one Produto
     * const Produto = await prisma.produto.create({
     *   data: {
     *     // ... data to create a Produto
     *   }
     * })
     *
     */
    create<T extends ProdutoCreateArgs>(
      args: SelectSubset<T, ProdutoCreateArgs<ExtArgs>>,
    ): Prisma__ProdutoClient<
      $Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Produtos.
     * @param {ProdutoCreateManyArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produto = await prisma.produto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProdutoCreateManyArgs>(
      args?: SelectSubset<T, ProdutoCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Produtos and returns the data saved in the database.
     * @param {ProdutoCreateManyAndReturnArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produto = await prisma.produto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Produtos and only return the `id`
     * const produtoWithIdOnly = await prisma.produto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProdutoCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProdutoCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Produto.
     * @param {ProdutoDeleteArgs} args - Arguments to delete one Produto.
     * @example
     * // Delete one Produto
     * const Produto = await prisma.produto.delete({
     *   where: {
     *     // ... filter to delete one Produto
     *   }
     * })
     *
     */
    delete<T extends ProdutoDeleteArgs>(
      args: SelectSubset<T, ProdutoDeleteArgs<ExtArgs>>,
    ): Prisma__ProdutoClient<
      $Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Produto.
     * @param {ProdutoUpdateArgs} args - Arguments to update one Produto.
     * @example
     * // Update one Produto
     * const produto = await prisma.produto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProdutoUpdateArgs>(
      args: SelectSubset<T, ProdutoUpdateArgs<ExtArgs>>,
    ): Prisma__ProdutoClient<
      $Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Produtos.
     * @param {ProdutoDeleteManyArgs} args - Arguments to filter Produtos to delete.
     * @example
     * // Delete a few Produtos
     * const { count } = await prisma.produto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProdutoDeleteManyArgs>(
      args?: SelectSubset<T, ProdutoDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produtos
     * const produto = await prisma.produto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProdutoUpdateManyArgs>(
      args: SelectSubset<T, ProdutoUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Produto.
     * @param {ProdutoUpsertArgs} args - Arguments to update or create a Produto.
     * @example
     * // Update or create a Produto
     * const produto = await prisma.produto.upsert({
     *   create: {
     *     // ... data to create a Produto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produto we want to update
     *   }
     * })
     */
    upsert<T extends ProdutoUpsertArgs>(
      args: SelectSubset<T, ProdutoUpsertArgs<ExtArgs>>,
    ): Prisma__ProdutoClient<
      $Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoCountArgs} args - Arguments to filter Produtos to count.
     * @example
     * // Count the number of Produtos
     * const count = await prisma.produto.count({
     *   where: {
     *     // ... the filter for the Produtos we want to count
     *   }
     * })
     **/
    count<T extends ProdutoCountArgs>(
      args?: Subset<T, ProdutoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdutoCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProdutoAggregateArgs>(
      args: Subset<T, ProdutoAggregateArgs>,
    ): Prisma.PrismaPromise<GetProdutoAggregateType<T>>;

    /**
     * Group by Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProdutoGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProdutoGroupByArgs['orderBy'] }
        : { orderBy?: ProdutoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProdutoGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetProdutoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Produto model
     */
    readonly fields: ProdutoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Produto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProdutoClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    avaliacoes<T extends Produto$avaliacoesArgs<ExtArgs> = {}>(
      args?: Subset<T, Produto$avaliacoesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    pedidoItems<T extends Produto$pedidoItemsArgs<ExtArgs> = {}>(
      args?: Subset<T, Produto$pedidoItemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Produto model
   */
  interface ProdutoFieldRefs {
    readonly id: FieldRef<'Produto', 'Int'>;
    readonly nome: FieldRef<'Produto', 'String'>;
    readonly descricao: FieldRef<'Produto', 'String'>;
    readonly preco: FieldRef<'Produto', 'Float'>;
    readonly desconto: FieldRef<'Produto', 'Float'>;
    readonly marca: FieldRef<'Produto', 'String'>;
    readonly categoria: FieldRef<'Produto', 'String'>;
    readonly subcategoria: FieldRef<'Produto', 'String'>;
    readonly imagem: FieldRef<'Produto', 'String'>;
    readonly imagens: FieldRef<'Produto', 'String'>;
    readonly tamanhos: FieldRef<'Produto', 'String'>;
    readonly estoque: FieldRef<'Produto', 'Int'>;
    readonly ativo: FieldRef<'Produto', 'Boolean'>;
    readonly criadoEm: FieldRef<'Produto', 'DateTime'>;
    readonly atualizadoEm: FieldRef<'Produto', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Produto findUnique
   */
  export type ProdutoFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null;
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput;
  };

  /**
   * Produto findUniqueOrThrow
   */
  export type ProdutoFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null;
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput;
  };

  /**
   * Produto findFirst
   */
  export type ProdutoFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null;
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Produtos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[];
  };

  /**
   * Produto findFirstOrThrow
   */
  export type ProdutoFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null;
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Produtos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[];
  };

  /**
   * Produto findMany
   */
  export type ProdutoFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null;
    /**
     * Filter, which Produtos to fetch.
     */
    where?: ProdutoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Produtos.
     */
    cursor?: ProdutoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Produtos.
     */
    skip?: number;
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[];
  };

  /**
   * Produto create
   */
  export type ProdutoCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null;
    /**
     * The data needed to create a Produto.
     */
    data: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>;
  };

  /**
   * Produto createMany
   */
  export type ProdutoCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Produtos.
     */
    data: ProdutoCreateManyInput | ProdutoCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Produto createManyAndReturn
   */
  export type ProdutoCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Produtos.
     */
    data: ProdutoCreateManyInput | ProdutoCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Produto update
   */
  export type ProdutoUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null;
    /**
     * The data needed to update a Produto.
     */
    data: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>;
    /**
     * Choose, which Produto to update.
     */
    where: ProdutoWhereUniqueInput;
  };

  /**
   * Produto updateMany
   */
  export type ProdutoUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyInput>;
    /**
     * Filter which Produtos to update
     */
    where?: ProdutoWhereInput;
  };

  /**
   * Produto upsert
   */
  export type ProdutoUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null;
    /**
     * The filter to search for the Produto to update in case it exists.
     */
    where: ProdutoWhereUniqueInput;
    /**
     * In case the Produto found by the `where` argument doesn't exist, create a new Produto with this data.
     */
    create: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>;
    /**
     * In case the Produto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>;
  };

  /**
   * Produto delete
   */
  export type ProdutoDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null;
    /**
     * Filter which Produto to delete.
     */
    where: ProdutoWhereUniqueInput;
  };

  /**
   * Produto deleteMany
   */
  export type ProdutoDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Produtos to delete
     */
    where?: ProdutoWhereInput;
  };

  /**
   * Produto.avaliacoes
   */
  export type Produto$avaliacoesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
    where?: AvaliacaoWhereInput;
    orderBy?: AvaliacaoOrderByWithRelationInput | AvaliacaoOrderByWithRelationInput[];
    cursor?: AvaliacaoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AvaliacaoScalarFieldEnum | AvaliacaoScalarFieldEnum[];
  };

  /**
   * Produto.pedidoItems
   */
  export type Produto$pedidoItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null;
    where?: PedidoItemWhereInput;
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[];
    cursor?: PedidoItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[];
  };

  /**
   * Produto without action
   */
  export type ProdutoDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null;
  };

  /**
   * Model Avaliacao
   */

  export type AggregateAvaliacao = {
    _count: AvaliacaoCountAggregateOutputType | null;
    _avg: AvaliacaoAvgAggregateOutputType | null;
    _sum: AvaliacaoSumAggregateOutputType | null;
    _min: AvaliacaoMinAggregateOutputType | null;
    _max: AvaliacaoMaxAggregateOutputType | null;
  };

  export type AvaliacaoAvgAggregateOutputType = {
    id: number | null;
    nota: number | null;
    produtoId: number | null;
    usuarioId: number | null;
  };

  export type AvaliacaoSumAggregateOutputType = {
    id: number | null;
    nota: number | null;
    produtoId: number | null;
    usuarioId: number | null;
  };

  export type AvaliacaoMinAggregateOutputType = {
    id: number | null;
    nota: number | null;
    comentario: string | null;
    data: Date | null;
    produtoId: number | null;
    usuarioId: number | null;
  };

  export type AvaliacaoMaxAggregateOutputType = {
    id: number | null;
    nota: number | null;
    comentario: string | null;
    data: Date | null;
    produtoId: number | null;
    usuarioId: number | null;
  };

  export type AvaliacaoCountAggregateOutputType = {
    id: number;
    nota: number;
    comentario: number;
    data: number;
    produtoId: number;
    usuarioId: number;
    _all: number;
  };

  export type AvaliacaoAvgAggregateInputType = {
    id?: true;
    nota?: true;
    produtoId?: true;
    usuarioId?: true;
  };

  export type AvaliacaoSumAggregateInputType = {
    id?: true;
    nota?: true;
    produtoId?: true;
    usuarioId?: true;
  };

  export type AvaliacaoMinAggregateInputType = {
    id?: true;
    nota?: true;
    comentario?: true;
    data?: true;
    produtoId?: true;
    usuarioId?: true;
  };

  export type AvaliacaoMaxAggregateInputType = {
    id?: true;
    nota?: true;
    comentario?: true;
    data?: true;
    produtoId?: true;
    usuarioId?: true;
  };

  export type AvaliacaoCountAggregateInputType = {
    id?: true;
    nota?: true;
    comentario?: true;
    data?: true;
    produtoId?: true;
    usuarioId?: true;
    _all?: true;
  };

  export type AvaliacaoAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Avaliacao to aggregate.
     */
    where?: AvaliacaoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Avaliacaos to fetch.
     */
    orderBy?: AvaliacaoOrderByWithRelationInput | AvaliacaoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AvaliacaoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Avaliacaos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Avaliacaos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Avaliacaos
     **/
    _count?: true | AvaliacaoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AvaliacaoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AvaliacaoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AvaliacaoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AvaliacaoMaxAggregateInputType;
  };

  export type GetAvaliacaoAggregateType<T extends AvaliacaoAggregateArgs> = {
    [P in keyof T & keyof AggregateAvaliacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvaliacao[P]>
      : GetScalarType<T[P], AggregateAvaliacao[P]>;
  };

  export type AvaliacaoGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AvaliacaoWhereInput;
    orderBy?: AvaliacaoOrderByWithAggregationInput | AvaliacaoOrderByWithAggregationInput[];
    by: AvaliacaoScalarFieldEnum[] | AvaliacaoScalarFieldEnum;
    having?: AvaliacaoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AvaliacaoCountAggregateInputType | true;
    _avg?: AvaliacaoAvgAggregateInputType;
    _sum?: AvaliacaoSumAggregateInputType;
    _min?: AvaliacaoMinAggregateInputType;
    _max?: AvaliacaoMaxAggregateInputType;
  };

  export type AvaliacaoGroupByOutputType = {
    id: number;
    nota: number;
    comentario: string;
    data: Date;
    produtoId: number;
    usuarioId: number;
    _count: AvaliacaoCountAggregateOutputType | null;
    _avg: AvaliacaoAvgAggregateOutputType | null;
    _sum: AvaliacaoSumAggregateOutputType | null;
    _min: AvaliacaoMinAggregateOutputType | null;
    _max: AvaliacaoMaxAggregateOutputType | null;
  };

  type GetAvaliacaoGroupByPayload<T extends AvaliacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvaliacaoGroupByOutputType, T['by']> & {
        [P in keyof T & keyof AvaliacaoGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], AvaliacaoGroupByOutputType[P]>
          : GetScalarType<T[P], AvaliacaoGroupByOutputType[P]>;
      }
    >
  >;

  export type AvaliacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        nota?: boolean;
        comentario?: boolean;
        data?: boolean;
        produtoId?: boolean;
        usuarioId?: boolean;
        produto?: boolean | ProdutoDefaultArgs<ExtArgs>;
        usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['avaliacao']
    >;

  export type AvaliacaoSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      nota?: boolean;
      comentario?: boolean;
      data?: boolean;
      produtoId?: boolean;
      usuarioId?: boolean;
      produto?: boolean | ProdutoDefaultArgs<ExtArgs>;
      usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['avaliacao']
  >;

  export type AvaliacaoSelectScalar = {
    id?: boolean;
    nota?: boolean;
    comentario?: boolean;
    data?: boolean;
    produtoId?: boolean;
    usuarioId?: boolean;
  };

  export type AvaliacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      produto?: boolean | ProdutoDefaultArgs<ExtArgs>;
      usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
    };
  export type AvaliacaoIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>;
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
  };

  export type $AvaliacaoPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Avaliacao';
    objects: {
      produto: Prisma.$ProdutoPayload<ExtArgs>;
      usuario: Prisma.$UsuarioPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        nota: number;
        comentario: string;
        data: Date;
        produtoId: number;
        usuarioId: number;
      },
      ExtArgs['result']['avaliacao']
    >;
    composites: {};
  };

  type AvaliacaoGetPayload<S extends boolean | null | undefined | AvaliacaoDefaultArgs> =
    $Result.GetResult<Prisma.$AvaliacaoPayload, S>;

  type AvaliacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvaliacaoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AvaliacaoCountAggregateInputType | true;
    };

  export interface AvaliacaoDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Avaliacao'];
      meta: { name: 'Avaliacao' };
    };
    /**
     * Find zero or one Avaliacao that matches the filter.
     * @param {AvaliacaoFindUniqueArgs} args - Arguments to find a Avaliacao
     * @example
     * // Get one Avaliacao
     * const avaliacao = await prisma.avaliacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvaliacaoFindUniqueArgs>(
      args: SelectSubset<T, AvaliacaoFindUniqueArgs<ExtArgs>>,
    ): Prisma__AvaliacaoClient<
      $Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Avaliacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvaliacaoFindUniqueOrThrowArgs} args - Arguments to find a Avaliacao
     * @example
     * // Get one Avaliacao
     * const avaliacao = await prisma.avaliacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvaliacaoFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AvaliacaoFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AvaliacaoClient<
      $Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Avaliacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvaliacaoFindFirstArgs} args - Arguments to find a Avaliacao
     * @example
     * // Get one Avaliacao
     * const avaliacao = await prisma.avaliacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvaliacaoFindFirstArgs>(
      args?: SelectSubset<T, AvaliacaoFindFirstArgs<ExtArgs>>,
    ): Prisma__AvaliacaoClient<
      $Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Avaliacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvaliacaoFindFirstOrThrowArgs} args - Arguments to find a Avaliacao
     * @example
     * // Get one Avaliacao
     * const avaliacao = await prisma.avaliacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvaliacaoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AvaliacaoFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AvaliacaoClient<
      $Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Avaliacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvaliacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Avaliacaos
     * const avaliacaos = await prisma.avaliacao.findMany()
     *
     * // Get first 10 Avaliacaos
     * const avaliacaos = await prisma.avaliacao.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const avaliacaoWithIdOnly = await prisma.avaliacao.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AvaliacaoFindManyArgs>(
      args?: SelectSubset<T, AvaliacaoFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Avaliacao.
     * @param {AvaliacaoCreateArgs} args - Arguments to create a Avaliacao.
     * @example
     * // Create one Avaliacao
     * const Avaliacao = await prisma.avaliacao.create({
     *   data: {
     *     // ... data to create a Avaliacao
     *   }
     * })
     *
     */
    create<T extends AvaliacaoCreateArgs>(
      args: SelectSubset<T, AvaliacaoCreateArgs<ExtArgs>>,
    ): Prisma__AvaliacaoClient<
      $Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Avaliacaos.
     * @param {AvaliacaoCreateManyArgs} args - Arguments to create many Avaliacaos.
     * @example
     * // Create many Avaliacaos
     * const avaliacao = await prisma.avaliacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AvaliacaoCreateManyArgs>(
      args?: SelectSubset<T, AvaliacaoCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Avaliacaos and returns the data saved in the database.
     * @param {AvaliacaoCreateManyAndReturnArgs} args - Arguments to create many Avaliacaos.
     * @example
     * // Create many Avaliacaos
     * const avaliacao = await prisma.avaliacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Avaliacaos and only return the `id`
     * const avaliacaoWithIdOnly = await prisma.avaliacao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AvaliacaoCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AvaliacaoCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Avaliacao.
     * @param {AvaliacaoDeleteArgs} args - Arguments to delete one Avaliacao.
     * @example
     * // Delete one Avaliacao
     * const Avaliacao = await prisma.avaliacao.delete({
     *   where: {
     *     // ... filter to delete one Avaliacao
     *   }
     * })
     *
     */
    delete<T extends AvaliacaoDeleteArgs>(
      args: SelectSubset<T, AvaliacaoDeleteArgs<ExtArgs>>,
    ): Prisma__AvaliacaoClient<
      $Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Avaliacao.
     * @param {AvaliacaoUpdateArgs} args - Arguments to update one Avaliacao.
     * @example
     * // Update one Avaliacao
     * const avaliacao = await prisma.avaliacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AvaliacaoUpdateArgs>(
      args: SelectSubset<T, AvaliacaoUpdateArgs<ExtArgs>>,
    ): Prisma__AvaliacaoClient<
      $Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Avaliacaos.
     * @param {AvaliacaoDeleteManyArgs} args - Arguments to filter Avaliacaos to delete.
     * @example
     * // Delete a few Avaliacaos
     * const { count } = await prisma.avaliacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AvaliacaoDeleteManyArgs>(
      args?: SelectSubset<T, AvaliacaoDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Avaliacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvaliacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Avaliacaos
     * const avaliacao = await prisma.avaliacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AvaliacaoUpdateManyArgs>(
      args: SelectSubset<T, AvaliacaoUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Avaliacao.
     * @param {AvaliacaoUpsertArgs} args - Arguments to update or create a Avaliacao.
     * @example
     * // Update or create a Avaliacao
     * const avaliacao = await prisma.avaliacao.upsert({
     *   create: {
     *     // ... data to create a Avaliacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Avaliacao we want to update
     *   }
     * })
     */
    upsert<T extends AvaliacaoUpsertArgs>(
      args: SelectSubset<T, AvaliacaoUpsertArgs<ExtArgs>>,
    ): Prisma__AvaliacaoClient<
      $Result.GetResult<Prisma.$AvaliacaoPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Avaliacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvaliacaoCountArgs} args - Arguments to filter Avaliacaos to count.
     * @example
     * // Count the number of Avaliacaos
     * const count = await prisma.avaliacao.count({
     *   where: {
     *     // ... the filter for the Avaliacaos we want to count
     *   }
     * })
     **/
    count<T extends AvaliacaoCountArgs>(
      args?: Subset<T, AvaliacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvaliacaoCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Avaliacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvaliacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AvaliacaoAggregateArgs>(
      args: Subset<T, AvaliacaoAggregateArgs>,
    ): Prisma.PrismaPromise<GetAvaliacaoAggregateType<T>>;

    /**
     * Group by Avaliacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvaliacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AvaliacaoGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvaliacaoGroupByArgs['orderBy'] }
        : { orderBy?: AvaliacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AvaliacaoGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetAvaliacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Avaliacao model
     */
    readonly fields: AvaliacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Avaliacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvaliacaoClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>,
    ): Prisma__ProdutoClient<
      $Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Avaliacao model
   */
  interface AvaliacaoFieldRefs {
    readonly id: FieldRef<'Avaliacao', 'Int'>;
    readonly nota: FieldRef<'Avaliacao', 'Int'>;
    readonly comentario: FieldRef<'Avaliacao', 'String'>;
    readonly data: FieldRef<'Avaliacao', 'DateTime'>;
    readonly produtoId: FieldRef<'Avaliacao', 'Int'>;
    readonly usuarioId: FieldRef<'Avaliacao', 'Int'>;
  }

  // Custom InputTypes
  /**
   * Avaliacao findUnique
   */
  export type AvaliacaoFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
    /**
     * Filter, which Avaliacao to fetch.
     */
    where: AvaliacaoWhereUniqueInput;
  };

  /**
   * Avaliacao findUniqueOrThrow
   */
  export type AvaliacaoFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
    /**
     * Filter, which Avaliacao to fetch.
     */
    where: AvaliacaoWhereUniqueInput;
  };

  /**
   * Avaliacao findFirst
   */
  export type AvaliacaoFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
    /**
     * Filter, which Avaliacao to fetch.
     */
    where?: AvaliacaoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Avaliacaos to fetch.
     */
    orderBy?: AvaliacaoOrderByWithRelationInput | AvaliacaoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Avaliacaos.
     */
    cursor?: AvaliacaoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Avaliacaos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Avaliacaos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Avaliacaos.
     */
    distinct?: AvaliacaoScalarFieldEnum | AvaliacaoScalarFieldEnum[];
  };

  /**
   * Avaliacao findFirstOrThrow
   */
  export type AvaliacaoFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
    /**
     * Filter, which Avaliacao to fetch.
     */
    where?: AvaliacaoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Avaliacaos to fetch.
     */
    orderBy?: AvaliacaoOrderByWithRelationInput | AvaliacaoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Avaliacaos.
     */
    cursor?: AvaliacaoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Avaliacaos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Avaliacaos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Avaliacaos.
     */
    distinct?: AvaliacaoScalarFieldEnum | AvaliacaoScalarFieldEnum[];
  };

  /**
   * Avaliacao findMany
   */
  export type AvaliacaoFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
    /**
     * Filter, which Avaliacaos to fetch.
     */
    where?: AvaliacaoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Avaliacaos to fetch.
     */
    orderBy?: AvaliacaoOrderByWithRelationInput | AvaliacaoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Avaliacaos.
     */
    cursor?: AvaliacaoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Avaliacaos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Avaliacaos.
     */
    skip?: number;
    distinct?: AvaliacaoScalarFieldEnum | AvaliacaoScalarFieldEnum[];
  };

  /**
   * Avaliacao create
   */
  export type AvaliacaoCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
    /**
     * The data needed to create a Avaliacao.
     */
    data: XOR<AvaliacaoCreateInput, AvaliacaoUncheckedCreateInput>;
  };

  /**
   * Avaliacao createMany
   */
  export type AvaliacaoCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Avaliacaos.
     */
    data: AvaliacaoCreateManyInput | AvaliacaoCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Avaliacao createManyAndReturn
   */
  export type AvaliacaoCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Avaliacaos.
     */
    data: AvaliacaoCreateManyInput | AvaliacaoCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Avaliacao update
   */
  export type AvaliacaoUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
    /**
     * The data needed to update a Avaliacao.
     */
    data: XOR<AvaliacaoUpdateInput, AvaliacaoUncheckedUpdateInput>;
    /**
     * Choose, which Avaliacao to update.
     */
    where: AvaliacaoWhereUniqueInput;
  };

  /**
   * Avaliacao updateMany
   */
  export type AvaliacaoUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Avaliacaos.
     */
    data: XOR<AvaliacaoUpdateManyMutationInput, AvaliacaoUncheckedUpdateManyInput>;
    /**
     * Filter which Avaliacaos to update
     */
    where?: AvaliacaoWhereInput;
  };

  /**
   * Avaliacao upsert
   */
  export type AvaliacaoUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
    /**
     * The filter to search for the Avaliacao to update in case it exists.
     */
    where: AvaliacaoWhereUniqueInput;
    /**
     * In case the Avaliacao found by the `where` argument doesn't exist, create a new Avaliacao with this data.
     */
    create: XOR<AvaliacaoCreateInput, AvaliacaoUncheckedCreateInput>;
    /**
     * In case the Avaliacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvaliacaoUpdateInput, AvaliacaoUncheckedUpdateInput>;
  };

  /**
   * Avaliacao delete
   */
  export type AvaliacaoDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
    /**
     * Filter which Avaliacao to delete.
     */
    where: AvaliacaoWhereUniqueInput;
  };

  /**
   * Avaliacao deleteMany
   */
  export type AvaliacaoDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Avaliacaos to delete
     */
    where?: AvaliacaoWhereInput;
  };

  /**
   * Avaliacao without action
   */
  export type AvaliacaoDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Avaliacao
     */
    select?: AvaliacaoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvaliacaoInclude<ExtArgs> | null;
  };

  /**
   * Model Pedido
   */

  export type AggregatePedido = {
    _count: PedidoCountAggregateOutputType | null;
    _avg: PedidoAvgAggregateOutputType | null;
    _sum: PedidoSumAggregateOutputType | null;
    _min: PedidoMinAggregateOutputType | null;
    _max: PedidoMaxAggregateOutputType | null;
  };

  export type PedidoAvgAggregateOutputType = {
    id: number | null;
    valorTotal: number | null;
    frete: number | null;
    usuarioId: number | null;
    cupomId: number | null;
  };

  export type PedidoSumAggregateOutputType = {
    id: number | null;
    valorTotal: number | null;
    frete: number | null;
    usuarioId: number | null;
    cupomId: number | null;
  };

  export type PedidoMinAggregateOutputType = {
    id: number | null;
    status: $Enums.OrderStatus | null;
    pagamento: $Enums.PaymentType | null;
    valorTotal: number | null;
    frete: number | null;
    data: Date | null;
    atualizadoEm: Date | null;
    endereco: string | null;
    usuarioId: number | null;
    cupomId: number | null;
  };

  export type PedidoMaxAggregateOutputType = {
    id: number | null;
    status: $Enums.OrderStatus | null;
    pagamento: $Enums.PaymentType | null;
    valorTotal: number | null;
    frete: number | null;
    data: Date | null;
    atualizadoEm: Date | null;
    endereco: string | null;
    usuarioId: number | null;
    cupomId: number | null;
  };

  export type PedidoCountAggregateOutputType = {
    id: number;
    status: number;
    pagamento: number;
    valorTotal: number;
    frete: number;
    data: number;
    atualizadoEm: number;
    endereco: number;
    usuarioId: number;
    cupomId: number;
    _all: number;
  };

  export type PedidoAvgAggregateInputType = {
    id?: true;
    valorTotal?: true;
    frete?: true;
    usuarioId?: true;
    cupomId?: true;
  };

  export type PedidoSumAggregateInputType = {
    id?: true;
    valorTotal?: true;
    frete?: true;
    usuarioId?: true;
    cupomId?: true;
  };

  export type PedidoMinAggregateInputType = {
    id?: true;
    status?: true;
    pagamento?: true;
    valorTotal?: true;
    frete?: true;
    data?: true;
    atualizadoEm?: true;
    endereco?: true;
    usuarioId?: true;
    cupomId?: true;
  };

  export type PedidoMaxAggregateInputType = {
    id?: true;
    status?: true;
    pagamento?: true;
    valorTotal?: true;
    frete?: true;
    data?: true;
    atualizadoEm?: true;
    endereco?: true;
    usuarioId?: true;
    cupomId?: true;
  };

  export type PedidoCountAggregateInputType = {
    id?: true;
    status?: true;
    pagamento?: true;
    valorTotal?: true;
    frete?: true;
    data?: true;
    atualizadoEm?: true;
    endereco?: true;
    usuarioId?: true;
    cupomId?: true;
    _all?: true;
  };

  export type PedidoAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Pedido to aggregate.
     */
    where?: PedidoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PedidoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Pedidos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Pedidos
     **/
    _count?: true | PedidoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: PedidoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: PedidoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PedidoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PedidoMaxAggregateInputType;
  };

  export type GetPedidoAggregateType<T extends PedidoAggregateArgs> = {
    [P in keyof T & keyof AggregatePedido]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedido[P]>
      : GetScalarType<T[P], AggregatePedido[P]>;
  };

  export type PedidoGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PedidoWhereInput;
    orderBy?: PedidoOrderByWithAggregationInput | PedidoOrderByWithAggregationInput[];
    by: PedidoScalarFieldEnum[] | PedidoScalarFieldEnum;
    having?: PedidoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PedidoCountAggregateInputType | true;
    _avg?: PedidoAvgAggregateInputType;
    _sum?: PedidoSumAggregateInputType;
    _min?: PedidoMinAggregateInputType;
    _max?: PedidoMaxAggregateInputType;
  };

  export type PedidoGroupByOutputType = {
    id: number;
    status: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data: Date;
    atualizadoEm: Date;
    endereco: string;
    usuarioId: number;
    cupomId: number | null;
    _count: PedidoCountAggregateOutputType | null;
    _avg: PedidoAvgAggregateOutputType | null;
    _sum: PedidoSumAggregateOutputType | null;
    _min: PedidoMinAggregateOutputType | null;
    _max: PedidoMaxAggregateOutputType | null;
  };

  type GetPedidoGroupByPayload<T extends PedidoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoGroupByOutputType, T['by']> & {
        [P in keyof T & keyof PedidoGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], PedidoGroupByOutputType[P]>
          : GetScalarType<T[P], PedidoGroupByOutputType[P]>;
      }
    >
  >;

  export type PedidoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        status?: boolean;
        pagamento?: boolean;
        valorTotal?: boolean;
        frete?: boolean;
        data?: boolean;
        atualizadoEm?: boolean;
        endereco?: boolean;
        usuarioId?: boolean;
        cupomId?: boolean;
        usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
        itens?: boolean | Pedido$itensArgs<ExtArgs>;
        cupom?: boolean | Pedido$cupomArgs<ExtArgs>;
        _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['pedido']
    >;

  export type PedidoSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      status?: boolean;
      pagamento?: boolean;
      valorTotal?: boolean;
      frete?: boolean;
      data?: boolean;
      atualizadoEm?: boolean;
      endereco?: boolean;
      usuarioId?: boolean;
      cupomId?: boolean;
      usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
      cupom?: boolean | Pedido$cupomArgs<ExtArgs>;
    },
    ExtArgs['result']['pedido']
  >;

  export type PedidoSelectScalar = {
    id?: boolean;
    status?: boolean;
    pagamento?: boolean;
    valorTotal?: boolean;
    frete?: boolean;
    data?: boolean;
    atualizadoEm?: boolean;
    endereco?: boolean;
    usuarioId?: boolean;
    cupomId?: boolean;
  };

  export type PedidoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
    itens?: boolean | Pedido$itensArgs<ExtArgs>;
    cupom?: boolean | Pedido$cupomArgs<ExtArgs>;
    _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type PedidoIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
    cupom?: boolean | Pedido$cupomArgs<ExtArgs>;
  };

  export type $PedidoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Pedido';
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>;
      itens: Prisma.$PedidoItemPayload<ExtArgs>[];
      cupom: Prisma.$CupomPayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        status: $Enums.OrderStatus;
        pagamento: $Enums.PaymentType;
        valorTotal: number;
        frete: number;
        data: Date;
        atualizadoEm: Date;
        endereco: string;
        usuarioId: number;
        cupomId: number | null;
      },
      ExtArgs['result']['pedido']
    >;
    composites: {};
  };

  type PedidoGetPayload<S extends boolean | null | undefined | PedidoDefaultArgs> =
    $Result.GetResult<Prisma.$PedidoPayload, S>;

  type PedidoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    PedidoFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: PedidoCountAggregateInputType | true;
  };

  export interface PedidoDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pedido']; meta: { name: 'Pedido' } };
    /**
     * Find zero or one Pedido that matches the filter.
     * @param {PedidoFindUniqueArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoFindUniqueArgs>(
      args: SelectSubset<T, PedidoFindUniqueArgs<ExtArgs>>,
    ): Prisma__PedidoClient<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Pedido that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidoFindUniqueOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PedidoFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__PedidoClient<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Pedido that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoFindFirstArgs>(
      args?: SelectSubset<T, PedidoFindFirstArgs<ExtArgs>>,
    ): Prisma__PedidoClient<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Pedido that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PedidoFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__PedidoClient<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedidos
     * const pedidos = await prisma.pedido.findMany()
     *
     * // Get first 10 Pedidos
     * const pedidos = await prisma.pedido.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const pedidoWithIdOnly = await prisma.pedido.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PedidoFindManyArgs>(
      args?: SelectSubset<T, PedidoFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Pedido.
     * @param {PedidoCreateArgs} args - Arguments to create a Pedido.
     * @example
     * // Create one Pedido
     * const Pedido = await prisma.pedido.create({
     *   data: {
     *     // ... data to create a Pedido
     *   }
     * })
     *
     */
    create<T extends PedidoCreateArgs>(
      args: SelectSubset<T, PedidoCreateArgs<ExtArgs>>,
    ): Prisma__PedidoClient<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Pedidos.
     * @param {PedidoCreateManyArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedido = await prisma.pedido.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PedidoCreateManyArgs>(
      args?: SelectSubset<T, PedidoCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Pedidos and returns the data saved in the database.
     * @param {PedidoCreateManyAndReturnArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedido = await prisma.pedido.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Pedidos and only return the `id`
     * const pedidoWithIdOnly = await prisma.pedido.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PedidoCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PedidoCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Pedido.
     * @param {PedidoDeleteArgs} args - Arguments to delete one Pedido.
     * @example
     * // Delete one Pedido
     * const Pedido = await prisma.pedido.delete({
     *   where: {
     *     // ... filter to delete one Pedido
     *   }
     * })
     *
     */
    delete<T extends PedidoDeleteArgs>(
      args: SelectSubset<T, PedidoDeleteArgs<ExtArgs>>,
    ): Prisma__PedidoClient<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Pedido.
     * @param {PedidoUpdateArgs} args - Arguments to update one Pedido.
     * @example
     * // Update one Pedido
     * const pedido = await prisma.pedido.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PedidoUpdateArgs>(
      args: SelectSubset<T, PedidoUpdateArgs<ExtArgs>>,
    ): Prisma__PedidoClient<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Pedidos.
     * @param {PedidoDeleteManyArgs} args - Arguments to filter Pedidos to delete.
     * @example
     * // Delete a few Pedidos
     * const { count } = await prisma.pedido.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PedidoDeleteManyArgs>(
      args?: SelectSubset<T, PedidoDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedidos
     * const pedido = await prisma.pedido.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PedidoUpdateManyArgs>(
      args: SelectSubset<T, PedidoUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Pedido.
     * @param {PedidoUpsertArgs} args - Arguments to update or create a Pedido.
     * @example
     * // Update or create a Pedido
     * const pedido = await prisma.pedido.upsert({
     *   create: {
     *     // ... data to create a Pedido
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedido we want to update
     *   }
     * })
     */
    upsert<T extends PedidoUpsertArgs>(
      args: SelectSubset<T, PedidoUpsertArgs<ExtArgs>>,
    ): Prisma__PedidoClient<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoCountArgs} args - Arguments to filter Pedidos to count.
     * @example
     * // Count the number of Pedidos
     * const count = await prisma.pedido.count({
     *   where: {
     *     // ... the filter for the Pedidos we want to count
     *   }
     * })
     **/
    count<T extends PedidoCountArgs>(
      args?: Subset<T, PedidoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PedidoAggregateArgs>(
      args: Subset<T, PedidoAggregateArgs>,
    ): Prisma.PrismaPromise<GetPedidoAggregateType<T>>;

    /**
     * Group by Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PedidoGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoGroupByArgs['orderBy'] }
        : { orderBy?: PedidoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, PedidoGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetPedidoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Pedido model
     */
    readonly fields: PedidoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pedido.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    itens<T extends Pedido$itensArgs<ExtArgs> = {}>(
      args?: Subset<T, Pedido$itensArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    cupom<T extends Pedido$cupomArgs<ExtArgs> = {}>(
      args?: Subset<T, Pedido$cupomArgs<ExtArgs>>,
    ): Prisma__CupomClient<
      $Result.GetResult<Prisma.$CupomPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null,
      null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Pedido model
   */
  interface PedidoFieldRefs {
    readonly id: FieldRef<'Pedido', 'Int'>;
    readonly status: FieldRef<'Pedido', 'OrderStatus'>;
    readonly pagamento: FieldRef<'Pedido', 'PaymentType'>;
    readonly valorTotal: FieldRef<'Pedido', 'Float'>;
    readonly frete: FieldRef<'Pedido', 'Float'>;
    readonly data: FieldRef<'Pedido', 'DateTime'>;
    readonly atualizadoEm: FieldRef<'Pedido', 'DateTime'>;
    readonly endereco: FieldRef<'Pedido', 'String'>;
    readonly usuarioId: FieldRef<'Pedido', 'Int'>;
    readonly cupomId: FieldRef<'Pedido', 'Int'>;
  }

  // Custom InputTypes
  /**
   * Pedido findUnique
   */
  export type PedidoFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null;
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput;
  };

  /**
   * Pedido findUniqueOrThrow
   */
  export type PedidoFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null;
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput;
  };

  /**
   * Pedido findFirst
   */
  export type PedidoFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null;
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Pedidos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[];
  };

  /**
   * Pedido findFirstOrThrow
   */
  export type PedidoFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null;
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Pedidos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[];
  };

  /**
   * Pedido findMany
   */
  export type PedidoFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null;
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Pedidos.
     */
    cursor?: PedidoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Pedidos.
     */
    skip?: number;
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[];
  };

  /**
   * Pedido create
   */
  export type PedidoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Pedido
       */
      select?: PedidoSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: PedidoInclude<ExtArgs> | null;
      /**
       * The data needed to create a Pedido.
       */
      data: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>;
    };

  /**
   * Pedido createMany
   */
  export type PedidoCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Pedidos.
     */
    data: PedidoCreateManyInput | PedidoCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Pedido createManyAndReturn
   */
  export type PedidoCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Pedidos.
     */
    data: PedidoCreateManyInput | PedidoCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Pedido update
   */
  export type PedidoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Pedido
       */
      select?: PedidoSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: PedidoInclude<ExtArgs> | null;
      /**
       * The data needed to update a Pedido.
       */
      data: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>;
      /**
       * Choose, which Pedido to update.
       */
      where: PedidoWhereUniqueInput;
    };

  /**
   * Pedido updateMany
   */
  export type PedidoUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyInput>;
    /**
     * Filter which Pedidos to update
     */
    where?: PedidoWhereInput;
  };

  /**
   * Pedido upsert
   */
  export type PedidoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Pedido
       */
      select?: PedidoSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: PedidoInclude<ExtArgs> | null;
      /**
       * The filter to search for the Pedido to update in case it exists.
       */
      where: PedidoWhereUniqueInput;
      /**
       * In case the Pedido found by the `where` argument doesn't exist, create a new Pedido with this data.
       */
      create: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>;
      /**
       * In case the Pedido was found with the provided `where` argument, update it with this data.
       */
      update: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>;
    };

  /**
   * Pedido delete
   */
  export type PedidoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Pedido
       */
      select?: PedidoSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: PedidoInclude<ExtArgs> | null;
      /**
       * Filter which Pedido to delete.
       */
      where: PedidoWhereUniqueInput;
    };

  /**
   * Pedido deleteMany
   */
  export type PedidoDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Pedidos to delete
     */
    where?: PedidoWhereInput;
  };

  /**
   * Pedido.itens
   */
  export type Pedido$itensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the PedidoItem
       */
      select?: PedidoItemSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: PedidoItemInclude<ExtArgs> | null;
      where?: PedidoItemWhereInput;
      orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[];
      cursor?: PedidoItemWhereUniqueInput;
      take?: number;
      skip?: number;
      distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[];
    };

  /**
   * Pedido.cupom
   */
  export type Pedido$cupomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Cupom
       */
      select?: CupomSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: CupomInclude<ExtArgs> | null;
      where?: CupomWhereInput;
    };

  /**
   * Pedido without action
   */
  export type PedidoDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null;
  };

  /**
   * Model PedidoItem
   */

  export type AggregatePedidoItem = {
    _count: PedidoItemCountAggregateOutputType | null;
    _avg: PedidoItemAvgAggregateOutputType | null;
    _sum: PedidoItemSumAggregateOutputType | null;
    _min: PedidoItemMinAggregateOutputType | null;
    _max: PedidoItemMaxAggregateOutputType | null;
  };

  export type PedidoItemAvgAggregateOutputType = {
    id: number | null;
    quantidade: number | null;
    preco: number | null;
    produtoId: number | null;
    pedidoId: number | null;
  };

  export type PedidoItemSumAggregateOutputType = {
    id: number | null;
    quantidade: number | null;
    preco: number | null;
    produtoId: number | null;
    pedidoId: number | null;
  };

  export type PedidoItemMinAggregateOutputType = {
    id: number | null;
    quantidade: number | null;
    preco: number | null;
    tamanho: string | null;
    produtoId: number | null;
    pedidoId: number | null;
  };

  export type PedidoItemMaxAggregateOutputType = {
    id: number | null;
    quantidade: number | null;
    preco: number | null;
    tamanho: string | null;
    produtoId: number | null;
    pedidoId: number | null;
  };

  export type PedidoItemCountAggregateOutputType = {
    id: number;
    quantidade: number;
    preco: number;
    tamanho: number;
    produtoId: number;
    pedidoId: number;
    _all: number;
  };

  export type PedidoItemAvgAggregateInputType = {
    id?: true;
    quantidade?: true;
    preco?: true;
    produtoId?: true;
    pedidoId?: true;
  };

  export type PedidoItemSumAggregateInputType = {
    id?: true;
    quantidade?: true;
    preco?: true;
    produtoId?: true;
    pedidoId?: true;
  };

  export type PedidoItemMinAggregateInputType = {
    id?: true;
    quantidade?: true;
    preco?: true;
    tamanho?: true;
    produtoId?: true;
    pedidoId?: true;
  };

  export type PedidoItemMaxAggregateInputType = {
    id?: true;
    quantidade?: true;
    preco?: true;
    tamanho?: true;
    produtoId?: true;
    pedidoId?: true;
  };

  export type PedidoItemCountAggregateInputType = {
    id?: true;
    quantidade?: true;
    preco?: true;
    tamanho?: true;
    produtoId?: true;
    pedidoId?: true;
    _all?: true;
  };

  export type PedidoItemAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which PedidoItem to aggregate.
     */
    where?: PedidoItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PedidoItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PedidoItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PedidoItems
     **/
    _count?: true | PedidoItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: PedidoItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: PedidoItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PedidoItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PedidoItemMaxAggregateInputType;
  };

  export type GetPedidoItemAggregateType<T extends PedidoItemAggregateArgs> = {
    [P in keyof T & keyof AggregatePedidoItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidoItem[P]>
      : GetScalarType<T[P], AggregatePedidoItem[P]>;
  };

  export type PedidoItemGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PedidoItemWhereInput;
    orderBy?: PedidoItemOrderByWithAggregationInput | PedidoItemOrderByWithAggregationInput[];
    by: PedidoItemScalarFieldEnum[] | PedidoItemScalarFieldEnum;
    having?: PedidoItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PedidoItemCountAggregateInputType | true;
    _avg?: PedidoItemAvgAggregateInputType;
    _sum?: PedidoItemSumAggregateInputType;
    _min?: PedidoItemMinAggregateInputType;
    _max?: PedidoItemMaxAggregateInputType;
  };

  export type PedidoItemGroupByOutputType = {
    id: number;
    quantidade: number;
    preco: number;
    tamanho: string;
    produtoId: number;
    pedidoId: number;
    _count: PedidoItemCountAggregateOutputType | null;
    _avg: PedidoItemAvgAggregateOutputType | null;
    _sum: PedidoItemSumAggregateOutputType | null;
    _min: PedidoItemMinAggregateOutputType | null;
    _max: PedidoItemMaxAggregateOutputType | null;
  };

  type GetPedidoItemGroupByPayload<T extends PedidoItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoItemGroupByOutputType, T['by']> & {
        [P in keyof T & keyof PedidoItemGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], PedidoItemGroupByOutputType[P]>
          : GetScalarType<T[P], PedidoItemGroupByOutputType[P]>;
      }
    >
  >;

  export type PedidoItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        quantidade?: boolean;
        preco?: boolean;
        tamanho?: boolean;
        produtoId?: boolean;
        pedidoId?: boolean;
        produto?: boolean | ProdutoDefaultArgs<ExtArgs>;
        pedido?: boolean | PedidoDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['pedidoItem']
    >;

  export type PedidoItemSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      quantidade?: boolean;
      preco?: boolean;
      tamanho?: boolean;
      produtoId?: boolean;
      pedidoId?: boolean;
      produto?: boolean | ProdutoDefaultArgs<ExtArgs>;
      pedido?: boolean | PedidoDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['pedidoItem']
  >;

  export type PedidoItemSelectScalar = {
    id?: boolean;
    quantidade?: boolean;
    preco?: boolean;
    tamanho?: boolean;
    produtoId?: boolean;
    pedidoId?: boolean;
  };

  export type PedidoItemInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>;
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>;
  };
  export type PedidoItemIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>;
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>;
  };

  export type $PedidoItemPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'PedidoItem';
    objects: {
      produto: Prisma.$ProdutoPayload<ExtArgs>;
      pedido: Prisma.$PedidoPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        quantidade: number;
        preco: number;
        tamanho: string;
        produtoId: number;
        pedidoId: number;
      },
      ExtArgs['result']['pedidoItem']
    >;
    composites: {};
  };

  type PedidoItemGetPayload<S extends boolean | null | undefined | PedidoItemDefaultArgs> =
    $Result.GetResult<Prisma.$PedidoItemPayload, S>;

  type PedidoItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidoItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PedidoItemCountAggregateInputType | true;
    };

  export interface PedidoItemDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['PedidoItem'];
      meta: { name: 'PedidoItem' };
    };
    /**
     * Find zero or one PedidoItem that matches the filter.
     * @param {PedidoItemFindUniqueArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoItemFindUniqueArgs>(
      args: SelectSubset<T, PedidoItemFindUniqueArgs<ExtArgs>>,
    ): Prisma__PedidoItemClient<
      $Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one PedidoItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidoItemFindUniqueOrThrowArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoItemFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PedidoItemFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__PedidoItemClient<
      $Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first PedidoItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindFirstArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoItemFindFirstArgs>(
      args?: SelectSubset<T, PedidoItemFindFirstArgs<ExtArgs>>,
    ): Prisma__PedidoItemClient<
      $Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first PedidoItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindFirstOrThrowArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PedidoItemFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__PedidoItemClient<
      $Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more PedidoItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PedidoItems
     * const pedidoItems = await prisma.pedidoItem.findMany()
     *
     * // Get first 10 PedidoItems
     * const pedidoItems = await prisma.pedidoItem.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const pedidoItemWithIdOnly = await prisma.pedidoItem.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PedidoItemFindManyArgs>(
      args?: SelectSubset<T, PedidoItemFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a PedidoItem.
     * @param {PedidoItemCreateArgs} args - Arguments to create a PedidoItem.
     * @example
     * // Create one PedidoItem
     * const PedidoItem = await prisma.pedidoItem.create({
     *   data: {
     *     // ... data to create a PedidoItem
     *   }
     * })
     *
     */
    create<T extends PedidoItemCreateArgs>(
      args: SelectSubset<T, PedidoItemCreateArgs<ExtArgs>>,
    ): Prisma__PedidoItemClient<
      $Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many PedidoItems.
     * @param {PedidoItemCreateManyArgs} args - Arguments to create many PedidoItems.
     * @example
     * // Create many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PedidoItemCreateManyArgs>(
      args?: SelectSubset<T, PedidoItemCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many PedidoItems and returns the data saved in the database.
     * @param {PedidoItemCreateManyAndReturnArgs} args - Arguments to create many PedidoItems.
     * @example
     * // Create many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PedidoItems and only return the `id`
     * const pedidoItemWithIdOnly = await prisma.pedidoItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PedidoItemCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PedidoItemCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a PedidoItem.
     * @param {PedidoItemDeleteArgs} args - Arguments to delete one PedidoItem.
     * @example
     * // Delete one PedidoItem
     * const PedidoItem = await prisma.pedidoItem.delete({
     *   where: {
     *     // ... filter to delete one PedidoItem
     *   }
     * })
     *
     */
    delete<T extends PedidoItemDeleteArgs>(
      args: SelectSubset<T, PedidoItemDeleteArgs<ExtArgs>>,
    ): Prisma__PedidoItemClient<
      $Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one PedidoItem.
     * @param {PedidoItemUpdateArgs} args - Arguments to update one PedidoItem.
     * @example
     * // Update one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PedidoItemUpdateArgs>(
      args: SelectSubset<T, PedidoItemUpdateArgs<ExtArgs>>,
    ): Prisma__PedidoItemClient<
      $Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more PedidoItems.
     * @param {PedidoItemDeleteManyArgs} args - Arguments to filter PedidoItems to delete.
     * @example
     * // Delete a few PedidoItems
     * const { count } = await prisma.pedidoItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PedidoItemDeleteManyArgs>(
      args?: SelectSubset<T, PedidoItemDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more PedidoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PedidoItemUpdateManyArgs>(
      args: SelectSubset<T, PedidoItemUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one PedidoItem.
     * @param {PedidoItemUpsertArgs} args - Arguments to update or create a PedidoItem.
     * @example
     * // Update or create a PedidoItem
     * const pedidoItem = await prisma.pedidoItem.upsert({
     *   create: {
     *     // ... data to create a PedidoItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PedidoItem we want to update
     *   }
     * })
     */
    upsert<T extends PedidoItemUpsertArgs>(
      args: SelectSubset<T, PedidoItemUpsertArgs<ExtArgs>>,
    ): Prisma__PedidoItemClient<
      $Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of PedidoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemCountArgs} args - Arguments to filter PedidoItems to count.
     * @example
     * // Count the number of PedidoItems
     * const count = await prisma.pedidoItem.count({
     *   where: {
     *     // ... the filter for the PedidoItems we want to count
     *   }
     * })
     **/
    count<T extends PedidoItemCountArgs>(
      args?: Subset<T, PedidoItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoItemCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a PedidoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PedidoItemAggregateArgs>(
      args: Subset<T, PedidoItemAggregateArgs>,
    ): Prisma.PrismaPromise<GetPedidoItemAggregateType<T>>;

    /**
     * Group by PedidoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PedidoItemGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoItemGroupByArgs['orderBy'] }
        : { orderBy?: PedidoItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, PedidoItemGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetPedidoItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PedidoItem model
     */
    readonly fields: PedidoItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PedidoItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoItemClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>,
    ): Prisma__ProdutoClient<
      $Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    pedido<T extends PedidoDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, PedidoDefaultArgs<ExtArgs>>,
    ): Prisma__PedidoClient<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the PedidoItem model
   */
  interface PedidoItemFieldRefs {
    readonly id: FieldRef<'PedidoItem', 'Int'>;
    readonly quantidade: FieldRef<'PedidoItem', 'Int'>;
    readonly preco: FieldRef<'PedidoItem', 'Float'>;
    readonly tamanho: FieldRef<'PedidoItem', 'String'>;
    readonly produtoId: FieldRef<'PedidoItem', 'Int'>;
    readonly pedidoId: FieldRef<'PedidoItem', 'Int'>;
  }

  // Custom InputTypes
  /**
   * PedidoItem findUnique
   */
  export type PedidoItemFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null;
    /**
     * Filter, which PedidoItem to fetch.
     */
    where: PedidoItemWhereUniqueInput;
  };

  /**
   * PedidoItem findUniqueOrThrow
   */
  export type PedidoItemFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null;
    /**
     * Filter, which PedidoItem to fetch.
     */
    where: PedidoItemWhereUniqueInput;
  };

  /**
   * PedidoItem findFirst
   */
  export type PedidoItemFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null;
    /**
     * Filter, which PedidoItem to fetch.
     */
    where?: PedidoItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PedidoItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PedidoItems.
     */
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[];
  };

  /**
   * PedidoItem findFirstOrThrow
   */
  export type PedidoItemFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null;
    /**
     * Filter, which PedidoItem to fetch.
     */
    where?: PedidoItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PedidoItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PedidoItems.
     */
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[];
  };

  /**
   * PedidoItem findMany
   */
  export type PedidoItemFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null;
    /**
     * Filter, which PedidoItems to fetch.
     */
    where?: PedidoItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PedidoItems.
     */
    skip?: number;
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[];
  };

  /**
   * PedidoItem create
   */
  export type PedidoItemCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null;
    /**
     * The data needed to create a PedidoItem.
     */
    data: XOR<PedidoItemCreateInput, PedidoItemUncheckedCreateInput>;
  };

  /**
   * PedidoItem createMany
   */
  export type PedidoItemCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many PedidoItems.
     */
    data: PedidoItemCreateManyInput | PedidoItemCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * PedidoItem createManyAndReturn
   */
  export type PedidoItemCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many PedidoItems.
     */
    data: PedidoItemCreateManyInput | PedidoItemCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * PedidoItem update
   */
  export type PedidoItemUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null;
    /**
     * The data needed to update a PedidoItem.
     */
    data: XOR<PedidoItemUpdateInput, PedidoItemUncheckedUpdateInput>;
    /**
     * Choose, which PedidoItem to update.
     */
    where: PedidoItemWhereUniqueInput;
  };

  /**
   * PedidoItem updateMany
   */
  export type PedidoItemUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update PedidoItems.
     */
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyInput>;
    /**
     * Filter which PedidoItems to update
     */
    where?: PedidoItemWhereInput;
  };

  /**
   * PedidoItem upsert
   */
  export type PedidoItemUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null;
    /**
     * The filter to search for the PedidoItem to update in case it exists.
     */
    where: PedidoItemWhereUniqueInput;
    /**
     * In case the PedidoItem found by the `where` argument doesn't exist, create a new PedidoItem with this data.
     */
    create: XOR<PedidoItemCreateInput, PedidoItemUncheckedCreateInput>;
    /**
     * In case the PedidoItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoItemUpdateInput, PedidoItemUncheckedUpdateInput>;
  };

  /**
   * PedidoItem delete
   */
  export type PedidoItemDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null;
    /**
     * Filter which PedidoItem to delete.
     */
    where: PedidoItemWhereUniqueInput;
  };

  /**
   * PedidoItem deleteMany
   */
  export type PedidoItemDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which PedidoItems to delete
     */
    where?: PedidoItemWhereInput;
  };

  /**
   * PedidoItem without action
   */
  export type PedidoItemDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null;
  };

  /**
   * Model Cupom
   */

  export type AggregateCupom = {
    _count: CupomCountAggregateOutputType | null;
    _avg: CupomAvgAggregateOutputType | null;
    _sum: CupomSumAggregateOutputType | null;
    _min: CupomMinAggregateOutputType | null;
    _max: CupomMaxAggregateOutputType | null;
  };

  export type CupomAvgAggregateOutputType = {
    id: number | null;
    desconto: number | null;
    valorMinimo: number | null;
  };

  export type CupomSumAggregateOutputType = {
    id: number | null;
    desconto: number | null;
    valorMinimo: number | null;
  };

  export type CupomMinAggregateOutputType = {
    id: number | null;
    codigo: string | null;
    desconto: number | null;
    tipo: string | null;
    valorMinimo: number | null;
    expiracao: Date | null;
    usado: boolean | null;
    ativo: boolean | null;
    criadoEm: Date | null;
    atualizadoEm: Date | null;
  };

  export type CupomMaxAggregateOutputType = {
    id: number | null;
    codigo: string | null;
    desconto: number | null;
    tipo: string | null;
    valorMinimo: number | null;
    expiracao: Date | null;
    usado: boolean | null;
    ativo: boolean | null;
    criadoEm: Date | null;
    atualizadoEm: Date | null;
  };

  export type CupomCountAggregateOutputType = {
    id: number;
    codigo: number;
    desconto: number;
    tipo: number;
    valorMinimo: number;
    expiracao: number;
    usado: number;
    ativo: number;
    criadoEm: number;
    atualizadoEm: number;
    _all: number;
  };

  export type CupomAvgAggregateInputType = {
    id?: true;
    desconto?: true;
    valorMinimo?: true;
  };

  export type CupomSumAggregateInputType = {
    id?: true;
    desconto?: true;
    valorMinimo?: true;
  };

  export type CupomMinAggregateInputType = {
    id?: true;
    codigo?: true;
    desconto?: true;
    tipo?: true;
    valorMinimo?: true;
    expiracao?: true;
    usado?: true;
    ativo?: true;
    criadoEm?: true;
    atualizadoEm?: true;
  };

  export type CupomMaxAggregateInputType = {
    id?: true;
    codigo?: true;
    desconto?: true;
    tipo?: true;
    valorMinimo?: true;
    expiracao?: true;
    usado?: true;
    ativo?: true;
    criadoEm?: true;
    atualizadoEm?: true;
  };

  export type CupomCountAggregateInputType = {
    id?: true;
    codigo?: true;
    desconto?: true;
    tipo?: true;
    valorMinimo?: true;
    expiracao?: true;
    usado?: true;
    ativo?: true;
    criadoEm?: true;
    atualizadoEm?: true;
    _all?: true;
  };

  export type CupomAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Cupom to aggregate.
     */
    where?: CupomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Cupoms to fetch.
     */
    orderBy?: CupomOrderByWithRelationInput | CupomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CupomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Cupoms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Cupoms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Cupoms
     **/
    _count?: true | CupomCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: CupomAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: CupomSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CupomMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CupomMaxAggregateInputType;
  };

  export type GetCupomAggregateType<T extends CupomAggregateArgs> = {
    [P in keyof T & keyof AggregateCupom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCupom[P]>
      : GetScalarType<T[P], AggregateCupom[P]>;
  };

  export type CupomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: CupomWhereInput;
      orderBy?: CupomOrderByWithAggregationInput | CupomOrderByWithAggregationInput[];
      by: CupomScalarFieldEnum[] | CupomScalarFieldEnum;
      having?: CupomScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: CupomCountAggregateInputType | true;
      _avg?: CupomAvgAggregateInputType;
      _sum?: CupomSumAggregateInputType;
      _min?: CupomMinAggregateInputType;
      _max?: CupomMaxAggregateInputType;
    };

  export type CupomGroupByOutputType = {
    id: number;
    codigo: string;
    desconto: number;
    tipo: string;
    valorMinimo: number | null;
    expiracao: Date;
    usado: boolean;
    ativo: boolean;
    criadoEm: Date;
    atualizadoEm: Date;
    _count: CupomCountAggregateOutputType | null;
    _avg: CupomAvgAggregateOutputType | null;
    _sum: CupomSumAggregateOutputType | null;
    _min: CupomMinAggregateOutputType | null;
    _max: CupomMaxAggregateOutputType | null;
  };

  type GetCupomGroupByPayload<T extends CupomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CupomGroupByOutputType, T['by']> & {
        [P in keyof T & keyof CupomGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], CupomGroupByOutputType[P]>
          : GetScalarType<T[P], CupomGroupByOutputType[P]>;
      }
    >
  >;

  export type CupomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        codigo?: boolean;
        desconto?: boolean;
        tipo?: boolean;
        valorMinimo?: boolean;
        expiracao?: boolean;
        usado?: boolean;
        ativo?: boolean;
        criadoEm?: boolean;
        atualizadoEm?: boolean;
        pedidos?: boolean | Cupom$pedidosArgs<ExtArgs>;
        _count?: boolean | CupomCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['cupom']
    >;

  export type CupomSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      codigo?: boolean;
      desconto?: boolean;
      tipo?: boolean;
      valorMinimo?: boolean;
      expiracao?: boolean;
      usado?: boolean;
      ativo?: boolean;
      criadoEm?: boolean;
      atualizadoEm?: boolean;
    },
    ExtArgs['result']['cupom']
  >;

  export type CupomSelectScalar = {
    id?: boolean;
    codigo?: boolean;
    desconto?: boolean;
    tipo?: boolean;
    valorMinimo?: boolean;
    expiracao?: boolean;
    usado?: boolean;
    ativo?: boolean;
    criadoEm?: boolean;
    atualizadoEm?: boolean;
  };

  export type CupomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | Cupom$pedidosArgs<ExtArgs>;
    _count?: boolean | CupomCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type CupomIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $CupomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Cupom';
    objects: {
      pedidos: Prisma.$PedidoPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        codigo: string;
        desconto: number;
        tipo: string;
        valorMinimo: number | null;
        expiracao: Date;
        usado: boolean;
        ativo: boolean;
        criadoEm: Date;
        atualizadoEm: Date;
      },
      ExtArgs['result']['cupom']
    >;
    composites: {};
  };

  type CupomGetPayload<S extends boolean | null | undefined | CupomDefaultArgs> = $Result.GetResult<
    Prisma.$CupomPayload,
    S
  >;

  type CupomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    CupomFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: CupomCountAggregateInputType | true;
  };

  export interface CupomDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cupom']; meta: { name: 'Cupom' } };
    /**
     * Find zero or one Cupom that matches the filter.
     * @param {CupomFindUniqueArgs} args - Arguments to find a Cupom
     * @example
     * // Get one Cupom
     * const cupom = await prisma.cupom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CupomFindUniqueArgs>(
      args: SelectSubset<T, CupomFindUniqueArgs<ExtArgs>>,
    ): Prisma__CupomClient<
      $Result.GetResult<Prisma.$CupomPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Cupom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CupomFindUniqueOrThrowArgs} args - Arguments to find a Cupom
     * @example
     * // Get one Cupom
     * const cupom = await prisma.cupom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CupomFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CupomFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__CupomClient<
      $Result.GetResult<Prisma.$CupomPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Cupom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CupomFindFirstArgs} args - Arguments to find a Cupom
     * @example
     * // Get one Cupom
     * const cupom = await prisma.cupom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CupomFindFirstArgs>(
      args?: SelectSubset<T, CupomFindFirstArgs<ExtArgs>>,
    ): Prisma__CupomClient<
      $Result.GetResult<Prisma.$CupomPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Cupom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CupomFindFirstOrThrowArgs} args - Arguments to find a Cupom
     * @example
     * // Get one Cupom
     * const cupom = await prisma.cupom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CupomFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CupomFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__CupomClient<
      $Result.GetResult<Prisma.$CupomPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Cupoms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CupomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cupoms
     * const cupoms = await prisma.cupom.findMany()
     *
     * // Get first 10 Cupoms
     * const cupoms = await prisma.cupom.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const cupomWithIdOnly = await prisma.cupom.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CupomFindManyArgs>(
      args?: SelectSubset<T, CupomFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CupomPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Cupom.
     * @param {CupomCreateArgs} args - Arguments to create a Cupom.
     * @example
     * // Create one Cupom
     * const Cupom = await prisma.cupom.create({
     *   data: {
     *     // ... data to create a Cupom
     *   }
     * })
     *
     */
    create<T extends CupomCreateArgs>(
      args: SelectSubset<T, CupomCreateArgs<ExtArgs>>,
    ): Prisma__CupomClient<
      $Result.GetResult<Prisma.$CupomPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Cupoms.
     * @param {CupomCreateManyArgs} args - Arguments to create many Cupoms.
     * @example
     * // Create many Cupoms
     * const cupom = await prisma.cupom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CupomCreateManyArgs>(
      args?: SelectSubset<T, CupomCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Cupoms and returns the data saved in the database.
     * @param {CupomCreateManyAndReturnArgs} args - Arguments to create many Cupoms.
     * @example
     * // Create many Cupoms
     * const cupom = await prisma.cupom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Cupoms and only return the `id`
     * const cupomWithIdOnly = await prisma.cupom.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CupomCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CupomCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CupomPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Cupom.
     * @param {CupomDeleteArgs} args - Arguments to delete one Cupom.
     * @example
     * // Delete one Cupom
     * const Cupom = await prisma.cupom.delete({
     *   where: {
     *     // ... filter to delete one Cupom
     *   }
     * })
     *
     */
    delete<T extends CupomDeleteArgs>(
      args: SelectSubset<T, CupomDeleteArgs<ExtArgs>>,
    ): Prisma__CupomClient<
      $Result.GetResult<Prisma.$CupomPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Cupom.
     * @param {CupomUpdateArgs} args - Arguments to update one Cupom.
     * @example
     * // Update one Cupom
     * const cupom = await prisma.cupom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CupomUpdateArgs>(
      args: SelectSubset<T, CupomUpdateArgs<ExtArgs>>,
    ): Prisma__CupomClient<
      $Result.GetResult<Prisma.$CupomPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Cupoms.
     * @param {CupomDeleteManyArgs} args - Arguments to filter Cupoms to delete.
     * @example
     * // Delete a few Cupoms
     * const { count } = await prisma.cupom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CupomDeleteManyArgs>(
      args?: SelectSubset<T, CupomDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Cupoms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CupomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cupoms
     * const cupom = await prisma.cupom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CupomUpdateManyArgs>(
      args: SelectSubset<T, CupomUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Cupom.
     * @param {CupomUpsertArgs} args - Arguments to update or create a Cupom.
     * @example
     * // Update or create a Cupom
     * const cupom = await prisma.cupom.upsert({
     *   create: {
     *     // ... data to create a Cupom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cupom we want to update
     *   }
     * })
     */
    upsert<T extends CupomUpsertArgs>(
      args: SelectSubset<T, CupomUpsertArgs<ExtArgs>>,
    ): Prisma__CupomClient<
      $Result.GetResult<Prisma.$CupomPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Cupoms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CupomCountArgs} args - Arguments to filter Cupoms to count.
     * @example
     * // Count the number of Cupoms
     * const count = await prisma.cupom.count({
     *   where: {
     *     // ... the filter for the Cupoms we want to count
     *   }
     * })
     **/
    count<T extends CupomCountArgs>(
      args?: Subset<T, CupomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CupomCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Cupom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CupomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CupomAggregateArgs>(
      args: Subset<T, CupomAggregateArgs>,
    ): Prisma.PrismaPromise<GetCupomAggregateType<T>>;

    /**
     * Group by Cupom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CupomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CupomGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CupomGroupByArgs['orderBy'] }
        : { orderBy?: CupomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, CupomGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetCupomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Cupom model
     */
    readonly fields: CupomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cupom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CupomClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    pedidos<T extends Cupom$pedidosArgs<ExtArgs> = {}>(
      args?: Subset<T, Cupom$pedidosArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Cupom model
   */
  interface CupomFieldRefs {
    readonly id: FieldRef<'Cupom', 'Int'>;
    readonly codigo: FieldRef<'Cupom', 'String'>;
    readonly desconto: FieldRef<'Cupom', 'Float'>;
    readonly tipo: FieldRef<'Cupom', 'String'>;
    readonly valorMinimo: FieldRef<'Cupom', 'Float'>;
    readonly expiracao: FieldRef<'Cupom', 'DateTime'>;
    readonly usado: FieldRef<'Cupom', 'Boolean'>;
    readonly ativo: FieldRef<'Cupom', 'Boolean'>;
    readonly criadoEm: FieldRef<'Cupom', 'DateTime'>;
    readonly atualizadoEm: FieldRef<'Cupom', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Cupom findUnique
   */
  export type CupomFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cupom
     */
    select?: CupomSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CupomInclude<ExtArgs> | null;
    /**
     * Filter, which Cupom to fetch.
     */
    where: CupomWhereUniqueInput;
  };

  /**
   * Cupom findUniqueOrThrow
   */
  export type CupomFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cupom
     */
    select?: CupomSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CupomInclude<ExtArgs> | null;
    /**
     * Filter, which Cupom to fetch.
     */
    where: CupomWhereUniqueInput;
  };

  /**
   * Cupom findFirst
   */
  export type CupomFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cupom
     */
    select?: CupomSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CupomInclude<ExtArgs> | null;
    /**
     * Filter, which Cupom to fetch.
     */
    where?: CupomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Cupoms to fetch.
     */
    orderBy?: CupomOrderByWithRelationInput | CupomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Cupoms.
     */
    cursor?: CupomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Cupoms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Cupoms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Cupoms.
     */
    distinct?: CupomScalarFieldEnum | CupomScalarFieldEnum[];
  };

  /**
   * Cupom findFirstOrThrow
   */
  export type CupomFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cupom
     */
    select?: CupomSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CupomInclude<ExtArgs> | null;
    /**
     * Filter, which Cupom to fetch.
     */
    where?: CupomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Cupoms to fetch.
     */
    orderBy?: CupomOrderByWithRelationInput | CupomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Cupoms.
     */
    cursor?: CupomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Cupoms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Cupoms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Cupoms.
     */
    distinct?: CupomScalarFieldEnum | CupomScalarFieldEnum[];
  };

  /**
   * Cupom findMany
   */
  export type CupomFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cupom
     */
    select?: CupomSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CupomInclude<ExtArgs> | null;
    /**
     * Filter, which Cupoms to fetch.
     */
    where?: CupomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Cupoms to fetch.
     */
    orderBy?: CupomOrderByWithRelationInput | CupomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Cupoms.
     */
    cursor?: CupomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Cupoms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Cupoms.
     */
    skip?: number;
    distinct?: CupomScalarFieldEnum | CupomScalarFieldEnum[];
  };

  /**
   * Cupom create
   */
  export type CupomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Cupom
       */
      select?: CupomSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: CupomInclude<ExtArgs> | null;
      /**
       * The data needed to create a Cupom.
       */
      data: XOR<CupomCreateInput, CupomUncheckedCreateInput>;
    };

  /**
   * Cupom createMany
   */
  export type CupomCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Cupoms.
     */
    data: CupomCreateManyInput | CupomCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Cupom createManyAndReturn
   */
  export type CupomCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cupom
     */
    select?: CupomSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Cupoms.
     */
    data: CupomCreateManyInput | CupomCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Cupom update
   */
  export type CupomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Cupom
       */
      select?: CupomSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: CupomInclude<ExtArgs> | null;
      /**
       * The data needed to update a Cupom.
       */
      data: XOR<CupomUpdateInput, CupomUncheckedUpdateInput>;
      /**
       * Choose, which Cupom to update.
       */
      where: CupomWhereUniqueInput;
    };

  /**
   * Cupom updateMany
   */
  export type CupomUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Cupoms.
     */
    data: XOR<CupomUpdateManyMutationInput, CupomUncheckedUpdateManyInput>;
    /**
     * Filter which Cupoms to update
     */
    where?: CupomWhereInput;
  };

  /**
   * Cupom upsert
   */
  export type CupomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Cupom
       */
      select?: CupomSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: CupomInclude<ExtArgs> | null;
      /**
       * The filter to search for the Cupom to update in case it exists.
       */
      where: CupomWhereUniqueInput;
      /**
       * In case the Cupom found by the `where` argument doesn't exist, create a new Cupom with this data.
       */
      create: XOR<CupomCreateInput, CupomUncheckedCreateInput>;
      /**
       * In case the Cupom was found with the provided `where` argument, update it with this data.
       */
      update: XOR<CupomUpdateInput, CupomUncheckedUpdateInput>;
    };

  /**
   * Cupom delete
   */
  export type CupomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Cupom
       */
      select?: CupomSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: CupomInclude<ExtArgs> | null;
      /**
       * Filter which Cupom to delete.
       */
      where: CupomWhereUniqueInput;
    };

  /**
   * Cupom deleteMany
   */
  export type CupomDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Cupoms to delete
     */
    where?: CupomWhereInput;
  };

  /**
   * Cupom.pedidos
   */
  export type Cupom$pedidosArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null;
    where?: PedidoWhereInput;
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[];
    cursor?: PedidoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[];
  };

  /**
   * Cupom without action
   */
  export type CupomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Cupom
       */
      select?: CupomSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: CupomInclude<ExtArgs> | null;
    };

  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null;
    _avg: RefreshTokenAvgAggregateOutputType | null;
    _sum: RefreshTokenSumAggregateOutputType | null;
    _min: RefreshTokenMinAggregateOutputType | null;
    _max: RefreshTokenMaxAggregateOutputType | null;
  };

  export type RefreshTokenAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
  };

  export type RefreshTokenSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
  };

  export type RefreshTokenMinAggregateOutputType = {
    id: number | null;
    token: string | null;
    expiresAt: Date | null;
    userId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RefreshTokenMaxAggregateOutputType = {
    id: number | null;
    token: string | null;
    expiresAt: Date | null;
    userId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RefreshTokenCountAggregateOutputType = {
    id: number;
    token: number;
    expiresAt: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type RefreshTokenAvgAggregateInputType = {
    id?: true;
    userId?: true;
  };

  export type RefreshTokenSumAggregateInputType = {
    id?: true;
    userId?: true;
  };

  export type RefreshTokenMinAggregateInputType = {
    id?: true;
    token?: true;
    expiresAt?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RefreshTokenMaxAggregateInputType = {
    id?: true;
    token?: true;
    expiresAt?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RefreshTokenCountAggregateInputType = {
    id?: true;
    token?: true;
    expiresAt?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type RefreshTokenAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RefreshTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RefreshTokens
     **/
    _count?: true | RefreshTokenCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: RefreshTokenAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: RefreshTokenSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RefreshTokenMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RefreshTokenMaxAggregateInputType;
  };

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
    [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>;
  };

  export type RefreshTokenGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RefreshTokenWhereInput;
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[];
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum;
    having?: RefreshTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RefreshTokenCountAggregateInputType | true;
    _avg?: RefreshTokenAvgAggregateInputType;
    _sum?: RefreshTokenSumAggregateInputType;
    _min?: RefreshTokenMinAggregateInputType;
    _max?: RefreshTokenMaxAggregateInputType;
  };

  export type RefreshTokenGroupByOutputType = {
    id: number;
    token: string;
    expiresAt: Date;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    _count: RefreshTokenCountAggregateOutputType | null;
    _avg: RefreshTokenAvgAggregateOutputType | null;
    _sum: RefreshTokenSumAggregateOutputType | null;
    _min: RefreshTokenMinAggregateOutputType | null;
    _max: RefreshTokenMaxAggregateOutputType | null;
  };

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> & {
        [P in keyof T & keyof RefreshTokenGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
          : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>;
      }
    >
  >;

  export type RefreshTokenSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      token?: boolean;
      expiresAt?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['refreshToken']
  >;

  export type RefreshTokenSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      token?: boolean;
      expiresAt?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['refreshToken']
  >;

  export type RefreshTokenSelectScalar = {
    id?: boolean;
    token?: boolean;
    expiresAt?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type RefreshTokenInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
  };
  export type RefreshTokenIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
  };

  export type $RefreshTokenPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'RefreshToken';
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        token: string;
        expiresAt: Date;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['refreshToken']
    >;
    composites: {};
  };

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> =
    $Result.GetResult<Prisma.$RefreshTokenPayload, S>;

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RefreshTokenCountAggregateInputType | true;
    };

  export interface RefreshTokenDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'];
      meta: { name: 'RefreshToken' };
    };
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(
      args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>,
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(
      args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>,
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     *
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RefreshTokenFindManyArgs>(
      args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     *
     */
    create<T extends RefreshTokenCreateArgs>(
      args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>,
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RefreshTokenCreateManyArgs>(
      args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     *
     */
    delete<T extends RefreshTokenDeleteArgs>(
      args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>,
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RefreshTokenUpdateArgs>(
      args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>,
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(
      args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(
      args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(
      args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>,
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
     **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends RefreshTokenAggregateArgs>(
      args: Subset<T, RefreshTokenAggregateArgs>,
    ): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>;

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetRefreshTokenGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RefreshToken model
     */
    readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<'RefreshToken', 'Int'>;
    readonly token: FieldRef<'RefreshToken', 'String'>;
    readonly expiresAt: FieldRef<'RefreshToken', 'DateTime'>;
    readonly userId: FieldRef<'RefreshToken', 'Int'>;
    readonly createdAt: FieldRef<'RefreshToken', 'DateTime'>;
    readonly updatedAt: FieldRef<'RefreshToken', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput;
  };

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput;
  };

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RefreshTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[];
  };

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RefreshTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[];
  };

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RefreshTokens.
     */
    skip?: number;
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[];
  };

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>;
  };

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>;
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput;
  };

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>;
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput;
  };

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput;
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>;
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>;
  };

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput;
  };

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput;
  };

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
  };

  /**
   * Model WebhookLog
   */

  export type AggregateWebhookLog = {
    _count: WebhookLogCountAggregateOutputType | null;
    _min: WebhookLogMinAggregateOutputType | null;
    _max: WebhookLogMaxAggregateOutputType | null;
  };

  export type WebhookLogMinAggregateOutputType = {
    id: string | null;
    paymentId: string | null;
    processedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type WebhookLogMaxAggregateOutputType = {
    id: string | null;
    paymentId: string | null;
    processedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type WebhookLogCountAggregateOutputType = {
    id: number;
    paymentId: number;
    processedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type WebhookLogMinAggregateInputType = {
    id?: true;
    paymentId?: true;
    processedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type WebhookLogMaxAggregateInputType = {
    id?: true;
    paymentId?: true;
    processedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type WebhookLogCountAggregateInputType = {
    id?: true;
    paymentId?: true;
    processedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type WebhookLogAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which WebhookLog to aggregate.
     */
    where?: WebhookLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: WebhookLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WebhookLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned WebhookLogs
     **/
    _count?: true | WebhookLogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: WebhookLogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: WebhookLogMaxAggregateInputType;
  };

  export type GetWebhookLogAggregateType<T extends WebhookLogAggregateArgs> = {
    [P in keyof T & keyof AggregateWebhookLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookLog[P]>
      : GetScalarType<T[P], AggregateWebhookLog[P]>;
  };

  export type WebhookLogGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WebhookLogWhereInput;
    orderBy?: WebhookLogOrderByWithAggregationInput | WebhookLogOrderByWithAggregationInput[];
    by: WebhookLogScalarFieldEnum[] | WebhookLogScalarFieldEnum;
    having?: WebhookLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WebhookLogCountAggregateInputType | true;
    _min?: WebhookLogMinAggregateInputType;
    _max?: WebhookLogMaxAggregateInputType;
  };

  export type WebhookLogGroupByOutputType = {
    id: string;
    paymentId: string;
    processedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: WebhookLogCountAggregateOutputType | null;
    _min: WebhookLogMinAggregateOutputType | null;
    _max: WebhookLogMaxAggregateOutputType | null;
  };

  type GetWebhookLogGroupByPayload<T extends WebhookLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookLogGroupByOutputType, T['by']> & {
        [P in keyof T & keyof WebhookLogGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], WebhookLogGroupByOutputType[P]>
          : GetScalarType<T[P], WebhookLogGroupByOutputType[P]>;
      }
    >
  >;

  export type WebhookLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        paymentId?: boolean;
        processedAt?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
      },
      ExtArgs['result']['webhookLog']
    >;

  export type WebhookLogSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      paymentId?: boolean;
      processedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['webhookLog']
  >;

  export type WebhookLogSelectScalar = {
    id?: boolean;
    paymentId?: boolean;
    processedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type $WebhookLogPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'WebhookLog';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        paymentId: string;
        processedAt: Date;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['webhookLog']
    >;
    composites: {};
  };

  type WebhookLogGetPayload<S extends boolean | null | undefined | WebhookLogDefaultArgs> =
    $Result.GetResult<Prisma.$WebhookLogPayload, S>;

  type WebhookLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WebhookLogCountAggregateInputType | true;
    };

  export interface WebhookLogDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['WebhookLog'];
      meta: { name: 'WebhookLog' };
    };
    /**
     * Find zero or one WebhookLog that matches the filter.
     * @param {WebhookLogFindUniqueArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookLogFindUniqueArgs>(
      args: SelectSubset<T, WebhookLogFindUniqueArgs<ExtArgs>>,
    ): Prisma__WebhookLogClient<
      $Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one WebhookLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookLogFindUniqueOrThrowArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookLogFindUniqueOrThrowArgs>(
      args: SelectSubset<T, WebhookLogFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__WebhookLogClient<
      $Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first WebhookLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindFirstArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookLogFindFirstArgs>(
      args?: SelectSubset<T, WebhookLogFindFirstArgs<ExtArgs>>,
    ): Prisma__WebhookLogClient<
      $Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first WebhookLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindFirstOrThrowArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookLogFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WebhookLogFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__WebhookLogClient<
      $Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more WebhookLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookLogs
     * const webhookLogs = await prisma.webhookLog.findMany()
     *
     * // Get first 10 WebhookLogs
     * const webhookLogs = await prisma.webhookLog.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const webhookLogWithIdOnly = await prisma.webhookLog.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WebhookLogFindManyArgs>(
      args?: SelectSubset<T, WebhookLogFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a WebhookLog.
     * @param {WebhookLogCreateArgs} args - Arguments to create a WebhookLog.
     * @example
     * // Create one WebhookLog
     * const WebhookLog = await prisma.webhookLog.create({
     *   data: {
     *     // ... data to create a WebhookLog
     *   }
     * })
     *
     */
    create<T extends WebhookLogCreateArgs>(
      args: SelectSubset<T, WebhookLogCreateArgs<ExtArgs>>,
    ): Prisma__WebhookLogClient<
      $Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many WebhookLogs.
     * @param {WebhookLogCreateManyArgs} args - Arguments to create many WebhookLogs.
     * @example
     * // Create many WebhookLogs
     * const webhookLog = await prisma.webhookLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WebhookLogCreateManyArgs>(
      args?: SelectSubset<T, WebhookLogCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many WebhookLogs and returns the data saved in the database.
     * @param {WebhookLogCreateManyAndReturnArgs} args - Arguments to create many WebhookLogs.
     * @example
     * // Create many WebhookLogs
     * const webhookLog = await prisma.webhookLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many WebhookLogs and only return the `id`
     * const webhookLogWithIdOnly = await prisma.webhookLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WebhookLogCreateManyAndReturnArgs>(
      args?: SelectSubset<T, WebhookLogCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a WebhookLog.
     * @param {WebhookLogDeleteArgs} args - Arguments to delete one WebhookLog.
     * @example
     * // Delete one WebhookLog
     * const WebhookLog = await prisma.webhookLog.delete({
     *   where: {
     *     // ... filter to delete one WebhookLog
     *   }
     * })
     *
     */
    delete<T extends WebhookLogDeleteArgs>(
      args: SelectSubset<T, WebhookLogDeleteArgs<ExtArgs>>,
    ): Prisma__WebhookLogClient<
      $Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one WebhookLog.
     * @param {WebhookLogUpdateArgs} args - Arguments to update one WebhookLog.
     * @example
     * // Update one WebhookLog
     * const webhookLog = await prisma.webhookLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WebhookLogUpdateArgs>(
      args: SelectSubset<T, WebhookLogUpdateArgs<ExtArgs>>,
    ): Prisma__WebhookLogClient<
      $Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more WebhookLogs.
     * @param {WebhookLogDeleteManyArgs} args - Arguments to filter WebhookLogs to delete.
     * @example
     * // Delete a few WebhookLogs
     * const { count } = await prisma.webhookLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WebhookLogDeleteManyArgs>(
      args?: SelectSubset<T, WebhookLogDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more WebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookLogs
     * const webhookLog = await prisma.webhookLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WebhookLogUpdateManyArgs>(
      args: SelectSubset<T, WebhookLogUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one WebhookLog.
     * @param {WebhookLogUpsertArgs} args - Arguments to update or create a WebhookLog.
     * @example
     * // Update or create a WebhookLog
     * const webhookLog = await prisma.webhookLog.upsert({
     *   create: {
     *     // ... data to create a WebhookLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookLog we want to update
     *   }
     * })
     */
    upsert<T extends WebhookLogUpsertArgs>(
      args: SelectSubset<T, WebhookLogUpsertArgs<ExtArgs>>,
    ): Prisma__WebhookLogClient<
      $Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of WebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogCountArgs} args - Arguments to filter WebhookLogs to count.
     * @example
     * // Count the number of WebhookLogs
     * const count = await prisma.webhookLog.count({
     *   where: {
     *     // ... the filter for the WebhookLogs we want to count
     *   }
     * })
     **/
    count<T extends WebhookLogCountArgs>(
      args?: Subset<T, WebhookLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookLogCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a WebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends WebhookLogAggregateArgs>(
      args: Subset<T, WebhookLogAggregateArgs>,
    ): Prisma.PrismaPromise<GetWebhookLogAggregateType<T>>;

    /**
     * Group by WebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends WebhookLogGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookLogGroupByArgs['orderBy'] }
        : { orderBy?: WebhookLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, WebhookLogGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetWebhookLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the WebhookLog model
     */
    readonly fields: WebhookLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookLogClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the WebhookLog model
   */
  interface WebhookLogFieldRefs {
    readonly id: FieldRef<'WebhookLog', 'String'>;
    readonly paymentId: FieldRef<'WebhookLog', 'String'>;
    readonly processedAt: FieldRef<'WebhookLog', 'DateTime'>;
    readonly createdAt: FieldRef<'WebhookLog', 'DateTime'>;
    readonly updatedAt: FieldRef<'WebhookLog', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * WebhookLog findUnique
   */
  export type WebhookLogFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null;
    /**
     * Filter, which WebhookLog to fetch.
     */
    where: WebhookLogWhereUniqueInput;
  };

  /**
   * WebhookLog findUniqueOrThrow
   */
  export type WebhookLogFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null;
    /**
     * Filter, which WebhookLog to fetch.
     */
    where: WebhookLogWhereUniqueInput;
  };

  /**
   * WebhookLog findFirst
   */
  export type WebhookLogFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null;
    /**
     * Filter, which WebhookLog to fetch.
     */
    where?: WebhookLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WebhookLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WebhookLogs.
     */
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[];
  };

  /**
   * WebhookLog findFirstOrThrow
   */
  export type WebhookLogFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null;
    /**
     * Filter, which WebhookLog to fetch.
     */
    where?: WebhookLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WebhookLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WebhookLogs.
     */
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[];
  };

  /**
   * WebhookLog findMany
   */
  export type WebhookLogFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null;
    /**
     * Filter, which WebhookLogs to fetch.
     */
    where?: WebhookLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WebhookLogs.
     */
    skip?: number;
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[];
  };

  /**
   * WebhookLog create
   */
  export type WebhookLogCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null;
    /**
     * The data needed to create a WebhookLog.
     */
    data: XOR<WebhookLogCreateInput, WebhookLogUncheckedCreateInput>;
  };

  /**
   * WebhookLog createMany
   */
  export type WebhookLogCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many WebhookLogs.
     */
    data: WebhookLogCreateManyInput | WebhookLogCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * WebhookLog createManyAndReturn
   */
  export type WebhookLogCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many WebhookLogs.
     */
    data: WebhookLogCreateManyInput | WebhookLogCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * WebhookLog update
   */
  export type WebhookLogUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null;
    /**
     * The data needed to update a WebhookLog.
     */
    data: XOR<WebhookLogUpdateInput, WebhookLogUncheckedUpdateInput>;
    /**
     * Choose, which WebhookLog to update.
     */
    where: WebhookLogWhereUniqueInput;
  };

  /**
   * WebhookLog updateMany
   */
  export type WebhookLogUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update WebhookLogs.
     */
    data: XOR<WebhookLogUpdateManyMutationInput, WebhookLogUncheckedUpdateManyInput>;
    /**
     * Filter which WebhookLogs to update
     */
    where?: WebhookLogWhereInput;
  };

  /**
   * WebhookLog upsert
   */
  export type WebhookLogUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null;
    /**
     * The filter to search for the WebhookLog to update in case it exists.
     */
    where: WebhookLogWhereUniqueInput;
    /**
     * In case the WebhookLog found by the `where` argument doesn't exist, create a new WebhookLog with this data.
     */
    create: XOR<WebhookLogCreateInput, WebhookLogUncheckedCreateInput>;
    /**
     * In case the WebhookLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookLogUpdateInput, WebhookLogUncheckedUpdateInput>;
  };

  /**
   * WebhookLog delete
   */
  export type WebhookLogDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null;
    /**
     * Filter which WebhookLog to delete.
     */
    where: WebhookLogWhereUniqueInput;
  };

  /**
   * WebhookLog deleteMany
   */
  export type WebhookLogDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which WebhookLogs to delete
     */
    where?: WebhookLogWhereInput;
  };

  /**
   * WebhookLog without action
   */
  export type WebhookLogDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null;
  };

  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
  };

  export type PaymentAvgAggregateOutputType = {
    amount: number | null;
    installments: number | null;
  };

  export type PaymentSumAggregateOutputType = {
    amount: number | null;
    installments: number | null;
  };

  export type PaymentMinAggregateOutputType = {
    id: string | null;
    paymentId: string | null;
    externalReference: string | null;
    status: string | null;
    paymentType: string | null;
    paymentMethod: string | null;
    amount: number | null;
    currency: string | null;
    payerEmail: string | null;
    payerName: string | null;
    payerDocument: string | null;
    installments: number | null;
    processedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PaymentMaxAggregateOutputType = {
    id: string | null;
    paymentId: string | null;
    externalReference: string | null;
    status: string | null;
    paymentType: string | null;
    paymentMethod: string | null;
    amount: number | null;
    currency: string | null;
    payerEmail: string | null;
    payerName: string | null;
    payerDocument: string | null;
    installments: number | null;
    processedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PaymentCountAggregateOutputType = {
    id: number;
    paymentId: number;
    externalReference: number;
    status: number;
    paymentType: number;
    paymentMethod: number;
    amount: number;
    currency: number;
    payerEmail: number;
    payerName: number;
    payerDocument: number;
    installments: number;
    processedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type PaymentAvgAggregateInputType = {
    amount?: true;
    installments?: true;
  };

  export type PaymentSumAggregateInputType = {
    amount?: true;
    installments?: true;
  };

  export type PaymentMinAggregateInputType = {
    id?: true;
    paymentId?: true;
    externalReference?: true;
    status?: true;
    paymentType?: true;
    paymentMethod?: true;
    amount?: true;
    currency?: true;
    payerEmail?: true;
    payerName?: true;
    payerDocument?: true;
    installments?: true;
    processedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PaymentMaxAggregateInputType = {
    id?: true;
    paymentId?: true;
    externalReference?: true;
    status?: true;
    paymentType?: true;
    paymentMethod?: true;
    amount?: true;
    currency?: true;
    payerEmail?: true;
    payerName?: true;
    payerDocument?: true;
    installments?: true;
    processedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PaymentCountAggregateInputType = {
    id?: true;
    paymentId?: true;
    externalReference?: true;
    status?: true;
    paymentType?: true;
    paymentMethod?: true;
    amount?: true;
    currency?: true;
    payerEmail?: true;
    payerName?: true;
    payerDocument?: true;
    installments?: true;
    processedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type PaymentAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Payments
     **/
    _count?: true | PaymentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: PaymentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: PaymentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PaymentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PaymentMaxAggregateInputType;
  };

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
    [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>;
  };

  export type PaymentGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PaymentWhereInput;
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[];
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum;
    having?: PaymentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaymentCountAggregateInputType | true;
    _avg?: PaymentAvgAggregateInputType;
    _sum?: PaymentSumAggregateInputType;
    _min?: PaymentMinAggregateInputType;
    _max?: PaymentMaxAggregateInputType;
  };

  export type PaymentGroupByOutputType = {
    id: string;
    paymentId: string;
    externalReference: string | null;
    status: string;
    paymentType: string;
    paymentMethod: string | null;
    amount: number;
    currency: string;
    payerEmail: string | null;
    payerName: string | null;
    payerDocument: string | null;
    installments: number | null;
    processedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
  };

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> & {
        [P in keyof T & keyof PaymentGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
          : GetScalarType<T[P], PaymentGroupByOutputType[P]>;
      }
    >
  >;

  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        paymentId?: boolean;
        externalReference?: boolean;
        status?: boolean;
        paymentType?: boolean;
        paymentMethod?: boolean;
        amount?: boolean;
        currency?: boolean;
        payerEmail?: boolean;
        payerName?: boolean;
        payerDocument?: boolean;
        installments?: boolean;
        processedAt?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
      },
      ExtArgs['result']['payment']
    >;

  export type PaymentSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      paymentId?: boolean;
      externalReference?: boolean;
      status?: boolean;
      paymentType?: boolean;
      paymentMethod?: boolean;
      amount?: boolean;
      currency?: boolean;
      payerEmail?: boolean;
      payerName?: boolean;
      payerDocument?: boolean;
      installments?: boolean;
      processedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['payment']
  >;

  export type PaymentSelectScalar = {
    id?: boolean;
    paymentId?: boolean;
    externalReference?: boolean;
    status?: boolean;
    paymentType?: boolean;
    paymentMethod?: boolean;
    amount?: boolean;
    currency?: boolean;
    payerEmail?: boolean;
    payerName?: boolean;
    payerDocument?: boolean;
    installments?: boolean;
    processedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Payment';
      objects: {};
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          paymentId: string;
          externalReference: string | null;
          status: string;
          paymentType: string;
          paymentMethod: string | null;
          amount: number;
          currency: string;
          payerEmail: string | null;
          payerName: string | null;
          payerDocument: string | null;
          installments: number | null;
          processedAt: Date;
          createdAt: Date;
          updatedAt: Date;
        },
        ExtArgs['result']['payment']
      >;
      composites: {};
    };

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> =
    $Result.GetResult<Prisma.$PaymentPayload, S>;

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    PaymentFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: PaymentCountAggregateInputType | true;
  };

  export interface PaymentDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment']; meta: { name: 'Payment' } };
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(
      args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(
      args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     *
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PaymentFindManyArgs>(
      args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     *
     */
    create<T extends PaymentCreateArgs>(
      args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PaymentCreateManyArgs>(
      args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     *
     */
    delete<T extends PaymentDeleteArgs>(
      args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PaymentUpdateArgs>(
      args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PaymentDeleteManyArgs>(
      args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PaymentUpdateManyArgs>(
      args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(
      args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
     **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PaymentAggregateArgs>(
      args: Subset<T, PaymentAggregateArgs>,
    ): Prisma.PrismaPromise<GetPaymentAggregateType<T>>;

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Payment model
     */
    readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<'Payment', 'String'>;
    readonly paymentId: FieldRef<'Payment', 'String'>;
    readonly externalReference: FieldRef<'Payment', 'String'>;
    readonly status: FieldRef<'Payment', 'String'>;
    readonly paymentType: FieldRef<'Payment', 'String'>;
    readonly paymentMethod: FieldRef<'Payment', 'String'>;
    readonly amount: FieldRef<'Payment', 'Float'>;
    readonly currency: FieldRef<'Payment', 'String'>;
    readonly payerEmail: FieldRef<'Payment', 'String'>;
    readonly payerName: FieldRef<'Payment', 'String'>;
    readonly payerDocument: FieldRef<'Payment', 'String'>;
    readonly installments: FieldRef<'Payment', 'Int'>;
    readonly processedAt: FieldRef<'Payment', 'DateTime'>;
    readonly createdAt: FieldRef<'Payment', 'DateTime'>;
    readonly updatedAt: FieldRef<'Payment', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[];
  };

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[];
  };

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[];
  };

  /**
   * Payment create
   */
  export type PaymentCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>;
  };

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>;
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>;
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput;
  };

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput;
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>;
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>;
  };

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput;
  };

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
  };

  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
  };

  export type AuditLogMinAggregateOutputType = {
    id: string | null;
    action: string | null;
    userId: string | null;
    entityId: string | null;
    entityType: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date | null;
  };

  export type AuditLogMaxAggregateOutputType = {
    id: string | null;
    action: string | null;
    userId: string | null;
    entityId: string | null;
    entityType: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date | null;
  };

  export type AuditLogCountAggregateOutputType = {
    id: number;
    action: number;
    userId: number;
    entityId: number;
    entityType: number;
    details: number;
    ipAddress: number;
    userAgent: number;
    createdAt: number;
    _all: number;
  };

  export type AuditLogMinAggregateInputType = {
    id?: true;
    action?: true;
    userId?: true;
    entityId?: true;
    entityType?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
  };

  export type AuditLogMaxAggregateInputType = {
    id?: true;
    action?: true;
    userId?: true;
    entityId?: true;
    entityType?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
  };

  export type AuditLogCountAggregateInputType = {
    id?: true;
    action?: true;
    userId?: true;
    entityId?: true;
    entityType?: true;
    details?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
    _all?: true;
  };

  export type AuditLogAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AuditLogs
     **/
    _count?: true | AuditLogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AuditLogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AuditLogMaxAggregateInputType;
  };

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>;
  };

  export type AuditLogGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AuditLogWhereInput;
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[];
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum;
    having?: AuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuditLogCountAggregateInputType | true;
    _min?: AuditLogMinAggregateInputType;
    _max?: AuditLogMaxAggregateInputType;
  };

  export type AuditLogGroupByOutputType = {
    id: string;
    action: string;
    userId: string | null;
    entityId: string | null;
    entityType: string | null;
    details: JsonValue;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date;
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
  };

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> & {
        [P in keyof T & keyof AuditLogGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
          : GetScalarType<T[P], AuditLogGroupByOutputType[P]>;
      }
    >
  >;

  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        action?: boolean;
        userId?: boolean;
        entityId?: boolean;
        entityType?: boolean;
        details?: boolean;
        ipAddress?: boolean;
        userAgent?: boolean;
        createdAt?: boolean;
      },
      ExtArgs['result']['auditLog']
    >;

  export type AuditLogSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      action?: boolean;
      userId?: boolean;
      entityId?: boolean;
      entityType?: boolean;
      details?: boolean;
      ipAddress?: boolean;
      userAgent?: boolean;
      createdAt?: boolean;
    },
    ExtArgs['result']['auditLog']
  >;

  export type AuditLogSelectScalar = {
    id?: boolean;
    action?: boolean;
    userId?: boolean;
    entityId?: boolean;
    entityType?: boolean;
    details?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
  };

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'AuditLog';
      objects: {};
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          action: string;
          userId: string | null;
          entityId: string | null;
          entityType: string | null;
          details: Prisma.JsonValue;
          ipAddress: string | null;
          userAgent: string | null;
          createdAt: Date;
        },
        ExtArgs['result']['auditLog']
      >;
      composites: {};
    };

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> =
    $Result.GetResult<Prisma.$AuditLogPayload, S>;

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    AuditLogFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: AuditLogCountAggregateInputType | true;
  };

  export interface AuditLogDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'];
      meta: { name: 'AuditLog' };
    };
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(
      args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>,
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(
      args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>,
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     *
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AuditLogFindManyArgs>(
      args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     *
     */
    create<T extends AuditLogCreateArgs>(
      args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>,
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AuditLogCreateManyArgs>(
      args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     *
     */
    delete<T extends AuditLogDeleteArgs>(
      args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>,
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AuditLogUpdateArgs>(
      args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>,
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(
      args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AuditLogUpdateManyArgs>(
      args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(
      args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>,
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
     **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AuditLogAggregateArgs>(
      args: Subset<T, AuditLogAggregateArgs>,
    ): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>;

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AuditLog model
     */
    readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<'AuditLog', 'String'>;
    readonly action: FieldRef<'AuditLog', 'String'>;
    readonly userId: FieldRef<'AuditLog', 'String'>;
    readonly entityId: FieldRef<'AuditLog', 'String'>;
    readonly entityType: FieldRef<'AuditLog', 'String'>;
    readonly details: FieldRef<'AuditLog', 'Json'>;
    readonly ipAddress: FieldRef<'AuditLog', 'String'>;
    readonly userAgent: FieldRef<'AuditLog', 'String'>;
    readonly createdAt: FieldRef<'AuditLog', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput;
  };

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput;
  };

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[];
  };

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[];
  };

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[];
  };

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>;
  };

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>;
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput;
  };

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>;
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput;
  };

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput;
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>;
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>;
  };

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput;
  };

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput;
  };

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: 'id';
    name: 'name';
    email: 'email';
    password: 'password';
    role: 'role';
    twoFactorSecret: 'twoFactorSecret';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const UsuarioScalarFieldEnum: {
    id: 'id';
    nome: 'nome';
    email: 'email';
    senha: 'senha';
    cpf: 'cpf';
    tipoUsuario: 'tipoUsuario';
    criadoEm: 'criadoEm';
    atualizadoEm: 'atualizadoEm';
  };

  export type UsuarioScalarFieldEnum =
    (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum];

  export const EnderecoScalarFieldEnum: {
    id: 'id';
    rua: 'rua';
    numero: 'numero';
    complemento: 'complemento';
    bairro: 'bairro';
    cidade: 'cidade';
    estado: 'estado';
    cep: 'cep';
    tipo: 'tipo';
    principal: 'principal';
    usuarioId: 'usuarioId';
    criadoEm: 'criadoEm';
    atualizadoEm: 'atualizadoEm';
  };

  export type EnderecoScalarFieldEnum =
    (typeof EnderecoScalarFieldEnum)[keyof typeof EnderecoScalarFieldEnum];

  export const ProdutoScalarFieldEnum: {
    id: 'id';
    nome: 'nome';
    descricao: 'descricao';
    preco: 'preco';
    desconto: 'desconto';
    marca: 'marca';
    categoria: 'categoria';
    subcategoria: 'subcategoria';
    imagem: 'imagem';
    imagens: 'imagens';
    tamanhos: 'tamanhos';
    estoque: 'estoque';
    ativo: 'ativo';
    criadoEm: 'criadoEm';
    atualizadoEm: 'atualizadoEm';
  };

  export type ProdutoScalarFieldEnum =
    (typeof ProdutoScalarFieldEnum)[keyof typeof ProdutoScalarFieldEnum];

  export const AvaliacaoScalarFieldEnum: {
    id: 'id';
    nota: 'nota';
    comentario: 'comentario';
    data: 'data';
    produtoId: 'produtoId';
    usuarioId: 'usuarioId';
  };

  export type AvaliacaoScalarFieldEnum =
    (typeof AvaliacaoScalarFieldEnum)[keyof typeof AvaliacaoScalarFieldEnum];

  export const PedidoScalarFieldEnum: {
    id: 'id';
    status: 'status';
    pagamento: 'pagamento';
    valorTotal: 'valorTotal';
    frete: 'frete';
    data: 'data';
    atualizadoEm: 'atualizadoEm';
    endereco: 'endereco';
    usuarioId: 'usuarioId';
    cupomId: 'cupomId';
  };

  export type PedidoScalarFieldEnum =
    (typeof PedidoScalarFieldEnum)[keyof typeof PedidoScalarFieldEnum];

  export const PedidoItemScalarFieldEnum: {
    id: 'id';
    quantidade: 'quantidade';
    preco: 'preco';
    tamanho: 'tamanho';
    produtoId: 'produtoId';
    pedidoId: 'pedidoId';
  };

  export type PedidoItemScalarFieldEnum =
    (typeof PedidoItemScalarFieldEnum)[keyof typeof PedidoItemScalarFieldEnum];

  export const CupomScalarFieldEnum: {
    id: 'id';
    codigo: 'codigo';
    desconto: 'desconto';
    tipo: 'tipo';
    valorMinimo: 'valorMinimo';
    expiracao: 'expiracao';
    usado: 'usado';
    ativo: 'ativo';
    criadoEm: 'criadoEm';
    atualizadoEm: 'atualizadoEm';
  };

  export type CupomScalarFieldEnum =
    (typeof CupomScalarFieldEnum)[keyof typeof CupomScalarFieldEnum];

  export const RefreshTokenScalarFieldEnum: {
    id: 'id';
    token: 'token';
    expiresAt: 'expiresAt';
    userId: 'userId';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type RefreshTokenScalarFieldEnum =
    (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];

  export const WebhookLogScalarFieldEnum: {
    id: 'id';
    paymentId: 'paymentId';
    processedAt: 'processedAt';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type WebhookLogScalarFieldEnum =
    (typeof WebhookLogScalarFieldEnum)[keyof typeof WebhookLogScalarFieldEnum];

  export const PaymentScalarFieldEnum: {
    id: 'id';
    paymentId: 'paymentId';
    externalReference: 'externalReference';
    status: 'status';
    paymentType: 'paymentType';
    paymentMethod: 'paymentMethod';
    amount: 'amount';
    currency: 'currency';
    payerEmail: 'payerEmail';
    payerName: 'payerName';
    payerDocument: 'payerDocument';
    installments: 'installments';
    processedAt: 'processedAt';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type PaymentScalarFieldEnum =
    (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];

  export const AuditLogScalarFieldEnum: {
    id: 'id';
    action: 'action';
    userId: 'userId';
    entityId: 'entityId';
    entityType: 'entityType';
    details: 'details';
    ipAddress: 'ipAddress';
    userAgent: 'userAgent';
    createdAt: 'createdAt';
  };

  export type AuditLogScalarFieldEnum =
    (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;

  /**
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>;

  /**
   * Reference to a field of type 'UserType[]'
   */
  export type ListEnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'UserType[]'
  >;

  /**
   * Reference to a field of type 'AddressType'
   */
  export type EnumAddressTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'AddressType'
  >;

  /**
   * Reference to a field of type 'AddressType[]'
   */
  export type ListEnumAddressTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'AddressType[]'
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;

  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'OrderStatus'
  >;

  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'OrderStatus[]'
  >;

  /**
   * Reference to a field of type 'PaymentType'
   */
  export type EnumPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'PaymentType'
  >;

  /**
   * Reference to a field of type 'PaymentType[]'
   */
  export type ListEnumPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'PaymentType[]'
  >;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    name?: StringFilter<'User'> | string;
    email?: StringFilter<'User'> | string;
    password?: StringFilter<'User'> | string;
    role?: StringFilter<'User'> | string;
    twoFactorSecret?: StringNullableFilter<'User'> | string | null;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    twoFactorSecret?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      name?: StringFilter<'User'> | string;
      password?: StringFilter<'User'> | string;
      role?: StringFilter<'User'> | string;
      twoFactorSecret?: StringNullableFilter<'User'> | string | null;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      updatedAt?: DateTimeFilter<'User'> | Date | string;
    },
    'id' | 'email'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    twoFactorSecret?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    name?: StringWithAggregatesFilter<'User'> | string;
    email?: StringWithAggregatesFilter<'User'> | string;
    password?: StringWithAggregatesFilter<'User'> | string;
    role?: StringWithAggregatesFilter<'User'> | string;
    twoFactorSecret?: StringNullableWithAggregatesFilter<'User'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[];
    OR?: UsuarioWhereInput[];
    NOT?: UsuarioWhereInput | UsuarioWhereInput[];
    id?: IntFilter<'Usuario'> | number;
    nome?: StringFilter<'Usuario'> | string;
    email?: StringFilter<'Usuario'> | string;
    senha?: StringFilter<'Usuario'> | string;
    cpf?: StringFilter<'Usuario'> | string;
    tipoUsuario?: EnumUserTypeFilter<'Usuario'> | $Enums.UserType;
    criadoEm?: DateTimeFilter<'Usuario'> | Date | string;
    atualizadoEm?: DateTimeFilter<'Usuario'> | Date | string;
    endereco?: XOR<EnderecoNullableRelationFilter, EnderecoWhereInput> | null;
    pedidos?: PedidoListRelationFilter;
    avaliacoes?: AvaliacaoListRelationFilter;
    refreshTokens?: RefreshTokenListRelationFilter;
  };

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder;
    nome?: SortOrder;
    email?: SortOrder;
    senha?: SortOrder;
    cpf?: SortOrder;
    tipoUsuario?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
    endereco?: EnderecoOrderByWithRelationInput;
    pedidos?: PedidoOrderByRelationAggregateInput;
    avaliacoes?: AvaliacaoOrderByRelationAggregateInput;
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput;
  };

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      email?: string;
      cpf?: string;
      AND?: UsuarioWhereInput | UsuarioWhereInput[];
      OR?: UsuarioWhereInput[];
      NOT?: UsuarioWhereInput | UsuarioWhereInput[];
      nome?: StringFilter<'Usuario'> | string;
      senha?: StringFilter<'Usuario'> | string;
      tipoUsuario?: EnumUserTypeFilter<'Usuario'> | $Enums.UserType;
      criadoEm?: DateTimeFilter<'Usuario'> | Date | string;
      atualizadoEm?: DateTimeFilter<'Usuario'> | Date | string;
      endereco?: XOR<EnderecoNullableRelationFilter, EnderecoWhereInput> | null;
      pedidos?: PedidoListRelationFilter;
      avaliacoes?: AvaliacaoListRelationFilter;
      refreshTokens?: RefreshTokenListRelationFilter;
    },
    'id' | 'email' | 'cpf'
  >;

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder;
    nome?: SortOrder;
    email?: SortOrder;
    senha?: SortOrder;
    cpf?: SortOrder;
    tipoUsuario?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
    _count?: UsuarioCountOrderByAggregateInput;
    _avg?: UsuarioAvgOrderByAggregateInput;
    _max?: UsuarioMaxOrderByAggregateInput;
    _min?: UsuarioMinOrderByAggregateInput;
    _sum?: UsuarioSumOrderByAggregateInput;
  };

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[];
    OR?: UsuarioScalarWhereWithAggregatesInput[];
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Usuario'> | number;
    nome?: StringWithAggregatesFilter<'Usuario'> | string;
    email?: StringWithAggregatesFilter<'Usuario'> | string;
    senha?: StringWithAggregatesFilter<'Usuario'> | string;
    cpf?: StringWithAggregatesFilter<'Usuario'> | string;
    tipoUsuario?: EnumUserTypeWithAggregatesFilter<'Usuario'> | $Enums.UserType;
    criadoEm?: DateTimeWithAggregatesFilter<'Usuario'> | Date | string;
    atualizadoEm?: DateTimeWithAggregatesFilter<'Usuario'> | Date | string;
  };

  export type EnderecoWhereInput = {
    AND?: EnderecoWhereInput | EnderecoWhereInput[];
    OR?: EnderecoWhereInput[];
    NOT?: EnderecoWhereInput | EnderecoWhereInput[];
    id?: IntFilter<'Endereco'> | number;
    rua?: StringFilter<'Endereco'> | string;
    numero?: StringFilter<'Endereco'> | string;
    complemento?: StringNullableFilter<'Endereco'> | string | null;
    bairro?: StringFilter<'Endereco'> | string;
    cidade?: StringFilter<'Endereco'> | string;
    estado?: StringFilter<'Endereco'> | string;
    cep?: StringFilter<'Endereco'> | string;
    tipo?: EnumAddressTypeFilter<'Endereco'> | $Enums.AddressType;
    principal?: BoolFilter<'Endereco'> | boolean;
    usuarioId?: IntFilter<'Endereco'> | number;
    criadoEm?: DateTimeFilter<'Endereco'> | Date | string;
    atualizadoEm?: DateTimeFilter<'Endereco'> | Date | string;
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>;
  };

  export type EnderecoOrderByWithRelationInput = {
    id?: SortOrder;
    rua?: SortOrder;
    numero?: SortOrder;
    complemento?: SortOrderInput | SortOrder;
    bairro?: SortOrder;
    cidade?: SortOrder;
    estado?: SortOrder;
    cep?: SortOrder;
    tipo?: SortOrder;
    principal?: SortOrder;
    usuarioId?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
    usuario?: UsuarioOrderByWithRelationInput;
  };

  export type EnderecoWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      usuarioId?: number;
      AND?: EnderecoWhereInput | EnderecoWhereInput[];
      OR?: EnderecoWhereInput[];
      NOT?: EnderecoWhereInput | EnderecoWhereInput[];
      rua?: StringFilter<'Endereco'> | string;
      numero?: StringFilter<'Endereco'> | string;
      complemento?: StringNullableFilter<'Endereco'> | string | null;
      bairro?: StringFilter<'Endereco'> | string;
      cidade?: StringFilter<'Endereco'> | string;
      estado?: StringFilter<'Endereco'> | string;
      cep?: StringFilter<'Endereco'> | string;
      tipo?: EnumAddressTypeFilter<'Endereco'> | $Enums.AddressType;
      principal?: BoolFilter<'Endereco'> | boolean;
      criadoEm?: DateTimeFilter<'Endereco'> | Date | string;
      atualizadoEm?: DateTimeFilter<'Endereco'> | Date | string;
      usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>;
    },
    'id' | 'usuarioId'
  >;

  export type EnderecoOrderByWithAggregationInput = {
    id?: SortOrder;
    rua?: SortOrder;
    numero?: SortOrder;
    complemento?: SortOrderInput | SortOrder;
    bairro?: SortOrder;
    cidade?: SortOrder;
    estado?: SortOrder;
    cep?: SortOrder;
    tipo?: SortOrder;
    principal?: SortOrder;
    usuarioId?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
    _count?: EnderecoCountOrderByAggregateInput;
    _avg?: EnderecoAvgOrderByAggregateInput;
    _max?: EnderecoMaxOrderByAggregateInput;
    _min?: EnderecoMinOrderByAggregateInput;
    _sum?: EnderecoSumOrderByAggregateInput;
  };

  export type EnderecoScalarWhereWithAggregatesInput = {
    AND?: EnderecoScalarWhereWithAggregatesInput | EnderecoScalarWhereWithAggregatesInput[];
    OR?: EnderecoScalarWhereWithAggregatesInput[];
    NOT?: EnderecoScalarWhereWithAggregatesInput | EnderecoScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Endereco'> | number;
    rua?: StringWithAggregatesFilter<'Endereco'> | string;
    numero?: StringWithAggregatesFilter<'Endereco'> | string;
    complemento?: StringNullableWithAggregatesFilter<'Endereco'> | string | null;
    bairro?: StringWithAggregatesFilter<'Endereco'> | string;
    cidade?: StringWithAggregatesFilter<'Endereco'> | string;
    estado?: StringWithAggregatesFilter<'Endereco'> | string;
    cep?: StringWithAggregatesFilter<'Endereco'> | string;
    tipo?: EnumAddressTypeWithAggregatesFilter<'Endereco'> | $Enums.AddressType;
    principal?: BoolWithAggregatesFilter<'Endereco'> | boolean;
    usuarioId?: IntWithAggregatesFilter<'Endereco'> | number;
    criadoEm?: DateTimeWithAggregatesFilter<'Endereco'> | Date | string;
    atualizadoEm?: DateTimeWithAggregatesFilter<'Endereco'> | Date | string;
  };

  export type ProdutoWhereInput = {
    AND?: ProdutoWhereInput | ProdutoWhereInput[];
    OR?: ProdutoWhereInput[];
    NOT?: ProdutoWhereInput | ProdutoWhereInput[];
    id?: IntFilter<'Produto'> | number;
    nome?: StringFilter<'Produto'> | string;
    descricao?: StringFilter<'Produto'> | string;
    preco?: FloatFilter<'Produto'> | number;
    desconto?: FloatNullableFilter<'Produto'> | number | null;
    marca?: StringFilter<'Produto'> | string;
    categoria?: StringFilter<'Produto'> | string;
    subcategoria?: StringFilter<'Produto'> | string;
    imagem?: StringFilter<'Produto'> | string;
    imagens?: StringFilter<'Produto'> | string;
    tamanhos?: StringFilter<'Produto'> | string;
    estoque?: IntFilter<'Produto'> | number;
    ativo?: BoolFilter<'Produto'> | boolean;
    criadoEm?: DateTimeFilter<'Produto'> | Date | string;
    atualizadoEm?: DateTimeFilter<'Produto'> | Date | string;
    avaliacoes?: AvaliacaoListRelationFilter;
    pedidoItems?: PedidoItemListRelationFilter;
  };

  export type ProdutoOrderByWithRelationInput = {
    id?: SortOrder;
    nome?: SortOrder;
    descricao?: SortOrder;
    preco?: SortOrder;
    desconto?: SortOrderInput | SortOrder;
    marca?: SortOrder;
    categoria?: SortOrder;
    subcategoria?: SortOrder;
    imagem?: SortOrder;
    imagens?: SortOrder;
    tamanhos?: SortOrder;
    estoque?: SortOrder;
    ativo?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
    avaliacoes?: AvaliacaoOrderByRelationAggregateInput;
    pedidoItems?: PedidoItemOrderByRelationAggregateInput;
  };

  export type ProdutoWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: ProdutoWhereInput | ProdutoWhereInput[];
      OR?: ProdutoWhereInput[];
      NOT?: ProdutoWhereInput | ProdutoWhereInput[];
      nome?: StringFilter<'Produto'> | string;
      descricao?: StringFilter<'Produto'> | string;
      preco?: FloatFilter<'Produto'> | number;
      desconto?: FloatNullableFilter<'Produto'> | number | null;
      marca?: StringFilter<'Produto'> | string;
      categoria?: StringFilter<'Produto'> | string;
      subcategoria?: StringFilter<'Produto'> | string;
      imagem?: StringFilter<'Produto'> | string;
      imagens?: StringFilter<'Produto'> | string;
      tamanhos?: StringFilter<'Produto'> | string;
      estoque?: IntFilter<'Produto'> | number;
      ativo?: BoolFilter<'Produto'> | boolean;
      criadoEm?: DateTimeFilter<'Produto'> | Date | string;
      atualizadoEm?: DateTimeFilter<'Produto'> | Date | string;
      avaliacoes?: AvaliacaoListRelationFilter;
      pedidoItems?: PedidoItemListRelationFilter;
    },
    'id'
  >;

  export type ProdutoOrderByWithAggregationInput = {
    id?: SortOrder;
    nome?: SortOrder;
    descricao?: SortOrder;
    preco?: SortOrder;
    desconto?: SortOrderInput | SortOrder;
    marca?: SortOrder;
    categoria?: SortOrder;
    subcategoria?: SortOrder;
    imagem?: SortOrder;
    imagens?: SortOrder;
    tamanhos?: SortOrder;
    estoque?: SortOrder;
    ativo?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
    _count?: ProdutoCountOrderByAggregateInput;
    _avg?: ProdutoAvgOrderByAggregateInput;
    _max?: ProdutoMaxOrderByAggregateInput;
    _min?: ProdutoMinOrderByAggregateInput;
    _sum?: ProdutoSumOrderByAggregateInput;
  };

  export type ProdutoScalarWhereWithAggregatesInput = {
    AND?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[];
    OR?: ProdutoScalarWhereWithAggregatesInput[];
    NOT?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Produto'> | number;
    nome?: StringWithAggregatesFilter<'Produto'> | string;
    descricao?: StringWithAggregatesFilter<'Produto'> | string;
    preco?: FloatWithAggregatesFilter<'Produto'> | number;
    desconto?: FloatNullableWithAggregatesFilter<'Produto'> | number | null;
    marca?: StringWithAggregatesFilter<'Produto'> | string;
    categoria?: StringWithAggregatesFilter<'Produto'> | string;
    subcategoria?: StringWithAggregatesFilter<'Produto'> | string;
    imagem?: StringWithAggregatesFilter<'Produto'> | string;
    imagens?: StringWithAggregatesFilter<'Produto'> | string;
    tamanhos?: StringWithAggregatesFilter<'Produto'> | string;
    estoque?: IntWithAggregatesFilter<'Produto'> | number;
    ativo?: BoolWithAggregatesFilter<'Produto'> | boolean;
    criadoEm?: DateTimeWithAggregatesFilter<'Produto'> | Date | string;
    atualizadoEm?: DateTimeWithAggregatesFilter<'Produto'> | Date | string;
  };

  export type AvaliacaoWhereInput = {
    AND?: AvaliacaoWhereInput | AvaliacaoWhereInput[];
    OR?: AvaliacaoWhereInput[];
    NOT?: AvaliacaoWhereInput | AvaliacaoWhereInput[];
    id?: IntFilter<'Avaliacao'> | number;
    nota?: IntFilter<'Avaliacao'> | number;
    comentario?: StringFilter<'Avaliacao'> | string;
    data?: DateTimeFilter<'Avaliacao'> | Date | string;
    produtoId?: IntFilter<'Avaliacao'> | number;
    usuarioId?: IntFilter<'Avaliacao'> | number;
    produto?: XOR<ProdutoRelationFilter, ProdutoWhereInput>;
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>;
  };

  export type AvaliacaoOrderByWithRelationInput = {
    id?: SortOrder;
    nota?: SortOrder;
    comentario?: SortOrder;
    data?: SortOrder;
    produtoId?: SortOrder;
    usuarioId?: SortOrder;
    produto?: ProdutoOrderByWithRelationInput;
    usuario?: UsuarioOrderByWithRelationInput;
  };

  export type AvaliacaoWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: AvaliacaoWhereInput | AvaliacaoWhereInput[];
      OR?: AvaliacaoWhereInput[];
      NOT?: AvaliacaoWhereInput | AvaliacaoWhereInput[];
      nota?: IntFilter<'Avaliacao'> | number;
      comentario?: StringFilter<'Avaliacao'> | string;
      data?: DateTimeFilter<'Avaliacao'> | Date | string;
      produtoId?: IntFilter<'Avaliacao'> | number;
      usuarioId?: IntFilter<'Avaliacao'> | number;
      produto?: XOR<ProdutoRelationFilter, ProdutoWhereInput>;
      usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>;
    },
    'id'
  >;

  export type AvaliacaoOrderByWithAggregationInput = {
    id?: SortOrder;
    nota?: SortOrder;
    comentario?: SortOrder;
    data?: SortOrder;
    produtoId?: SortOrder;
    usuarioId?: SortOrder;
    _count?: AvaliacaoCountOrderByAggregateInput;
    _avg?: AvaliacaoAvgOrderByAggregateInput;
    _max?: AvaliacaoMaxOrderByAggregateInput;
    _min?: AvaliacaoMinOrderByAggregateInput;
    _sum?: AvaliacaoSumOrderByAggregateInput;
  };

  export type AvaliacaoScalarWhereWithAggregatesInput = {
    AND?: AvaliacaoScalarWhereWithAggregatesInput | AvaliacaoScalarWhereWithAggregatesInput[];
    OR?: AvaliacaoScalarWhereWithAggregatesInput[];
    NOT?: AvaliacaoScalarWhereWithAggregatesInput | AvaliacaoScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Avaliacao'> | number;
    nota?: IntWithAggregatesFilter<'Avaliacao'> | number;
    comentario?: StringWithAggregatesFilter<'Avaliacao'> | string;
    data?: DateTimeWithAggregatesFilter<'Avaliacao'> | Date | string;
    produtoId?: IntWithAggregatesFilter<'Avaliacao'> | number;
    usuarioId?: IntWithAggregatesFilter<'Avaliacao'> | number;
  };

  export type PedidoWhereInput = {
    AND?: PedidoWhereInput | PedidoWhereInput[];
    OR?: PedidoWhereInput[];
    NOT?: PedidoWhereInput | PedidoWhereInput[];
    id?: IntFilter<'Pedido'> | number;
    status?: EnumOrderStatusFilter<'Pedido'> | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFilter<'Pedido'> | $Enums.PaymentType;
    valorTotal?: FloatFilter<'Pedido'> | number;
    frete?: FloatFilter<'Pedido'> | number;
    data?: DateTimeFilter<'Pedido'> | Date | string;
    atualizadoEm?: DateTimeFilter<'Pedido'> | Date | string;
    endereco?: StringFilter<'Pedido'> | string;
    usuarioId?: IntFilter<'Pedido'> | number;
    cupomId?: IntNullableFilter<'Pedido'> | number | null;
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>;
    itens?: PedidoItemListRelationFilter;
    cupom?: XOR<CupomNullableRelationFilter, CupomWhereInput> | null;
  };

  export type PedidoOrderByWithRelationInput = {
    id?: SortOrder;
    status?: SortOrder;
    pagamento?: SortOrder;
    valorTotal?: SortOrder;
    frete?: SortOrder;
    data?: SortOrder;
    atualizadoEm?: SortOrder;
    endereco?: SortOrder;
    usuarioId?: SortOrder;
    cupomId?: SortOrderInput | SortOrder;
    usuario?: UsuarioOrderByWithRelationInput;
    itens?: PedidoItemOrderByRelationAggregateInput;
    cupom?: CupomOrderByWithRelationInput;
  };

  export type PedidoWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: PedidoWhereInput | PedidoWhereInput[];
      OR?: PedidoWhereInput[];
      NOT?: PedidoWhereInput | PedidoWhereInput[];
      status?: EnumOrderStatusFilter<'Pedido'> | $Enums.OrderStatus;
      pagamento?: EnumPaymentTypeFilter<'Pedido'> | $Enums.PaymentType;
      valorTotal?: FloatFilter<'Pedido'> | number;
      frete?: FloatFilter<'Pedido'> | number;
      data?: DateTimeFilter<'Pedido'> | Date | string;
      atualizadoEm?: DateTimeFilter<'Pedido'> | Date | string;
      endereco?: StringFilter<'Pedido'> | string;
      usuarioId?: IntFilter<'Pedido'> | number;
      cupomId?: IntNullableFilter<'Pedido'> | number | null;
      usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>;
      itens?: PedidoItemListRelationFilter;
      cupom?: XOR<CupomNullableRelationFilter, CupomWhereInput> | null;
    },
    'id'
  >;

  export type PedidoOrderByWithAggregationInput = {
    id?: SortOrder;
    status?: SortOrder;
    pagamento?: SortOrder;
    valorTotal?: SortOrder;
    frete?: SortOrder;
    data?: SortOrder;
    atualizadoEm?: SortOrder;
    endereco?: SortOrder;
    usuarioId?: SortOrder;
    cupomId?: SortOrderInput | SortOrder;
    _count?: PedidoCountOrderByAggregateInput;
    _avg?: PedidoAvgOrderByAggregateInput;
    _max?: PedidoMaxOrderByAggregateInput;
    _min?: PedidoMinOrderByAggregateInput;
    _sum?: PedidoSumOrderByAggregateInput;
  };

  export type PedidoScalarWhereWithAggregatesInput = {
    AND?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[];
    OR?: PedidoScalarWhereWithAggregatesInput[];
    NOT?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Pedido'> | number;
    status?: EnumOrderStatusWithAggregatesFilter<'Pedido'> | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeWithAggregatesFilter<'Pedido'> | $Enums.PaymentType;
    valorTotal?: FloatWithAggregatesFilter<'Pedido'> | number;
    frete?: FloatWithAggregatesFilter<'Pedido'> | number;
    data?: DateTimeWithAggregatesFilter<'Pedido'> | Date | string;
    atualizadoEm?: DateTimeWithAggregatesFilter<'Pedido'> | Date | string;
    endereco?: StringWithAggregatesFilter<'Pedido'> | string;
    usuarioId?: IntWithAggregatesFilter<'Pedido'> | number;
    cupomId?: IntNullableWithAggregatesFilter<'Pedido'> | number | null;
  };

  export type PedidoItemWhereInput = {
    AND?: PedidoItemWhereInput | PedidoItemWhereInput[];
    OR?: PedidoItemWhereInput[];
    NOT?: PedidoItemWhereInput | PedidoItemWhereInput[];
    id?: IntFilter<'PedidoItem'> | number;
    quantidade?: IntFilter<'PedidoItem'> | number;
    preco?: FloatFilter<'PedidoItem'> | number;
    tamanho?: StringFilter<'PedidoItem'> | string;
    produtoId?: IntFilter<'PedidoItem'> | number;
    pedidoId?: IntFilter<'PedidoItem'> | number;
    produto?: XOR<ProdutoRelationFilter, ProdutoWhereInput>;
    pedido?: XOR<PedidoRelationFilter, PedidoWhereInput>;
  };

  export type PedidoItemOrderByWithRelationInput = {
    id?: SortOrder;
    quantidade?: SortOrder;
    preco?: SortOrder;
    tamanho?: SortOrder;
    produtoId?: SortOrder;
    pedidoId?: SortOrder;
    produto?: ProdutoOrderByWithRelationInput;
    pedido?: PedidoOrderByWithRelationInput;
  };

  export type PedidoItemWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: PedidoItemWhereInput | PedidoItemWhereInput[];
      OR?: PedidoItemWhereInput[];
      NOT?: PedidoItemWhereInput | PedidoItemWhereInput[];
      quantidade?: IntFilter<'PedidoItem'> | number;
      preco?: FloatFilter<'PedidoItem'> | number;
      tamanho?: StringFilter<'PedidoItem'> | string;
      produtoId?: IntFilter<'PedidoItem'> | number;
      pedidoId?: IntFilter<'PedidoItem'> | number;
      produto?: XOR<ProdutoRelationFilter, ProdutoWhereInput>;
      pedido?: XOR<PedidoRelationFilter, PedidoWhereInput>;
    },
    'id'
  >;

  export type PedidoItemOrderByWithAggregationInput = {
    id?: SortOrder;
    quantidade?: SortOrder;
    preco?: SortOrder;
    tamanho?: SortOrder;
    produtoId?: SortOrder;
    pedidoId?: SortOrder;
    _count?: PedidoItemCountOrderByAggregateInput;
    _avg?: PedidoItemAvgOrderByAggregateInput;
    _max?: PedidoItemMaxOrderByAggregateInput;
    _min?: PedidoItemMinOrderByAggregateInput;
    _sum?: PedidoItemSumOrderByAggregateInput;
  };

  export type PedidoItemScalarWhereWithAggregatesInput = {
    AND?: PedidoItemScalarWhereWithAggregatesInput | PedidoItemScalarWhereWithAggregatesInput[];
    OR?: PedidoItemScalarWhereWithAggregatesInput[];
    NOT?: PedidoItemScalarWhereWithAggregatesInput | PedidoItemScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'PedidoItem'> | number;
    quantidade?: IntWithAggregatesFilter<'PedidoItem'> | number;
    preco?: FloatWithAggregatesFilter<'PedidoItem'> | number;
    tamanho?: StringWithAggregatesFilter<'PedidoItem'> | string;
    produtoId?: IntWithAggregatesFilter<'PedidoItem'> | number;
    pedidoId?: IntWithAggregatesFilter<'PedidoItem'> | number;
  };

  export type CupomWhereInput = {
    AND?: CupomWhereInput | CupomWhereInput[];
    OR?: CupomWhereInput[];
    NOT?: CupomWhereInput | CupomWhereInput[];
    id?: IntFilter<'Cupom'> | number;
    codigo?: StringFilter<'Cupom'> | string;
    desconto?: FloatFilter<'Cupom'> | number;
    tipo?: StringFilter<'Cupom'> | string;
    valorMinimo?: FloatNullableFilter<'Cupom'> | number | null;
    expiracao?: DateTimeFilter<'Cupom'> | Date | string;
    usado?: BoolFilter<'Cupom'> | boolean;
    ativo?: BoolFilter<'Cupom'> | boolean;
    criadoEm?: DateTimeFilter<'Cupom'> | Date | string;
    atualizadoEm?: DateTimeFilter<'Cupom'> | Date | string;
    pedidos?: PedidoListRelationFilter;
  };

  export type CupomOrderByWithRelationInput = {
    id?: SortOrder;
    codigo?: SortOrder;
    desconto?: SortOrder;
    tipo?: SortOrder;
    valorMinimo?: SortOrderInput | SortOrder;
    expiracao?: SortOrder;
    usado?: SortOrder;
    ativo?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
    pedidos?: PedidoOrderByRelationAggregateInput;
  };

  export type CupomWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      codigo?: string;
      AND?: CupomWhereInput | CupomWhereInput[];
      OR?: CupomWhereInput[];
      NOT?: CupomWhereInput | CupomWhereInput[];
      desconto?: FloatFilter<'Cupom'> | number;
      tipo?: StringFilter<'Cupom'> | string;
      valorMinimo?: FloatNullableFilter<'Cupom'> | number | null;
      expiracao?: DateTimeFilter<'Cupom'> | Date | string;
      usado?: BoolFilter<'Cupom'> | boolean;
      ativo?: BoolFilter<'Cupom'> | boolean;
      criadoEm?: DateTimeFilter<'Cupom'> | Date | string;
      atualizadoEm?: DateTimeFilter<'Cupom'> | Date | string;
      pedidos?: PedidoListRelationFilter;
    },
    'id' | 'codigo'
  >;

  export type CupomOrderByWithAggregationInput = {
    id?: SortOrder;
    codigo?: SortOrder;
    desconto?: SortOrder;
    tipo?: SortOrder;
    valorMinimo?: SortOrderInput | SortOrder;
    expiracao?: SortOrder;
    usado?: SortOrder;
    ativo?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
    _count?: CupomCountOrderByAggregateInput;
    _avg?: CupomAvgOrderByAggregateInput;
    _max?: CupomMaxOrderByAggregateInput;
    _min?: CupomMinOrderByAggregateInput;
    _sum?: CupomSumOrderByAggregateInput;
  };

  export type CupomScalarWhereWithAggregatesInput = {
    AND?: CupomScalarWhereWithAggregatesInput | CupomScalarWhereWithAggregatesInput[];
    OR?: CupomScalarWhereWithAggregatesInput[];
    NOT?: CupomScalarWhereWithAggregatesInput | CupomScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Cupom'> | number;
    codigo?: StringWithAggregatesFilter<'Cupom'> | string;
    desconto?: FloatWithAggregatesFilter<'Cupom'> | number;
    tipo?: StringWithAggregatesFilter<'Cupom'> | string;
    valorMinimo?: FloatNullableWithAggregatesFilter<'Cupom'> | number | null;
    expiracao?: DateTimeWithAggregatesFilter<'Cupom'> | Date | string;
    usado?: BoolWithAggregatesFilter<'Cupom'> | boolean;
    ativo?: BoolWithAggregatesFilter<'Cupom'> | boolean;
    criadoEm?: DateTimeWithAggregatesFilter<'Cupom'> | Date | string;
    atualizadoEm?: DateTimeWithAggregatesFilter<'Cupom'> | Date | string;
  };

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[];
    OR?: RefreshTokenWhereInput[];
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[];
    id?: IntFilter<'RefreshToken'> | number;
    token?: StringFilter<'RefreshToken'> | string;
    expiresAt?: DateTimeFilter<'RefreshToken'> | Date | string;
    userId?: IntFilter<'RefreshToken'> | number;
    createdAt?: DateTimeFilter<'RefreshToken'> | Date | string;
    updatedAt?: DateTimeFilter<'RefreshToken'> | Date | string;
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>;
  };

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder;
    token?: SortOrder;
    expiresAt?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    usuario?: UsuarioOrderByWithRelationInput;
  };

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      token?: string;
      AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[];
      OR?: RefreshTokenWhereInput[];
      NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[];
      expiresAt?: DateTimeFilter<'RefreshToken'> | Date | string;
      userId?: IntFilter<'RefreshToken'> | number;
      createdAt?: DateTimeFilter<'RefreshToken'> | Date | string;
      updatedAt?: DateTimeFilter<'RefreshToken'> | Date | string;
      usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>;
    },
    'id' | 'token'
  >;

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder;
    token?: SortOrder;
    expiresAt?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: RefreshTokenCountOrderByAggregateInput;
    _avg?: RefreshTokenAvgOrderByAggregateInput;
    _max?: RefreshTokenMaxOrderByAggregateInput;
    _min?: RefreshTokenMinOrderByAggregateInput;
    _sum?: RefreshTokenSumOrderByAggregateInput;
  };

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[];
    OR?: RefreshTokenScalarWhereWithAggregatesInput[];
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'RefreshToken'> | number;
    token?: StringWithAggregatesFilter<'RefreshToken'> | string;
    expiresAt?: DateTimeWithAggregatesFilter<'RefreshToken'> | Date | string;
    userId?: IntWithAggregatesFilter<'RefreshToken'> | number;
    createdAt?: DateTimeWithAggregatesFilter<'RefreshToken'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'RefreshToken'> | Date | string;
  };

  export type WebhookLogWhereInput = {
    AND?: WebhookLogWhereInput | WebhookLogWhereInput[];
    OR?: WebhookLogWhereInput[];
    NOT?: WebhookLogWhereInput | WebhookLogWhereInput[];
    id?: StringFilter<'WebhookLog'> | string;
    paymentId?: StringFilter<'WebhookLog'> | string;
    processedAt?: DateTimeFilter<'WebhookLog'> | Date | string;
    createdAt?: DateTimeFilter<'WebhookLog'> | Date | string;
    updatedAt?: DateTimeFilter<'WebhookLog'> | Date | string;
  };

  export type WebhookLogOrderByWithRelationInput = {
    id?: SortOrder;
    paymentId?: SortOrder;
    processedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WebhookLogWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      paymentId?: string;
      AND?: WebhookLogWhereInput | WebhookLogWhereInput[];
      OR?: WebhookLogWhereInput[];
      NOT?: WebhookLogWhereInput | WebhookLogWhereInput[];
      processedAt?: DateTimeFilter<'WebhookLog'> | Date | string;
      createdAt?: DateTimeFilter<'WebhookLog'> | Date | string;
      updatedAt?: DateTimeFilter<'WebhookLog'> | Date | string;
    },
    'id' | 'paymentId'
  >;

  export type WebhookLogOrderByWithAggregationInput = {
    id?: SortOrder;
    paymentId?: SortOrder;
    processedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: WebhookLogCountOrderByAggregateInput;
    _max?: WebhookLogMaxOrderByAggregateInput;
    _min?: WebhookLogMinOrderByAggregateInput;
  };

  export type WebhookLogScalarWhereWithAggregatesInput = {
    AND?: WebhookLogScalarWhereWithAggregatesInput | WebhookLogScalarWhereWithAggregatesInput[];
    OR?: WebhookLogScalarWhereWithAggregatesInput[];
    NOT?: WebhookLogScalarWhereWithAggregatesInput | WebhookLogScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'WebhookLog'> | string;
    paymentId?: StringWithAggregatesFilter<'WebhookLog'> | string;
    processedAt?: DateTimeWithAggregatesFilter<'WebhookLog'> | Date | string;
    createdAt?: DateTimeWithAggregatesFilter<'WebhookLog'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'WebhookLog'> | Date | string;
  };

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[];
    OR?: PaymentWhereInput[];
    NOT?: PaymentWhereInput | PaymentWhereInput[];
    id?: StringFilter<'Payment'> | string;
    paymentId?: StringFilter<'Payment'> | string;
    externalReference?: StringNullableFilter<'Payment'> | string | null;
    status?: StringFilter<'Payment'> | string;
    paymentType?: StringFilter<'Payment'> | string;
    paymentMethod?: StringNullableFilter<'Payment'> | string | null;
    amount?: FloatFilter<'Payment'> | number;
    currency?: StringFilter<'Payment'> | string;
    payerEmail?: StringNullableFilter<'Payment'> | string | null;
    payerName?: StringNullableFilter<'Payment'> | string | null;
    payerDocument?: StringNullableFilter<'Payment'> | string | null;
    installments?: IntNullableFilter<'Payment'> | number | null;
    processedAt?: DateTimeFilter<'Payment'> | Date | string;
    createdAt?: DateTimeFilter<'Payment'> | Date | string;
    updatedAt?: DateTimeFilter<'Payment'> | Date | string;
  };

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder;
    paymentId?: SortOrder;
    externalReference?: SortOrderInput | SortOrder;
    status?: SortOrder;
    paymentType?: SortOrder;
    paymentMethod?: SortOrderInput | SortOrder;
    amount?: SortOrder;
    currency?: SortOrder;
    payerEmail?: SortOrderInput | SortOrder;
    payerName?: SortOrderInput | SortOrder;
    payerDocument?: SortOrderInput | SortOrder;
    installments?: SortOrderInput | SortOrder;
    processedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PaymentWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      paymentId?: string;
      AND?: PaymentWhereInput | PaymentWhereInput[];
      OR?: PaymentWhereInput[];
      NOT?: PaymentWhereInput | PaymentWhereInput[];
      externalReference?: StringNullableFilter<'Payment'> | string | null;
      status?: StringFilter<'Payment'> | string;
      paymentType?: StringFilter<'Payment'> | string;
      paymentMethod?: StringNullableFilter<'Payment'> | string | null;
      amount?: FloatFilter<'Payment'> | number;
      currency?: StringFilter<'Payment'> | string;
      payerEmail?: StringNullableFilter<'Payment'> | string | null;
      payerName?: StringNullableFilter<'Payment'> | string | null;
      payerDocument?: StringNullableFilter<'Payment'> | string | null;
      installments?: IntNullableFilter<'Payment'> | number | null;
      processedAt?: DateTimeFilter<'Payment'> | Date | string;
      createdAt?: DateTimeFilter<'Payment'> | Date | string;
      updatedAt?: DateTimeFilter<'Payment'> | Date | string;
    },
    'id' | 'paymentId'
  >;

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder;
    paymentId?: SortOrder;
    externalReference?: SortOrderInput | SortOrder;
    status?: SortOrder;
    paymentType?: SortOrder;
    paymentMethod?: SortOrderInput | SortOrder;
    amount?: SortOrder;
    currency?: SortOrder;
    payerEmail?: SortOrderInput | SortOrder;
    payerName?: SortOrderInput | SortOrder;
    payerDocument?: SortOrderInput | SortOrder;
    installments?: SortOrderInput | SortOrder;
    processedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: PaymentCountOrderByAggregateInput;
    _avg?: PaymentAvgOrderByAggregateInput;
    _max?: PaymentMaxOrderByAggregateInput;
    _min?: PaymentMinOrderByAggregateInput;
    _sum?: PaymentSumOrderByAggregateInput;
  };

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[];
    OR?: PaymentScalarWhereWithAggregatesInput[];
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Payment'> | string;
    paymentId?: StringWithAggregatesFilter<'Payment'> | string;
    externalReference?: StringNullableWithAggregatesFilter<'Payment'> | string | null;
    status?: StringWithAggregatesFilter<'Payment'> | string;
    paymentType?: StringWithAggregatesFilter<'Payment'> | string;
    paymentMethod?: StringNullableWithAggregatesFilter<'Payment'> | string | null;
    amount?: FloatWithAggregatesFilter<'Payment'> | number;
    currency?: StringWithAggregatesFilter<'Payment'> | string;
    payerEmail?: StringNullableWithAggregatesFilter<'Payment'> | string | null;
    payerName?: StringNullableWithAggregatesFilter<'Payment'> | string | null;
    payerDocument?: StringNullableWithAggregatesFilter<'Payment'> | string | null;
    installments?: IntNullableWithAggregatesFilter<'Payment'> | number | null;
    processedAt?: DateTimeWithAggregatesFilter<'Payment'> | Date | string;
    createdAt?: DateTimeWithAggregatesFilter<'Payment'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Payment'> | Date | string;
  };

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[];
    OR?: AuditLogWhereInput[];
    NOT?: AuditLogWhereInput | AuditLogWhereInput[];
    id?: StringFilter<'AuditLog'> | string;
    action?: StringFilter<'AuditLog'> | string;
    userId?: StringNullableFilter<'AuditLog'> | string | null;
    entityId?: StringNullableFilter<'AuditLog'> | string | null;
    entityType?: StringNullableFilter<'AuditLog'> | string | null;
    details?: JsonFilter<'AuditLog'>;
    ipAddress?: StringNullableFilter<'AuditLog'> | string | null;
    userAgent?: StringNullableFilter<'AuditLog'> | string | null;
    createdAt?: DateTimeFilter<'AuditLog'> | Date | string;
  };

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder;
    action?: SortOrder;
    userId?: SortOrderInput | SortOrder;
    entityId?: SortOrderInput | SortOrder;
    entityType?: SortOrderInput | SortOrder;
    details?: SortOrder;
    ipAddress?: SortOrderInput | SortOrder;
    userAgent?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
  };

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: AuditLogWhereInput | AuditLogWhereInput[];
      OR?: AuditLogWhereInput[];
      NOT?: AuditLogWhereInput | AuditLogWhereInput[];
      action?: StringFilter<'AuditLog'> | string;
      userId?: StringNullableFilter<'AuditLog'> | string | null;
      entityId?: StringNullableFilter<'AuditLog'> | string | null;
      entityType?: StringNullableFilter<'AuditLog'> | string | null;
      details?: JsonFilter<'AuditLog'>;
      ipAddress?: StringNullableFilter<'AuditLog'> | string | null;
      userAgent?: StringNullableFilter<'AuditLog'> | string | null;
      createdAt?: DateTimeFilter<'AuditLog'> | Date | string;
    },
    'id'
  >;

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder;
    action?: SortOrder;
    userId?: SortOrderInput | SortOrder;
    entityId?: SortOrderInput | SortOrder;
    entityType?: SortOrderInput | SortOrder;
    details?: SortOrder;
    ipAddress?: SortOrderInput | SortOrder;
    userAgent?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    _count?: AuditLogCountOrderByAggregateInput;
    _max?: AuditLogMaxOrderByAggregateInput;
    _min?: AuditLogMinOrderByAggregateInput;
  };

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[];
    OR?: AuditLogScalarWhereWithAggregatesInput[];
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'AuditLog'> | string;
    action?: StringWithAggregatesFilter<'AuditLog'> | string;
    userId?: StringNullableWithAggregatesFilter<'AuditLog'> | string | null;
    entityId?: StringNullableWithAggregatesFilter<'AuditLog'> | string | null;
    entityType?: StringNullableWithAggregatesFilter<'AuditLog'> | string | null;
    details?: JsonWithAggregatesFilter<'AuditLog'>;
    ipAddress?: StringNullableWithAggregatesFilter<'AuditLog'> | string | null;
    userAgent?: StringNullableWithAggregatesFilter<'AuditLog'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'AuditLog'> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: string;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: string;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCreateManyInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: string;
    twoFactorSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UsuarioCreateInput = {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario?: $Enums.UserType;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    endereco?: EnderecoCreateNestedOneWithoutUsuarioInput;
    pedidos?: PedidoCreateNestedManyWithoutUsuarioInput;
    avaliacoes?: AvaliacaoCreateNestedManyWithoutUsuarioInput;
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioUncheckedCreateInput = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario?: $Enums.UserType;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    endereco?: EnderecoUncheckedCreateNestedOneWithoutUsuarioInput;
    pedidos?: PedidoUncheckedCreateNestedManyWithoutUsuarioInput;
    avaliacoes?: AvaliacaoUncheckedCreateNestedManyWithoutUsuarioInput;
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: EnderecoUpdateOneWithoutUsuarioNestedInput;
    pedidos?: PedidoUpdateManyWithoutUsuarioNestedInput;
    avaliacoes?: AvaliacaoUpdateManyWithoutUsuarioNestedInput;
    refreshTokens?: RefreshTokenUpdateManyWithoutUsuarioNestedInput;
  };

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: EnderecoUncheckedUpdateOneWithoutUsuarioNestedInput;
    pedidos?: PedidoUncheckedUpdateManyWithoutUsuarioNestedInput;
    avaliacoes?: AvaliacaoUncheckedUpdateManyWithoutUsuarioNestedInput;
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUsuarioNestedInput;
  };

  export type UsuarioCreateManyInput = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario?: $Enums.UserType;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
  };

  export type UsuarioUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EnderecoCreateInput = {
    rua: string;
    numero: string;
    complemento?: string | null;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    tipo?: $Enums.AddressType;
    principal?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    usuario: UsuarioCreateNestedOneWithoutEnderecoInput;
  };

  export type EnderecoUncheckedCreateInput = {
    id?: number;
    rua: string;
    numero: string;
    complemento?: string | null;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    tipo?: $Enums.AddressType;
    principal?: boolean;
    usuarioId: number;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
  };

  export type EnderecoUpdateInput = {
    rua?: StringFieldUpdateOperationsInput | string;
    numero?: StringFieldUpdateOperationsInput | string;
    complemento?: NullableStringFieldUpdateOperationsInput | string | null;
    bairro?: StringFieldUpdateOperationsInput | string;
    cidade?: StringFieldUpdateOperationsInput | string;
    estado?: StringFieldUpdateOperationsInput | string;
    cep?: StringFieldUpdateOperationsInput | string;
    tipo?: EnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType;
    principal?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: UsuarioUpdateOneRequiredWithoutEnderecoNestedInput;
  };

  export type EnderecoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    rua?: StringFieldUpdateOperationsInput | string;
    numero?: StringFieldUpdateOperationsInput | string;
    complemento?: NullableStringFieldUpdateOperationsInput | string | null;
    bairro?: StringFieldUpdateOperationsInput | string;
    cidade?: StringFieldUpdateOperationsInput | string;
    estado?: StringFieldUpdateOperationsInput | string;
    cep?: StringFieldUpdateOperationsInput | string;
    tipo?: EnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType;
    principal?: BoolFieldUpdateOperationsInput | boolean;
    usuarioId?: IntFieldUpdateOperationsInput | number;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EnderecoCreateManyInput = {
    id?: number;
    rua: string;
    numero: string;
    complemento?: string | null;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    tipo?: $Enums.AddressType;
    principal?: boolean;
    usuarioId: number;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
  };

  export type EnderecoUpdateManyMutationInput = {
    rua?: StringFieldUpdateOperationsInput | string;
    numero?: StringFieldUpdateOperationsInput | string;
    complemento?: NullableStringFieldUpdateOperationsInput | string | null;
    bairro?: StringFieldUpdateOperationsInput | string;
    cidade?: StringFieldUpdateOperationsInput | string;
    estado?: StringFieldUpdateOperationsInput | string;
    cep?: StringFieldUpdateOperationsInput | string;
    tipo?: EnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType;
    principal?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EnderecoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    rua?: StringFieldUpdateOperationsInput | string;
    numero?: StringFieldUpdateOperationsInput | string;
    complemento?: NullableStringFieldUpdateOperationsInput | string | null;
    bairro?: StringFieldUpdateOperationsInput | string;
    cidade?: StringFieldUpdateOperationsInput | string;
    estado?: StringFieldUpdateOperationsInput | string;
    cep?: StringFieldUpdateOperationsInput | string;
    tipo?: EnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType;
    principal?: BoolFieldUpdateOperationsInput | boolean;
    usuarioId?: IntFieldUpdateOperationsInput | number;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProdutoCreateInput = {
    nome: string;
    descricao: string;
    preco: number;
    desconto?: number | null;
    marca: string;
    categoria: string;
    subcategoria: string;
    imagem: string;
    imagens: string;
    tamanhos: string;
    estoque?: number;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    avaliacoes?: AvaliacaoCreateNestedManyWithoutProdutoInput;
    pedidoItems?: PedidoItemCreateNestedManyWithoutProdutoInput;
  };

  export type ProdutoUncheckedCreateInput = {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    desconto?: number | null;
    marca: string;
    categoria: string;
    subcategoria: string;
    imagem: string;
    imagens: string;
    tamanhos: string;
    estoque?: number;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    avaliacoes?: AvaliacaoUncheckedCreateNestedManyWithoutProdutoInput;
    pedidoItems?: PedidoItemUncheckedCreateNestedManyWithoutProdutoInput;
  };

  export type ProdutoUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string;
    descricao?: StringFieldUpdateOperationsInput | string;
    preco?: FloatFieldUpdateOperationsInput | number;
    desconto?: NullableFloatFieldUpdateOperationsInput | number | null;
    marca?: StringFieldUpdateOperationsInput | string;
    categoria?: StringFieldUpdateOperationsInput | string;
    subcategoria?: StringFieldUpdateOperationsInput | string;
    imagem?: StringFieldUpdateOperationsInput | string;
    imagens?: StringFieldUpdateOperationsInput | string;
    tamanhos?: StringFieldUpdateOperationsInput | string;
    estoque?: IntFieldUpdateOperationsInput | number;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    avaliacoes?: AvaliacaoUpdateManyWithoutProdutoNestedInput;
    pedidoItems?: PedidoItemUpdateManyWithoutProdutoNestedInput;
  };

  export type ProdutoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nome?: StringFieldUpdateOperationsInput | string;
    descricao?: StringFieldUpdateOperationsInput | string;
    preco?: FloatFieldUpdateOperationsInput | number;
    desconto?: NullableFloatFieldUpdateOperationsInput | number | null;
    marca?: StringFieldUpdateOperationsInput | string;
    categoria?: StringFieldUpdateOperationsInput | string;
    subcategoria?: StringFieldUpdateOperationsInput | string;
    imagem?: StringFieldUpdateOperationsInput | string;
    imagens?: StringFieldUpdateOperationsInput | string;
    tamanhos?: StringFieldUpdateOperationsInput | string;
    estoque?: IntFieldUpdateOperationsInput | number;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    avaliacoes?: AvaliacaoUncheckedUpdateManyWithoutProdutoNestedInput;
    pedidoItems?: PedidoItemUncheckedUpdateManyWithoutProdutoNestedInput;
  };

  export type ProdutoCreateManyInput = {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    desconto?: number | null;
    marca: string;
    categoria: string;
    subcategoria: string;
    imagem: string;
    imagens: string;
    tamanhos: string;
    estoque?: number;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
  };

  export type ProdutoUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string;
    descricao?: StringFieldUpdateOperationsInput | string;
    preco?: FloatFieldUpdateOperationsInput | number;
    desconto?: NullableFloatFieldUpdateOperationsInput | number | null;
    marca?: StringFieldUpdateOperationsInput | string;
    categoria?: StringFieldUpdateOperationsInput | string;
    subcategoria?: StringFieldUpdateOperationsInput | string;
    imagem?: StringFieldUpdateOperationsInput | string;
    imagens?: StringFieldUpdateOperationsInput | string;
    tamanhos?: StringFieldUpdateOperationsInput | string;
    estoque?: IntFieldUpdateOperationsInput | number;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProdutoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nome?: StringFieldUpdateOperationsInput | string;
    descricao?: StringFieldUpdateOperationsInput | string;
    preco?: FloatFieldUpdateOperationsInput | number;
    desconto?: NullableFloatFieldUpdateOperationsInput | number | null;
    marca?: StringFieldUpdateOperationsInput | string;
    categoria?: StringFieldUpdateOperationsInput | string;
    subcategoria?: StringFieldUpdateOperationsInput | string;
    imagem?: StringFieldUpdateOperationsInput | string;
    imagens?: StringFieldUpdateOperationsInput | string;
    tamanhos?: StringFieldUpdateOperationsInput | string;
    estoque?: IntFieldUpdateOperationsInput | number;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AvaliacaoCreateInput = {
    nota: number;
    comentario: string;
    data?: Date | string;
    produto: ProdutoCreateNestedOneWithoutAvaliacoesInput;
    usuario: UsuarioCreateNestedOneWithoutAvaliacoesInput;
  };

  export type AvaliacaoUncheckedCreateInput = {
    id?: number;
    nota: number;
    comentario: string;
    data?: Date | string;
    produtoId: number;
    usuarioId: number;
  };

  export type AvaliacaoUpdateInput = {
    nota?: IntFieldUpdateOperationsInput | number;
    comentario?: StringFieldUpdateOperationsInput | string;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    produto?: ProdutoUpdateOneRequiredWithoutAvaliacoesNestedInput;
    usuario?: UsuarioUpdateOneRequiredWithoutAvaliacoesNestedInput;
  };

  export type AvaliacaoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nota?: IntFieldUpdateOperationsInput | number;
    comentario?: StringFieldUpdateOperationsInput | string;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    produtoId?: IntFieldUpdateOperationsInput | number;
    usuarioId?: IntFieldUpdateOperationsInput | number;
  };

  export type AvaliacaoCreateManyInput = {
    id?: number;
    nota: number;
    comentario: string;
    data?: Date | string;
    produtoId: number;
    usuarioId: number;
  };

  export type AvaliacaoUpdateManyMutationInput = {
    nota?: IntFieldUpdateOperationsInput | number;
    comentario?: StringFieldUpdateOperationsInput | string;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AvaliacaoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nota?: IntFieldUpdateOperationsInput | number;
    comentario?: StringFieldUpdateOperationsInput | string;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    produtoId?: IntFieldUpdateOperationsInput | number;
    usuarioId?: IntFieldUpdateOperationsInput | number;
  };

  export type PedidoCreateInput = {
    status?: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data?: Date | string;
    atualizadoEm?: Date | string;
    endereco: string;
    usuario: UsuarioCreateNestedOneWithoutPedidosInput;
    itens?: PedidoItemCreateNestedManyWithoutPedidoInput;
    cupom?: CupomCreateNestedOneWithoutPedidosInput;
  };

  export type PedidoUncheckedCreateInput = {
    id?: number;
    status?: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data?: Date | string;
    atualizadoEm?: Date | string;
    endereco: string;
    usuarioId: number;
    cupomId?: number | null;
    itens?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput;
  };

  export type PedidoUpdateInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
    usuario?: UsuarioUpdateOneRequiredWithoutPedidosNestedInput;
    itens?: PedidoItemUpdateManyWithoutPedidoNestedInput;
    cupom?: CupomUpdateOneWithoutPedidosNestedInput;
  };

  export type PedidoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
    usuarioId?: IntFieldUpdateOperationsInput | number;
    cupomId?: NullableIntFieldUpdateOperationsInput | number | null;
    itens?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput;
  };

  export type PedidoCreateManyInput = {
    id?: number;
    status?: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data?: Date | string;
    atualizadoEm?: Date | string;
    endereco: string;
    usuarioId: number;
    cupomId?: number | null;
  };

  export type PedidoUpdateManyMutationInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
  };

  export type PedidoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
    usuarioId?: IntFieldUpdateOperationsInput | number;
    cupomId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type PedidoItemCreateInput = {
    quantidade: number;
    preco: number;
    tamanho: string;
    produto: ProdutoCreateNestedOneWithoutPedidoItemsInput;
    pedido: PedidoCreateNestedOneWithoutItensInput;
  };

  export type PedidoItemUncheckedCreateInput = {
    id?: number;
    quantidade: number;
    preco: number;
    tamanho: string;
    produtoId: number;
    pedidoId: number;
  };

  export type PedidoItemUpdateInput = {
    quantidade?: IntFieldUpdateOperationsInput | number;
    preco?: FloatFieldUpdateOperationsInput | number;
    tamanho?: StringFieldUpdateOperationsInput | string;
    produto?: ProdutoUpdateOneRequiredWithoutPedidoItemsNestedInput;
    pedido?: PedidoUpdateOneRequiredWithoutItensNestedInput;
  };

  export type PedidoItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    quantidade?: IntFieldUpdateOperationsInput | number;
    preco?: FloatFieldUpdateOperationsInput | number;
    tamanho?: StringFieldUpdateOperationsInput | string;
    produtoId?: IntFieldUpdateOperationsInput | number;
    pedidoId?: IntFieldUpdateOperationsInput | number;
  };

  export type PedidoItemCreateManyInput = {
    id?: number;
    quantidade: number;
    preco: number;
    tamanho: string;
    produtoId: number;
    pedidoId: number;
  };

  export type PedidoItemUpdateManyMutationInput = {
    quantidade?: IntFieldUpdateOperationsInput | number;
    preco?: FloatFieldUpdateOperationsInput | number;
    tamanho?: StringFieldUpdateOperationsInput | string;
  };

  export type PedidoItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    quantidade?: IntFieldUpdateOperationsInput | number;
    preco?: FloatFieldUpdateOperationsInput | number;
    tamanho?: StringFieldUpdateOperationsInput | string;
    produtoId?: IntFieldUpdateOperationsInput | number;
    pedidoId?: IntFieldUpdateOperationsInput | number;
  };

  export type CupomCreateInput = {
    codigo: string;
    desconto: number;
    tipo?: string;
    valorMinimo?: number | null;
    expiracao: Date | string;
    usado?: boolean;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    pedidos?: PedidoCreateNestedManyWithoutCupomInput;
  };

  export type CupomUncheckedCreateInput = {
    id?: number;
    codigo: string;
    desconto: number;
    tipo?: string;
    valorMinimo?: number | null;
    expiracao: Date | string;
    usado?: boolean;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    pedidos?: PedidoUncheckedCreateNestedManyWithoutCupomInput;
  };

  export type CupomUpdateInput = {
    codigo?: StringFieldUpdateOperationsInput | string;
    desconto?: FloatFieldUpdateOperationsInput | number;
    tipo?: StringFieldUpdateOperationsInput | string;
    valorMinimo?: NullableFloatFieldUpdateOperationsInput | number | null;
    expiracao?: DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: BoolFieldUpdateOperationsInput | boolean;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    pedidos?: PedidoUpdateManyWithoutCupomNestedInput;
  };

  export type CupomUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    codigo?: StringFieldUpdateOperationsInput | string;
    desconto?: FloatFieldUpdateOperationsInput | number;
    tipo?: StringFieldUpdateOperationsInput | string;
    valorMinimo?: NullableFloatFieldUpdateOperationsInput | number | null;
    expiracao?: DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: BoolFieldUpdateOperationsInput | boolean;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    pedidos?: PedidoUncheckedUpdateManyWithoutCupomNestedInput;
  };

  export type CupomCreateManyInput = {
    id?: number;
    codigo: string;
    desconto: number;
    tipo?: string;
    valorMinimo?: number | null;
    expiracao: Date | string;
    usado?: boolean;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
  };

  export type CupomUpdateManyMutationInput = {
    codigo?: StringFieldUpdateOperationsInput | string;
    desconto?: FloatFieldUpdateOperationsInput | number;
    tipo?: StringFieldUpdateOperationsInput | string;
    valorMinimo?: NullableFloatFieldUpdateOperationsInput | number | null;
    expiracao?: DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: BoolFieldUpdateOperationsInput | boolean;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CupomUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    codigo?: StringFieldUpdateOperationsInput | string;
    desconto?: FloatFieldUpdateOperationsInput | number;
    tipo?: StringFieldUpdateOperationsInput | string;
    valorMinimo?: NullableFloatFieldUpdateOperationsInput | number | null;
    expiracao?: DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: BoolFieldUpdateOperationsInput | boolean;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RefreshTokenCreateInput = {
    token: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuario: UsuarioCreateNestedOneWithoutRefreshTokensInput;
  };

  export type RefreshTokenUncheckedCreateInput = {
    id?: number;
    token: string;
    expiresAt: Date | string;
    userId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RefreshTokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: UsuarioUpdateOneRequiredWithoutRefreshTokensNestedInput;
  };

  export type RefreshTokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    token?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RefreshTokenCreateManyInput = {
    id?: number;
    token: string;
    expiresAt: Date | string;
    userId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RefreshTokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    token?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WebhookLogCreateInput = {
    id?: string;
    paymentId: string;
    processedAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type WebhookLogUncheckedCreateInput = {
    id?: string;
    paymentId: string;
    processedAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type WebhookLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    paymentId?: StringFieldUpdateOperationsInput | string;
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WebhookLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    paymentId?: StringFieldUpdateOperationsInput | string;
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WebhookLogCreateManyInput = {
    id?: string;
    paymentId: string;
    processedAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type WebhookLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    paymentId?: StringFieldUpdateOperationsInput | string;
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WebhookLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    paymentId?: StringFieldUpdateOperationsInput | string;
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaymentCreateInput = {
    id?: string;
    paymentId: string;
    externalReference?: string | null;
    status: string;
    paymentType: string;
    paymentMethod?: string | null;
    amount: number;
    currency?: string;
    payerEmail?: string | null;
    payerName?: string | null;
    payerDocument?: string | null;
    installments?: number | null;
    processedAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PaymentUncheckedCreateInput = {
    id?: string;
    paymentId: string;
    externalReference?: string | null;
    status: string;
    paymentType: string;
    paymentMethod?: string | null;
    amount: number;
    currency?: string;
    payerEmail?: string | null;
    payerName?: string | null;
    payerDocument?: string | null;
    installments?: number | null;
    processedAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    paymentId?: StringFieldUpdateOperationsInput | string;
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    paymentType?: StringFieldUpdateOperationsInput | string;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    amount?: FloatFieldUpdateOperationsInput | number;
    currency?: StringFieldUpdateOperationsInput | string;
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null;
    payerName?: NullableStringFieldUpdateOperationsInput | string | null;
    payerDocument?: NullableStringFieldUpdateOperationsInput | string | null;
    installments?: NullableIntFieldUpdateOperationsInput | number | null;
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    paymentId?: StringFieldUpdateOperationsInput | string;
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    paymentType?: StringFieldUpdateOperationsInput | string;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    amount?: FloatFieldUpdateOperationsInput | number;
    currency?: StringFieldUpdateOperationsInput | string;
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null;
    payerName?: NullableStringFieldUpdateOperationsInput | string | null;
    payerDocument?: NullableStringFieldUpdateOperationsInput | string | null;
    installments?: NullableIntFieldUpdateOperationsInput | number | null;
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaymentCreateManyInput = {
    id?: string;
    paymentId: string;
    externalReference?: string | null;
    status: string;
    paymentType: string;
    paymentMethod?: string | null;
    amount: number;
    currency?: string;
    payerEmail?: string | null;
    payerName?: string | null;
    payerDocument?: string | null;
    installments?: number | null;
    processedAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    paymentId?: StringFieldUpdateOperationsInput | string;
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    paymentType?: StringFieldUpdateOperationsInput | string;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    amount?: FloatFieldUpdateOperationsInput | number;
    currency?: StringFieldUpdateOperationsInput | string;
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null;
    payerName?: NullableStringFieldUpdateOperationsInput | string | null;
    payerDocument?: NullableStringFieldUpdateOperationsInput | string | null;
    installments?: NullableIntFieldUpdateOperationsInput | number | null;
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    paymentId?: StringFieldUpdateOperationsInput | string;
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    paymentType?: StringFieldUpdateOperationsInput | string;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    amount?: FloatFieldUpdateOperationsInput | number;
    currency?: StringFieldUpdateOperationsInput | string;
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null;
    payerName?: NullableStringFieldUpdateOperationsInput | string | null;
    payerDocument?: NullableStringFieldUpdateOperationsInput | string | null;
    installments?: NullableIntFieldUpdateOperationsInput | number | null;
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuditLogCreateInput = {
    id?: string;
    action: string;
    userId?: string | null;
    entityId?: string | null;
    entityType?: string | null;
    details: JsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
  };

  export type AuditLogUncheckedCreateInput = {
    id?: string;
    action: string;
    userId?: string | null;
    entityId?: string | null;
    entityType?: string | null;
    details: JsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
  };

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    action?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: NullableStringFieldUpdateOperationsInput | string | null;
    details?: JsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    action?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: NullableStringFieldUpdateOperationsInput | string | null;
    details?: JsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuditLogCreateManyInput = {
    id?: string;
    action: string;
    userId?: string | null;
    entityId?: string | null;
    entityType?: string | null;
    details: JsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
  };

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    action?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: NullableStringFieldUpdateOperationsInput | string | null;
    details?: JsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    action?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: NullableStringFieldUpdateOperationsInput | string | null;
    details?: JsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    twoFactorSecret?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    twoFactorSecret?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    twoFactorSecret?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType;
  };

  export type EnderecoNullableRelationFilter = {
    is?: EnderecoWhereInput | null;
    isNot?: EnderecoWhereInput | null;
  };

  export type PedidoListRelationFilter = {
    every?: PedidoWhereInput;
    some?: PedidoWhereInput;
    none?: PedidoWhereInput;
  };

  export type AvaliacaoListRelationFilter = {
    every?: AvaliacaoWhereInput;
    some?: AvaliacaoWhereInput;
    none?: AvaliacaoWhereInput;
  };

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput;
    some?: RefreshTokenWhereInput;
    none?: RefreshTokenWhereInput;
  };

  export type PedidoOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type AvaliacaoOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder;
    nome?: SortOrder;
    email?: SortOrder;
    senha?: SortOrder;
    cpf?: SortOrder;
    tipoUsuario?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder;
    nome?: SortOrder;
    email?: SortOrder;
    senha?: SortOrder;
    cpf?: SortOrder;
    tipoUsuario?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder;
    nome?: SortOrder;
    email?: SortOrder;
    senha?: SortOrder;
    cpf?: SortOrder;
    tipoUsuario?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumUserTypeFilter<$PrismaModel>;
    _max?: NestedEnumUserTypeFilter<$PrismaModel>;
  };

  export type EnumAddressTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AddressType | EnumAddressTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumAddressTypeFilter<$PrismaModel> | $Enums.AddressType;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type UsuarioRelationFilter = {
    is?: UsuarioWhereInput;
    isNot?: UsuarioWhereInput;
  };

  export type EnderecoCountOrderByAggregateInput = {
    id?: SortOrder;
    rua?: SortOrder;
    numero?: SortOrder;
    complemento?: SortOrder;
    bairro?: SortOrder;
    cidade?: SortOrder;
    estado?: SortOrder;
    cep?: SortOrder;
    tipo?: SortOrder;
    principal?: SortOrder;
    usuarioId?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type EnderecoAvgOrderByAggregateInput = {
    id?: SortOrder;
    usuarioId?: SortOrder;
  };

  export type EnderecoMaxOrderByAggregateInput = {
    id?: SortOrder;
    rua?: SortOrder;
    numero?: SortOrder;
    complemento?: SortOrder;
    bairro?: SortOrder;
    cidade?: SortOrder;
    estado?: SortOrder;
    cep?: SortOrder;
    tipo?: SortOrder;
    principal?: SortOrder;
    usuarioId?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type EnderecoMinOrderByAggregateInput = {
    id?: SortOrder;
    rua?: SortOrder;
    numero?: SortOrder;
    complemento?: SortOrder;
    bairro?: SortOrder;
    cidade?: SortOrder;
    estado?: SortOrder;
    cep?: SortOrder;
    tipo?: SortOrder;
    principal?: SortOrder;
    usuarioId?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type EnderecoSumOrderByAggregateInput = {
    id?: SortOrder;
    usuarioId?: SortOrder;
  };

  export type EnumAddressTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AddressType | EnumAddressTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumAddressTypeWithAggregatesFilter<$PrismaModel> | $Enums.AddressType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumAddressTypeFilter<$PrismaModel>;
    _max?: NestedEnumAddressTypeFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type PedidoItemListRelationFilter = {
    every?: PedidoItemWhereInput;
    some?: PedidoItemWhereInput;
    none?: PedidoItemWhereInput;
  };

  export type PedidoItemOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProdutoCountOrderByAggregateInput = {
    id?: SortOrder;
    nome?: SortOrder;
    descricao?: SortOrder;
    preco?: SortOrder;
    desconto?: SortOrder;
    marca?: SortOrder;
    categoria?: SortOrder;
    subcategoria?: SortOrder;
    imagem?: SortOrder;
    imagens?: SortOrder;
    tamanhos?: SortOrder;
    estoque?: SortOrder;
    ativo?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type ProdutoAvgOrderByAggregateInput = {
    id?: SortOrder;
    preco?: SortOrder;
    desconto?: SortOrder;
    estoque?: SortOrder;
  };

  export type ProdutoMaxOrderByAggregateInput = {
    id?: SortOrder;
    nome?: SortOrder;
    descricao?: SortOrder;
    preco?: SortOrder;
    desconto?: SortOrder;
    marca?: SortOrder;
    categoria?: SortOrder;
    subcategoria?: SortOrder;
    imagem?: SortOrder;
    imagens?: SortOrder;
    tamanhos?: SortOrder;
    estoque?: SortOrder;
    ativo?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type ProdutoMinOrderByAggregateInput = {
    id?: SortOrder;
    nome?: SortOrder;
    descricao?: SortOrder;
    preco?: SortOrder;
    desconto?: SortOrder;
    marca?: SortOrder;
    categoria?: SortOrder;
    subcategoria?: SortOrder;
    imagem?: SortOrder;
    imagens?: SortOrder;
    tamanhos?: SortOrder;
    estoque?: SortOrder;
    ativo?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type ProdutoSumOrderByAggregateInput = {
    id?: SortOrder;
    preco?: SortOrder;
    desconto?: SortOrder;
    estoque?: SortOrder;
  };

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedFloatNullableFilter<$PrismaModel>;
    _min?: NestedFloatNullableFilter<$PrismaModel>;
    _max?: NestedFloatNullableFilter<$PrismaModel>;
  };

  export type ProdutoRelationFilter = {
    is?: ProdutoWhereInput;
    isNot?: ProdutoWhereInput;
  };

  export type AvaliacaoCountOrderByAggregateInput = {
    id?: SortOrder;
    nota?: SortOrder;
    comentario?: SortOrder;
    data?: SortOrder;
    produtoId?: SortOrder;
    usuarioId?: SortOrder;
  };

  export type AvaliacaoAvgOrderByAggregateInput = {
    id?: SortOrder;
    nota?: SortOrder;
    produtoId?: SortOrder;
    usuarioId?: SortOrder;
  };

  export type AvaliacaoMaxOrderByAggregateInput = {
    id?: SortOrder;
    nota?: SortOrder;
    comentario?: SortOrder;
    data?: SortOrder;
    produtoId?: SortOrder;
    usuarioId?: SortOrder;
  };

  export type AvaliacaoMinOrderByAggregateInput = {
    id?: SortOrder;
    nota?: SortOrder;
    comentario?: SortOrder;
    data?: SortOrder;
    produtoId?: SortOrder;
    usuarioId?: SortOrder;
  };

  export type AvaliacaoSumOrderByAggregateInput = {
    id?: SortOrder;
    nota?: SortOrder;
    produtoId?: SortOrder;
    usuarioId?: SortOrder;
  };

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
  };

  export type EnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type CupomNullableRelationFilter = {
    is?: CupomWhereInput | null;
    isNot?: CupomWhereInput | null;
  };

  export type PedidoCountOrderByAggregateInput = {
    id?: SortOrder;
    status?: SortOrder;
    pagamento?: SortOrder;
    valorTotal?: SortOrder;
    frete?: SortOrder;
    data?: SortOrder;
    atualizadoEm?: SortOrder;
    endereco?: SortOrder;
    usuarioId?: SortOrder;
    cupomId?: SortOrder;
  };

  export type PedidoAvgOrderByAggregateInput = {
    id?: SortOrder;
    valorTotal?: SortOrder;
    frete?: SortOrder;
    usuarioId?: SortOrder;
    cupomId?: SortOrder;
  };

  export type PedidoMaxOrderByAggregateInput = {
    id?: SortOrder;
    status?: SortOrder;
    pagamento?: SortOrder;
    valorTotal?: SortOrder;
    frete?: SortOrder;
    data?: SortOrder;
    atualizadoEm?: SortOrder;
    endereco?: SortOrder;
    usuarioId?: SortOrder;
    cupomId?: SortOrder;
  };

  export type PedidoMinOrderByAggregateInput = {
    id?: SortOrder;
    status?: SortOrder;
    pagamento?: SortOrder;
    valorTotal?: SortOrder;
    frete?: SortOrder;
    data?: SortOrder;
    atualizadoEm?: SortOrder;
    endereco?: SortOrder;
    usuarioId?: SortOrder;
    cupomId?: SortOrder;
  };

  export type PedidoSumOrderByAggregateInput = {
    id?: SortOrder;
    valorTotal?: SortOrder;
    frete?: SortOrder;
    usuarioId?: SortOrder;
    cupomId?: SortOrder;
  };

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>;
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>;
  };

  export type EnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>;
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type PedidoRelationFilter = {
    is?: PedidoWhereInput;
    isNot?: PedidoWhereInput;
  };

  export type PedidoItemCountOrderByAggregateInput = {
    id?: SortOrder;
    quantidade?: SortOrder;
    preco?: SortOrder;
    tamanho?: SortOrder;
    produtoId?: SortOrder;
    pedidoId?: SortOrder;
  };

  export type PedidoItemAvgOrderByAggregateInput = {
    id?: SortOrder;
    quantidade?: SortOrder;
    preco?: SortOrder;
    produtoId?: SortOrder;
    pedidoId?: SortOrder;
  };

  export type PedidoItemMaxOrderByAggregateInput = {
    id?: SortOrder;
    quantidade?: SortOrder;
    preco?: SortOrder;
    tamanho?: SortOrder;
    produtoId?: SortOrder;
    pedidoId?: SortOrder;
  };

  export type PedidoItemMinOrderByAggregateInput = {
    id?: SortOrder;
    quantidade?: SortOrder;
    preco?: SortOrder;
    tamanho?: SortOrder;
    produtoId?: SortOrder;
    pedidoId?: SortOrder;
  };

  export type PedidoItemSumOrderByAggregateInput = {
    id?: SortOrder;
    quantidade?: SortOrder;
    preco?: SortOrder;
    produtoId?: SortOrder;
    pedidoId?: SortOrder;
  };

  export type CupomCountOrderByAggregateInput = {
    id?: SortOrder;
    codigo?: SortOrder;
    desconto?: SortOrder;
    tipo?: SortOrder;
    valorMinimo?: SortOrder;
    expiracao?: SortOrder;
    usado?: SortOrder;
    ativo?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type CupomAvgOrderByAggregateInput = {
    id?: SortOrder;
    desconto?: SortOrder;
    valorMinimo?: SortOrder;
  };

  export type CupomMaxOrderByAggregateInput = {
    id?: SortOrder;
    codigo?: SortOrder;
    desconto?: SortOrder;
    tipo?: SortOrder;
    valorMinimo?: SortOrder;
    expiracao?: SortOrder;
    usado?: SortOrder;
    ativo?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type CupomMinOrderByAggregateInput = {
    id?: SortOrder;
    codigo?: SortOrder;
    desconto?: SortOrder;
    tipo?: SortOrder;
    valorMinimo?: SortOrder;
    expiracao?: SortOrder;
    usado?: SortOrder;
    ativo?: SortOrder;
    criadoEm?: SortOrder;
    atualizadoEm?: SortOrder;
  };

  export type CupomSumOrderByAggregateInput = {
    id?: SortOrder;
    desconto?: SortOrder;
    valorMinimo?: SortOrder;
  };

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder;
    token?: SortOrder;
    expiresAt?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RefreshTokenAvgOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
  };

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder;
    token?: SortOrder;
    expiresAt?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder;
    token?: SortOrder;
    expiresAt?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RefreshTokenSumOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
  };

  export type WebhookLogCountOrderByAggregateInput = {
    id?: SortOrder;
    paymentId?: SortOrder;
    processedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WebhookLogMaxOrderByAggregateInput = {
    id?: SortOrder;
    paymentId?: SortOrder;
    processedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WebhookLogMinOrderByAggregateInput = {
    id?: SortOrder;
    paymentId?: SortOrder;
    processedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder;
    paymentId?: SortOrder;
    externalReference?: SortOrder;
    status?: SortOrder;
    paymentType?: SortOrder;
    paymentMethod?: SortOrder;
    amount?: SortOrder;
    currency?: SortOrder;
    payerEmail?: SortOrder;
    payerName?: SortOrder;
    payerDocument?: SortOrder;
    installments?: SortOrder;
    processedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder;
    installments?: SortOrder;
  };

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder;
    paymentId?: SortOrder;
    externalReference?: SortOrder;
    status?: SortOrder;
    paymentType?: SortOrder;
    paymentMethod?: SortOrder;
    amount?: SortOrder;
    currency?: SortOrder;
    payerEmail?: SortOrder;
    payerName?: SortOrder;
    payerDocument?: SortOrder;
    installments?: SortOrder;
    processedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder;
    paymentId?: SortOrder;
    externalReference?: SortOrder;
    status?: SortOrder;
    paymentType?: SortOrder;
    paymentMethod?: SortOrder;
    amount?: SortOrder;
    currency?: SortOrder;
    payerEmail?: SortOrder;
    payerName?: SortOrder;
    payerDocument?: SortOrder;
    installments?: SortOrder;
    processedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder;
    installments?: SortOrder;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder;
    action?: SortOrder;
    userId?: SortOrder;
    entityId?: SortOrder;
    entityType?: SortOrder;
    details?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    createdAt?: SortOrder;
  };

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder;
    action?: SortOrder;
    userId?: SortOrder;
    entityId?: SortOrder;
    entityType?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    createdAt?: SortOrder;
  };

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder;
    action?: SortOrder;
    userId?: SortOrder;
    entityId?: SortOrder;
    entityType?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    createdAt?: SortOrder;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type EnderecoCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<EnderecoCreateWithoutUsuarioInput, EnderecoUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: EnderecoCreateOrConnectWithoutUsuarioInput;
    connect?: EnderecoWhereUniqueInput;
  };

  export type PedidoCreateNestedManyWithoutUsuarioInput = {
    create?:
      | XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput>
      | PedidoCreateWithoutUsuarioInput[]
      | PedidoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | PedidoCreateOrConnectWithoutUsuarioInput
      | PedidoCreateOrConnectWithoutUsuarioInput[];
    createMany?: PedidoCreateManyUsuarioInputEnvelope;
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
  };

  export type AvaliacaoCreateNestedManyWithoutUsuarioInput = {
    create?:
      | XOR<AvaliacaoCreateWithoutUsuarioInput, AvaliacaoUncheckedCreateWithoutUsuarioInput>
      | AvaliacaoCreateWithoutUsuarioInput[]
      | AvaliacaoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | AvaliacaoCreateOrConnectWithoutUsuarioInput
      | AvaliacaoCreateOrConnectWithoutUsuarioInput[];
    createMany?: AvaliacaoCreateManyUsuarioInputEnvelope;
    connect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
  };

  export type RefreshTokenCreateNestedManyWithoutUsuarioInput = {
    create?:
      | XOR<RefreshTokenCreateWithoutUsuarioInput, RefreshTokenUncheckedCreateWithoutUsuarioInput>
      | RefreshTokenCreateWithoutUsuarioInput[]
      | RefreshTokenUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | RefreshTokenCreateOrConnectWithoutUsuarioInput
      | RefreshTokenCreateOrConnectWithoutUsuarioInput[];
    createMany?: RefreshTokenCreateManyUsuarioInputEnvelope;
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
  };

  export type EnderecoUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<EnderecoCreateWithoutUsuarioInput, EnderecoUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: EnderecoCreateOrConnectWithoutUsuarioInput;
    connect?: EnderecoWhereUniqueInput;
  };

  export type PedidoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?:
      | XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput>
      | PedidoCreateWithoutUsuarioInput[]
      | PedidoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | PedidoCreateOrConnectWithoutUsuarioInput
      | PedidoCreateOrConnectWithoutUsuarioInput[];
    createMany?: PedidoCreateManyUsuarioInputEnvelope;
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
  };

  export type AvaliacaoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?:
      | XOR<AvaliacaoCreateWithoutUsuarioInput, AvaliacaoUncheckedCreateWithoutUsuarioInput>
      | AvaliacaoCreateWithoutUsuarioInput[]
      | AvaliacaoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | AvaliacaoCreateOrConnectWithoutUsuarioInput
      | AvaliacaoCreateOrConnectWithoutUsuarioInput[];
    createMany?: AvaliacaoCreateManyUsuarioInputEnvelope;
    connect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
  };

  export type RefreshTokenUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?:
      | XOR<RefreshTokenCreateWithoutUsuarioInput, RefreshTokenUncheckedCreateWithoutUsuarioInput>
      | RefreshTokenCreateWithoutUsuarioInput[]
      | RefreshTokenUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | RefreshTokenCreateOrConnectWithoutUsuarioInput
      | RefreshTokenCreateOrConnectWithoutUsuarioInput[];
    createMany?: RefreshTokenCreateManyUsuarioInputEnvelope;
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
  };

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType;
  };

  export type EnderecoUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<EnderecoCreateWithoutUsuarioInput, EnderecoUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: EnderecoCreateOrConnectWithoutUsuarioInput;
    upsert?: EnderecoUpsertWithoutUsuarioInput;
    disconnect?: EnderecoWhereInput | boolean;
    delete?: EnderecoWhereInput | boolean;
    connect?: EnderecoWhereUniqueInput;
    update?: XOR<
      XOR<EnderecoUpdateToOneWithWhereWithoutUsuarioInput, EnderecoUpdateWithoutUsuarioInput>,
      EnderecoUncheckedUpdateWithoutUsuarioInput
    >;
  };

  export type PedidoUpdateManyWithoutUsuarioNestedInput = {
    create?:
      | XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput>
      | PedidoCreateWithoutUsuarioInput[]
      | PedidoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | PedidoCreateOrConnectWithoutUsuarioInput
      | PedidoCreateOrConnectWithoutUsuarioInput[];
    upsert?:
      | PedidoUpsertWithWhereUniqueWithoutUsuarioInput
      | PedidoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: PedidoCreateManyUsuarioInputEnvelope;
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    update?:
      | PedidoUpdateWithWhereUniqueWithoutUsuarioInput
      | PedidoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?:
      | PedidoUpdateManyWithWhereWithoutUsuarioInput
      | PedidoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[];
  };

  export type AvaliacaoUpdateManyWithoutUsuarioNestedInput = {
    create?:
      | XOR<AvaliacaoCreateWithoutUsuarioInput, AvaliacaoUncheckedCreateWithoutUsuarioInput>
      | AvaliacaoCreateWithoutUsuarioInput[]
      | AvaliacaoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | AvaliacaoCreateOrConnectWithoutUsuarioInput
      | AvaliacaoCreateOrConnectWithoutUsuarioInput[];
    upsert?:
      | AvaliacaoUpsertWithWhereUniqueWithoutUsuarioInput
      | AvaliacaoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: AvaliacaoCreateManyUsuarioInputEnvelope;
    set?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    disconnect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    delete?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    connect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    update?:
      | AvaliacaoUpdateWithWhereUniqueWithoutUsuarioInput
      | AvaliacaoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?:
      | AvaliacaoUpdateManyWithWhereWithoutUsuarioInput
      | AvaliacaoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: AvaliacaoScalarWhereInput | AvaliacaoScalarWhereInput[];
  };

  export type RefreshTokenUpdateManyWithoutUsuarioNestedInput = {
    create?:
      | XOR<RefreshTokenCreateWithoutUsuarioInput, RefreshTokenUncheckedCreateWithoutUsuarioInput>
      | RefreshTokenCreateWithoutUsuarioInput[]
      | RefreshTokenUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | RefreshTokenCreateOrConnectWithoutUsuarioInput
      | RefreshTokenCreateOrConnectWithoutUsuarioInput[];
    upsert?:
      | RefreshTokenUpsertWithWhereUniqueWithoutUsuarioInput
      | RefreshTokenUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: RefreshTokenCreateManyUsuarioInputEnvelope;
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    update?:
      | RefreshTokenUpdateWithWhereUniqueWithoutUsuarioInput
      | RefreshTokenUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?:
      | RefreshTokenUpdateManyWithWhereWithoutUsuarioInput
      | RefreshTokenUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type EnderecoUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<EnderecoCreateWithoutUsuarioInput, EnderecoUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: EnderecoCreateOrConnectWithoutUsuarioInput;
    upsert?: EnderecoUpsertWithoutUsuarioInput;
    disconnect?: EnderecoWhereInput | boolean;
    delete?: EnderecoWhereInput | boolean;
    connect?: EnderecoWhereUniqueInput;
    update?: XOR<
      XOR<EnderecoUpdateToOneWithWhereWithoutUsuarioInput, EnderecoUpdateWithoutUsuarioInput>,
      EnderecoUncheckedUpdateWithoutUsuarioInput
    >;
  };

  export type PedidoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?:
      | XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput>
      | PedidoCreateWithoutUsuarioInput[]
      | PedidoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | PedidoCreateOrConnectWithoutUsuarioInput
      | PedidoCreateOrConnectWithoutUsuarioInput[];
    upsert?:
      | PedidoUpsertWithWhereUniqueWithoutUsuarioInput
      | PedidoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: PedidoCreateManyUsuarioInputEnvelope;
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    update?:
      | PedidoUpdateWithWhereUniqueWithoutUsuarioInput
      | PedidoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?:
      | PedidoUpdateManyWithWhereWithoutUsuarioInput
      | PedidoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[];
  };

  export type AvaliacaoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?:
      | XOR<AvaliacaoCreateWithoutUsuarioInput, AvaliacaoUncheckedCreateWithoutUsuarioInput>
      | AvaliacaoCreateWithoutUsuarioInput[]
      | AvaliacaoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | AvaliacaoCreateOrConnectWithoutUsuarioInput
      | AvaliacaoCreateOrConnectWithoutUsuarioInput[];
    upsert?:
      | AvaliacaoUpsertWithWhereUniqueWithoutUsuarioInput
      | AvaliacaoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: AvaliacaoCreateManyUsuarioInputEnvelope;
    set?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    disconnect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    delete?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    connect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    update?:
      | AvaliacaoUpdateWithWhereUniqueWithoutUsuarioInput
      | AvaliacaoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?:
      | AvaliacaoUpdateManyWithWhereWithoutUsuarioInput
      | AvaliacaoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: AvaliacaoScalarWhereInput | AvaliacaoScalarWhereInput[];
  };

  export type RefreshTokenUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?:
      | XOR<RefreshTokenCreateWithoutUsuarioInput, RefreshTokenUncheckedCreateWithoutUsuarioInput>
      | RefreshTokenCreateWithoutUsuarioInput[]
      | RefreshTokenUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | RefreshTokenCreateOrConnectWithoutUsuarioInput
      | RefreshTokenCreateOrConnectWithoutUsuarioInput[];
    upsert?:
      | RefreshTokenUpsertWithWhereUniqueWithoutUsuarioInput
      | RefreshTokenUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: RefreshTokenCreateManyUsuarioInputEnvelope;
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    update?:
      | RefreshTokenUpdateWithWhereUniqueWithoutUsuarioInput
      | RefreshTokenUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?:
      | RefreshTokenUpdateManyWithWhereWithoutUsuarioInput
      | RefreshTokenUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[];
  };

  export type UsuarioCreateNestedOneWithoutEnderecoInput = {
    create?: XOR<UsuarioCreateWithoutEnderecoInput, UsuarioUncheckedCreateWithoutEnderecoInput>;
    connectOrCreate?: UsuarioCreateOrConnectWithoutEnderecoInput;
    connect?: UsuarioWhereUniqueInput;
  };

  export type EnumAddressTypeFieldUpdateOperationsInput = {
    set?: $Enums.AddressType;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type UsuarioUpdateOneRequiredWithoutEnderecoNestedInput = {
    create?: XOR<UsuarioCreateWithoutEnderecoInput, UsuarioUncheckedCreateWithoutEnderecoInput>;
    connectOrCreate?: UsuarioCreateOrConnectWithoutEnderecoInput;
    upsert?: UsuarioUpsertWithoutEnderecoInput;
    connect?: UsuarioWhereUniqueInput;
    update?: XOR<
      XOR<UsuarioUpdateToOneWithWhereWithoutEnderecoInput, UsuarioUpdateWithoutEnderecoInput>,
      UsuarioUncheckedUpdateWithoutEnderecoInput
    >;
  };

  export type AvaliacaoCreateNestedManyWithoutProdutoInput = {
    create?:
      | XOR<AvaliacaoCreateWithoutProdutoInput, AvaliacaoUncheckedCreateWithoutProdutoInput>
      | AvaliacaoCreateWithoutProdutoInput[]
      | AvaliacaoUncheckedCreateWithoutProdutoInput[];
    connectOrCreate?:
      | AvaliacaoCreateOrConnectWithoutProdutoInput
      | AvaliacaoCreateOrConnectWithoutProdutoInput[];
    createMany?: AvaliacaoCreateManyProdutoInputEnvelope;
    connect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
  };

  export type PedidoItemCreateNestedManyWithoutProdutoInput = {
    create?:
      | XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput>
      | PedidoItemCreateWithoutProdutoInput[]
      | PedidoItemUncheckedCreateWithoutProdutoInput[];
    connectOrCreate?:
      | PedidoItemCreateOrConnectWithoutProdutoInput
      | PedidoItemCreateOrConnectWithoutProdutoInput[];
    createMany?: PedidoItemCreateManyProdutoInputEnvelope;
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
  };

  export type AvaliacaoUncheckedCreateNestedManyWithoutProdutoInput = {
    create?:
      | XOR<AvaliacaoCreateWithoutProdutoInput, AvaliacaoUncheckedCreateWithoutProdutoInput>
      | AvaliacaoCreateWithoutProdutoInput[]
      | AvaliacaoUncheckedCreateWithoutProdutoInput[];
    connectOrCreate?:
      | AvaliacaoCreateOrConnectWithoutProdutoInput
      | AvaliacaoCreateOrConnectWithoutProdutoInput[];
    createMany?: AvaliacaoCreateManyProdutoInputEnvelope;
    connect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
  };

  export type PedidoItemUncheckedCreateNestedManyWithoutProdutoInput = {
    create?:
      | XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput>
      | PedidoItemCreateWithoutProdutoInput[]
      | PedidoItemUncheckedCreateWithoutProdutoInput[];
    connectOrCreate?:
      | PedidoItemCreateOrConnectWithoutProdutoInput
      | PedidoItemCreateOrConnectWithoutProdutoInput[];
    createMany?: PedidoItemCreateManyProdutoInputEnvelope;
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
  };

  export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type AvaliacaoUpdateManyWithoutProdutoNestedInput = {
    create?:
      | XOR<AvaliacaoCreateWithoutProdutoInput, AvaliacaoUncheckedCreateWithoutProdutoInput>
      | AvaliacaoCreateWithoutProdutoInput[]
      | AvaliacaoUncheckedCreateWithoutProdutoInput[];
    connectOrCreate?:
      | AvaliacaoCreateOrConnectWithoutProdutoInput
      | AvaliacaoCreateOrConnectWithoutProdutoInput[];
    upsert?:
      | AvaliacaoUpsertWithWhereUniqueWithoutProdutoInput
      | AvaliacaoUpsertWithWhereUniqueWithoutProdutoInput[];
    createMany?: AvaliacaoCreateManyProdutoInputEnvelope;
    set?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    disconnect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    delete?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    connect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    update?:
      | AvaliacaoUpdateWithWhereUniqueWithoutProdutoInput
      | AvaliacaoUpdateWithWhereUniqueWithoutProdutoInput[];
    updateMany?:
      | AvaliacaoUpdateManyWithWhereWithoutProdutoInput
      | AvaliacaoUpdateManyWithWhereWithoutProdutoInput[];
    deleteMany?: AvaliacaoScalarWhereInput | AvaliacaoScalarWhereInput[];
  };

  export type PedidoItemUpdateManyWithoutProdutoNestedInput = {
    create?:
      | XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput>
      | PedidoItemCreateWithoutProdutoInput[]
      | PedidoItemUncheckedCreateWithoutProdutoInput[];
    connectOrCreate?:
      | PedidoItemCreateOrConnectWithoutProdutoInput
      | PedidoItemCreateOrConnectWithoutProdutoInput[];
    upsert?:
      | PedidoItemUpsertWithWhereUniqueWithoutProdutoInput
      | PedidoItemUpsertWithWhereUniqueWithoutProdutoInput[];
    createMany?: PedidoItemCreateManyProdutoInputEnvelope;
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    update?:
      | PedidoItemUpdateWithWhereUniqueWithoutProdutoInput
      | PedidoItemUpdateWithWhereUniqueWithoutProdutoInput[];
    updateMany?:
      | PedidoItemUpdateManyWithWhereWithoutProdutoInput
      | PedidoItemUpdateManyWithWhereWithoutProdutoInput[];
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[];
  };

  export type AvaliacaoUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?:
      | XOR<AvaliacaoCreateWithoutProdutoInput, AvaliacaoUncheckedCreateWithoutProdutoInput>
      | AvaliacaoCreateWithoutProdutoInput[]
      | AvaliacaoUncheckedCreateWithoutProdutoInput[];
    connectOrCreate?:
      | AvaliacaoCreateOrConnectWithoutProdutoInput
      | AvaliacaoCreateOrConnectWithoutProdutoInput[];
    upsert?:
      | AvaliacaoUpsertWithWhereUniqueWithoutProdutoInput
      | AvaliacaoUpsertWithWhereUniqueWithoutProdutoInput[];
    createMany?: AvaliacaoCreateManyProdutoInputEnvelope;
    set?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    disconnect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    delete?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    connect?: AvaliacaoWhereUniqueInput | AvaliacaoWhereUniqueInput[];
    update?:
      | AvaliacaoUpdateWithWhereUniqueWithoutProdutoInput
      | AvaliacaoUpdateWithWhereUniqueWithoutProdutoInput[];
    updateMany?:
      | AvaliacaoUpdateManyWithWhereWithoutProdutoInput
      | AvaliacaoUpdateManyWithWhereWithoutProdutoInput[];
    deleteMany?: AvaliacaoScalarWhereInput | AvaliacaoScalarWhereInput[];
  };

  export type PedidoItemUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?:
      | XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput>
      | PedidoItemCreateWithoutProdutoInput[]
      | PedidoItemUncheckedCreateWithoutProdutoInput[];
    connectOrCreate?:
      | PedidoItemCreateOrConnectWithoutProdutoInput
      | PedidoItemCreateOrConnectWithoutProdutoInput[];
    upsert?:
      | PedidoItemUpsertWithWhereUniqueWithoutProdutoInput
      | PedidoItemUpsertWithWhereUniqueWithoutProdutoInput[];
    createMany?: PedidoItemCreateManyProdutoInputEnvelope;
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    update?:
      | PedidoItemUpdateWithWhereUniqueWithoutProdutoInput
      | PedidoItemUpdateWithWhereUniqueWithoutProdutoInput[];
    updateMany?:
      | PedidoItemUpdateManyWithWhereWithoutProdutoInput
      | PedidoItemUpdateManyWithWhereWithoutProdutoInput[];
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[];
  };

  export type ProdutoCreateNestedOneWithoutAvaliacoesInput = {
    create?: XOR<ProdutoCreateWithoutAvaliacoesInput, ProdutoUncheckedCreateWithoutAvaliacoesInput>;
    connectOrCreate?: ProdutoCreateOrConnectWithoutAvaliacoesInput;
    connect?: ProdutoWhereUniqueInput;
  };

  export type UsuarioCreateNestedOneWithoutAvaliacoesInput = {
    create?: XOR<UsuarioCreateWithoutAvaliacoesInput, UsuarioUncheckedCreateWithoutAvaliacoesInput>;
    connectOrCreate?: UsuarioCreateOrConnectWithoutAvaliacoesInput;
    connect?: UsuarioWhereUniqueInput;
  };

  export type ProdutoUpdateOneRequiredWithoutAvaliacoesNestedInput = {
    create?: XOR<ProdutoCreateWithoutAvaliacoesInput, ProdutoUncheckedCreateWithoutAvaliacoesInput>;
    connectOrCreate?: ProdutoCreateOrConnectWithoutAvaliacoesInput;
    upsert?: ProdutoUpsertWithoutAvaliacoesInput;
    connect?: ProdutoWhereUniqueInput;
    update?: XOR<
      XOR<ProdutoUpdateToOneWithWhereWithoutAvaliacoesInput, ProdutoUpdateWithoutAvaliacoesInput>,
      ProdutoUncheckedUpdateWithoutAvaliacoesInput
    >;
  };

  export type UsuarioUpdateOneRequiredWithoutAvaliacoesNestedInput = {
    create?: XOR<UsuarioCreateWithoutAvaliacoesInput, UsuarioUncheckedCreateWithoutAvaliacoesInput>;
    connectOrCreate?: UsuarioCreateOrConnectWithoutAvaliacoesInput;
    upsert?: UsuarioUpsertWithoutAvaliacoesInput;
    connect?: UsuarioWhereUniqueInput;
    update?: XOR<
      XOR<UsuarioUpdateToOneWithWhereWithoutAvaliacoesInput, UsuarioUpdateWithoutAvaliacoesInput>,
      UsuarioUncheckedUpdateWithoutAvaliacoesInput
    >;
  };

  export type UsuarioCreateNestedOneWithoutPedidosInput = {
    create?: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>;
    connectOrCreate?: UsuarioCreateOrConnectWithoutPedidosInput;
    connect?: UsuarioWhereUniqueInput;
  };

  export type PedidoItemCreateNestedManyWithoutPedidoInput = {
    create?:
      | XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>
      | PedidoItemCreateWithoutPedidoInput[]
      | PedidoItemUncheckedCreateWithoutPedidoInput[];
    connectOrCreate?:
      | PedidoItemCreateOrConnectWithoutPedidoInput
      | PedidoItemCreateOrConnectWithoutPedidoInput[];
    createMany?: PedidoItemCreateManyPedidoInputEnvelope;
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
  };

  export type CupomCreateNestedOneWithoutPedidosInput = {
    create?: XOR<CupomCreateWithoutPedidosInput, CupomUncheckedCreateWithoutPedidosInput>;
    connectOrCreate?: CupomCreateOrConnectWithoutPedidosInput;
    connect?: CupomWhereUniqueInput;
  };

  export type PedidoItemUncheckedCreateNestedManyWithoutPedidoInput = {
    create?:
      | XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>
      | PedidoItemCreateWithoutPedidoInput[]
      | PedidoItemUncheckedCreateWithoutPedidoInput[];
    connectOrCreate?:
      | PedidoItemCreateOrConnectWithoutPedidoInput
      | PedidoItemCreateOrConnectWithoutPedidoInput[];
    createMany?: PedidoItemCreateManyPedidoInputEnvelope;
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
  };

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus;
  };

  export type EnumPaymentTypeFieldUpdateOperationsInput = {
    set?: $Enums.PaymentType;
  };

  export type UsuarioUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>;
    connectOrCreate?: UsuarioCreateOrConnectWithoutPedidosInput;
    upsert?: UsuarioUpsertWithoutPedidosInput;
    connect?: UsuarioWhereUniqueInput;
    update?: XOR<
      XOR<UsuarioUpdateToOneWithWhereWithoutPedidosInput, UsuarioUpdateWithoutPedidosInput>,
      UsuarioUncheckedUpdateWithoutPedidosInput
    >;
  };

  export type PedidoItemUpdateManyWithoutPedidoNestedInput = {
    create?:
      | XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>
      | PedidoItemCreateWithoutPedidoInput[]
      | PedidoItemUncheckedCreateWithoutPedidoInput[];
    connectOrCreate?:
      | PedidoItemCreateOrConnectWithoutPedidoInput
      | PedidoItemCreateOrConnectWithoutPedidoInput[];
    upsert?:
      | PedidoItemUpsertWithWhereUniqueWithoutPedidoInput
      | PedidoItemUpsertWithWhereUniqueWithoutPedidoInput[];
    createMany?: PedidoItemCreateManyPedidoInputEnvelope;
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    update?:
      | PedidoItemUpdateWithWhereUniqueWithoutPedidoInput
      | PedidoItemUpdateWithWhereUniqueWithoutPedidoInput[];
    updateMany?:
      | PedidoItemUpdateManyWithWhereWithoutPedidoInput
      | PedidoItemUpdateManyWithWhereWithoutPedidoInput[];
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[];
  };

  export type CupomUpdateOneWithoutPedidosNestedInput = {
    create?: XOR<CupomCreateWithoutPedidosInput, CupomUncheckedCreateWithoutPedidosInput>;
    connectOrCreate?: CupomCreateOrConnectWithoutPedidosInput;
    upsert?: CupomUpsertWithoutPedidosInput;
    disconnect?: CupomWhereInput | boolean;
    delete?: CupomWhereInput | boolean;
    connect?: CupomWhereUniqueInput;
    update?: XOR<
      XOR<CupomUpdateToOneWithWhereWithoutPedidosInput, CupomUpdateWithoutPedidosInput>,
      CupomUncheckedUpdateWithoutPedidosInput
    >;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput = {
    create?:
      | XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>
      | PedidoItemCreateWithoutPedidoInput[]
      | PedidoItemUncheckedCreateWithoutPedidoInput[];
    connectOrCreate?:
      | PedidoItemCreateOrConnectWithoutPedidoInput
      | PedidoItemCreateOrConnectWithoutPedidoInput[];
    upsert?:
      | PedidoItemUpsertWithWhereUniqueWithoutPedidoInput
      | PedidoItemUpsertWithWhereUniqueWithoutPedidoInput[];
    createMany?: PedidoItemCreateManyPedidoInputEnvelope;
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[];
    update?:
      | PedidoItemUpdateWithWhereUniqueWithoutPedidoInput
      | PedidoItemUpdateWithWhereUniqueWithoutPedidoInput[];
    updateMany?:
      | PedidoItemUpdateManyWithWhereWithoutPedidoInput
      | PedidoItemUpdateManyWithWhereWithoutPedidoInput[];
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[];
  };

  export type ProdutoCreateNestedOneWithoutPedidoItemsInput = {
    create?: XOR<
      ProdutoCreateWithoutPedidoItemsInput,
      ProdutoUncheckedCreateWithoutPedidoItemsInput
    >;
    connectOrCreate?: ProdutoCreateOrConnectWithoutPedidoItemsInput;
    connect?: ProdutoWhereUniqueInput;
  };

  export type PedidoCreateNestedOneWithoutItensInput = {
    create?: XOR<PedidoCreateWithoutItensInput, PedidoUncheckedCreateWithoutItensInput>;
    connectOrCreate?: PedidoCreateOrConnectWithoutItensInput;
    connect?: PedidoWhereUniqueInput;
  };

  export type ProdutoUpdateOneRequiredWithoutPedidoItemsNestedInput = {
    create?: XOR<
      ProdutoCreateWithoutPedidoItemsInput,
      ProdutoUncheckedCreateWithoutPedidoItemsInput
    >;
    connectOrCreate?: ProdutoCreateOrConnectWithoutPedidoItemsInput;
    upsert?: ProdutoUpsertWithoutPedidoItemsInput;
    connect?: ProdutoWhereUniqueInput;
    update?: XOR<
      XOR<ProdutoUpdateToOneWithWhereWithoutPedidoItemsInput, ProdutoUpdateWithoutPedidoItemsInput>,
      ProdutoUncheckedUpdateWithoutPedidoItemsInput
    >;
  };

  export type PedidoUpdateOneRequiredWithoutItensNestedInput = {
    create?: XOR<PedidoCreateWithoutItensInput, PedidoUncheckedCreateWithoutItensInput>;
    connectOrCreate?: PedidoCreateOrConnectWithoutItensInput;
    upsert?: PedidoUpsertWithoutItensInput;
    connect?: PedidoWhereUniqueInput;
    update?: XOR<
      XOR<PedidoUpdateToOneWithWhereWithoutItensInput, PedidoUpdateWithoutItensInput>,
      PedidoUncheckedUpdateWithoutItensInput
    >;
  };

  export type PedidoCreateNestedManyWithoutCupomInput = {
    create?:
      | XOR<PedidoCreateWithoutCupomInput, PedidoUncheckedCreateWithoutCupomInput>
      | PedidoCreateWithoutCupomInput[]
      | PedidoUncheckedCreateWithoutCupomInput[];
    connectOrCreate?:
      | PedidoCreateOrConnectWithoutCupomInput
      | PedidoCreateOrConnectWithoutCupomInput[];
    createMany?: PedidoCreateManyCupomInputEnvelope;
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
  };

  export type PedidoUncheckedCreateNestedManyWithoutCupomInput = {
    create?:
      | XOR<PedidoCreateWithoutCupomInput, PedidoUncheckedCreateWithoutCupomInput>
      | PedidoCreateWithoutCupomInput[]
      | PedidoUncheckedCreateWithoutCupomInput[];
    connectOrCreate?:
      | PedidoCreateOrConnectWithoutCupomInput
      | PedidoCreateOrConnectWithoutCupomInput[];
    createMany?: PedidoCreateManyCupomInputEnvelope;
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
  };

  export type PedidoUpdateManyWithoutCupomNestedInput = {
    create?:
      | XOR<PedidoCreateWithoutCupomInput, PedidoUncheckedCreateWithoutCupomInput>
      | PedidoCreateWithoutCupomInput[]
      | PedidoUncheckedCreateWithoutCupomInput[];
    connectOrCreate?:
      | PedidoCreateOrConnectWithoutCupomInput
      | PedidoCreateOrConnectWithoutCupomInput[];
    upsert?:
      | PedidoUpsertWithWhereUniqueWithoutCupomInput
      | PedidoUpsertWithWhereUniqueWithoutCupomInput[];
    createMany?: PedidoCreateManyCupomInputEnvelope;
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    update?:
      | PedidoUpdateWithWhereUniqueWithoutCupomInput
      | PedidoUpdateWithWhereUniqueWithoutCupomInput[];
    updateMany?:
      | PedidoUpdateManyWithWhereWithoutCupomInput
      | PedidoUpdateManyWithWhereWithoutCupomInput[];
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[];
  };

  export type PedidoUncheckedUpdateManyWithoutCupomNestedInput = {
    create?:
      | XOR<PedidoCreateWithoutCupomInput, PedidoUncheckedCreateWithoutCupomInput>
      | PedidoCreateWithoutCupomInput[]
      | PedidoUncheckedCreateWithoutCupomInput[];
    connectOrCreate?:
      | PedidoCreateOrConnectWithoutCupomInput
      | PedidoCreateOrConnectWithoutCupomInput[];
    upsert?:
      | PedidoUpsertWithWhereUniqueWithoutCupomInput
      | PedidoUpsertWithWhereUniqueWithoutCupomInput[];
    createMany?: PedidoCreateManyCupomInputEnvelope;
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[];
    update?:
      | PedidoUpdateWithWhereUniqueWithoutCupomInput
      | PedidoUpdateWithWhereUniqueWithoutCupomInput[];
    updateMany?:
      | PedidoUpdateManyWithWhereWithoutCupomInput
      | PedidoUpdateManyWithWhereWithoutCupomInput[];
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[];
  };

  export type UsuarioCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<
      UsuarioCreateWithoutRefreshTokensInput,
      UsuarioUncheckedCreateWithoutRefreshTokensInput
    >;
    connectOrCreate?: UsuarioCreateOrConnectWithoutRefreshTokensInput;
    connect?: UsuarioWhereUniqueInput;
  };

  export type UsuarioUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<
      UsuarioCreateWithoutRefreshTokensInput,
      UsuarioUncheckedCreateWithoutRefreshTokensInput
    >;
    connectOrCreate?: UsuarioCreateOrConnectWithoutRefreshTokensInput;
    upsert?: UsuarioUpsertWithoutRefreshTokensInput;
    connect?: UsuarioWhereUniqueInput;
    update?: XOR<
      XOR<
        UsuarioUpdateToOneWithWhereWithoutRefreshTokensInput,
        UsuarioUpdateWithoutRefreshTokensInput
      >,
      UsuarioUncheckedUpdateWithoutRefreshTokensInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumUserTypeFilter<$PrismaModel>;
    _max?: NestedEnumUserTypeFilter<$PrismaModel>;
  };

  export type NestedEnumAddressTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AddressType | EnumAddressTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumAddressTypeFilter<$PrismaModel> | $Enums.AddressType;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedEnumAddressTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AddressType | EnumAddressTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumAddressTypeWithAggregatesFilter<$PrismaModel> | $Enums.AddressType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumAddressTypeFilter<$PrismaModel>;
    _max?: NestedEnumAddressTypeFilter<$PrismaModel>;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedFloatNullableFilter<$PrismaModel>;
    _min?: NestedFloatNullableFilter<$PrismaModel>;
    _max?: NestedFloatNullableFilter<$PrismaModel>;
  };

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
  };

  export type NestedEnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType;
  };

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>;
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>;
  };

  export type NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>;
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type EnderecoCreateWithoutUsuarioInput = {
    rua: string;
    numero: string;
    complemento?: string | null;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    tipo?: $Enums.AddressType;
    principal?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
  };

  export type EnderecoUncheckedCreateWithoutUsuarioInput = {
    id?: number;
    rua: string;
    numero: string;
    complemento?: string | null;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    tipo?: $Enums.AddressType;
    principal?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
  };

  export type EnderecoCreateOrConnectWithoutUsuarioInput = {
    where: EnderecoWhereUniqueInput;
    create: XOR<EnderecoCreateWithoutUsuarioInput, EnderecoUncheckedCreateWithoutUsuarioInput>;
  };

  export type PedidoCreateWithoutUsuarioInput = {
    status?: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data?: Date | string;
    atualizadoEm?: Date | string;
    endereco: string;
    itens?: PedidoItemCreateNestedManyWithoutPedidoInput;
    cupom?: CupomCreateNestedOneWithoutPedidosInput;
  };

  export type PedidoUncheckedCreateWithoutUsuarioInput = {
    id?: number;
    status?: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data?: Date | string;
    atualizadoEm?: Date | string;
    endereco: string;
    cupomId?: number | null;
    itens?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput;
  };

  export type PedidoCreateOrConnectWithoutUsuarioInput = {
    where: PedidoWhereUniqueInput;
    create: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput>;
  };

  export type PedidoCreateManyUsuarioInputEnvelope = {
    data: PedidoCreateManyUsuarioInput | PedidoCreateManyUsuarioInput[];
    skipDuplicates?: boolean;
  };

  export type AvaliacaoCreateWithoutUsuarioInput = {
    nota: number;
    comentario: string;
    data?: Date | string;
    produto: ProdutoCreateNestedOneWithoutAvaliacoesInput;
  };

  export type AvaliacaoUncheckedCreateWithoutUsuarioInput = {
    id?: number;
    nota: number;
    comentario: string;
    data?: Date | string;
    produtoId: number;
  };

  export type AvaliacaoCreateOrConnectWithoutUsuarioInput = {
    where: AvaliacaoWhereUniqueInput;
    create: XOR<AvaliacaoCreateWithoutUsuarioInput, AvaliacaoUncheckedCreateWithoutUsuarioInput>;
  };

  export type AvaliacaoCreateManyUsuarioInputEnvelope = {
    data: AvaliacaoCreateManyUsuarioInput | AvaliacaoCreateManyUsuarioInput[];
    skipDuplicates?: boolean;
  };

  export type RefreshTokenCreateWithoutUsuarioInput = {
    token: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RefreshTokenUncheckedCreateWithoutUsuarioInput = {
    id?: number;
    token: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RefreshTokenCreateOrConnectWithoutUsuarioInput = {
    where: RefreshTokenWhereUniqueInput;
    create: XOR<
      RefreshTokenCreateWithoutUsuarioInput,
      RefreshTokenUncheckedCreateWithoutUsuarioInput
    >;
  };

  export type RefreshTokenCreateManyUsuarioInputEnvelope = {
    data: RefreshTokenCreateManyUsuarioInput | RefreshTokenCreateManyUsuarioInput[];
    skipDuplicates?: boolean;
  };

  export type EnderecoUpsertWithoutUsuarioInput = {
    update: XOR<EnderecoUpdateWithoutUsuarioInput, EnderecoUncheckedUpdateWithoutUsuarioInput>;
    create: XOR<EnderecoCreateWithoutUsuarioInput, EnderecoUncheckedCreateWithoutUsuarioInput>;
    where?: EnderecoWhereInput;
  };

  export type EnderecoUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: EnderecoWhereInput;
    data: XOR<EnderecoUpdateWithoutUsuarioInput, EnderecoUncheckedUpdateWithoutUsuarioInput>;
  };

  export type EnderecoUpdateWithoutUsuarioInput = {
    rua?: StringFieldUpdateOperationsInput | string;
    numero?: StringFieldUpdateOperationsInput | string;
    complemento?: NullableStringFieldUpdateOperationsInput | string | null;
    bairro?: StringFieldUpdateOperationsInput | string;
    cidade?: StringFieldUpdateOperationsInput | string;
    estado?: StringFieldUpdateOperationsInput | string;
    cep?: StringFieldUpdateOperationsInput | string;
    tipo?: EnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType;
    principal?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EnderecoUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number;
    rua?: StringFieldUpdateOperationsInput | string;
    numero?: StringFieldUpdateOperationsInput | string;
    complemento?: NullableStringFieldUpdateOperationsInput | string | null;
    bairro?: StringFieldUpdateOperationsInput | string;
    cidade?: StringFieldUpdateOperationsInput | string;
    estado?: StringFieldUpdateOperationsInput | string;
    cep?: StringFieldUpdateOperationsInput | string;
    tipo?: EnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType;
    principal?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PedidoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: PedidoWhereUniqueInput;
    update: XOR<PedidoUpdateWithoutUsuarioInput, PedidoUncheckedUpdateWithoutUsuarioInput>;
    create: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput>;
  };

  export type PedidoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: PedidoWhereUniqueInput;
    data: XOR<PedidoUpdateWithoutUsuarioInput, PedidoUncheckedUpdateWithoutUsuarioInput>;
  };

  export type PedidoUpdateManyWithWhereWithoutUsuarioInput = {
    where: PedidoScalarWhereInput;
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyWithoutUsuarioInput>;
  };

  export type PedidoScalarWhereInput = {
    AND?: PedidoScalarWhereInput | PedidoScalarWhereInput[];
    OR?: PedidoScalarWhereInput[];
    NOT?: PedidoScalarWhereInput | PedidoScalarWhereInput[];
    id?: IntFilter<'Pedido'> | number;
    status?: EnumOrderStatusFilter<'Pedido'> | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFilter<'Pedido'> | $Enums.PaymentType;
    valorTotal?: FloatFilter<'Pedido'> | number;
    frete?: FloatFilter<'Pedido'> | number;
    data?: DateTimeFilter<'Pedido'> | Date | string;
    atualizadoEm?: DateTimeFilter<'Pedido'> | Date | string;
    endereco?: StringFilter<'Pedido'> | string;
    usuarioId?: IntFilter<'Pedido'> | number;
    cupomId?: IntNullableFilter<'Pedido'> | number | null;
  };

  export type AvaliacaoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: AvaliacaoWhereUniqueInput;
    update: XOR<AvaliacaoUpdateWithoutUsuarioInput, AvaliacaoUncheckedUpdateWithoutUsuarioInput>;
    create: XOR<AvaliacaoCreateWithoutUsuarioInput, AvaliacaoUncheckedCreateWithoutUsuarioInput>;
  };

  export type AvaliacaoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: AvaliacaoWhereUniqueInput;
    data: XOR<AvaliacaoUpdateWithoutUsuarioInput, AvaliacaoUncheckedUpdateWithoutUsuarioInput>;
  };

  export type AvaliacaoUpdateManyWithWhereWithoutUsuarioInput = {
    where: AvaliacaoScalarWhereInput;
    data: XOR<AvaliacaoUpdateManyMutationInput, AvaliacaoUncheckedUpdateManyWithoutUsuarioInput>;
  };

  export type AvaliacaoScalarWhereInput = {
    AND?: AvaliacaoScalarWhereInput | AvaliacaoScalarWhereInput[];
    OR?: AvaliacaoScalarWhereInput[];
    NOT?: AvaliacaoScalarWhereInput | AvaliacaoScalarWhereInput[];
    id?: IntFilter<'Avaliacao'> | number;
    nota?: IntFilter<'Avaliacao'> | number;
    comentario?: StringFilter<'Avaliacao'> | string;
    data?: DateTimeFilter<'Avaliacao'> | Date | string;
    produtoId?: IntFilter<'Avaliacao'> | number;
    usuarioId?: IntFilter<'Avaliacao'> | number;
  };

  export type RefreshTokenUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: RefreshTokenWhereUniqueInput;
    update: XOR<
      RefreshTokenUpdateWithoutUsuarioInput,
      RefreshTokenUncheckedUpdateWithoutUsuarioInput
    >;
    create: XOR<
      RefreshTokenCreateWithoutUsuarioInput,
      RefreshTokenUncheckedCreateWithoutUsuarioInput
    >;
  };

  export type RefreshTokenUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: RefreshTokenWhereUniqueInput;
    data: XOR<
      RefreshTokenUpdateWithoutUsuarioInput,
      RefreshTokenUncheckedUpdateWithoutUsuarioInput
    >;
  };

  export type RefreshTokenUpdateManyWithWhereWithoutUsuarioInput = {
    where: RefreshTokenScalarWhereInput;
    data: XOR<
      RefreshTokenUpdateManyMutationInput,
      RefreshTokenUncheckedUpdateManyWithoutUsuarioInput
    >;
  };

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[];
    OR?: RefreshTokenScalarWhereInput[];
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[];
    id?: IntFilter<'RefreshToken'> | number;
    token?: StringFilter<'RefreshToken'> | string;
    expiresAt?: DateTimeFilter<'RefreshToken'> | Date | string;
    userId?: IntFilter<'RefreshToken'> | number;
    createdAt?: DateTimeFilter<'RefreshToken'> | Date | string;
    updatedAt?: DateTimeFilter<'RefreshToken'> | Date | string;
  };

  export type UsuarioCreateWithoutEnderecoInput = {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario?: $Enums.UserType;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    pedidos?: PedidoCreateNestedManyWithoutUsuarioInput;
    avaliacoes?: AvaliacaoCreateNestedManyWithoutUsuarioInput;
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioUncheckedCreateWithoutEnderecoInput = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario?: $Enums.UserType;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    pedidos?: PedidoUncheckedCreateNestedManyWithoutUsuarioInput;
    avaliacoes?: AvaliacaoUncheckedCreateNestedManyWithoutUsuarioInput;
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioCreateOrConnectWithoutEnderecoInput = {
    where: UsuarioWhereUniqueInput;
    create: XOR<UsuarioCreateWithoutEnderecoInput, UsuarioUncheckedCreateWithoutEnderecoInput>;
  };

  export type UsuarioUpsertWithoutEnderecoInput = {
    update: XOR<UsuarioUpdateWithoutEnderecoInput, UsuarioUncheckedUpdateWithoutEnderecoInput>;
    create: XOR<UsuarioCreateWithoutEnderecoInput, UsuarioUncheckedCreateWithoutEnderecoInput>;
    where?: UsuarioWhereInput;
  };

  export type UsuarioUpdateToOneWithWhereWithoutEnderecoInput = {
    where?: UsuarioWhereInput;
    data: XOR<UsuarioUpdateWithoutEnderecoInput, UsuarioUncheckedUpdateWithoutEnderecoInput>;
  };

  export type UsuarioUpdateWithoutEnderecoInput = {
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    pedidos?: PedidoUpdateManyWithoutUsuarioNestedInput;
    avaliacoes?: AvaliacaoUpdateManyWithoutUsuarioNestedInput;
    refreshTokens?: RefreshTokenUpdateManyWithoutUsuarioNestedInput;
  };

  export type UsuarioUncheckedUpdateWithoutEnderecoInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    pedidos?: PedidoUncheckedUpdateManyWithoutUsuarioNestedInput;
    avaliacoes?: AvaliacaoUncheckedUpdateManyWithoutUsuarioNestedInput;
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUsuarioNestedInput;
  };

  export type AvaliacaoCreateWithoutProdutoInput = {
    nota: number;
    comentario: string;
    data?: Date | string;
    usuario: UsuarioCreateNestedOneWithoutAvaliacoesInput;
  };

  export type AvaliacaoUncheckedCreateWithoutProdutoInput = {
    id?: number;
    nota: number;
    comentario: string;
    data?: Date | string;
    usuarioId: number;
  };

  export type AvaliacaoCreateOrConnectWithoutProdutoInput = {
    where: AvaliacaoWhereUniqueInput;
    create: XOR<AvaliacaoCreateWithoutProdutoInput, AvaliacaoUncheckedCreateWithoutProdutoInput>;
  };

  export type AvaliacaoCreateManyProdutoInputEnvelope = {
    data: AvaliacaoCreateManyProdutoInput | AvaliacaoCreateManyProdutoInput[];
    skipDuplicates?: boolean;
  };

  export type PedidoItemCreateWithoutProdutoInput = {
    quantidade: number;
    preco: number;
    tamanho: string;
    pedido: PedidoCreateNestedOneWithoutItensInput;
  };

  export type PedidoItemUncheckedCreateWithoutProdutoInput = {
    id?: number;
    quantidade: number;
    preco: number;
    tamanho: string;
    pedidoId: number;
  };

  export type PedidoItemCreateOrConnectWithoutProdutoInput = {
    where: PedidoItemWhereUniqueInput;
    create: XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput>;
  };

  export type PedidoItemCreateManyProdutoInputEnvelope = {
    data: PedidoItemCreateManyProdutoInput | PedidoItemCreateManyProdutoInput[];
    skipDuplicates?: boolean;
  };

  export type AvaliacaoUpsertWithWhereUniqueWithoutProdutoInput = {
    where: AvaliacaoWhereUniqueInput;
    update: XOR<AvaliacaoUpdateWithoutProdutoInput, AvaliacaoUncheckedUpdateWithoutProdutoInput>;
    create: XOR<AvaliacaoCreateWithoutProdutoInput, AvaliacaoUncheckedCreateWithoutProdutoInput>;
  };

  export type AvaliacaoUpdateWithWhereUniqueWithoutProdutoInput = {
    where: AvaliacaoWhereUniqueInput;
    data: XOR<AvaliacaoUpdateWithoutProdutoInput, AvaliacaoUncheckedUpdateWithoutProdutoInput>;
  };

  export type AvaliacaoUpdateManyWithWhereWithoutProdutoInput = {
    where: AvaliacaoScalarWhereInput;
    data: XOR<AvaliacaoUpdateManyMutationInput, AvaliacaoUncheckedUpdateManyWithoutProdutoInput>;
  };

  export type PedidoItemUpsertWithWhereUniqueWithoutProdutoInput = {
    where: PedidoItemWhereUniqueInput;
    update: XOR<PedidoItemUpdateWithoutProdutoInput, PedidoItemUncheckedUpdateWithoutProdutoInput>;
    create: XOR<PedidoItemCreateWithoutProdutoInput, PedidoItemUncheckedCreateWithoutProdutoInput>;
  };

  export type PedidoItemUpdateWithWhereUniqueWithoutProdutoInput = {
    where: PedidoItemWhereUniqueInput;
    data: XOR<PedidoItemUpdateWithoutProdutoInput, PedidoItemUncheckedUpdateWithoutProdutoInput>;
  };

  export type PedidoItemUpdateManyWithWhereWithoutProdutoInput = {
    where: PedidoItemScalarWhereInput;
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyWithoutProdutoInput>;
  };

  export type PedidoItemScalarWhereInput = {
    AND?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[];
    OR?: PedidoItemScalarWhereInput[];
    NOT?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[];
    id?: IntFilter<'PedidoItem'> | number;
    quantidade?: IntFilter<'PedidoItem'> | number;
    preco?: FloatFilter<'PedidoItem'> | number;
    tamanho?: StringFilter<'PedidoItem'> | string;
    produtoId?: IntFilter<'PedidoItem'> | number;
    pedidoId?: IntFilter<'PedidoItem'> | number;
  };

  export type ProdutoCreateWithoutAvaliacoesInput = {
    nome: string;
    descricao: string;
    preco: number;
    desconto?: number | null;
    marca: string;
    categoria: string;
    subcategoria: string;
    imagem: string;
    imagens: string;
    tamanhos: string;
    estoque?: number;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    pedidoItems?: PedidoItemCreateNestedManyWithoutProdutoInput;
  };

  export type ProdutoUncheckedCreateWithoutAvaliacoesInput = {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    desconto?: number | null;
    marca: string;
    categoria: string;
    subcategoria: string;
    imagem: string;
    imagens: string;
    tamanhos: string;
    estoque?: number;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    pedidoItems?: PedidoItemUncheckedCreateNestedManyWithoutProdutoInput;
  };

  export type ProdutoCreateOrConnectWithoutAvaliacoesInput = {
    where: ProdutoWhereUniqueInput;
    create: XOR<ProdutoCreateWithoutAvaliacoesInput, ProdutoUncheckedCreateWithoutAvaliacoesInput>;
  };

  export type UsuarioCreateWithoutAvaliacoesInput = {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario?: $Enums.UserType;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    endereco?: EnderecoCreateNestedOneWithoutUsuarioInput;
    pedidos?: PedidoCreateNestedManyWithoutUsuarioInput;
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioUncheckedCreateWithoutAvaliacoesInput = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario?: $Enums.UserType;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    endereco?: EnderecoUncheckedCreateNestedOneWithoutUsuarioInput;
    pedidos?: PedidoUncheckedCreateNestedManyWithoutUsuarioInput;
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioCreateOrConnectWithoutAvaliacoesInput = {
    where: UsuarioWhereUniqueInput;
    create: XOR<UsuarioCreateWithoutAvaliacoesInput, UsuarioUncheckedCreateWithoutAvaliacoesInput>;
  };

  export type ProdutoUpsertWithoutAvaliacoesInput = {
    update: XOR<ProdutoUpdateWithoutAvaliacoesInput, ProdutoUncheckedUpdateWithoutAvaliacoesInput>;
    create: XOR<ProdutoCreateWithoutAvaliacoesInput, ProdutoUncheckedCreateWithoutAvaliacoesInput>;
    where?: ProdutoWhereInput;
  };

  export type ProdutoUpdateToOneWithWhereWithoutAvaliacoesInput = {
    where?: ProdutoWhereInput;
    data: XOR<ProdutoUpdateWithoutAvaliacoesInput, ProdutoUncheckedUpdateWithoutAvaliacoesInput>;
  };

  export type ProdutoUpdateWithoutAvaliacoesInput = {
    nome?: StringFieldUpdateOperationsInput | string;
    descricao?: StringFieldUpdateOperationsInput | string;
    preco?: FloatFieldUpdateOperationsInput | number;
    desconto?: NullableFloatFieldUpdateOperationsInput | number | null;
    marca?: StringFieldUpdateOperationsInput | string;
    categoria?: StringFieldUpdateOperationsInput | string;
    subcategoria?: StringFieldUpdateOperationsInput | string;
    imagem?: StringFieldUpdateOperationsInput | string;
    imagens?: StringFieldUpdateOperationsInput | string;
    tamanhos?: StringFieldUpdateOperationsInput | string;
    estoque?: IntFieldUpdateOperationsInput | number;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    pedidoItems?: PedidoItemUpdateManyWithoutProdutoNestedInput;
  };

  export type ProdutoUncheckedUpdateWithoutAvaliacoesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nome?: StringFieldUpdateOperationsInput | string;
    descricao?: StringFieldUpdateOperationsInput | string;
    preco?: FloatFieldUpdateOperationsInput | number;
    desconto?: NullableFloatFieldUpdateOperationsInput | number | null;
    marca?: StringFieldUpdateOperationsInput | string;
    categoria?: StringFieldUpdateOperationsInput | string;
    subcategoria?: StringFieldUpdateOperationsInput | string;
    imagem?: StringFieldUpdateOperationsInput | string;
    imagens?: StringFieldUpdateOperationsInput | string;
    tamanhos?: StringFieldUpdateOperationsInput | string;
    estoque?: IntFieldUpdateOperationsInput | number;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    pedidoItems?: PedidoItemUncheckedUpdateManyWithoutProdutoNestedInput;
  };

  export type UsuarioUpsertWithoutAvaliacoesInput = {
    update: XOR<UsuarioUpdateWithoutAvaliacoesInput, UsuarioUncheckedUpdateWithoutAvaliacoesInput>;
    create: XOR<UsuarioCreateWithoutAvaliacoesInput, UsuarioUncheckedCreateWithoutAvaliacoesInput>;
    where?: UsuarioWhereInput;
  };

  export type UsuarioUpdateToOneWithWhereWithoutAvaliacoesInput = {
    where?: UsuarioWhereInput;
    data: XOR<UsuarioUpdateWithoutAvaliacoesInput, UsuarioUncheckedUpdateWithoutAvaliacoesInput>;
  };

  export type UsuarioUpdateWithoutAvaliacoesInput = {
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: EnderecoUpdateOneWithoutUsuarioNestedInput;
    pedidos?: PedidoUpdateManyWithoutUsuarioNestedInput;
    refreshTokens?: RefreshTokenUpdateManyWithoutUsuarioNestedInput;
  };

  export type UsuarioUncheckedUpdateWithoutAvaliacoesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: EnderecoUncheckedUpdateOneWithoutUsuarioNestedInput;
    pedidos?: PedidoUncheckedUpdateManyWithoutUsuarioNestedInput;
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUsuarioNestedInput;
  };

  export type UsuarioCreateWithoutPedidosInput = {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario?: $Enums.UserType;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    endereco?: EnderecoCreateNestedOneWithoutUsuarioInput;
    avaliacoes?: AvaliacaoCreateNestedManyWithoutUsuarioInput;
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioUncheckedCreateWithoutPedidosInput = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario?: $Enums.UserType;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    endereco?: EnderecoUncheckedCreateNestedOneWithoutUsuarioInput;
    avaliacoes?: AvaliacaoUncheckedCreateNestedManyWithoutUsuarioInput;
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioCreateOrConnectWithoutPedidosInput = {
    where: UsuarioWhereUniqueInput;
    create: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>;
  };

  export type PedidoItemCreateWithoutPedidoInput = {
    quantidade: number;
    preco: number;
    tamanho: string;
    produto: ProdutoCreateNestedOneWithoutPedidoItemsInput;
  };

  export type PedidoItemUncheckedCreateWithoutPedidoInput = {
    id?: number;
    quantidade: number;
    preco: number;
    tamanho: string;
    produtoId: number;
  };

  export type PedidoItemCreateOrConnectWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput;
    create: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>;
  };

  export type PedidoItemCreateManyPedidoInputEnvelope = {
    data: PedidoItemCreateManyPedidoInput | PedidoItemCreateManyPedidoInput[];
    skipDuplicates?: boolean;
  };

  export type CupomCreateWithoutPedidosInput = {
    codigo: string;
    desconto: number;
    tipo?: string;
    valorMinimo?: number | null;
    expiracao: Date | string;
    usado?: boolean;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
  };

  export type CupomUncheckedCreateWithoutPedidosInput = {
    id?: number;
    codigo: string;
    desconto: number;
    tipo?: string;
    valorMinimo?: number | null;
    expiracao: Date | string;
    usado?: boolean;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
  };

  export type CupomCreateOrConnectWithoutPedidosInput = {
    where: CupomWhereUniqueInput;
    create: XOR<CupomCreateWithoutPedidosInput, CupomUncheckedCreateWithoutPedidosInput>;
  };

  export type UsuarioUpsertWithoutPedidosInput = {
    update: XOR<UsuarioUpdateWithoutPedidosInput, UsuarioUncheckedUpdateWithoutPedidosInput>;
    create: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>;
    where?: UsuarioWhereInput;
  };

  export type UsuarioUpdateToOneWithWhereWithoutPedidosInput = {
    where?: UsuarioWhereInput;
    data: XOR<UsuarioUpdateWithoutPedidosInput, UsuarioUncheckedUpdateWithoutPedidosInput>;
  };

  export type UsuarioUpdateWithoutPedidosInput = {
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: EnderecoUpdateOneWithoutUsuarioNestedInput;
    avaliacoes?: AvaliacaoUpdateManyWithoutUsuarioNestedInput;
    refreshTokens?: RefreshTokenUpdateManyWithoutUsuarioNestedInput;
  };

  export type UsuarioUncheckedUpdateWithoutPedidosInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: EnderecoUncheckedUpdateOneWithoutUsuarioNestedInput;
    avaliacoes?: AvaliacaoUncheckedUpdateManyWithoutUsuarioNestedInput;
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUsuarioNestedInput;
  };

  export type PedidoItemUpsertWithWhereUniqueWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput;
    update: XOR<PedidoItemUpdateWithoutPedidoInput, PedidoItemUncheckedUpdateWithoutPedidoInput>;
    create: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>;
  };

  export type PedidoItemUpdateWithWhereUniqueWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput;
    data: XOR<PedidoItemUpdateWithoutPedidoInput, PedidoItemUncheckedUpdateWithoutPedidoInput>;
  };

  export type PedidoItemUpdateManyWithWhereWithoutPedidoInput = {
    where: PedidoItemScalarWhereInput;
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyWithoutPedidoInput>;
  };

  export type CupomUpsertWithoutPedidosInput = {
    update: XOR<CupomUpdateWithoutPedidosInput, CupomUncheckedUpdateWithoutPedidosInput>;
    create: XOR<CupomCreateWithoutPedidosInput, CupomUncheckedCreateWithoutPedidosInput>;
    where?: CupomWhereInput;
  };

  export type CupomUpdateToOneWithWhereWithoutPedidosInput = {
    where?: CupomWhereInput;
    data: XOR<CupomUpdateWithoutPedidosInput, CupomUncheckedUpdateWithoutPedidosInput>;
  };

  export type CupomUpdateWithoutPedidosInput = {
    codigo?: StringFieldUpdateOperationsInput | string;
    desconto?: FloatFieldUpdateOperationsInput | number;
    tipo?: StringFieldUpdateOperationsInput | string;
    valorMinimo?: NullableFloatFieldUpdateOperationsInput | number | null;
    expiracao?: DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: BoolFieldUpdateOperationsInput | boolean;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CupomUncheckedUpdateWithoutPedidosInput = {
    id?: IntFieldUpdateOperationsInput | number;
    codigo?: StringFieldUpdateOperationsInput | string;
    desconto?: FloatFieldUpdateOperationsInput | number;
    tipo?: StringFieldUpdateOperationsInput | string;
    valorMinimo?: NullableFloatFieldUpdateOperationsInput | number | null;
    expiracao?: DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: BoolFieldUpdateOperationsInput | boolean;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProdutoCreateWithoutPedidoItemsInput = {
    nome: string;
    descricao: string;
    preco: number;
    desconto?: number | null;
    marca: string;
    categoria: string;
    subcategoria: string;
    imagem: string;
    imagens: string;
    tamanhos: string;
    estoque?: number;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    avaliacoes?: AvaliacaoCreateNestedManyWithoutProdutoInput;
  };

  export type ProdutoUncheckedCreateWithoutPedidoItemsInput = {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    desconto?: number | null;
    marca: string;
    categoria: string;
    subcategoria: string;
    imagem: string;
    imagens: string;
    tamanhos: string;
    estoque?: number;
    ativo?: boolean;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    avaliacoes?: AvaliacaoUncheckedCreateNestedManyWithoutProdutoInput;
  };

  export type ProdutoCreateOrConnectWithoutPedidoItemsInput = {
    where: ProdutoWhereUniqueInput;
    create: XOR<
      ProdutoCreateWithoutPedidoItemsInput,
      ProdutoUncheckedCreateWithoutPedidoItemsInput
    >;
  };

  export type PedidoCreateWithoutItensInput = {
    status?: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data?: Date | string;
    atualizadoEm?: Date | string;
    endereco: string;
    usuario: UsuarioCreateNestedOneWithoutPedidosInput;
    cupom?: CupomCreateNestedOneWithoutPedidosInput;
  };

  export type PedidoUncheckedCreateWithoutItensInput = {
    id?: number;
    status?: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data?: Date | string;
    atualizadoEm?: Date | string;
    endereco: string;
    usuarioId: number;
    cupomId?: number | null;
  };

  export type PedidoCreateOrConnectWithoutItensInput = {
    where: PedidoWhereUniqueInput;
    create: XOR<PedidoCreateWithoutItensInput, PedidoUncheckedCreateWithoutItensInput>;
  };

  export type ProdutoUpsertWithoutPedidoItemsInput = {
    update: XOR<
      ProdutoUpdateWithoutPedidoItemsInput,
      ProdutoUncheckedUpdateWithoutPedidoItemsInput
    >;
    create: XOR<
      ProdutoCreateWithoutPedidoItemsInput,
      ProdutoUncheckedCreateWithoutPedidoItemsInput
    >;
    where?: ProdutoWhereInput;
  };

  export type ProdutoUpdateToOneWithWhereWithoutPedidoItemsInput = {
    where?: ProdutoWhereInput;
    data: XOR<ProdutoUpdateWithoutPedidoItemsInput, ProdutoUncheckedUpdateWithoutPedidoItemsInput>;
  };

  export type ProdutoUpdateWithoutPedidoItemsInput = {
    nome?: StringFieldUpdateOperationsInput | string;
    descricao?: StringFieldUpdateOperationsInput | string;
    preco?: FloatFieldUpdateOperationsInput | number;
    desconto?: NullableFloatFieldUpdateOperationsInput | number | null;
    marca?: StringFieldUpdateOperationsInput | string;
    categoria?: StringFieldUpdateOperationsInput | string;
    subcategoria?: StringFieldUpdateOperationsInput | string;
    imagem?: StringFieldUpdateOperationsInput | string;
    imagens?: StringFieldUpdateOperationsInput | string;
    tamanhos?: StringFieldUpdateOperationsInput | string;
    estoque?: IntFieldUpdateOperationsInput | number;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    avaliacoes?: AvaliacaoUpdateManyWithoutProdutoNestedInput;
  };

  export type ProdutoUncheckedUpdateWithoutPedidoItemsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nome?: StringFieldUpdateOperationsInput | string;
    descricao?: StringFieldUpdateOperationsInput | string;
    preco?: FloatFieldUpdateOperationsInput | number;
    desconto?: NullableFloatFieldUpdateOperationsInput | number | null;
    marca?: StringFieldUpdateOperationsInput | string;
    categoria?: StringFieldUpdateOperationsInput | string;
    subcategoria?: StringFieldUpdateOperationsInput | string;
    imagem?: StringFieldUpdateOperationsInput | string;
    imagens?: StringFieldUpdateOperationsInput | string;
    tamanhos?: StringFieldUpdateOperationsInput | string;
    estoque?: IntFieldUpdateOperationsInput | number;
    ativo?: BoolFieldUpdateOperationsInput | boolean;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    avaliacoes?: AvaliacaoUncheckedUpdateManyWithoutProdutoNestedInput;
  };

  export type PedidoUpsertWithoutItensInput = {
    update: XOR<PedidoUpdateWithoutItensInput, PedidoUncheckedUpdateWithoutItensInput>;
    create: XOR<PedidoCreateWithoutItensInput, PedidoUncheckedCreateWithoutItensInput>;
    where?: PedidoWhereInput;
  };

  export type PedidoUpdateToOneWithWhereWithoutItensInput = {
    where?: PedidoWhereInput;
    data: XOR<PedidoUpdateWithoutItensInput, PedidoUncheckedUpdateWithoutItensInput>;
  };

  export type PedidoUpdateWithoutItensInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
    usuario?: UsuarioUpdateOneRequiredWithoutPedidosNestedInput;
    cupom?: CupomUpdateOneWithoutPedidosNestedInput;
  };

  export type PedidoUncheckedUpdateWithoutItensInput = {
    id?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
    usuarioId?: IntFieldUpdateOperationsInput | number;
    cupomId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type PedidoCreateWithoutCupomInput = {
    status?: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data?: Date | string;
    atualizadoEm?: Date | string;
    endereco: string;
    usuario: UsuarioCreateNestedOneWithoutPedidosInput;
    itens?: PedidoItemCreateNestedManyWithoutPedidoInput;
  };

  export type PedidoUncheckedCreateWithoutCupomInput = {
    id?: number;
    status?: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data?: Date | string;
    atualizadoEm?: Date | string;
    endereco: string;
    usuarioId: number;
    itens?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput;
  };

  export type PedidoCreateOrConnectWithoutCupomInput = {
    where: PedidoWhereUniqueInput;
    create: XOR<PedidoCreateWithoutCupomInput, PedidoUncheckedCreateWithoutCupomInput>;
  };

  export type PedidoCreateManyCupomInputEnvelope = {
    data: PedidoCreateManyCupomInput | PedidoCreateManyCupomInput[];
    skipDuplicates?: boolean;
  };

  export type PedidoUpsertWithWhereUniqueWithoutCupomInput = {
    where: PedidoWhereUniqueInput;
    update: XOR<PedidoUpdateWithoutCupomInput, PedidoUncheckedUpdateWithoutCupomInput>;
    create: XOR<PedidoCreateWithoutCupomInput, PedidoUncheckedCreateWithoutCupomInput>;
  };

  export type PedidoUpdateWithWhereUniqueWithoutCupomInput = {
    where: PedidoWhereUniqueInput;
    data: XOR<PedidoUpdateWithoutCupomInput, PedidoUncheckedUpdateWithoutCupomInput>;
  };

  export type PedidoUpdateManyWithWhereWithoutCupomInput = {
    where: PedidoScalarWhereInput;
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyWithoutCupomInput>;
  };

  export type UsuarioCreateWithoutRefreshTokensInput = {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario?: $Enums.UserType;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    endereco?: EnderecoCreateNestedOneWithoutUsuarioInput;
    pedidos?: PedidoCreateNestedManyWithoutUsuarioInput;
    avaliacoes?: AvaliacaoCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioUncheckedCreateWithoutRefreshTokensInput = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario?: $Enums.UserType;
    criadoEm?: Date | string;
    atualizadoEm?: Date | string;
    endereco?: EnderecoUncheckedCreateNestedOneWithoutUsuarioInput;
    pedidos?: PedidoUncheckedCreateNestedManyWithoutUsuarioInput;
    avaliacoes?: AvaliacaoUncheckedCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioCreateOrConnectWithoutRefreshTokensInput = {
    where: UsuarioWhereUniqueInput;
    create: XOR<
      UsuarioCreateWithoutRefreshTokensInput,
      UsuarioUncheckedCreateWithoutRefreshTokensInput
    >;
  };

  export type UsuarioUpsertWithoutRefreshTokensInput = {
    update: XOR<
      UsuarioUpdateWithoutRefreshTokensInput,
      UsuarioUncheckedUpdateWithoutRefreshTokensInput
    >;
    create: XOR<
      UsuarioCreateWithoutRefreshTokensInput,
      UsuarioUncheckedCreateWithoutRefreshTokensInput
    >;
    where?: UsuarioWhereInput;
  };

  export type UsuarioUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UsuarioWhereInput;
    data: XOR<
      UsuarioUpdateWithoutRefreshTokensInput,
      UsuarioUncheckedUpdateWithoutRefreshTokensInput
    >;
  };

  export type UsuarioUpdateWithoutRefreshTokensInput = {
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: EnderecoUpdateOneWithoutUsuarioNestedInput;
    pedidos?: PedidoUpdateManyWithoutUsuarioNestedInput;
    avaliacoes?: AvaliacaoUpdateManyWithoutUsuarioNestedInput;
  };

  export type UsuarioUncheckedUpdateWithoutRefreshTokensInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nome?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    senha?: StringFieldUpdateOperationsInput | string;
    cpf?: StringFieldUpdateOperationsInput | string;
    tipoUsuario?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType;
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: EnderecoUncheckedUpdateOneWithoutUsuarioNestedInput;
    pedidos?: PedidoUncheckedUpdateManyWithoutUsuarioNestedInput;
    avaliacoes?: AvaliacaoUncheckedUpdateManyWithoutUsuarioNestedInput;
  };

  export type PedidoCreateManyUsuarioInput = {
    id?: number;
    status?: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data?: Date | string;
    atualizadoEm?: Date | string;
    endereco: string;
    cupomId?: number | null;
  };

  export type AvaliacaoCreateManyUsuarioInput = {
    id?: number;
    nota: number;
    comentario: string;
    data?: Date | string;
    produtoId: number;
  };

  export type RefreshTokenCreateManyUsuarioInput = {
    id?: number;
    token: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PedidoUpdateWithoutUsuarioInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
    itens?: PedidoItemUpdateManyWithoutPedidoNestedInput;
    cupom?: CupomUpdateOneWithoutPedidosNestedInput;
  };

  export type PedidoUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
    cupomId?: NullableIntFieldUpdateOperationsInput | number | null;
    itens?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput;
  };

  export type PedidoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
    cupomId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type AvaliacaoUpdateWithoutUsuarioInput = {
    nota?: IntFieldUpdateOperationsInput | number;
    comentario?: StringFieldUpdateOperationsInput | string;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    produto?: ProdutoUpdateOneRequiredWithoutAvaliacoesNestedInput;
  };

  export type AvaliacaoUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nota?: IntFieldUpdateOperationsInput | number;
    comentario?: StringFieldUpdateOperationsInput | string;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    produtoId?: IntFieldUpdateOperationsInput | number;
  };

  export type AvaliacaoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nota?: IntFieldUpdateOperationsInput | number;
    comentario?: StringFieldUpdateOperationsInput | string;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    produtoId?: IntFieldUpdateOperationsInput | number;
  };

  export type RefreshTokenUpdateWithoutUsuarioInput = {
    token?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RefreshTokenUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number;
    token?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RefreshTokenUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number;
    token?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AvaliacaoCreateManyProdutoInput = {
    id?: number;
    nota: number;
    comentario: string;
    data?: Date | string;
    usuarioId: number;
  };

  export type PedidoItemCreateManyProdutoInput = {
    id?: number;
    quantidade: number;
    preco: number;
    tamanho: string;
    pedidoId: number;
  };

  export type AvaliacaoUpdateWithoutProdutoInput = {
    nota?: IntFieldUpdateOperationsInput | number;
    comentario?: StringFieldUpdateOperationsInput | string;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: UsuarioUpdateOneRequiredWithoutAvaliacoesNestedInput;
  };

  export type AvaliacaoUncheckedUpdateWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nota?: IntFieldUpdateOperationsInput | number;
    comentario?: StringFieldUpdateOperationsInput | string;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    usuarioId?: IntFieldUpdateOperationsInput | number;
  };

  export type AvaliacaoUncheckedUpdateManyWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number;
    nota?: IntFieldUpdateOperationsInput | number;
    comentario?: StringFieldUpdateOperationsInput | string;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    usuarioId?: IntFieldUpdateOperationsInput | number;
  };

  export type PedidoItemUpdateWithoutProdutoInput = {
    quantidade?: IntFieldUpdateOperationsInput | number;
    preco?: FloatFieldUpdateOperationsInput | number;
    tamanho?: StringFieldUpdateOperationsInput | string;
    pedido?: PedidoUpdateOneRequiredWithoutItensNestedInput;
  };

  export type PedidoItemUncheckedUpdateWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number;
    quantidade?: IntFieldUpdateOperationsInput | number;
    preco?: FloatFieldUpdateOperationsInput | number;
    tamanho?: StringFieldUpdateOperationsInput | string;
    pedidoId?: IntFieldUpdateOperationsInput | number;
  };

  export type PedidoItemUncheckedUpdateManyWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number;
    quantidade?: IntFieldUpdateOperationsInput | number;
    preco?: FloatFieldUpdateOperationsInput | number;
    tamanho?: StringFieldUpdateOperationsInput | string;
    pedidoId?: IntFieldUpdateOperationsInput | number;
  };

  export type PedidoItemCreateManyPedidoInput = {
    id?: number;
    quantidade: number;
    preco: number;
    tamanho: string;
    produtoId: number;
  };

  export type PedidoItemUpdateWithoutPedidoInput = {
    quantidade?: IntFieldUpdateOperationsInput | number;
    preco?: FloatFieldUpdateOperationsInput | number;
    tamanho?: StringFieldUpdateOperationsInput | string;
    produto?: ProdutoUpdateOneRequiredWithoutPedidoItemsNestedInput;
  };

  export type PedidoItemUncheckedUpdateWithoutPedidoInput = {
    id?: IntFieldUpdateOperationsInput | number;
    quantidade?: IntFieldUpdateOperationsInput | number;
    preco?: FloatFieldUpdateOperationsInput | number;
    tamanho?: StringFieldUpdateOperationsInput | string;
    produtoId?: IntFieldUpdateOperationsInput | number;
  };

  export type PedidoItemUncheckedUpdateManyWithoutPedidoInput = {
    id?: IntFieldUpdateOperationsInput | number;
    quantidade?: IntFieldUpdateOperationsInput | number;
    preco?: FloatFieldUpdateOperationsInput | number;
    tamanho?: StringFieldUpdateOperationsInput | string;
    produtoId?: IntFieldUpdateOperationsInput | number;
  };

  export type PedidoCreateManyCupomInput = {
    id?: number;
    status?: $Enums.OrderStatus;
    pagamento: $Enums.PaymentType;
    valorTotal: number;
    frete: number;
    data?: Date | string;
    atualizadoEm?: Date | string;
    endereco: string;
    usuarioId: number;
  };

  export type PedidoUpdateWithoutCupomInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
    usuario?: UsuarioUpdateOneRequiredWithoutPedidosNestedInput;
    itens?: PedidoItemUpdateManyWithoutPedidoNestedInput;
  };

  export type PedidoUncheckedUpdateWithoutCupomInput = {
    id?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
    usuarioId?: IntFieldUpdateOperationsInput | number;
    itens?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput;
  };

  export type PedidoUncheckedUpdateManyWithoutCupomInput = {
    id?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    pagamento?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType;
    valorTotal?: FloatFieldUpdateOperationsInput | number;
    frete?: FloatFieldUpdateOperationsInput | number;
    data?: DateTimeFieldUpdateOperationsInput | Date | string;
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string;
    endereco?: StringFieldUpdateOperationsInput | string;
    usuarioId?: IntFieldUpdateOperationsInput | number;
  };

  /**
   * Aliases for legacy arg types
   */
  /**
   * @deprecated Use UsuarioCountOutputTypeDefaultArgs instead
   */
  export type UsuarioCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = UsuarioCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ProdutoCountOutputTypeDefaultArgs instead
   */
  export type ProdutoCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ProdutoCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PedidoCountOutputTypeDefaultArgs instead
   */
  export type PedidoCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = PedidoCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use CupomCountOutputTypeDefaultArgs instead
   */
  export type CupomCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = CupomCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use UserDefaultArgs instead
   */
  export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    UserDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use UsuarioDefaultArgs instead
   */
  export type UsuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    UsuarioDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use EnderecoDefaultArgs instead
   */
  export type EnderecoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    EnderecoDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ProdutoDefaultArgs instead
   */
  export type ProdutoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    ProdutoDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use AvaliacaoDefaultArgs instead
   */
  export type AvaliacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    AvaliacaoDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PedidoDefaultArgs instead
   */
  export type PedidoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    PedidoDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PedidoItemDefaultArgs instead
   */
  export type PedidoItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    PedidoItemDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use CupomDefaultArgs instead
   */
  export type CupomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    CupomDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use RefreshTokenDefaultArgs instead
   */
  export type RefreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    RefreshTokenDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use WebhookLogDefaultArgs instead
   */
  export type WebhookLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    WebhookLogDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PaymentDefaultArgs instead
   */
  export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    PaymentDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use AuditLogDefaultArgs instead
   */
  export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    AuditLogDefaultArgs<ExtArgs>;

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
