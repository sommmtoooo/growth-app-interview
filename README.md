# Growth App Interview Project: Lit

**Technologies**: Next.js & MongoDB  
**Libraries**: OpenAI, NextAuth

# Live Version

Link: [Click Me To See](https://growth-interview-project.vercel.app/)

> **PLEASE NOTE**: The prompt isn't sent to GPT-4 Mini for structured outputs, which would be used for calling the functions.

*TOOLS FOR FUNCTION CALLING CAN BE FOUND IN LIB: **openai.ts***

# Features

Create a full-stack chat app that allows the user to toggle a virtual light bulb from a chat prompt.

**Requirements**
- LightBulb Component showing On & Off states (✅)
- GPT-4 Mini (function calling) to get the light status and toggle the light status

**Bonus Points**
- Add a simple username and password login page. (✅)
- Add end-to-end testing with Cypress 〰️

> **NOTE**: Test coverage is only for the Sign In page.

---

### Model Structure

![](./Model.png)

### Documentation

#### API

##### AUTH
Utilizing NextAuth for authentication, this endpoint simply follows their required specifications for setup. This route is solely responsible for handling the authentication state of users using sessions. When a sign-in event is triggered, I prepared a query to the database that checks if the provided credentials exist and returns the retrieved data after verifying the password with the hashed password stored in the database.

##### Lightbulb
This endpoint is intended to receive the user's prompt and pass it to the API, which would make a GPT call that provides `Structured Outputs` for two functions: `get_light_bulb_status` and `toggle_light_bulb_status`, depending on the user's input.

##### Action
Though NextAuth manages the session, I used Next.js Server Actions to create a new user account.

### Issues

- I encountered payment issues securing API access to the GPT-4 Mini model, which led to the incompletion of my project.
- I haven't used Cypress before, but I had a great time learning how to write my first test ever for the Sign In page (end-to-end).