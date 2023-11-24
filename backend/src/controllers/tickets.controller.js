
import ticketModel from "../models/tickets.model.js";
import { v4 as uuidv4 } from 'uuid';
import userModel from "../models/users.model.js";

const getTickets = async (req, res) => {
	try {
		const response = await ticketModel.find();

		res.status(200).send({ response: response });
	} catch (error) {
		res.status(500).send({ mensaje: `Error al consultar tickets ${error}` });
	}
};
const createTicket = async (req, res) => {
	let { amount, email} = req.query;

	const user = await userModel.findOne({email: email})

	if(user.rol == 'premium'){
		let descuento = amount *0.15
		amount = amount - descuento
	}

	try {
		const ticket = {
			code: uuidv4(),
			amount: amount,
			purchaser: email,
		};
		await ticketModel.create(ticket);
		const ticketGenerado = await ticketModel.findOne({ code: ticket.code });
		res.status(201).send({ response: 'Ticket generado con éxito', message: ticketGenerado });
	} catch (error) {
		res.status(500).send({ mensaje: `Error al crear el ticket ${error}` });
	}
};

const ticketsController = { createTicket, getTickets };

export default ticketsController;