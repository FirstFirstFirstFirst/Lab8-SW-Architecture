# Clinic System Setup Guide

## Prerequisites
- Docker and Docker Compose installed
- Node.js and NPM installed
- Access to a machine with a static IP address

## Environment Configuration

1. Create a `.env` file in the root directory with the following content:
```env
DB_USER=admin
DB_PASSWORD=1234
BASE_URL=http://<YOUR_MACHINE_IP>:9000
BASE_WS_URL=ws://<YOUR_MACHINE_IP>:9000
BROKER_USER=admin
BROKER_PASSWORD=1234
EXCH_REGISTRATION=registration
EXCH_EXAMINED=patient-examined
EXCH_DISCHARGED=patient-discharged
EXCH_NEW_PATIENT=patient-new
```

Replace `<YOUR_MACHINE_IP>` with your actual machine's IP address.

## Database Setup

### Registration Service Database Setup
1. Access the registration service container:
```bash
docker compose exec clinic-registration /bin/sh
```

2. Inside the container, run:
```bash
npx prisma generate
npx prisma migrate deploy
```

### Examination Service Database Setup
1. Access the examination service container:
```bash
docker compose exec clinic-examination /bin/sh
```

2. Inside the container, run:
```bash
npx prisma generate
npx prisma migrate deploy
```

## Message Broker Configuration

To set up the RabbitMQ broker password:
```bash
docker exec clinic-broker rabbitmqctl change_password admin 1234
```

## System Architecture

The system consists of several microservices:
- Registration Service: Handles patient registration
- Examination Service: Manages patient examinations
- Message Broker (RabbitMQ): Facilitates communication between services

