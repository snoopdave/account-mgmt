Provide a complete implementation of this specification, paying careful attention to the Dave's Requirements, double check that the implementation meets those requirements! First display the projects file and directory structure. Then provide the listings of all files, complete implementations of each and every function.  Do not leave any code for me to write.

# Software Design Document: Account Management Language

## 1. Introduction

The Account Management Language (AML) is a command-line interface that allows users to manage accounts that hold money. It supports operations like adding accounts, selling amounts from an account (which goes into a cash-on-hand account), and buying amounts into an account (which comes out of the cash-on-hand account).

## 2. AML Commands

### 2.1 `accounts add <account-name> <account-amount>`

This command is used to create a new account with the specified name and initial amount.

**Inputs:**
- `<account-name>`: a short alphanumeric string with no spaces, which will serve as the unique identifier for the account.
- `<account-amount>`: a numerical value specifying the initial amount in the account.

### 2.2 `accounts sell <account-name> <sell-amount>`

This command is used to sell a specified amount from an existing account. The sold amount goes into the cash-on-hand account.

**Inputs:**
- `<account-name>`: the name of an existing account.
- `<sell-amount>`: a numerical value specifying the amount to be sold from the account.

### 2.3 `accounts buy <account-name> <buy-amount>`

This command is used to buy a specified amount into an existing account. The bought amount comes out of the cash-on-hand account.

**Inputs:**
- `<account-name>`: the name of an existing account.
- `<buy-amount>`: a numerical value specifying the amount to be bought into the account.

### 2.4 `accounts plan <csv-file>`

This command is used to generate a list of commands that, when executed, will re-balance accounts according to a specified plan provided as a CSV file. It doesn't execute the commands, it just prints them out.

**Inputs:**
- `<csv-file>`: a CSV file with two columns - `account_name` and `percentage`. The `account_name` is the name of an existing account, and the `percentage` is a numerical value representing the desired proportion of the total investment for that account.

### 2.5 `accounts list`

This command is used to list all existing accounts, their amounts, and their proportions of the total investment across all accounts.

## 3. Implementation Details

The AML is implemented as a TypeScript project, and the code is organized into a class named `AccountManager` that maintains a list of accounts, their amounts, and a cash-on-hand account. Each account is represented by an `Account` interface that has `name` and `amount` properties.

## 4. Dave's Requirements

* Implementation must be in Typescript
* TypeScript code must not use implicit any
* Commands must be callable from a bash command line via the Commander library
* All data must be stored to a JSON file so that data persists between command line invocations
* Restrict Account names: they must be alpha-numeric with no spaces or special characters.
* Use a TreeMap<String, Account> to store accounts, use Account names as the map keys and provide a comparator to keep keys alphabetically.
* All project files must be generated, there should be these files:
  * Account.ts
  * AccountManager.ts
  * ParseCSV.ts
  * package.json
  * tsconfig.json
  * AccountManager.test.ts
* package.json must include commands for build, start and test.
* Ensure that every dependency used in the TypeScript code is present in the NPM file
* A Jest test must be provided for each function of AccountManager.ts

## 5. Future Improvements

Future enhancements could include implementing transaction history, interest calculations, transaction fees, more complex rebalancing strategies, and improved error handling and validation.
