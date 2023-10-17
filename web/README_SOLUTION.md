# HOW TO START BACKEND
- go to ./node folder 
- yarn
- yarn run dev

# HOW TO START FRONTEND
- go to ./web folder
- yarn
- yarn start

# HOW TO START DATABASE
- make sure you added the env variables to node/.env file I sent you via email
- the SQL DB is hosted on planetscale, online already

# FEATURES
- listing existing spendings
- adding new spending
- deleting existing spending
- sorting spending list by date or amount
- filtering spending list by currency
- showing number of spendings underneath each currency
- data validation on BE side
- error handling
- hosted SQL DB
- unit tests

# APPROACH
- focusing clean, self-documented code

# IMPROVEMENTS
For the sake of this interview task I completed the requirements, but there are plenty of room to improve the code:
- Adding typescript
- Adding authentication, so users can have individual spendings
- New endpoints, e.g. editing existing spendings
- Optimistic frontend fetching to skip the loading circle
- Higher test coverage
- Frontend input validation to save unneccessary backend calls
- Disabling save button until input fields are filled
- Converting currencies dynamically o compare the amounts (right now it is solved staticly 1 USD = 365 HUF)
- Adding new fields, like what date the spending was made
- Storing data in localstorage to have online access
- Adding global state management to frontend (Context API should be enough)