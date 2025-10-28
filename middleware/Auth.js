import jwt from "jsonwebtoken";
import 'dotenv/config'; 

const JWTsecret = process.env.JWTSECRET;

if (!JWTsecret) {
    console.error("ERRO: JWTSECRET não definido. Verifique seu .env no arquivo de middleware.");
    process.exit(1);
}

const authMiddleware = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (!authToken) {
    return res.status(401).json({ error: "Acesso não autorizado. Token não fornecido." });
  }

  const bearer = authToken.split(" ");
  
  if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
    return res.status(401).json({ error: "Formato de token inválido. Use 'Bearer <token>'." });
  }
  
  const token = bearer[1];

  jwt.verify(token, JWTsecret, (error, data) => {
    if (error) {
      console.log("Falha na verificação do JWT:", error.message);
      res.status(401).json({ error: "Token inválido ou expirado." }); 
    } else {
      req.token = token;
      req.loggedUser = {
        id: data.id,
        cpf: data.cpf
      };
      next();
    }
  });
};

export default authMiddleware;