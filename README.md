# 🏗️ Casa do Construtor - Automação de Testes

Projeto de automação de testes end-to-end para o site Casa do Construtor utilizando Playwright e TypeScript, seguindo o padrão Page Object Model (POM).

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Executando os Testes](#executando-os-testes)
- [Padrão POM](#padrão-pom)
- [Casos de Teste](#casos-de-teste)
- [Evidências e Logs](#evidências-e-logs)
- [Configuração](#configuração)

## 🎯 Sobre o Projeto

Este projeto contém testes automatizados para validar funcionalidades críticas do site Casa do Construtor, incluindo:
- Busca de produtos por loja
- Validação de resultados de busca
- Limpeza de campos de pesquisa
- Tratamento de buscas sem resultados

## 🛠️ Tecnologias

- **Playwright** - Framework de automação de testes end-to-end
- **TypeScript** - Linguagem de programação
- **Node.js** - Ambiente de execução

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

## 🚀 Instalação

1. Clone o repositório ou navegue até a pasta do projeto:
```bash
cd casaDoConstrutorPw
```

2. Instale as dependências:
```bash
npm install
```

3. Instale os navegadores do Playwright:
```bash
npx playwright install chromium
```

## 📁 Estrutura do Projeto

```
casaDoConstrutorPw/
├── pages/                      # Page Objects (POM)
│   └── HomePage.ts             # Classe que representa a página inicial
├── tests/                       # Casos de teste
│   ├── CT01.busca.produto.ts   # Teste de busca de produto
│   └── CT02.Busca.limpeza.ts   # Teste de busca e limpeza
├── evidencias/                  # Screenshots capturados durante os testes
├── logs/                        # Logs de execução dos testes
├── playwright.config.ts         # Configuração do Playwright
├── package.json                 # Dependências do projeto
└── README.md                    # Este arquivo
```

## ▶️ Executando os Testes

### Executar todos os testes
```bash
npx playwright test
```

### Executar em modo headed (com navegador visível)
```bash
npx playwright test --headed
```

### Executar em modo visual (UI)
```bash
npx playwright test --ui
```

### Executar um teste específico
```bash
npx playwright test CT01.busca.produto.ts
```

### Executar em modo debug
```bash
npx playwright test --debug
```

### Ver relatório HTML após execução
```bash
npx playwright show-report
```

## 🏗️ Padrão POM (Page Object Model)

Este projeto utiliza o padrão **Page Object Model**, que oferece:

- **Reutilização**: Métodos podem ser usados em múltiplos testes
- **Manutenção**: Mudanças nos elementos são feitas em um único lugar
- **Legibilidade**: Testes mais claros e fáceis de entender
- **Organização**: Separação entre lógica de página e lógica de teste

### Exemplo de uso:

```typescript
import { HomePage } from '../pages/HomePage';

test('exemplo de teste', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.goto();
  await homePage.searchStore('rio claro');
  await homePage.selectStore('Rio Claro - SP (Rua 09)');
  // ...
});
```

## 📝 Casos de Teste

### CT01 - Busca de Produto
**Arquivo:** `tests/CT01.busca.produto.ts`

Valida a funcionalidade de busca de produtos:
1. Navega para a página inicial
2. Seleciona uma loja (Rio Claro)
3. Busca por um produto (betoneira)
4. Verifica se os resultados são exibidos corretamente
5. Captura evidência e registra log de sucesso

### CT02 - Busca e Limpeza
**Arquivo:** `tests/CT02.Busca.limpeza.ts`

Valida a funcionalidade de busca e limpeza de campo:
1. Navega para a página inicial
2. Seleciona uma loja (Rio de Janeiro)
3. Busca por um produto existente (Limpeza)
4. Testa limpeza do campo de busca
5. Testa busca com produto inexistente
6. Verifica mensagem de "nenhum resultado"
7. Captura evidência e registra log de sucesso

## 📸 Evidências e Logs

### Evidências (Screenshots)
Os screenshots são automaticamente capturados ao final de cada teste e salvos em:
```
evidencias/
  └── busca-betoneira-sucesso-[timestamp].png
  └── busca-limpeza-sucesso-[timestamp].png
```

### Logs
Os logs de execução são salvos em:
```
logs/
  └── test-log-[timestamp].txt
```

Cada log contém:
- ✅ Status do teste (PASSED/FAILED)
- 📅 Data e hora da execução
- 📝 Nome do teste
- 📸 Caminho da evidência capturada

## ⚙️ Configuração

### playwright.config.ts

O arquivo de configuração principal contém:

- **testDir**: Diretório onde estão os testes (`./tests`)
- **testMatch**: Padrão de arquivos de teste (`/.*\.(ts|js)/`)
- **projects**: Navegadores configurados (atualmente apenas Chromium)
- **reporter**: Tipo de relatório (`html`)

### Personalizando a Configuração

Para adicionar mais navegadores, edite `playwright.config.ts`:

```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  // Adicione outros navegadores aqui
],
```

## 🔧 Métodos Disponíveis na HomePage

A classe `HomePage` oferece os seguintes métodos:

### Navegação
- `goto()` - Navega para a página inicial

### Busca de Loja
- `searchStore(city: string)` - Busca loja por cidade
- `selectStore(storeName: string)` - Seleciona uma loja específica

### Busca de Produto
- `searchProduct(productName: string)` - Digita produto no campo de busca
- `selectProductFromAutocomplete()` - Seleciona produto do autocomplete
- `searchProductAndPressEnter(productName: string)` - Busca pressionando Enter
- `clickSearchButton()` - Clica no botão de busca
- `clearSearchInput()` - Limpa o campo de busca

### Validações
- `verifyProductResults(expectedText: string)` - Verifica resultados no bloco 1
- `verifyProductResultsBlock2(expectedText: string)` - Verifica resultados no bloco 2
- `verifyNoResultsMessage()` - Verifica mensagem de "nenhum resultado"

### Utilitários
- `captureEvidence(fileName: string)` - Captura screenshot como evidência

## 📚 Adicionando Novos Testes

1. Crie um novo arquivo em `tests/`:
```typescript
import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('nome do teste', async ({ page }) => {
  const homePage = new HomePage(page);
  // Seu teste aqui
});
```

2. Se necessário, adicione novos métodos na classe `HomePage`

3. Execute o teste:
```bash
npx playwright test nome-do-arquivo.ts
```

## 🐛 Troubleshooting

### Problemas comuns

**Erro: "browser not found"**
```bash
npx playwright install chromium
```

**Timeout nos testes**
- Aumente o timeout no `playwright.config.ts` ou nos métodos específicos

**Elementos não encontrados**
- Verifique se os seletores estão corretos na classe `HomePage`
- Use o modo debug para inspecionar elementos: `npx playwright test --debug`

## 📄 Licença

Este projeto é de uso interno para testes automatizados.

## 👥 Contribuindo

Para adicionar novos testes ou melhorias:
1. Siga o padrão POM estabelecido
2. Adicione logs e evidências nos testes
3. Mantenha os testes organizados e legíveis

---

**Desenvolvido com ❤️ usando Playwright e TypeScript**

