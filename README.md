# FireLogin & Gemini Dashboard

Protótipo de interface de autenticação e painel responsivo desenvolvido com React e TypeScript. A experiência reúne telas de login, cadastro e recuperação de senha, uma área de dashboard e uma mensagem de boas-vindas que pode ser gerada com a API do Gemini.

## O que está implementado

- Interface responsiva para login, cadastro e recuperação de senha.
- Validação de formato de e-mail e regras básicas de senha no cliente.
- Mensagens de erro, carregamento, sucesso e bloqueio temporário após tentativas inválidas.
- Componentes reutilizáveis de formulário, botões e painel.
- Dashboard com cartões demonstrativos.
- Serviço de mensagem de boas-vindas com Gemini e mensagem alternativa quando a API não está disponível.

## Tecnologias

- React 19
- TypeScript
- Vite
- Google GenAI SDK
- Tailwind CSS (via CDN no documento HTML)

## Executar localmente

**Pré-requisitos:** Node.js e npm.

```bash
npm install
npm run dev
```

O Vite informa no terminal o endereço local do servidor.

### Configurar a integração Gemini (opcional)

Para habilitar a mensagem de boas-vindas gerada pelo Gemini:

1. Crie um arquivo chamado `.env.local` na raiz do projeto.
2. Adicione sua chave:

   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```

3. Reinicie o servidor de desenvolvimento depois de salvar o arquivo.

O Vite lê essa variável pela configuração do projeto. Sem ela, a aplicação utiliza a mensagem alternativa.

> **Atenção:** neste protótipo, a chave é incorporada ao código entregue ao navegador pela configuração do Vite. Portanto, ela pode ser extraída por quem acessar a aplicação. Use somente uma chave temporária/restrita para testes; não utilize esse padrão em produção. Em um sistema real, a chamada à API deve passar por um backend que mantenha a chave fora do navegador.

Para gerar e pré-visualizar a versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura principal

```text
components/
  Button.tsx       # botão reutilizável
  Dashboard.tsx    # painel após a simulação de autenticação
  Input.tsx        # campo reutilizável
services/
  authService.ts   # serviços simulados de autenticação
  geminiService.ts # integração para mensagem de boas-vindas
App.tsx            # fluxos de login, cadastro e recuperação
types.ts           # tipos e estados da aplicação
utils/             # validação e utilitários de entrada
```

## Limitações e segurança

Este repositório é um **protótipo de interface**, não um sistema pronto para autenticação em produção.

- As operações de login por e-mail, cadastro, recuperação de senha e login com Google usam funções simuladas em `services/authService.ts`. Não há conexão ativa com Firebase nem persistência de contas.
- O reCAPTCHA ainda utiliza uma chave de exemplo (`YOUR_RECAPTCHA_SITE_KEY`) e precisa de configuração real. A presença do código no cliente não substitui validação do token no servidor.
- O limite de tentativas está implementado no estado do frontend e não oferece proteção contra força bruta sem controles no backend.
- A geração de mensagem com Gemini depende de uma chave de API configurada corretamente no ambiente de execução. Sem ela, o serviço retorna uma mensagem alternativa.
- Os cartões do dashboard são conteúdo demonstrativo, não módulos funcionais conectados a dados reais.

Não insira credenciais reais nem utilize este protótipo para proteger contas ou dados. Uma implementação de produção exigiria autenticação real, validação no servidor, gerenciamento seguro de sessões, proteção contra abuso e configuração adequada das chaves e do reCAPTCHA.

---

Projeto experimental de estudo de interfaces, fluxos de autenticação e integração com IA.
