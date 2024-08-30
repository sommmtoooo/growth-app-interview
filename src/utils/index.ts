import { compare, hashSync } from "bcrypt";

export { hashPayload, verifyPayload };

const salt = 10

function hashPayload(payload: string): string {
  return hashSync(payload, salt);
}

async function verifyPayload(
  hashed: string,
  payload: string,
): Promise<boolean> {
  return compare(payload, hashed).catch((err) => {
    return false;
  });
}