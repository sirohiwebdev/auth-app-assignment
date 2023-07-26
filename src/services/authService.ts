import { UserModel } from "../lib/db/models";
import { User } from "../lib/db/entities";
import Joi from "joi";
import { NotFoundError, UserError } from "../lib/errors";
import { Hash } from "../lib/hash";

export class AuthService {
  private userModel: UserModel;

  private loginPayloadSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string()
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"),
        "Password does not meet the validation criteria",
      )
      .required(),
  });

  private userDetailsSchema = Joi.object({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(1),
  });

  private registerPayloadSchema = this.loginPayloadSchema.concat(
    this.userDetailsSchema,
  );

  constructor() {
    this.userModel = new UserModel();
  }

  validatePayload = (obj: any, schema: Joi.Schema) => {
    const { error } = schema.validate(obj);
    if (error) {
      throw new UserError(`Validation failed payload, ${error}`);
    }
  };

  async login(request: {
    email: string;
    password: string;
  }): Promise<Omit<User, "password">> {
    this.validatePayload(request, this.loginPayloadSchema);

    const user = await this.userModel.get(request.email);

    if (!user) {
      throw new NotFoundError(`User with email ${request.email} is not found`);
    }

    const isMatching = await Hash.compare(request.password, user.password);
    if (!isMatching) {
      throw new UserError("Invalid password");
    }

    // @ts-ignore
    delete user["password"];
    return user;
  }

  async register(userData: Omit<User, "id">) {
    this.validatePayload(userData, this.registerPayloadSchema);
    const userExists = await this.userModel.get(userData.email);
    if (userExists) throw new UserError("User already exists");
    userData.password = await Hash.createHash(userData.password);
    const user = await this.userModel.insert(userData);
    // @ts-ignore
    return user.raw;
  }

  async getDetails(email: string) {
    const d = await this.userModel.get(email);
    if (!d) return;
    // @ts-ignore
    delete d["password"];
    return d;
  }
}
