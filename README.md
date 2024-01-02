# Finware-app-challenge

Finware wallet application README!, This application was created to generate investment opportunities for the user and allow them to visualize the investment lifecycle until liquidation.

### Key Features

**Signup**: This API endpoint facilitates the seamless registration of new users.
**Login**: This API endpoint streamlines user authentication by providing a secure mechanism for users to access their accounts.
**Invetment oportunities**: This API serves as the gateway to a fortress of investment opportunities.
**Create new Investment**: This API endpoint empowers users to initiate new investment opportunities seamlessly.
**Liquidate Investment**: This API endpoint allows users to efficiently liquidate their investments.

## Stack

Node
Typescript
Express
Postgres
Sequelize
Docker
JWT

Install exact node dependencies:

```bash
npm install
```

Run preversion to format with prettier, chek lint:

```bash
npm run preversion
```

Run all tests:

```bash
npm test
```

Build the app for production:

```bash
npm run transpile
```

## Start application

This application runs containerized with Docker. It should start with the following command line..

Start server with default postgres connection:

```bash
docker-compose up --build
```

## API

Host:
Open [http://localhost:8000](http://localhost:8000) with your browser.

### User registration

```code
{
    url: 'http://localhost:8000/api/v1/auth/signup',
    method: 'POST',
    ContentType: 'application/json'
    body: {
		"username":  "Alan Mathison Turing",
		"email":  "alan_turing@example.com",
		"password":  "jdkslkew",
		"postaladdress":  "Maida Vale, London, United Kingdom",
		"birthdate":  "23-06-1962"
	}
    reply: {
		"user":  {
			"id":  3,
			"username":  "Alan Mathison Turing",
			"email":  "alan_turing@example.com",
			"postaladdress":  "Maida Vale, London, United Kingdom",
			"birthdate":  "23-06-1962",
			"updatedAt":  "2024-01-01T14:18:21.391Z",
			"createdAt":  "2024-01-01T14:18:21.391Z"
		},
		"wallet":  {
			"balance":  "1000.00",
			"id":  4,
			"UserId":  3,
			"updatedAt":  "2024-01-01T14:18:21.514Z",
			"createdAt":  "2024-01-01T14:18:21.514Z"
		}
	}
```

### Login

```code
{
    url: 'http://localhost:8000/api/v1/auth/login',
    method: 'POST',
    ContentType: 'application/json'
    body: {
		"email":  "alan_turing@example.com",
		"password":  "jdkslkew"
	}
	reply: {
		"token": "eyJhbGciOiJIUzI1NiJ9..."
	}
}
```

### Get Investment options

```code
{
    url: 'http://localhost:8000/api/v1/investmentOpt',
    method: 'GET',
    Authorization: 'Token',
    ContentType: 'application/json'
    reply: [
		{
		"id":  1,
		"name":  "Maggio - Abshire",
		"totalAmount":  "65000.00",
		"industry":  "Agricultura",
		"reateOfReturn":  "8.00",
		"termnType":  "Mensual",
		"term":  12,
		"location":  "86028 Nathen Coves",
		"risk":  "Alto",
		"createdAt":  null,
		"updatedAt":  null
		},
		...
	]
```

### Create Investment

```code
{
    url: 'http://localhost:8000/api/v1/investment',
    method: 'POST',
    Authorization: 'Token',
    ContentType: 'application/json'
    body: {
		"WalletId":  4,
		"InvestmentOptId":  2,
		"initialAmount":  250
	}
	reply {
		"status":  "Activo",
		"id":  3,
		"WalletId":  4,
		"InvestmentOptId":  2,
		"initialAmount":  "250.00",
		"balance":  "250.00",
		"updatedAt":  "2024-01-02T03:45:44.933Z",
		"createdAt":  "2024-01-02T03:45:44.933Z"
	}
```

### Get all Investment

```code
{
    url: 'http://localhost:8000/api/v1/investment/search',
    method: 'POST',
    Authorization: 'Token',
    ContentType: 'application/json'
    body: {
		"WalletId":  4,
	}
	reply [
		{
			"id":  1,
			"status":  "Activo",
			"WalletId":  4,
			"InvestmentOptId":  1,
			"initialAmount":  "250.00",
			"balance":  "250.00",
			"createdAt":  "2024-01-01T16:29:02.254Z",
			"updatedAt":  "2024-01-01T16:29:02.254Z",
			"InvestmentOpt.id":  1,
			"InvestmentOpt.name":  "Maggio - Abshire",
			"InvestmentOpt.totalAmount":  "65000.00",
			"InvestmentOpt.industry":  "Agricultura",
			"InvestmentOpt.reateOfReturn":  "8.00",
			"InvestmentOpt.termnType":  "Mensual",
			"InvestmentOpt.term":  12,
			"InvestmentOpt.location":  "86028 Nathen Coves",
			"InvestmentOpt.risk":  "Alto",
			"InvestmentOpt.createdAt":  null,
			"InvestmentOpt.updatedAt":  null
		}
	]
```

### Liquidate Investment

```code
{
    url:'http://localhost:8000/api/v1/investment/:id/liquidate',
    method: 'GET',
    Authorization: 'Token',
    ContentType: 'application/json'
	reply {
		"id":  5,
		"status":  "Retirado",
		"WalletId":  1,
		"InvestmentOptId":  2,
		"initialAmount":  "250.00",
		"balance":  0,
		"createdAt":  "2024-01-02T03:59:09.168Z",
		"updatedAt":  "2024-01-02T03:59:17.003Z"
	}
```
