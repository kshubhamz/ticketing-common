import bcrypt from "bcrypt";

export class Bcrypt {
  private constructor() {}

  static hash(inp: string, saltOrRounds: string | number): Promise<string> {
    return bcrypt.hash(inp, saltOrRounds);
  }

  static compare(plainText: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }
}
