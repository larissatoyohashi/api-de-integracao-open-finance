import customerService from '../services/customerService.js';
import Customer from '../models/Customers.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import externalConsentService from '../services/externalConsentService.js';
import { BadRequestError, UnauthorizedError } from '../exceptions/api-errors.exception.js';

const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAll();
        res.status(200).json({ customers: customers });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
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

const loginCustomer = async (req, res, next) => {
    try {
        const { cpf, controlFinanceJwt , password } = req.body;
        const { connectionId, callbackUrl } = req.query;

        if (!cpf || !password) {
            throw new BadRequestError('CPF e senha são obrigatórios.');
        }

        const customer = await Customer.findOne({ cpf }).select('+password');
        if (!customer) {
            throw new UnauthorizedError('CPF ou senha inválidas');
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            throw new UnauthorizedError('CPF ou senha inválidas');
        }

        if (connectionId && callbackUrl) {
            try {
                const { plainApiKey, userIdInChildApi, consentId } = await externalConsentService.createAndGenerateKey({ customer: customer._id });

                if (!plainApiKey || !userIdInChildApi) {
                    throw new Error('Falha ao criar consentimento externo e gerar chave de API');
                }

                const notifyResp = await fetch(callbackUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${controlFinanceJwt}`
                    },
                    body: JSON.stringify({
                        apiKey: plainApiKey,
                        userIdInChildApi,
                        connectionId,
                        consentIdInChildApi: consentId
                    }),
                });

                if (!notifyResp.ok) {
                    throw new Error(`Falha ao notificar ControlF. Código de status: ${notifyResp.status}`);
                }

                return res.status(200).json({ message: 'Conexão com ControlF estabelecida', customerId: customer._id });
            } catch (err) {
                return next(err);
            }
        }

        const jwtSecret = process.env.JWTSECRET || process.env.JWT_SECRET || 'changeme';
        const token = jwt.sign({ id: customer._id, cpf: customer.cpf }, jwtSecret, { expiresIn: '3d' });

        return res.status(200).json({ message: 'Login realizado com sucesso', token });
    } catch (error) {
        return next(error);
    }
};

const getCustomer = async(req,res) => {
      try {
        const { id } = req.params;
        const customer = await customerService.getOneById(id);

        if (!customer) {
            return res.status(404).json({ message: 'Cliente não encontrada' });
        }

        res.status(200).json(customer);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const getAccounts = async(req,res) => {
      try {
        const { id } = req.params;
        const customer = await customerService.getAccountsFromCustomers(id);

        if (!customer) {
            return res.status(404).json({ message: 'Cliente não encontrada' });
        }

        res.status(200).json(customer);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export default {
    getAllCustomers,
    createCustomer,
    loginCustomer,
    getCustomer,
    getAccounts
};

