import { Request, Response, Router } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { validate } from "../../utils/validate";

import { RegisterDto, LoginDto } from "./dtos/auth.dto";

import { AuthService } from "./auth.service";

export class AuthController {
  public router: Router;

  constructor(private readonly authService: AuthService) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/register", catchAsync(this.register.bind(this)));
    this.router.post("/login", catchAsync(this.login.bind(this)));
  }

  private async register(req: Request, res: Response) {
    const { email, password } = validate(RegisterDto, req.body);

    const user = await this.authService.register(email, password);

    res.status(201).json(user);
  }

  private async login(req: Request, res: Response) {
    const { email, password } = validate(LoginDto, req.body);

    const result = await this.authService.login(email, password);
    
    res.json(result);
  }
}