# Documentação de Testes

Este documento descreve como executar e expandir os testes do projeto OnlyWave.

## 🧪 Tipos de Testes

### Testes Unitários
- Localizados em `src/tests/*.test.ts`
- Testam componentes isoladamente
- Usam mocks para dependências externas
- Rápidos de executar

### Testes de Integração
- Localizados em `src/tests/integration/*.test.ts`
- Testam fluxos completos
- Usam banco de dados de teste
- Mais lentos, mas mais abrangentes

## 🚀 Como Executar os Testes

### Testes Unitários
```bash
npm run test
```

### Testes de Integração
```bash
npm run test:integration
```

### Cobertura de Testes
```bash
npm run test:coverage
```

## 📚 Padrões de Teste

### Estrutura de Arquivos
```
src/tests/
├── unit/                    # Testes unitários
│   ├── services/           # Testes de serviços
│   ├── controllers/        # Testes de controllers
│   └── utils/             # Testes de utilitários
├── integration/            # Testes de integração
│   ├── auth.int.test.ts   # Fluxos de autenticação
│   └── produto.int.test.ts # Fluxos de produtos
└── mocks/                 # Mocks compartilhados
```

### Nomenclatura
- Arquivos de teste: `*.test.ts`
- Testes de integração: `*.int.test.ts`
- Mocks: `*.mock.ts`

## 🔧 Como Usar Mocks

### Mock do Prisma
```typescript
import { vi } from 'vitest'
import prisma from '../lib/prisma'

vi.mock('../lib/prisma', () => {
  return {
    default: {
      usuario: {
        create: vi.fn(),
        findUnique: vi.fn()
      }
    }
  }
})
```

### Mock de Autenticação
```typescript
import jwt from 'jsonwebtoken'

vi.mock('jsonwebtoken', () => ({
  verify: vi.fn(),
  sign: vi.fn()
}))
```

## 🎯 Boas Práticas

1. **Isolamento**
   - Cada teste deve ser independente
   - Use `beforeEach` para resetar mocks
   - Evite dependências entre testes

2. **Organização**
   - Um arquivo por domínio
   - Agrupe testes relacionados em `describe`
   - Use nomes descritivos para os testes

3. **Asserções**
   - Teste casos de sucesso e erro
   - Verifique estados e comportamentos
   - Use matchers apropriados do Vitest

## 📝 Exemplo de Teste

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProdutoService } from '../services/produtoService'
import prisma from '../lib/prisma'

describe('ProdutoService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve criar um produto com sucesso', async () => {
    const mockProduto = {
      id: 1,
      nome: 'Produto Teste',
      preco: 99.99
    }

    vi.mocked(prisma.produto.create).mockResolvedValue(mockProduto)

    const result = await ProdutoService.criar(mockProduto)
    
    expect(result).toEqual(mockProduto)
    expect(prisma.produto.create).toHaveBeenCalledWith({
      data: mockProduto
    })
  })
})
```

## 🔍 Cobertura de Testes

- Execute `npm run test:coverage` para gerar relatório
- Mínimo esperado: 80% de cobertura
- Foque em código crítico de negócio
- Verifique branches de código

## 🚧 Expandindo os Testes

1. Identifique áreas não cobertas
2. Crie novos casos de teste
3. Mantenha os testes atualizados
4. Refatore quando necessário

## 🐛 Debugando Testes

1. Use `console.log` ou debugger
2. Verifique mocks e stubs
3. Isole o teste problemático
4. Verifique configurações 