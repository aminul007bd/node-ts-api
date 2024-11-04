// Question: Create a rate-limiting middleware that allows 100 requests per minute for admins and 10 requests per minute for regular users.
import rateLimit from "express-rate-limit";

const rateLimiter = (req: Request, res: Response, next: Function) => {
  const user = req.user; // Assuming `req.user` is populated after authentication
  const maxRequests = user.role === "admin" ? 100 : 10;

  return rateLimit({
    windowMs: 1 * 60 * 1000,
    max: maxRequests,
    message: "Rate limit exceeded",
  })(req, res, next);
};

app.use(rateLimiter);
