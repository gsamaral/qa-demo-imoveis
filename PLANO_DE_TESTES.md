# 📋 PLANO DE TESTES COMPLETO - QA Demo Imóveis
**Versão:** 1.0  
**Data:** 2025-07-20  
**Responsável:** QA Senior  
**Base:** ISTQB Certified Tester Foundation Level  

---

## 📚 ÍNDICE
1. [Visão Geral](#1-visão-geral)
2. [Estratégia de Testes](#2-estratégia-de-testes)
3. [Análise de Riscos](#3-análise-de-riscos)
4. [Escopo de Testes](#4-escopo-de-testes)
5. [Casos de Teste - Listagem](#5-casos-de-teste-listagem-de-imóveis)
6. [Casos de Teste - Pesquisa](#6-casos-de-teste-pesquisa-de-imóveis)
7. [Casos de Teste - Detalhes](#7-casos-de-teste-visualização-de-detalhes)
8. [Casos de Teste - Cadastro](#8-casos-de-teste-cadastro-de-imóveis)
9. [Testes Não-Funcionais](#9-testes-não-funcionais)
10. [Critérios de Entrada/Saída](#10-critérios-de-entrada-e-saída)

---

## 1. VISÃO GERAL

### 1.1 Descrição do Sistema
Aplicação web **React + TypeScript + Vite** para gerenciamento de imóveis alugados com funcionalidades de:
- Listagem de propriedades
- Busca/Filtro
- Visualização de detalhes
- Cadastro de novos imóveis

### 1.2 Público-Alvo
- Gestores de imóveis
- Proprietários
- Administradores de propriedades

### 1.3 Ambiente de Teste
- **Browser:** Chrome, Firefox, Safari, Edge (versões recentes)
- **Tipos de Dados:** Fake/Mock em memória (sem persistência)
- **Dados Iniciais:** 3 imóveis hardcoded
- **URL de Teste:** `http://localhost:4173`

---

## 2. ESTRATÉGIA DE TESTES

### 2.1 Níveis de Teste ISTQB

| Nível | Escopo | Tipo | Responsável |
|-------|--------|------|------------|
| **Unitário** | Componentes React isolados | Automação | Dev/QA Automação |
| **Integração** | Fluxo entre componentes | Automação | Dev/QA Automação |
| **Sistema** | Funcionalidades completas | Manual/E2E | QA Manual |
| **Aceitação** | Requisitos de negócio | Manual | Product Owner |

### 2.2 Tipos de Teste

#### ✅ Testes Funcionais (Caixa Preta)
- Validar funcionalidades contra requisitos
- Não requer conhecimento do código interno
- Foco: entrada → saída esperada

#### ✅ Testes de Limite
- Valores extremos em inputs
- Campos vazios, muito longos, caracteres especiais
- Data inválida, números negativos

#### ✅ Testes de Equivalência
- Agrupar dados similares em classes
- Testar um representante por classe
- Ex: nomes curtos, médios, longos

#### ✅ Testes de Regressão
- Garantir que mudanças não quebrem features
- Executar após qualquer alteração no código
- Prioridade: Casos Críticos e Altos

#### ✅ Testes de Usabilidade
- Fluxos intuitivos
- Feedback visual claro
- Acessibilidade (WCAG)

---

## 3. ANÁLISE DE RISCOS

### 3.1 Matriz de Riscos

| # | Risco | Impacto | Probabilidade | Severidade | Mitigação |
|---|-------|---------|---------------|-----------|-----------|
| R01 | Filtro não encontra imóvel cadastrado recentemente | Alto | Média | **ALTA** | TC-014 a TC-018 |
| R02 | Valores monetários formatam incorretamente (moeda) | Alto | Média | **ALTA** | TC-023, TC-024 |
| R03 | Dados vazios no cadastro aceitam valores inválidos | Médio | Alta | **ALTA** | TC-036 a TC-041 |
| R04 | Seleção perdida ao aplicar filtro | Médio | Média | **MÉDIA** | TC-019 |
| R05 | Overflow de texto em cards (títulos/endereços longos) | Baixo | Média | **MÉDIA** | TC-025, TC-026 |
| R06 | Performance degrada com 100+ imóveis | Médio | Baixa | **MÉDIA** | TN-001 |
| R07 | Data de contrato/pagamento em formato inválido | Médio | Média | **MÉDIA** | TC-027 a TC-032 |
| R08 | Bedrooms/Bathrooms hardcoded em cadastro | Médio | Alta | **ALTA** | TC-042 |

---

## 4. ESCOPO DE TESTES

### 4.1 Dentro do Escopo ✅
- ✅ Listagem de imóveis iniciais
- ✅ Pesquisa/Filtro por múltiplos campos
- ✅ Seleção e visualização de detalhes
- ✅ Cadastro de novo imóvel
- ✅ Validações de formulário
- ✅ Formatação de dados (moeda, data)
- ✅ Feedback visual (badges, status, seleção)
- ✅ Usabilidade e acessibilidade básica

### 4.2 Fora do Escopo ❌
- ❌ Backend/API (não existe)
- ❌ Persistência de dados (em memória)
- ❌ Autenticação/Autorização
- ❌ Edição de imóveis existentes
- ❌ Exclusão de imóveis
- ❌ Relatórios
- ❌ Multi-usuário/Sincronização
- ❌ Testes de carga extrema (>1000 itens)

---

## 5. CASOS DE TESTE - LISTAGEM DE IMÓVEIS

### TC-001: Exibição Inicial de Imóveis
```
ID: TC-001
Título: Validar carregamento inicial da lista de imóveis
Prioridade: CRÍTICA
Tipo: Funcional (Caixa Preta)

Precondições:
  - Aplicação aberta em http://localhost:4173
  - Primeira vez acessando (estado inicial)

Passos:
  1. Abrir a aplicação no navegador
  2. Aguardar carregamento completo
  3. Observar seção "Imóveis" (painel esquerdo)
  4. Verificar badge de contagem

Resultado Esperado:
  ✓ Exatamente 3 imóveis exibidos na lista
  ✓ Primeiro imóvel selecionado por padrão (classe "active")
  ✓ Badge exibe "3 imóveis"
  ✓ Painel de detalhes carrega com dados do primeiro imóvel
  ✓ Nenhum erro no console

Pós-condição:
  - Aplicação em estado estável
  - Imóvel 1 (Apartamento) selecionado
```

### TC-002: Validar Dados dos Imóveis Iniciais
```
ID: TC-002
Título: Verificar integridade dos dados fake pré-carregados
Prioridade: CRÍTICA
Tipo: Funcional

Precondições:
  - TC-001 executado com sucesso
  - Aplicação com lista carregada

Passos:
  1. Verificar card do 1º imóvel:
     - Título: "Apartamento reformado no centro"
     - Status: "Alugado" (com styling correto)
     - Endereço: "Rua das Flores, 220"
     - Quartos: 2 | Banheiros: 1
     - Aluguel: "R$ 2.500" (formatado)
  
  2. Verificar card do 2º imóvel:
     - Título: "Cobertura com vista para o mar"
     - Status: "Alugado"
     - Endereço: "Av. Atlântica, 1020"
     - Quartos: 3 | Banheiros: 2
     - Aluguel: "R$ 8.700"
  
  3. Verificar card do 3º imóvel:
     - Título: "Casa familiar próxima ao parque"
     - Status: "Manutenção" (com styling diferente)
     - Endereço: "Alameda das Palmeiras, 14"
     - Quartos: 4 | Banheiros: 3
     - Aluguel: "R$ 4.200"

Resultado Esperado:
  ✓ Todos os dados correspondem ao esperado
  ✓ Formatação de moeda correta (separador de milhar)
  ✓ Status com cores/classes CSS distintas
  ✓ Números de quartos e banheiros exibidos
```

### TC-003: Seleção de Imóvel na Lista
```
ID: TC-003
Título: Validar interação de clique em cards de imóvel
Prioridade: ALTA
Tipo: Funcional

Precondições:
  - TC-001 executado com sucesso
  - Lista carregada com 3 imóveis

Passos:
  1. Clicar no card do 2º imóvel (Cobertura com vista para o mar)
  2. Observar mudança visual no card
  3. Observar painel de detalhes à direita
  4. Clicar no 3º imóvel (Casa familiar)
  5. Verificar atualização dos detalhes

Resultado Esperado:
  ✓ Card selecionado recebe classe "active" (visual diferente)
  ✓ Card anterior perde a classe "active"
  ✓ Painel de detalhes atualiza com dados corretos do imóvel selecionado
  ✓ Transição é imediata (sem lag)
  ✓ Seleção persiste até outro clique
```

### TC-004: Comportamento com Número Zero de Imóveis
```
ID: TC-004
Título: Validar comportamento quando lista está vazia após filtro
Prioridade: MÉDIA
Tipo: Funcional

Precondições:
  - TC-001 executado
  - Aplicação com lista carregada

Passos:
  1. Digitar "ZZZZZZZ" (texto inexistente) no campo de busca
  2. Observar lista de imóveis
  3. Observar badge de contagem
  4. Observar painel de detalhes

Resultado Esperado:
  ✓ Lista fica vazia (nenhum card exibido)
  ✓ Badge mostra "0 imóveis"
  ✓ Painel de detalhes mantém dados do último imóvel selecionado (comportamento aceitável)
    OU exibe mensagem "Nenhum imóvel selecionado" (mais correto)
```

### TC-005: Scroll em Lista Longa
```
ID: TC-005
Título: Validar scroll quando lista exceeds viewport
Prioridade: MÉDIA
Tipo: Usabilidade

Precondições:
  - Aplicação com 20+ imóveis cadastrados
  - Viewport com altura limitada

Passos:
  1. Adicionar 20 imóveis via formulário de cadastro
  2. Verificar se lista tem scrollbar
  3. Fazer scroll para baixo
  4. Fazer scroll para cima
  5. Clicar em imóvel que estava fora do viewport

Resultado Esperado:
  ✓ Scrollbar aparece quando necessário
  ✓ Scroll é suave
  ✓ Todos os itens são acessíveis
  ✓ Performance não degrada
  ✓ Clique funciona após scroll
```

---

## 6. CASOS DE TESTE - PESQUISA DE IMÓVEIS

### TC-006: Busca por Título (Match Parcial)
```
ID: TC-006
Título: Validar filtro por título do imóvel com match parcial
Prioridade: CRÍTICA
Tipo: Funcional (Limite - Equivalência)

Precondições:
  - TC-001 executado
  - Lista com 3 imóveis

Passos:
  1. Clicar no campo "Buscar por título, endereço..."
  2. Digitar "Apartamento"
  3. Aguardar atualização

Resultado Esperado:
  ✓ Lista filtra para 1 imóvel: "Apartamento reformado no centro"
  ✓ Badge atualiza para "1 imóveis"
  ✓ Outros 2 imóveis desaparecem
  ✓ Atualização é imediata (no onChange)

Dados de Teste:
  - Entrada: "Apartamento" (exato)
  - Entrada: "apart" (parcial)
  - Entrada: "reforma" (parcial, dentro do título)
```

### TC-007: Busca por Endereço
```
ID: TC-007
Título: Validar filtro por campo address
Prioridade: ALTA
Tipo: Funcional

Precondições:
  - TC-001 executado

Passos:
  1. Digitar "Atlântica" no campo de busca
  2. Observar resultados

Resultado Esperado:
  ✓ 1 resultado: "Cobertura com vista para o mar"
  ✓ Badge: "1 imóveis"

Dados de Teste:
  - "Atlântica" → 1 resultado
  - "Rua" → 1 resultado (Rua das Flores)
  - "Alameda" → 1 resultado (Alameda das Palmeiras)
  - "das" → 2 resultados (Rua das Flores, Alameda das Palmeiras)
```

### TC-008: Busca por Proprietário
```
ID: TC-008
Título: Validar filtro por owner
Prioridade: ALTA
Tipo: Funcional

Precondições:
  - TC-001 executado

Passos:
  1. Digitar "Pedro" no campo de busca

Resultado Esperado:
  ✓ 1 resultado: "Apartamento reformado no centro" (owner: Pedro Silva)
  ✓ Badge: "1 imóveis"

Dados de Teste:
  - "Pedro" → 1 resultado
  - "Silva" → 1 resultado
  - "Marina" → 1 resultado (Marina Souza)
  - "Carlos" → 1 resultado (Carlos Pereira)
```

### TC-009: Busca por Inquilino
```
ID: TC-009
Título: Validar filtro por tenant
Prioridade: ALTA
Tipo: Funcional

Precondições:
  - TC-001 executado

Passos:
  1. Digitar "Ana" no campo de busca

Resultado Esperado:
  ✓ 1 resultado: "Apartamento reformado no centro" (tenant: Ana Costa)
  ✓ Badge: "1 imóveis"

Dados de Teste:
  - "Ana" → 1 resultado
  - "Costa" → 1 resultado
  - "Rafael" → 1 resultado (Rafael Lima, tenant do imóvel 2)
```

### TC-010: Busca por Status
```
ID: TC-010
Título: Validar filtro por status de aluguel
Prioridade: ALTA
Tipo: Funcional

Precondições:
  - TC-001 executado

Passos:
  1. Digitar "Alugado" no campo de busca
  2. Observar resultados
  3. Limpar busca
  4. Digitar "Manutenção"

Resultado Esperado:
  ✓ Busca "Alugado": 2 resultados (imóveis 1 e 2)
  ✓ Badge: "2 imóveis"
  ✓ Busca "Manutenção": 1 resultado (imóvel 3)
  ✓ Badge: "1 imóveis"
```

### TC-011: Busca Case-Insensitive
```
ID: TC-011
Título: Validar que busca ignora maiúsculas/minúsculas
Prioridade: ALTA
Tipo: Funcional (Limite)

Precondições:
  - TC-001 executado

Passos:
  1. Digitar "APARTAMENTO" (maiúscula)
  2. Observar resultado
  3. Limpar e digitar "apartamento" (minúscula)
  4. Comparar resultados
  5. Testar com "ApArTaMeNtO" (misto)

Resultado Esperado:
  ✓ Todos os 3 testes retornam o mesmo imóvel
  ✓ Nenhuma diferença entre variações de caso
  ✓ Badge sempre "1 imóveis"
```

### TC-012: Busca com Acentuação
```
ID: TC-012
Título: Validar suporte a acentos e caracteres especiais
Prioridade: MÉDIA
Tipo: Funcional (Limite)

Precondições:
  - TC-001 executado

Passos:
  1. Digitar "Palmeiras" (com acento: Alameda das Palmeiras)
  2. Digitar "Flores" (Rua das Flores)
  3. Digitar "Atlântica" (Av. Atlântica)

Resultado Esperado:
  ✓ "Palmeiras" encontra: "Casa familiar próxima ao parque"
  ✓ "Flores" encontra: "Apartamento reformado no centro"
  ✓ "Atlântica" encontra: "Cobertura com vista para o mar"
  ✓ Acentuação não interfere na busca
```

### TC-013: Busca Vazia Retorna Todos
```
ID: TC-013
Título: Validar que campo vazio exibe todos os imóveis
Prioridade: ALTA
Tipo: Funcional

Precondições:
  - TC-001 executado
  - Campo de busca contém algum texto

Passos:
  1. Digitar "Apartamento" (filtra para 1)
  2. Selecionar todo o texto (Ctrl+A)
  3. Pressionar Delete/Backspace
  4. Observar lista

Resultado Esperado:
  ✓ Lista volta a exibir todos os 3 imóveis
  ✓ Badge volta a "3 imóveis"
  ✓ Comportamento é imediato
```

### TC-014: Busca com Novo Imóvel Cadastrado
```
ID: TC-014
Título: Validar que imóvel novo aparece na busca
Prioridade: ALTA
Tipo: Funcional (Integração)

Precondições:
  - TC-001 executado
  - Campo de busca vazio

Passos:
  1. Preencher formulário de cadastro:
     - Título: "Apartamento novo na praia"
     - Endereço: "Rua da Praia, 100"
     - Proprietário: "João Silva"
  2. Clicar "Adicionar imóvel"
  3. Digitar "praia" no campo de busca
  4. Observar resultados

Resultado Esperado:
  ✓ Novo imóvel aparece na lista (posição topo)
  ✓ Busca "praia" encontra o novo imóvel
  ✓ Busca funciona imediatamente sem refresh
  ✓ Badge atualiza corretamente
```

### TC-015: Múltiplos Matches na Busca
```
ID: TC-015
Título: Validar busca que retorna múltiplos imóveis
Prioridade: MÉDIA
Tipo: Funcional

Precondições:
  - TC-001 executado
  - 3 imóveis iniciais carregados

Passos:
  1. Digitar "das" (presente em "Rua das Flores" e "Alameda das Palmeiras")
  2. Observar resultados

Resultado Esperado:
  ✓ 2 imóveis encontrados
  ✓ Badge: "2 imóveis"
  ✓ Ambos exibidos na lista
```

### TC-016: Busca com Espaços em Branco
```
ID: TC-016
Título: Validar tratamento de espaços em busca
Prioridade: MÉDIA
Tipo: Funcional (Limite)

Precondições:
  - TC-001 executado

Passos:
  1. Digitar " Apartamento " (com espaços no início/fim)
  2. Observar resultado
  3. Limpar e digitar "Apartamento" (sem espaços)
  4. Comparar

Resultado Esperado:
  ✓ Ambas as variações retornam o mesmo resultado
  ✓ Espaços não afetam a busca
  ✓ Trim é aplicado automaticamente
```

### TC-017: Busca com Números
```
ID: TC-017
Título: Validar busca por números (endereço)
Prioridade: MÉDIA
Tipo: Funcional

Precondições:
  - TC-001 executado

Passos:
  1. Digitar "220" (Rua das Flores, 220)
  2. Observar resultado
  3. Limpar e digitar "1020" (Av. Atlântica, 1020)

Resultado Esperado:
  ✓ "220" encontra: "Apartamento reformado no centro"
  ✓ "1020" encontra: "Cobertura com vista para o mar"
```

### TC-018: Busca com Caracteres Especiais
```
ID: TC-018
Título: Validar busca com símbolos e caracteres especiais
Prioridade: MÉDIA
Tipo: Funcional (Limite)

Precondições:
  - TC-001 executado

Passos:
  1. Digitar "." (ponto) - presente em "Av." e endereços
  2. Digitar "," (vírgula) - presente em endereços
  3. Digitar "Rua," (com vírgula)

Resultado Esperado:
  ✓ Busca por "." encontra vários endereços que contêm pontos
  ✓ Busca por "," encontra vários endereços que contêm vírgulas
  ✓ Busca por "Rua," encontra imóvel com "Rua das Flores, 220"
```

---

## 7. CASOS DE TESTE - VISUALIZAÇÃO DE DETALHES

### TC-019: Detalhes do Imóvel Selecionado
```
ID: TC-019
Título: Validar exibição correta dos detalhes
Prioridade: ALTA
Tipo: Funcional

Precondições:
  - TC-001 executado
  - Imóvel 1 selecionado por padrão

Passos:
  1. Observar painel "Detalhes do imóvel"
  2. Verificar cada campo:
     - Título: "Apartamento reformado no centro"
     - Endereço: "Rua das Flores, 220"
     - Proprietário: "Pedro Silva"
     - Inquilino: "Ana Costa"
     - Aluguel mensal: "R$ 2.500"
     - Status: "Alugado"
     - Próximo pagamento: "10/05/2025"
     - Fim do contrato: "30/09/2025"
     - Quartos: 2
     - Banheiros: 1

Resultado Esperado:
  ✓ Todos os campos exibidos corretamente
  ✓ Moeda formatada (R$ com separador)
  ✓ Nenhum campo faltando ou truncado
  ✓ Valores correspondem ao imóvel selecionado
```

### TC-020: Atualizar Detalhes ao Selecionar Outro Imóvel
```
ID: TC-020
Título: Validar que painel de detalhes atualiza dinamicamente
Prioridade: ALTA
Tipo: Funcional

Precondições:
  - TC-001 executado
  - Imóvel 1 exibido nos detalhes

Passos:
  1. Clicar no imóvel 2 (Cobertura com vista para o mar)
  2. Verificar se painel de detalhes atualiza
  3. Clicar no imóvel 3 (Casa familiar)
  4. Verificar nova atualização

Resultado Esperado:
  ✓ Detalhes atualizam imediatamente ao clicar
  ✓ Imóvel 2 mostra:
     - Aluguel: "R$ 8.700"
     - Tenant: "Rafael Lima"
     - Bedrooms: 3, Bathrooms: 2
  ✓ Imóvel 3 mostra:
     - Status: "Manutenção"
     - Sem campo Inquilino (não preenchido)
     - Bedrooms: 4, Bathrooms: 3
```

### TC-021: Detalhes com Campos Opcionais Vazios
```
ID: TC-021
Título: Validar exibição quando campos opcionais não preenchidos
Prioridade: MÉDIA
Tipo: Funcional

Precondições:
  - TC-001 executado
  - Imóvel 3 (Casa familiar) não tem tenant/leaseEnd

Passos:
  1. Clicar no imóvel 3 (Casa familiar - em Manutenção)
  2. Observar painel de detalhes

Resultado Esperado:
  ✓ Campo "Inquilino" não é exibido (ou exibe "N/A")
  ✓ Campo "Fim do contrato" não é exibido (ou exibe "N/A")
  ✓ Painel não fica com espaços em branco
  ✓ Outros campos são exibidos normalmente
```

### TC-022: Detalhes com Imóvel Recém-Cadastrado
```
ID: TC-022
Título: Validar detalhes de imóvel novo após cadastro
Prioridade: MÉDIA
Tipo: Funcional (Integração)

Precondições:
  - Formulário de cadastro acessível
  - Pelo menos 1 imóvel na lista

Passos:
  1. Preencher formulário:
     - Título: "Casa na montanha"
     - Endereço: "Serra Alto, 50"
     - Aluguel: 5000
     - Proprietário: "Maria Silva"
     - Inquilino: "José Costa"
     - Fim contrato: 31/12/2025
     - Próximo pagamento: 15/05/2025
  2. Clicar "Adicionar imóvel"
  3. Observar se novo imóvel é selecionado
  4. Verificar detalhes no painel direito

Resultado Esperado:
  ✓ Novo imóvel aparece no topo da lista
  ✓ Novo imóvel é selecionado automaticamente
  ✓ Detalhes exibem corretamente:
     - Título: "Casa na montanha"
     - Endereço: "Serra Alto, 50"
     - Aluguel: "R$ 5.000"
     - Proprietário: "Maria Silva"
     - Inquilino: "José Costa"
     - Status: "Alugado" (default)
     - Bedrooms: 2 (default)
     - Bathrooms: 1 (default)
```

---

## 8. CASOS DE TESTE - CADASTRO DE IMÓVEIS

### TC-023: Cadastro com Todos os Campos Preenchidos
```
ID: TC-023
Título: Validar cadastro completo de novo imóvel
Prioridade: CRÍTICA
Tipo: Funcional

Precondições:
  - Aplicação carregada
  - Formulário "Registrar novo imóvel alugado" visível

Passos:
  1. Preencher campo "Título": "Apartamento moderno em São Paulo"
  2. Preencher campo "Endereço": "Av. Paulista, 1000"
  3. Preencher campo "Aluguel mensal": "3500"
  4. Preencher campo "Proprietário": "Carlos Mendes"
  5. Preencher campo "Inquilino": "Fernanda Oliveira"
  6. Preencher campo "Fim do contrato": "15/06/2026"
  7. Preencher campo "Próximo pagamento": "15/06/2025"
  8. Clicar botão "Adicionar imóvel"

Resultado Esperado:
  ✓ Novo imóvel criado com sucesso
  ✓ Novo imóvel aparece no topo da lista
  ✓ Badge atualiza (ex: "3 imóveis" → "4 imóveis")
  ✓ Novo imóvel é selecionado automaticamente
  ✓ Formulário é resetado (todos os campos vazios)
  ✓ Detalhes exibem dados corretos do novo imóvel
  ✓ Status é "Alugado" (default)
  ✓ Bedrooms: 2, Bathrooms: 1 (defaults)
```

### TC-024: Cadastro com Campos Vazios (Validação)
```
ID: TC-024
Título: Validar comportamento com campos obrigatórios vazios
Prioridade: ALTA
Tipo: Funcional (Limite)

Precondições:
  - Aplicação carregada
  - Formulário vazio

Passos:
  1. Deixar todos os campos vazios
  2. Clicar "Adicionar imóvel"

Resultado Esperado (Esperado Ideal):
  ✓ Erro de validação exibido
  ✓ Campos obrigatórios destacados
  ✓ Mensagem indicando quais campos faltam
  ✓ Imóvel não é criado

Resultado Esperado (Aceitável - comportamento atual):
  ✓ Imóvel criado com:
     - title: "Novo imóvel alugado" (default)
     - owner: "Proprietário não informado" (default)
     - tenant: "Inquilino não informado" (default)
     - address: "" (vazio)
     - rent: 0
     - leaseEnd: "não definido" (default)
     - nextPaymentDue: "não definido" (default)

Resultado Observado (Atual):
  - Apenas o campo address fica vazio
  - Outros campos recebem defaults

⚠️ Risco: R03 - Dados inválidos aceitados
Ação Corretiva: Implementar validação obrigatória
```

### TC-025: Cadastro com Campo Título Vazio
```
ID: TC-025
Título: Validar criação com título vazio
Prioridade: MÉDIA
Tipo: Funcional (Limite)

Precondições:
  - Formulário com todos os outros campos preenchidos

Passos:
  1. Deixar campo "Título" vazio
  2. Preencher outros campos:
     - Endereço: "Rua Teste, 123"
     - Aluguel: 1500
     - Proprietário: "Teste Owner"
  3. Clicar "Adicionar imóvel"

Resultado Esperado (Ideal):
  ✓ Erro de validação no campo Título
  ✓ Não cria imóvel

Resultado Observado (Atual):
  ✓ Imóvel criado com title: "Novo imóvel alugado" (default)
```

### TC-026: Cadastro com Aluguel Zero
```
ID: TC-026
Título: Validar criação com valor de aluguel zero
Prioridade: MÉDIA
Tipo: Funcional (Limite)

Precondições:
  - Formulário com dados válidos

Passos:
  1. Preencher campo "Aluguel mensal": 0
  2. Preencher outros campos corretamente
  3. Clicar "Adicionar imóvel"

Resultado Esperado (Ideal):
  ✓ Erro de validação
  ✓ Aluguel deve ser > 0

Resultado Observado (Atual):
  ✓ Imóvel criado com rent: 0
  ✓ Exibe "R$ 0" nos detalhes

⚠️ Risco: R02 - Validação de valor monetário
```

### TC-027: Cadastro com Aluguel Negativo
```
ID: TC-027
Título: Validar criação com aluguel negativo
Prioridade: MÉDIA
Tipo: Funcional (Limite)

Precondições:
  - Formulário disponível

Passos:
  1. Tentar digitar "-5000" no campo Aluguel
     (comportamento do input type="number")

Resultado Esperado:
  ✓ Browser impede valor negativo (input type="number")
     OU Validação rejeita e exibe erro
```

### TC-028: Cadastro com Aluguel Muito Grande
```
ID: TC-028
Título: Validar formatação de aluguel com valor grande
Prioridade: MÉDIA
Tipo: Funcional (Limite)

Precondições:
  - Formulário disponível

Passos:
  1. Preencher campo "Aluguel mensal": 999999
  2. Preencher outros campos
  3. Clicar "Adicionar imóvel"
  4. Verificar exibição nos detalhes

Resultado Esperado:
  ✓ Imóvel criado com sucesso
  ✓ Aluguel exibido como "R$ 999.999" (com separador de milhar)
  ✓ Nenhum erro de overflow
```

### TC-029: Cadastro com Título Muito Longo
```
ID: TC-029
Título: Validar criação com título muito longo
Prioridade: MÉDIA
Tipo: Funcional (Limite - Equivalência)

Precondições:
  - Formulário disponível

Passos:
  1. Preencher campo "Título": 
     "Apartamento de luxo totalmente reformado com vista para o mar, 4 quartos, suíte master, home office, churrasqueira, piscina e spa"
  2. Preencher outros campos
  3. Clicar "Adicionar imóvel"
  4. Observar exibição no card da lista
  5. Verificar detalhes

Resultado Esperado:
  ✓ Imóvel criado sem erro
  ✓ Texto longo exibido no painel de detalhes
  ✓ Card na lista aplica truncamento visual (se necessário)
  ✓ Nenhum overflow de layout
```

### TC-030: Cadastro com Endereço Muito Longo
```
ID: TC-030
Título: Validar criação com endereço muito longo
Prioridade: MÉDIA
Tipo: Funcional (Limite)

Precondições:
  - Formulário disponível

Passos:
  1. Preencher "Endereço": 
     "Avenida Paulista, número 1000, apartamento 2501, São Paulo, SP, Brasil, CEP 01311-100"
  2. Preencher outros campos
  3. Clicar "Adicionar imóvel"

Resultado Esperado:
  ✓ Imóvel criado sem erro
  ✓ Endereço completo armazenado
  ✓ Exibição sem layout quebrado
```

### TC-031: Cadastro com Data Inválida
```
ID: TC-031
Título: Validar campo de data com data inválida
Prioridade: MÉDIA
Tipo: Funcional (Limite)

Precondições:
  - Formulário disponível
  - Campo de data aceita manualmente

Passos:
  1. Preencher "Fim do contrato": "31/02/2025" (fevereiro não tem 31 dias)
  2. Preencher outros campos
  3. Clicar "Adicionar imóvel"

Resultado Esperado:
  ✓ Browser rejeita data inválida (input type="date")
     OU aplicação valida e exibe erro
  ✓ Imóvel não é criado

Observação:
  - input type="date" oferece picker - usuário dificilmente consegue inserir inválido
```

### TC-032: Cadastro com Data Futura Válida
```
ID: TC-032
Título: Validar cadastro com data de contrato futura
Prioridade: MÉDIA
Tipo: Funcional

Precondições:
  - Formulário disponível

Passos:
  1. Preencher "Fim do contrato": "31/12/2026"
  2. Preencher "Próximo pagamento": "15/06/2025"
  3. Preencher outros campos
  4. Clicar "Adicionar imóvel"

Resultado Esperado:
  ✓ Imóvel criado com sucesso
  ✓ Datas armazenadas corretamente
  ✓ Exibição no painel de detalhes mostra datas
```

### TC-033: Cadastro com Proprietário Vazio
```
ID: TC-033
Título: Validar criação com proprietário não preenchido
Prioridade: MÉDIA
Tipo: Funcional (Limite)

Precondições:
  - Formulário com dados básicos preenchidos

Passos:
  1. Deixar campo "Proprietário" vazio
  2. Preencher outros campos
  3. Clicar "Adicionar imóvel"

Resultado Esperado (Ideal):
  ✓ Erro de validação

Resultado Observado (Atual):
  ✓ Imóvel criado com owner: "Proprietário não informado"
```

### TC-034: Cadastro com Inquilino Vazio
```
ID: TC-034
Título: Validar criação com inquilino não preenchido
Prioridade: MÉDIA
Tipo: Funcional (Limite)

Precondições:
  - Formulário com dados básicos

Passos:
  1. Deixar campo "Inquilino" vazio
  2. Preencher outros campos
  3. Clicar "Adicionar imóvel"

Resultado Esperado:
  ✓ Imóvel criado com tenant: "Inquilino não informado" (ou vazio)
  ✓ Campo não exibido nos detalhes (opcional)
```

### TC-035: Reset do Formulário Após Cadastro
```
ID: TC-035
Título: Validar que formulário é limpo após adicionar imóvel
Prioridade: MÉDIA
Tipo: Funcional

Precondições:
  - Formulário com dados preenchidos

Passos:
  1. Preencher todos os campos do formulário
  2. Clicar "Adicionar imóvel"
  3. Observar formulário

Resultado Esperado:
  ✓ Todos os inputs do formulário ficam vazios
  ✓ Campos de data ficam vazios
  ✓ Campo de número (aluguel) volta a 0
  ✓ Pronto para novo cadastro
```

### TC-036: Múltiplos Cadastros Consecutivos
```
ID: TC-036
Título: Validar criação de múltiplos imóveis em sequência
Prioridade: ALTA
Tipo: Funcional (Integração)

Precondições:
  - Aplicação com 3 imóveis iniciais

Passos:
  1. Cadastrar Imóvel A (endereço: "Praia A")
  2. Cadastrar Imóvel B (endereço: "Praia B")
  3. Cadastrar Imóvel C (endereço: "Praia C")
  4. Observar lista

Resultado Esperado:
  ✓ Todos os 3 imóveis criados com sucesso
  ✓ Badge mostra "6 imóveis"
  ✓ Imóveis aparecem no topo da lista em ordem reversa
     (último cadastrado no topo)
  ✓ Todos os dados estão corretos
  ✓ Nenhum imóvel foi perdido
  ✓ Busca encontra todos os novos imóveis
```

### TC-037: ID Único para Cada Novo Imóvel
```
ID: TC-037
Título: Validar que cada imóvel recebe ID único
Prioridade: ALTA
Tipo: Funcional (Caixa Branca)

Precondições:
  - Aplicação em desenvolvimento (acesso ao console)

Passos:
  1. Abrir DevTools (F12)
  2. Abrir aba "Console"
  3. Executar: console.log(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)
     (ou inspecionar estado com React DevTools)
  4. Cadastrar 3 imóveis novos
  5. Verificar IDs no estado

Resultado Esperado:
  ✓ Cada novo imóvel recebe um ID único
  ✓ IDs continuam sequência (ex: id_1=4, id_2=5, id_3=6)
  ✓ IDs não se repetem
  ✓ Nenhum conflito de ID
```

---

## 9. TESTES NÃO-FUNCIONAIS

### TN-001: Performance com Listagem Grande
```
ID: TN-001
Título: Validar performance com 100+ imóveis
Prioridade: MÉDIA
Tipo: Performance

Precondições:
  - Script para criar 100 imóveis automaticamente

Passos:
  1. Criar 100 imóveis via cadastro repetido
  2. Medir tempo de renderização
  3. Aplicar filtro (que retorna 10 resultados)
  4. Medir tempo de filtro
  5. Fazer scroll na lista
  6. Medir responsividade

Resultado Esperado:
  ✓ Carregamento inicial: < 2 segundos
  ✓ Filtro aplicado: < 500ms
  ✓ Scroll suave (60 FPS)
  ✓ Sem travamentos
  ✓ Uso de memória razoável
```

### TN-002: Responsividade em Dispositivos Móveis
```
ID: TN-002
Título: Validar layout em telas pequenas
Prioridade: ALTA
Tipo: Usabilidade

Precondições:
  - Aplicação aberta
  - Viewport móvel (375x667)

Passos:
  1. Redimensionar para iPhone 12 (375x812)
  2. Verificar layout dos painéis
  3. Verificar campo de busca
  4. Verificar cards de imóvel
  5. Verificar formulário de cadastro
  6. Testar scroll e interações

Resultado Esperado:
  ✓ Layout se adapta ao móvel
  ✓ Painéis laterais podem estar em coluna
  ✓ Campo de busca visível e funcional
  ✓ Cards redimensionam
  ✓ Formulário é responsivo
  ✓ Botão é clicável

Observação:
  - CSS pode não ter breakpoints (não mencionado no projeto)
  - Teste pode revelar problemas de responsividade
```

### TN-003: Compatibilidade entre Navegadores
```
ID: TN-003
Título: Validar funcionamento em diferentes navegadores
Prioridade: MÉDIA
Tipo: Compatibilidade

Precondições:
  - Aplicação disponível

Passos:
  1. Abrir em Chrome (últimas 2 versões)
  2. Abrir em Firefox (últimas 2 versões)
  3. Abrir em Safari (últimas 2 versões)
  4. Abrir em Edge (últimas 2 versões)
  5. Executar TC-001 a TC-036 em cada navegador

Resultado Esperado:
  ✓ Todas as funcionalidades funcionam identicamente
  ✓ CSS renderiza igualmente
  ✓ Nenhum erro específico de navegador
  ✓ Input type="date" funciona
```

### TN-004: Acessibilidade Básica (WCAG)
```
ID: TN-004
Título: Validar conformidade básica com WCAG 2.1 nível A
Prioridade: MÉDIA
Tipo: Acessibilidade

Precondições:
  - Aplicação disponível
  - ferramentas: axe DevTools, WAVE

Passos:
  1. Abrir aplicação
  2. Executar axe DevTools
  3. Verificar sem erros críticos
  4. Testar navegação por teclado (Tab)
  5. Testar com leitor de tela (NVDA/JAWS)
  6. Verificar contraste de cores

Resultado Esperado:
  ✓ Sem erros críticos ou sérios
  ✓ Campo de busca acessível por teclado
  ✓ Botões acessíveis por teclado
  ✓ Contraste > 4.5:1 para texto normal
  ✓ Labels associados aos inputs
```

### TN-005: Segurança - XSS em Busca
```
ID: TN-005
Título: Validar proteção contra XSS no campo de busca
Prioridade: ALTA
Tipo: Segurança

Precondições:
  - Aplicação carregada

Passos:
  1. Digitar no campo de busca: <script>alert('XSS')</script>
  2. Observar comportamento
  3. Tentar: <img src=x onerror="alert('XSS')">
  4. Tentar: " onload="alert('XSS')"

Resultado Esperado:
  ✓ Nenhum script executado
  ✓ Texto é tratado como string literal
  ✓ Busca retorna 0 resultados (não encontra)
  ✓ Nenhuma vulnerabilidade explorada
```

### TN-006: Segurança - XSS em Cadastro
```
ID: TN-006
Título: Validar proteção contra XSS em formulário
Prioridade: ALTA
Tipo: Segurança

Precondições:
  - Formulário disponível

Passos:
  1. Preencher Título: <img src=x onerror="alert('XSS')">
  2. Clicar "Adicionar imóvel"
  3. Observar nos detalhes

Resultado Esperado:
  ✓ Script não executado
  ✓ HTML é escapado
  ✓ Texto exibido literalmente (sem renderizar HTML)
  
Observação:
  - React por padrão escapa conteúdo (safe)
```

---

## 10. CRITÉRIOS DE ENTRADA E SAÍDA

### Critérios de Entrada para Teste
- ✅ Ambiente de teste configurado
- ✅ Aplicação compilada e rodando em http://localhost:4173
- ✅ Dados iniciais carregados (3 imóveis fake)
- ✅ Navegador atualizado
- ✅ DevTools disponível
- ✅ Plano de testes aprovado

### Critérios de Saída (Conclusão)

#### Saída com Sucesso
- ✅ 95%+ dos casos de teste passando
- ✅ Nenhum defeito crítico aberto
- ✅ Nenhum defeito de segurança (XSS, etc)
- ✅ Performance aceitável
- ✅ Sem erros no console
- ✅ Cobertura de funcionalidades: 100%

#### Saída com Restrições
- ⚠️ 80-95% dos testes passando
- ⚠️ Defeitos críticos têm roadmap de fix
- ⚠️ Defeitos menores podem ser adiados para próxima versão

#### Saída Bloqueada
- ❌ < 80% dos testes passando
- ❌ Defeitos críticos não resolvidos
- ❌ Vulnerabilidades de segurança encontradas
- ❌ Performance inaceitável

---

## 📊 MATRIZ DE RASTREABILIDADE

| Requisito | TC-ID | Tipo | Status |
|-----------|-------|------|--------|
| Listar imóveis iniciais | TC-001 | Funcional | Planejado |
| Validar dados iniciais | TC-002 | Funcional | Planejado |
| Selecionar imóvel | TC-003, TC-020 | Funcional | Planejado |
| Buscar por título | TC-006 | Funcional | Planejado |
| Buscar por endereço | TC-007 | Funcional | Planejado |
| Buscar por proprietário | TC-008 | Funcional | Planejado |
| Buscar por inquilino | TC-009 | Funcional | Planejado |
| Buscar por status | TC-010 | Funcional | Planejado |
| Busca case-insensitive | TC-011 | Funcional | Planejado |
| Exibir detalhes | TC-019, TC-020, TC-021 | Funcional | Planejado |
| Cadastrar imóvel | TC-023 | Funcional | Planejado |
| Validação de campos | TC-024 a TC-034 | Funcional | Planejado |
| Performance | TN-001 | Não-Funcional | Planejado |
| Responsividade | TN-002 | Não-Funcional | Planejado |
| Compatibilidade | TN-003 | Não-Funcional | Planejado |
| Acessibilidade | TN-004 | Não-Funcional | Planejado |
| Segurança (XSS) | TN-005, TN-006 | Segurança | Planejado |

---

## 📌 ESTIMATIVAS

### Esforço Estimado
- **Testes Manuais (TC-001 a TN-006):** 40-50 horas
- **Automação (Regression Suite):** 30-40 horas
- **Execução Inicial:** 20-25 horas
- **Ciclos de Regressão (por iteração):** 10-15 horas

### Duração Estimada
- **Fase de Planejamento:** 2-3 dias
- **Fase de Execução Inicial:** 5-7 dias
- **Fase de Regressão:** 2-3 dias por release

---

## 📝 NOTAS FINAIS

### Pontos de Atenção
1. **R03 - Validação:** Atualmente aceita dados vazios com defaults
2. **R02 - Moeda:** Verificar formatação em todos os valores
3. **Bedrooms/Bathrooms:** Hardcoded em 2/1 para novos imóveis - validar se esperado
4. **Persistência:** Dados perdidos ao recarregar página - comportamento esperado

### Recomendações
- Implementar validação robusta de campos obrigatórios
- Adicionar testes unitários para função de filtro
- Considerar testes E2E automatizados (Cypress/Playwright)
- Adicionar logs de erro
- Implementar tratamento de erros de input

---

**Aprovado por:** QA Senior  
**Data:** 2025-07-20  
**Versão:** 1.0  
