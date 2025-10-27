import customerService from '../services/customerService.js';

/**
 * Controller para buscar todos os clientes.
 */
const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAll();
        res.status(200).json({ customers: customers });
    } catch (error) {
        // O controller é o local correto para enviar a resposta de erro
        res.status(500).json({ error: 'Erro interno do Servidor' });
    }
}

/**
 * Controller para criar um novo cliente (handleRegister)
 * (Corrigido para enviar a 'password' ao serviço)
 */
// Em controllers/customerController.js
const createCustomer = async (req, res) => {
    try {
        // ... (seu código 'try' normal)
        const { name, cpf, email, password } = req.body;
        // ...
        const newCustomer = await customerService.create(name, cpf, email, password);
        res.status(201).json({ message: 'Cliente criado com sucesso!', customer: newCustomer });

    } catch (error) {
        // --- ATUALIZE AQUI ---
        // Checa especificamente pelo código de erro 11000 (duplicata)
        if (error.code === 11000) {
            // Verifica se o erro foi no campo 'cpf'
            if (error.keyPattern && error.keyPattern.cpf) {
                return res.status(409).json({ message: 'Este CPF já está cadastrado.' }); // 409 Conflict
            }
             // Pode adicionar checagem para email aqui se ele também for 'unique'
            if (error.keyPattern && error.keyPattern.email) {
                return res.status(409).json({ message: 'Este email já está cadastrado.' });
            }
        }
        // --- FIM DA ATUALIZAÇÃO ---

        res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
    }
};
/**
 * Controller para fazer login (handleLogin)
 * (Corrigido para chamar o 'customerService.login' e não ter lógica de negócio)
 */
const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        // 1. Chama o 'service' para fazer toda a lógica de login
        // (O service vai encontrar o cliente, comparar a senha e gerar o token)
        const result = await customerService.login(email, password);

        // 2. Envia a resposta de sucesso com o token
        res.status(200).json(result);

    } catch (error) {
        // 3. Captura o erro 'Credenciais inválidas' lançado pelo service
        if (error.message.includes('inválidas')) {
            return res.status(401).json({ message: error.message }); // 401 Unauthorized
        }
        res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
};

// Exporta as funções para serem usadas nas rotas
export default {
    getAllCustomers,
    createCustomer,
    loginCustomer
};

