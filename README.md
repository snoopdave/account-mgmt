Provide a complete implementation of this specification, paying careful attention to the Dave's Requirements, double check that the implementation meets those requirements! First display the projects file and directory structure. Then provide the listings of all files, complete implementations of each and every function.  Do not leave any code for me to write.

# Software Design Document: Account Management Language

## 1. Introduction

The Account Management Language (AML) is a command-line interface that allows users to manage accounts that hold money. It supports operations like adding accounts, selling amounts from an account (which goes into a cash-on-hand account), and buying amounts into an account (which comes out of the cash-on-hand account).

## 2. AML Commands

### 2.1 `add <account-name> <account-amount>`

This command is used to create a new account with the specified name and initial amount.

**Inputs:**
- `<account-name>`: a short alphanumeric string with no spaces, which will serve as the unique identifier for the account.
- `<account-amount>`: a numerical value specifying the initial amount in the account.

### 2.2 `sell <account-name> <sell-amount>`

This command is used to sell a specified amount from an existing account. The sold amount goes into the cash-on-hand account.

**Inputs:**
- `<account-name>`: the name of an existing account.
- `<sell-amount>`: a numerical value specifying the amount to be sold from the account.

### 2.3 `buy <account-name> <buy-amount>`

This command is used to buy a specified amount into an existing account. The bought amount comes out of the cash-on-hand account.

**Inputs:**
- `<account-name>`: the name of an existing account.
- `<buy-amount>`: a numerical value specifying the amount to be bought into the account.

### 2.4 `plan <csv-file>`

This command is used to generate a list of commands that, when executed, will re-balance accounts according to a specified plan provided as a CSV file. It doesn't execute the commands, it just prints them out.

**Inputs:**
- `<csv-file>`: a CSV file with two columns - `account_name` and `percentage`. The `account_name` is the name of an existing account, and the `percentage` is a numerical value representing the desired proportion of the total investment for that account.
 
### 2.4 `execute <csv-file>`

This command is used re-balance accounts according to a specified plan provided as a CSV file. After the rebalance is done, the data is saved.

**Inputs:**
- `<csv-file>`: a CSV file with two columns - `account_name` and `percentage`. The `account_name` is the name of an existing account, and the `percentage` is a numerical value representing the desired proportion of the total investment for that account.

### 2.5 `list`

This command is used to list all existing accounts, their amounts, and their proportions of the total investment across all accounts.

## 3. Implementation Details

The AML is implemented as a TypeScript project, and the code is organized into a class named `AccountManager` that maintains a list of accounts, their amounts, and a cash-on-hand account. Each account is represented by an `Account` interface that has `name` and `amount` properties.

## 4. Dave's Requirements

* Implementation MUST be in Typescript
* TypeScript code MUST not use implicit any
* Commands MUST be callable from a bash command line via the Commander library
* All data MUST be stored to a JSON file so that data persists between command line invocations
* The commands MUST be this:
  * add <account-name> <account-amount>  Create a new account
  * sell <account-name> <sell-amount>    Sell an amount from an existing account
  * buy <account-name> <buy-amount>      Buy an amount into an existing account
  * plan <csv-file>                      Generate a list of commands to rebalance accounts
  * execute <csv-file>                   Rebalance accounts according to provided plan
  * list                                 List all existing accounts
  * help [command]                       Display help for command
* Restrict Account names: they MUST be alpha-numeric with no spaces or special characters.
* MUST use a Map<String, Account> to store accounts and 
  * MUST use Account names as the map keys. 
  * MUST use sort to list keys alphabetically.
* All project files MUST be generated, there should be these files:
  * Account.ts
  * AccountManager.ts
  * ParseCSV.ts
  * package.json
  * tsconfig.json
  * AccountManager.test.ts
  * .gitconfig MUST ignored js files
* package.json MUST include commands for build, start and test.
* Every dependency used in the TypeScript code MUST be present in the NPM file
* A Jest test MUST be provided for each function of AccountManager.ts
* A Jest config MUST be provided in the package.json file
* The plan and execute command implementations should share almost all logic, particular, calculating the new account balances and creating the actual list of buy and sell operations.
  * When creating a buy/sell plan, all sells must be done first.

## 5. Future Improvements

Future enhancements could include implementing transaction history, interest calculations, transaction fees, more complex rebalancing strategies, and improved error handling and validation.
