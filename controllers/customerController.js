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


const createCustomer = async (req, res) => {
    try {
        const { name, cpf, email, password } = req.body;
        const newCustomer = await customerService.create(name, cpf, email, password);
        res.status(201).json({ message: 'Cliente criado com sucesso!', customer: newCustomer });

    } catch (error) {
       
        if (error.code === 11000) {
            if (error.keyPattern && error.keyPattern.cpf) {
                return res.status(409).json({ message: 'Este CPF já está cadastrado.' }); 
            }
            if (error.keyPattern && error.keyPattern.email) {
                return res.status(409).json({ message: 'Este email já está cadastrado.' });
            }
        }

        res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
    }
};

const loginCustomer = async (req, res) => {
    try {
        const { cpf, password } = req.body;
        if (!cpf || !password) {
            return res.status(400).json({ message: 'CPF e senha são obrigatórios.' });
        }

        const result = await customerService.login(cpf, password);
        res.status(200).json(result);

    } catch (error) {
        if (error.message.includes('inválidas')) {
            return res.status(401).json({ message: error.message }); 
        }
        res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
};

export default {
    getAllCustomers,
    createCustomer,
    loginCustomer
};

