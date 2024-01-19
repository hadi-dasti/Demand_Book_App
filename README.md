

## Description
Library Book Demand Microservices
Overview

This project consists of microservices implemented with NestJS to manage book demands in a library. The system is designed to handle the following functionalities:

    Demand Book Service: Receives requests to borrow books, saves the demand information in a database, and publishes the demand to a RabbitMQ queue for further processing.

    Process Demand Book Service: Listens to the RabbitMQ queue for book demands, processes them, and updates the book availability status. It responds to the Demand Book Service with the processing outcome.

Features

    Microservices Architecture: The project is structured using a microservices architecture to ensure modularity and scalability.

    RabbitMQ Integration: RabbitMQ is utilized for event-driven communication between microservices, ensuring seamless communication and loose coupling.

    TypeORM for Database: TypeORM is used for database interactions, providing a convenient and flexible way to work with the underlying database.

Microservices Details
1. Demand Book Service

    Endpoint: /demand-book
    Functionality:
        Accepts requests to borrow books.
        Saves demand information in a database.
        Publishes demand details to a RabbitMQ queue for further processing.

2. Process Demand Book Service

    Endpoint: /demand-book/process-book
    Functionality:
        Listens to the RabbitMQ queue for book demands.
        Processes the demands, checks book availability, and updates status.
        Responds to the Demand Book Service with the processing outcome


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
