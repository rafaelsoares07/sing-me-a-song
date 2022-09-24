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
Crie na pasta raiz um arquivo .env e configure as seguintes variáveis de ambiente:
```
DATABASE_URL="postgres://<seu_usuario>:<sua_senha>@localhost:5432/RepoProvas?schema=public"
PORT=500
```
Por fim, você pode usar o primeiro comando para colocar no ar o servidor e para rodar o projeto em React use o segundo comando
```
npm run dev
npm start
```

## :bookmark_tabs: Rodando os testes de integração
Para executar os testes de integração basta usar o script de test, ele irá criar um ambiente próprio para teste, onde teremos um banco de dados dedicado
exclusivamente para rodar todos os testes.
```
npm test
```


