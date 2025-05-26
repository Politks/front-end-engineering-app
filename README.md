# Todo List Application

Uma aplicação de lista de tarefas em tempo real construída com React, TypeScript e WebSocket.

## Funcionalidades

- Criar novas tarefas com título e descrição
- Atualizações em tempo real usando WebSocket

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
VITE_SOCKET_URL=http://localhost:3000
```

## Executando o Projeto

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

2. Acesse a aplicação em seu navegador:
```
http://localhost:5173
```

## Tecnologias Utilizadas

- React
- TypeScript
- Socket.IO Client
- Vite

## Estrutura do Projeto

- `/src/components` - Componentes React
- `/src/services` - Serviços de API e WebSocket
- `/src/types` - Definições de tipos TypeScript

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
