# <p align="center">Sing me a Song</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Rafael_Soares-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/rafaelsoares07/projeto20-repoProvas?color=4dae71&style=flat-square" />
</p>

## :clipboard: Descrição:
Nesse projeto, nós foi fornecido o front-end e back-end já feitos, deveriamos então criar testes unitários, de integração e 
testes de ponta a ponta do nosso Site

## :computer: Tecnologias e Libs utilizadas:
- Prisma ORM
- Jest
- Cypress


## 🏁 Rodando a aplicação
Primeiro faça um clone desse repositório na sua máquina:
```
git clone https://github.com/rafaelsoares07/sing-me-a-song
```
Dentro das pasta raizes do projeto, execute o seguinte comando para instalar as depedencias necessarias:
```
npm install
```
Crie na pasta raiz do back-end um arquivo .env e configure as seguintes variáveis de ambiente:
```
PORT=5000
DATABASE_URL="sua string de conexão"
NODE_ENV=development
```
Agora crie um arrquivo .env.test, par configurar um amiente específico para rodar todas as implementações dos testes:
```
PORT=5000
DATABASE_URL="sua string de conexão"
NODE_ENV=test
```
Na raiz do diretorio do front-end, crie um aquivo .env com a seguinte configuração:
```
REACT_APP_API_BASE_URL=http://localhost:5000
```

Use os seguintes comandos para executar os testes do back-end:
```
npm run dev:unit //executa os testes unitários
npm run dev:int //executa os testes de integração
npm run dev:test //executa servido em ambiente de testes
npm start //executa o servidor
```

## :bookmark_tabs: Rodando os testes E2E
Para executar os testes de E2E, você irá precisar estar com a aplicação React sendo executado no seu broswer, aṕos isso basta abrir o cypress
e escoolher os testes que você deseja executar.
```
npm start //Iniacializa a aplicação no browser
npx cypress open //Abre a interface do cypress para executar os testes
```


