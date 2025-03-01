import jwt from 'jsonwebtoken';

export function AuthMiddleware(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 'Fail', message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.userId;
    next();
  } catch (err) {
    return res.status(400).json({ status: 'Fail', message: 'Invalid token' });
  }
}

export default AuthMiddleware;