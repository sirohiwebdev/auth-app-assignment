import { AuthService } from "../services";
import { RequestHandler } from "express";
import { UserLoginType } from "../lib/db/entities";
import { Jwt } from "../lib/jwt";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login: RequestHandler<
    any,
    any,
    {
      email: string;
      password: string;
    },
    {
      loginType?: UserLoginType;
    }
  > = async (req, res, next) => {
    const { loginType } = req.query;

    try {
      const getUser = await this.authService.login(req.body);
      const token = Jwt.sign({ id: getUser.id, email: getUser.email });
      res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  };

  register: RequestHandler = async (req, res, next) => {
    const { loginType } = req.query;

    try {
      const getUser = await this.authService.register(req.body);
      res.status(201).json(getUser);
    } catch (e) {
      next(e);
    }
  };
  me: RequestHandler = async (req, res, next) => {
    try {
      // @ts-ignore
      const user = await this.authService.getDetails(req.user?.email);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  };
}

export const authController = new AuthController();
