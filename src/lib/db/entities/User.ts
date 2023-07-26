import { Column, Entity, Index, ObjectId, ObjectIdColumn } from "typeorm";

export type UserLoginType = "default" | "fb" | "google";

@Entity("user")
@Index("UNIQUE_EMAIL", ["email"], { unique: true })
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({
    type: "enum",
    enum: ["default", "facebook", "google"],
    default: "default",
  })
  loginType?: UserLoginType = "default";

  @Column()
  password: string;
}
