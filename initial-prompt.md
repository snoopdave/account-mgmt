## Everthing after this line is the ChatGPT prompt I used to start this project:


I want to create a language that allows me to express a list of accounts that hold money and keep track of the accounts name and the amount in each account

to setup the accounts you use a command called

	accounts add <account-name> <account-amount>

the language implementation will also keep track of how much cash I have "on-hand" that is not in the accounts, initially there is zero cash

I want to be able to sell a specific amount from an account, and when I do, that amount goes into the cash on hand. This should be done with a command like this:

	accounts sell <account-name> <sell-amount>

And, I want to be able to use my cash on-hand to buy amounts of an account. When I do this, money comes out of my cash account and goes into the account specified. The command is:

	accounts buy <account-name> <sell-amount>

write a software design document that specifies this language
