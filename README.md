# Growth App Interview Project: Lit

**Technologies**: NextJS & MongoDB
**Libraries**: OpenAI, NextAuth


# Features
Create full-stack chat app that allows the user toggle a virtual light bulb from a chat prompt.

**Requirements**
- LightBulb Component Showing On & Off State (✅️)
- GPT 4o-mini (function calling)  to get the light status and toggle the light status

**Bonus Points**

- Add a simple username and password login page. (✅️)
- Add End - End testing with Cypress 〰️


---


### Model Structure

![](./Model.png)


### Documentation

#### API

##### AUTH
Utilizing NextAuth for authentication, this endpoint simply follows their required specifications to setup; This route is solely responsible for handling the authentication state of users using ( Sessions ). When an a signIn event is surmoned, I prepared a query to the database that checks if that credentials provided for the user exists and return the retrieved data after verifying password with the hashed password stored in the database.

##### Action
Though NextAuth is manages the session, I made use of Next Server Actions to create new user account.


/api/users (POST) -> Fetches the information of a user