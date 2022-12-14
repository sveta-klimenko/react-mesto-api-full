import cors from 'cors';

const allowedCors = [
  'http://localhost:3001',
  'http://dogroseknight.front.nomoredomains.club',
  'https://dogroseknight.front.nomoredomains.club',
];

export const CORS = cors({
  origin: allowedCors,
  allowedHeaders: ['Content-Type', 'Authorization'],
});
