# API de Integração - Plataforma Open Finance

![Licença](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v20.x-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-brightgreen.svg)

## 📖 Descrição

Esta é uma API REST desenvolvida para atuar como um hub de integração no ecossistema de Open Finance. A plataforma permite a conexão segura entre instituições financeiras e clientes, facilitando o compartilhamento de dados de forma consentida.

O projeto utiliza **Node.js** e **Express.js** para construir um backend robusto, com o **MongoDB** como banco de dados para armazenar informações e o **Mongoose** para a modelagem desses dados.

## 🏛️ Funcionalidades Principais

- **Criação de Clientes:** Permite registrar novos clientes.
- **Criação de Contas:** Permite criar uma nova conta bancária e associá-la a um cliente (`Customer`) existente.
_ **Criação de Transações:** Permite criar uma nova transação de crédito ou débito e associá-la a uma conta (`Account`) existente.
- **ID Automático:** Gera automaticamente um ID único para cada novo cliente, conta e transação nos formatos `cus_XXX`, `acc_XXX`, `txn_XXX` respectivamente.
- **Consulta de Saldo:** Endpoint específico para obter o saldo de uma conta de forma rápida e segura.
- **Listagem de Contas, Clientes e Transações:** Permite visualizar todos os registros cadastrados no sistema.
- **Precisão Monetária:** Utiliza o tipo `Decimal128` do Mongoose para garantir a precisão no armazenamento de valores de saldo.

## 🚀 Tecnonogias utilizadas

- **Node.js**: Ambiente de execução do código no servidor.
- **Express.js**: Framework para gerenciamento de rotas e requisições HTTP.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **Mongoose**: ODM para modelagem e abstração da comunicação com o MongoDB.
- **Nodemon**: Ferramenta de desenvolvimento que reinicia o servidor automaticamente após alterações no código.

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Uma instância do [MongoDB](https://www.mongodb.com/)

## ⚙️ Instalação e configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/larissatoyohashi/compass-uol-projeto-banco](https://github.com/larissatoyohashi/compass-uol-projeto-banco)
    ```

2.  **Instale o express:**
    ```bash
    npm install express
    ```
    
## ▶️ Executando a API

1. **Para iniciar o servidor:**
    ```bash
        npm start
    ```
O servidor estará disponível em http://localhost:4000

## Endpoints da API

A seguir estão detalhados os endpoints disponíveis para o recurso de Clientes (`Customers`).

### Criar um Novo Cliente

- **Método:** `POST`
- **URL:** `/customers`
- **Corpo da Requisição (JSON):**

  ```json
  {
    "name": "Maria Silva",
    "cpf": "12345678900",
    "email": "maria.silva@email.com"
    }

### Consultar Clientes


- **Método:** `GET`
- **URL:** `/customers`
- **Resposta de Sucesso (200 OK):**

  ```json
    "customers": [
            {
                "_id": "cus_315",
                "name": "Maria Silva",
                "cpf": 12345678900,
                "email": "maria.silva@email.com",
                "accounts": [
                    "acc_686"
                ]
            }
        ]

***

A seguir estão detalhados os endpoints disponíveis para o recurso de Contas (`Accounts`).

### Criar uma Nova Conta

- **Método:** `POST`
- **URL:** `/accounts`
- **Corpo da Requisição (JSON):**
  ```json
  {
    "_id": "cus_315",
    "type": "Corrente",
    "branch": "001",
    "number": "12345-6"
  }

### Consultar Contas Bancárias

- **Método:** `GET`
- **URL:** `/accounts`
- **Resposta de Sucesso (200 OK):**

  ```json
    "accounts": [
        {
            "balance": {
                "$numberDecimal": "0.00"
            },
            "_id": "acc_847",
            "branch": "checking",
            "number": "0001",
            "transactions": []
        },
    ]

### Consultar o Saldo de uma Contas Bancárias

- **Método:** `GET`
- **URL:** `/accounts/:id/balance`
- **Resposta de Sucesso (200 OK):**

  ```json
    {
    "_id": "acc_416",
    "balance": {
        "$numberDecimal": "0.00"
    }
    }

### Consultar as Transações feitas por uma Conta Bancária

- **Método:** `GET`
- **URL:** `/accounts/:id/transactions`
- **Resposta de Sucesso (200 OK):**

  ```json
    [{
        "_id": "txn_c7b",
        "date": "2020-12-13",
        "description": "Transfer via pix",
        "amount": {
            "$numberDecimal": "1000"
        },
        "type": "debit",
        "category": "test",
        "__v": 0
    },
    {
        "_id": "txn_62c",
        "date": "2020-12-13",
        "description": "Transfer via pix",
        "amount": {
            "$numberDecimal": "1000"
        },
        "type": "debit",
        "category": "test",
        "__v": 0
    }]


***

A seguir estão detalhados os endpoints disponíveis para o recurso de Transações (`Transactions`).

### Criar uma Nova Transação

- **Método:** `POST`
- **URL:** `/transactions`
- **Corpo da Requisição (JSON):**

  ```json
    {
    "_id" : "acc_847",
    "date" : "2025-09-12",
    "description" : "Transfer via pix",
    "amount" : 1000.00,
    "type" : "debit",
    "category" : "Income"
    }


### Consultar Transações

- **Método:** `GET`
- **URL:** `/transactions`
- **Resposta de Sucesso (200 OK):**

  ```json
    "transactions": [
        {
            "_id": "txn_c7b",
            "date": "2025-09-12",
            "description": "Transfer via pix",
            "amount": {
                "$numberDecimal": "1000"
            },
            "type": "debit",
            "category": "Income"
        }
    ]
***


## 📂 Estrutura do Projeto

A arquitetura do projeto foi organizada para promover a separação de responsabilidades (Separation of Concerns), facilitando a manutenção e escalabilidade.

        ``` bash
        ├── controllers/
        │   ├── accountController.js
        │   ├── customerController.js
        │   ├── permissionController.js
        │   └── transactionController.js
        ├── models/
        │   ├── Accounts.js
        │   ├── Customers.js
        │   ├── Permissions.js
        │   └── Transactions.js
        ├── routes/
        │   ├── accountRoutes.js
        │   ├── customerRoutes.js
        │   ├── permissionRoutes.js
        │   └── transactionRoutes.js
        ├── services/
        │   └── (Arquivos com a lógica de negócio)
        ├── .gitignore
        ├── app.js
        ├── LICENSE
        ├── package.json
        └── README.md

---

- **routes/:** Define os endpoints da API, os métodos HTTP (GET, POST, etc.) e os direciona para o método correspondente no Controller adequado.
- **controllers/:** Recebe as requisições das rotas. 
- **services/:** Contém toda a lógica de negócio da aplicação. Ele é chamado pelos Controllers e utiliza os Models para interagir com o banco de dados.
- **models/:** Define a camada de dados através dos Schemas do Mongoose. 
- **app.js:** Ponto de entrada principal da aplicação, onde o Express é configurado, os middlewares são aplicados e as rotas são inicializadas.

## 📄 Licença
Este projeto é distribuído sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
Feito por Larissa Toyohashi.

