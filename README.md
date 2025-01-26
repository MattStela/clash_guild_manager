# Projeto de Informações da Guilda do Clash of Clans

## Descrição
Este projeto exibe informações sobre a guilda do jogo Clash of Clans para melhore gerenciamento dos líderes, incluindo membros e histórico de guerras. Utiliza a API oficial do Clash of Clans. 

## Pré-requisitos
- No jogo, coloque as informações da guilda como públicas.
- Crie uma chave em "My Account" em [Clash of Clans Developer Portal](https://developer.clashofclans.com/#/) e relacione ao seu IP público.

## Configuração
1. Crie um arquivo de nome literal `.env` na raiz do projeto e adicione a chave configurada com seu IP da seguinte forma:
    ```sh
    CLASH_API_KEY=lakmsndlsa9dasm45kofbjnb723lcx0s9adfsça
    ```

2. Execute o servidor proxy:
    ```sh
    node proxy-server.js
    ```

3. Em outro terminal, execute o servidor de desenvolvimento:
    ```sh
    npm run dev
    ```

4. Acesse no navegador [localhost](http://localhost:3000/).

## Seja feliz
Com as informações configuradas e o projeto em execução, explore as informações da sua guilda do Clash of Clans.

Observação: Eu tentei configurar um host, encarei o próprio diabo e voltei da minha miséria. Não tente.

Observação 2: Caso algum administrador ou desenvolvedor do jogo deseje que esse código seja removido a qualquer momento, me contate :D
