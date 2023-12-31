import { SignJWT } from 'jose';

export default async function getToken(key, value) {
  const { JWT_SECRET } = process.env;
  const secret = new TextEncoder().encode(JWT_SECRET);
  const token = await new SignJWT({
    [key]: value,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('4hrs')
    .sign(secret);
  return token;
}
