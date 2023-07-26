import jsonwebtoken from "jsonwebtoken";
import { AuthError } from "./errors";

export class Jwt {
  static Secret = "asfsdag90sadgdsag0EG9gWEFG9ds0fsdfwF0WEDfdgawttre";
  static sign = (data: any) => {
    return jsonwebtoken.sign(JSON.parse(JSON.stringify(data)), Jwt.Secret, {
      expiresIn: 86400,
    });
  };

  static verify = (token: string) => {
    try {
      const payload = jsonwebtoken.verify(token, Jwt.Secret);
      return payload;
    } catch (e) {
      console.error(e);
      throw new AuthError("Invalid Token");
    }
  };
}
