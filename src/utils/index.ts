import { compare, hashSync } from "bcrypt";

const salt = 10

export function hashPayload(payload: string): string {
  return hashSync(payload, salt);
}

export async function verifyPayload(
  hashed: string,
  payload: string,
): Promise<boolean> {
  return compare(payload, hashed).catch((err) => {
    return false;
  });
}