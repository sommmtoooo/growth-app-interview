import OpenAI from "openai";

export const openai = new OpenAI({
    organization: 'org-VlzB7X2nHIqMv70OPWcyPT7Q',
    project: 'proj_J3amexffLEKDXjDtUuUyLsSm',
    apiKey: process.env.OPEN_API_KEY as string
})

// // Function to call GPT-4 model with function calling
// async function callOpenAI(prompt, functions) {
//   const response = await openai.chat.completions.create({
//     model: 'gpt-4-0613',
//     messages: [{ role: 'user', content: prompt }],
//     functions,
//   });

//   // Extract function call arguments
//   const { function_call } = response.choices.[0].message;
//   return function_call.arguments;
// }

// // Define function signatures for GPT-4
// const functions = [
//   {
//     name: 'getLightStatus',
//     description: 'Gets the status of a lightbulb for a specific user.',
//     parameters: {
//       type: 'object',
//       properties: {
//         user_id: { type: 'string', description: 'The ID of the user.' },
//       },
//       required: ['user_id'],
//     },
//   },
//   {
//     name: 'toggleLightStatus',
//     description: 'Toggles the lightbulb status for a specific user.',
//     parameters: {
//       type: 'object',
//       properties: {
//         user_id: { type: 'string', description: 'The ID of the user.' },
//       },
//       required: ['user_id'],
//     },
//   },
// ];

// // Retrieve light status using OpenAI function calling
// export async function getLightStatus(user_id) {
//   const prompt = `Get the light status for user with ID: ${user_id}.`;
//   const result = await callOpenAI(prompt, functions);
//   return JSON.parse(result).status;
// }

// // Toggle light status using OpenAI function calling
// export async function toggleLightStatus(user_id) {
//   const prompt = `Toggle the light status for user with ID: ${user_id}.`;
//   const result = await callOpenAI(prompt, functions);
//   return JSON.parse(result).status;
// }
