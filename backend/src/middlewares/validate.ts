import { Request, Response, NextFunction } from 'express';

export function requireFields(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const f of fields) {
      if (req.body[f] === undefined) {
        return res.status(400).json({ error: true, message: `Field ${f} is required` });
      }
    }
    next();
  };
}
