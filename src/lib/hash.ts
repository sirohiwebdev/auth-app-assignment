import { compare, hash } from "bcrypt";

const HASH_SALT_ROUNDS = 10;

export class Hash {
  public static createHash(value: string) {
    return hash(value, HASH_SALT_ROUNDS);
  }

  public static compare(value: string, hash: string) {
    return compare(value, hash);
  }
}
