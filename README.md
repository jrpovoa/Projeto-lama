# Projeto-lama

## 🚀 Descrição do Projeto

Labenu Music Awards é um show anual de músicas organizado pela própria Labenu que conta com a participação de bandas super famosas nacionais e internacionais! Ele sempre acontece durante uma semana inteira, começando na manhã de segunda e encerrando na noite de domingo.

Para gerenciar o evento é necessário organizar e centralizar as informações dos shows em um servidor, que então disponibiliza os dados para o website no front-end. Além de controlar os eventos com suas bandas e datas do show, a aplicação também deve gerenciar os ingressos de cada show. A arena tem uma capacidade máxima de 5000 pessoas, portanto deve ser respeitado um limite máximo de ingressos por show.

## 📋 Funcionalidades
- Endpoint de signup - Onde é possível a criação de um usuário.
- Endpoint de login - Onde é possível fazer login após se cadastrar.
- Endpoint de criação dos shows - Onde apenas os usuários com a 'role' de "ADMIN" são capazes de criar shows.
- Endpoint de obtenção de shows - Onde retorna todos os shows que terão no festival.
- Endpoint que cria e reserva um ingresso - Onde o usuário é capaz de obter a reserva de  um ingresso.
- Endpoint que deleta a reserva do ingresso - Onde o apenas o usuário que obteve a reserva de um ingresso, cancela essa reserva.

### 🔧 Setup
#### Instalando depenências:
-   `npm install`:
    Instala todas as dependências listadas no `package.json`.
    
#### Criando o arquivo .env:
Criar o arquivo `.env` e configurar com as informações do seu banco de dados.

```
PORT: 3003
DB_HOST = host
DB_USER = usuario
DB_PASSWORD = senha
DB_NAME = nome-do-banco-de-dados
JWT_KEY = "minha-senha-segura"
JWT_EXPIRES_IN = "24h"
BCRYPT_COST = 12
```

#### Populando a tabela:
-    `npm run migrations`
      Cria e popula as tabelas com dados _mockados_ de usuários e shows.
      
#### Populando a tabela:
-    `npm run dev`
      Estabelece uma conexão com o banco de dados e reincia automáticamente o servidor `localhost` toda vez que o projeto for alterado e salvo.
      
---

## 🛠️ Tecnologias Utilizadas

Mencione as ferramentas que você usou para criar seu projeto

* [Typescript](https://www.typescriptlang.org/docs/)
* [Express](https://expressjs.com/)
* [Knex](https://knexjs.org/)
* [MySQL](https://www.mysql.com/)

## ✒️ Autores

## INTEGRANTE
Perfil      | Link do perfil no GitHUB
--------- | ------
[<img src="https://avatars.githubusercontent.com/jrpovoa" width="75px;"/>](https://github.com/desenvolvedor1) | [ Rodrigo Póvoa ](https://github.com/jrpovoa)
