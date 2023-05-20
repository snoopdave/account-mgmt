
# Account Management Language (AML) Tutorial

This tutorial will guide you through using the AML TypeScript implementation. The AML is a command-line interface for managing accounts that hold money. The commands are as follows:

* add <account-name> <account-amount>: Create a new account
* sell <account-name> <sell-amount>: Sell an amount from an existing account
* buy <account-name> <buy-amount>: Buy an amount into an existing account
* plan <csv-file>: Generate a list of commands to rebalance accounts
* execute <csv-file>: Execute a rebalance plan specified by CSV
* list: List all existing accounts

## Step 1: Setup
First, make sure that you have Node.js and npm installed. You will also need TypeScript and ts-node globally installed:

    npm install -g typescript ts-node

Then, clone the repository and navigate into the project directory.

# Step 2: Build the Project
In the root of the project, use npm to install the project's dependencies and build the project:

    npm install
    npm run build

## Step 3: Adding Accounts
To add an account, use the add command. The following command adds an account named "APPL" with an initial amount of 100:

    node dist/index.js add APPL 100

Repeat this command, replacing "APPL" and "100" with the name and amount for each account you want to create. For this tutorial, let's create three more accounts:

    node dist/index.js add MSFT 200
    node dist/index.js add GOOG 300
    node dist/index.js add AMZN 400

# Step 4: Listing Accounts
To see a list of all accounts and their amounts, use the list command:

    node dist/index.js list

# Step 5: Buying and Selling Amounts
To buy an amount into an account, use the buy command. The following command buys an amount of 50 into the "APPL" account:

    node dist/index.js buy APPL 50

To sell an amount from an account, use the sell command. The following command sells an amount of 30 from the "GOOG" account:

    node dist/index.js sell GOOG 30

# Step 6: Planning and Executing Rebalances
To rebalance accounts, you need a CSV file that specifies the desired proportion of the total investment for each account. For this tutorial, create a plan.csv file with the following content:

    account_name,percentage
    APPL,30
    MSFT,20
    GOOG,25
    AMZN,25

This file means that we want 30% of our total investment in the APPL account, 20% in MSFT, 25% in GOOG, and 25% in AMZN.

To generate a plan for rebalancing accounts according to this file, use the plan command:

    node dist/index.js plan plan.csv

This command doesn't actually execute the commands; it just prints them out so you can review them. To execute the rebalancing plan, use the executePlan command:

    node dist/index.js executePlan plan.csv

And that's it! You now know how to use the AML to manage accounts.
