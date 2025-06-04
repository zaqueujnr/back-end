# 📦 Oportunidades na indústria 

API RESTful para encontrar empresas, vagas de trabalho e profissionais na área industrial.

## 🚀 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [CI/CD](https://github.com/features/actions)

## 🧠 Metodologias e Boas Práticas Utilizadas

- [x] **SOLID** – Princípios de design orientado a objetos
- [x] **Clean Architecture** – Separação de responsabilidades por camadas
- [x] **DDD (Domain-Driven Design)** – Foco na lógica de negócio
- [x] **TDD (Test-Driven Development)** – Desenvolvimento guiado por testes

## Configure as variáveis de ambiente

.env.db .env.db.hml .env.db.prod .env.db.dev (examples)

POSTGRES_USER=postgres  
POSTGRES_PASSWORD=password  

.env .env.hml .env.prod .env.dev (examples)

PORT=3000  
DATABASE_URL=postgres://user:password@db_service:5432/db_name  
SKIP_DOTENV=true  

## Como rodar o projeto local

-> psql -U seu_usuario -d postgres -c "CREATE DATABASE nome_da_database;"

-> psql -U seu_usuario -d nome_da_database -f create.sql

-> npm i

-> npm run dev

## Como rodar o projeto com Docker

-> Tests: docker-compose -f docker-compose.test.yml up --build

-> Homolog: docker-compose -f docker-compose.homolog.yml up --build

-> Production: docker-compose -f docker-compose.prod.yml up --build


