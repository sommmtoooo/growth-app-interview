import OpenAI from "openai";

export const openai = new OpenAI({
    organization: 'org-VlzB7X2nHIqMv70OPWcyPT7Q',
    project: 'proj_J3amexffLEKDXjDtUuUyLsSm',
    apiKey: process.env.OPEN_API_KEY as string
})