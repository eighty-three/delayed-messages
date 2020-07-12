import { Request, Response } from 'express';

export const getTime = (req: Request, res: Response): void => {
  const current: number = Math.floor(Date.now() / 1000);
  res.json({ currentTime: current });
};

