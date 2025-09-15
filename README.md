# API de Integração - Plataforma Open Finance

![Licença](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v20.x-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-brightgreen.svg)

## Descrição

Esta é uma API RESTful desenvolvida para atuar como um hub de integração no ecossistema de Open Finance. A plataforma permite a conexão segura entre instituições financeiras e clientes, facilitando o compartilhamento de dados de forma consentida.

O projeto utiliza **Node.js** e **Express.js** para construir um backend robusto, com o **MongoDB** como banco de dados para armazenar informações e o **Mongoose** para a modelagem desses dados.

## Funcionalidades Principais

- **Criação de Clientes:** Permite registrar novos clientes.
- **Criação de Contas:** Permite criar uma nova conta bancária e associá-la a um cliente (`Customer`) existente.
_ **Criação de Transações:** Permite criar uma nova transação de crédito ou débito e associá-la a uma conta (`Account`) existente.
- **ID Automático:** Gera automaticamente um ID único para cada novo cliente, conta e transação nos formatos `cus_XXX`, `acc_XXX`, `txn_XXX` respectivamente.
- **Consulta de Saldo:** Endpoint específico para obter o saldo de uma conta de forma rápida e segura.
- **Listagem de Contas, Clientes e Transações:** Permite visualizar todos os registros cadastrados no sistema.
- **Precisão Monetária:** Utiliza o tipo `Decimal128` do Mongoose para garantir a precisão no armazenamento de valores de saldo.

## Tecnonogias utilizadas

- **Node.js**: Ambiente de execução do código no servidor.
- **Express.js**: Framework para gerenciamento de rotas e requisições HTTP.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **Mongoose**: ODM para modelagem e abstração da comunicação com o MongoDB.
- **Nodemon**: Ferramenta de desenvolvimento que reinicia o servidor automaticamente após alterações no código.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Uma instância do [MongoDB](https://www.mongodb.com/)

## Instalação e configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/larissatoyohashi/compass-uol-projeto-banco](https://github.com/larissatoyohashi/compass-uol-projeto-banco)
    ```

2.  **Instale o express:**
    ```bash
    npm install express
    ```
    
## Executando a API

1. **Para iniciar o servidor:**
    ```bash
        npm start
    ```
O servidor estará disponível em http://localhost:3000

