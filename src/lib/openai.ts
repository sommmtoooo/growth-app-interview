import OpenAI from "openai";
import dbConnection from "./mongodb";
import LightBulb from "@/models/LightBulb";

export const openai = new OpenAI({
  organization: "org-VlzB7X2nHIqMv70OPWcyPT7Q",
  project: "proj_J3amexffLEKDXjDtUuUyLsSm",
  apiKey: process.env.OPEN_API_KEY as string,
});

export const tools = [
  {
    type: "function",
    function: {
      name: "get_light_bulb_status",
      description:
        "Get the light bulb status of a user. Call this whenever you need to know the light bulb status of a user, for example when a user asks 'To Switch On A LightBulb'",
      parameters: {
        type: "object",
        properties: {
          user_id: {
            type: "string",
            description: "The user's id.",
          },
          message: {
            type: "string",
            description: "Concise description less than 20 words for the user regarding the status retrieval.",
          }
        },
        required: ["user_id", "message"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "toggle_light_bulb_status",
      description:
        "Toggle the light bulb status of a user. Call this whenever you need to change the light bulb status of a user, for example when a user asks 'To Switch On A LightBulb'",
      parameters: {
        type: "object",
        properties: {
          user_id: {
            type: "string",
            description: "The user's id.",
          },
          message: {
            type: "string",
            description: "Concise description less than 20 for the user regarding changes made.",
          },
          new_lightbulb_status: {
            type: "boolean",
            description: "The new light bulb status for the user's light bulb.",
          }
        },
        required: ["user_id", "message", "new_lightbulb_status"],
        additionalProperties: false,
      },
    },
  }
];

export type LightBulbResponse = {
  light_bulb_status?: boolean,
  success: boolean,
  reply: string;
};

export async function get_light_bulb_status(
  user_id: string,
  message: string,
): Promise<LightBulbResponse> {
  try {
    await dbConnection();
    const lightbulb = await LightBulb.findOne({ userId: user_id });

    return Promise.resolve({
      light_bulb_status: true,
      success: true,
      reply: message
    })
  } catch (e) {
    return Promise.reject({
      success: false,
      light_bulb_status: null,
      reply: message
    })
  }
}

export async function toggle_light_bulb_status(
  user_id: string,
  message: string,
  new_lightbulb_status: boolean,
): Promise<LightBulbResponse> {
  try {
    await dbConnection();
    const lightbulb = await LightBulb.findOne({ userId: user_id });
    return Promise.resolve({
      success: true,
      light_bulb_status: lightbulb.status,
      reply: message
    });
  } catch (e) {
    return Promise.reject({
      success: false,
      light_bulb_status: null,
      reply: 'something went wrong'
    })
  }
}
