import jwt from "jsonwebtoken";
import 'dotenv/config'; // 1. IMPORTAR O DOTENV AQUI

// 2. CARREGAR O SEGREDO (com o nome exato do seu .env)
const JWTsecret = process.env.JWTSECRET;

if (!JWTsecret) {
    console.error("ERRO: JWTSECRET não definido. Verifique seu .env no arquivo de middleware.");
    process.exit(1);
}

// (Eu renomeei a função para 'authMiddleware' por convenção)
const authMiddleware = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (!authToken) {
    return res.status(401).json({ error: "Acesso não autorizado. Token não fornecido." });
  }

  const bearer = authToken.split(" ");
  
  // Checagem extra: garante que o formato é "Bearer <token>"
  if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
    return res.status(401).json({ error: "Formato de token inválido. Use 'Bearer <token>'." });
  }
  
  const token = bearer[1];

  // 3. USAR O SEGREDO LOCAL (carregado acima)
  jwt.verify(token, JWTsecret, (error, data) => {
    if (error) {
      console.log("Falha na verificação do JWT:", error.message);
      res.status(401).json({ error: "Token inválido ou expirado." }); // Dê um erro mais específico
    } else {
      req.token = token;
      req.loggedUser = {
        id: data.id,
        email: data.email
        // 4. CORREÇÃO DE SEGURANÇA:
        // O payload (data) do seu token NUNCA deve conter a senha.
        // O seu service (login) já faz isso corretamente (só inclui id e email).
      };
      next();
    }
  });
};

// Exporte a função diretamente (é mais fácil de importar)
export default authMiddleware;