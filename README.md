# Welcome to _Memory Storage Wallets_ 💱

### What is this?
This was born as a result of the test challenge of an interview. Actually, I believe that as a result of a misinterpretation of the instructions 🤦

Anyway, here it is.


### Features:
 - Create a new users
 - Create a wallet for any user
 - Add new currencies
 - Perform deposits & withdrawals from any wallet


 Just in case, the postman collection file is added to the repository.


## Api Doc

### Users 🙆
**Get all users**

`GET /users` 

**Get user by ID**

`GET /users/{userId}`

**Create user**

`POST /users`

Body:
```typescript
{
	"name": string;
	"email": string;
}
```
**Get user's wallet**

`GET /users/{userId}/wallet

---

### Currencies 💵
**Get all currencies**

`GET /currencies` 

**Get currency by ID**

`GET /currencies/{currencyId}`

**Create currency**

`POST /currencies`

Body:
```typescript
{
	"name": string;
}
```

---

### Wallets 💰
**Get all wallets**

`GET /wallets` 

**Get wallet by ID**

`GET /wallets/{walletId}`

**Create wallet**

`POST /wallets`

Body:
```typescript
{
	"userId": number;
	"balances": {
		[currencyName: string]: number; // number equals to initial amount
	};
}
```

**Deposit**

`POST /wallets/{walletId}/deposit`

Body:
```typescript
{
	"currecyId": number;
	"amount": number;
}
```


**Withdraw**

`POST /wallets/{walletId}/withdraw`

Body:
```typescript
{
	"currecyId": number;
	"amount": number;
}
```
---
### Known issues

As a result of any deposit and withdrawal, a `Movement` object is added to the _deposits_ and _withdrawals_ of the balance. Those objects have ids, but as they are not added as entities to the database, their ids are not unique. Think about them as the order in which those movements were stored.

Also, as the "database" here is an object stored on memory, test cases may run a bit slower than expected.

That's it!