import jwt from 'jsonwebtoken';

export default function adminAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de administrador obrigatório' });
  }

  const token = auth.slice(7);

  const adminToken = process.env.ADMIN_TOKEN;
  if (adminToken && token === adminToken) {
    return next();
  }

  const jwtSecret = process.env.JWTSECRET || process.env.JWT_SECRET || 'changeme';
  try {
    const payload = jwt.verify(token, jwtSecret);
    if (payload && (payload.role === 'admin' || payload.isAdmin)) {
      return next();
    }
  } catch (err) {
    // fallthrough to deny
  }

  return res.status(403).json({ message: 'Acesso negado' });
}
