# Projeto QA Demo - Gerenciamento de Imóveis Alugados

## Visão geral

Este projeto é uma aplicação web simples desenvolvida em **React + TypeScript + Vite** para servir como base de estudo prático de QA. A aplicação simula o gerenciamento de imóveis alugados, permitindo cadastrar novos imóveis, buscar propriedades e visualizar detalhes de contratos.

## Objetivo

Criar uma interface leve e funcional que represente a rotina de um gestor de imóveis alugados, com foco em:

- controle de propriedades alugadas
- fluxo de cadastro de novos imóveis
- visualização de dados de inquilinos e contratos
- pesquisa rápida por campos relevantes

## Estrutura do projeto

- `package.json`: dependências e scripts do projeto
- `tsconfig.json`: configurações do TypeScript
- `vite.config.ts`: configuração do Vite
- `index.html`: ponto de entrada HTML
- `README.md`: instruções básicas de uso
- `PROJECT_SUMMARY.md`: resumo do projeto
- `src/`:
  - `main.tsx`: bootstrap da aplicação
  - `App.tsx`: componente principal com lógica de visualização, filtro e cadastro
  - `styles.css`: estilos da interface

## Funcionalidades principais

- Página de listagem de imóveis com dados fake
- Busca por:
  - título
  - endereço
  - proprietário
  - inquilino
  - status do imóvel
- Detalhes completos do imóvel selecionado
- Formulário de cadastro de novo imóvel alugado

## Dados utilizados

A aplicação utiliza uma base de dados fake em memória para simular propriedades com os seguintes campos:

- `title` (título do imóvel)
- `address` (endereço)
- `rent` (valor do aluguel mensal)
- `status` (status de aluguel)
- `owner` (proprietário)
- `tenant` (inquilino)
- `leaseEnd` (data de término do contrato)
- `nextPaymentDue` (próxima data de pagamento)
- `bedrooms` e `bathrooms`

## Como executar

```bash
cd qa-demo
npm install
npm run dev
```

Em seguida, abra `http://localhost:4173` no navegador.

## Observações

- Projeto focado apenas no frontend, não há backend real.
- O cadastro de imóveis funciona em memória, sem persistência entre recargas.
- É ideal para estudos de QA, validação de interface e testes manuais de fluxo de cadastro e busca.
