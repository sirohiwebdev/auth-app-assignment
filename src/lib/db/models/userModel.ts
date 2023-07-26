import { mongoDB } from "../connection";
import { User } from "../entities";
import { Repository } from "typeorm";

export class UserModel {
  private repository: Repository<User>;

  constructor() {
    this.repository = mongoDB.getMongoRepository(User);
  }

  async get(id: string) {
    return await this.repository.findOne({
      where: {
        email: id,
      },
    });
  }

  async find(data: Partial<User>) {
    return this.repository.findOne({ where: data });
  }

  async insert(data: Omit<User, "id">) {
    const d = await this.repository.insert(data);
    return d.raw;
  }
}
