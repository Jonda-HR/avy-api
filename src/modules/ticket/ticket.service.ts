import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketsInput, UpdateTicketInput } from 'src/graphql';
import { HandleErrorService } from 'src/utilities/handleError/handleError.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  public async tickets(): Promise<Ticket[]> {
    try {
      return await this.ticketRepository.find({
        order: { code: 'ASC' },
      });
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while getting the tickets.',
        error.stack,
        'TicketService/tickets',
      );
    }
  }

  public async createTicket(input: CreateTicketsInput): Promise<Ticket[]> {
    const { numberTickets } = input;
    const tickets: Ticket[] = [];
    try {
      await Promise.all(
        Array.from({ length: numberTickets }).map(async () => {
          const code = await this.generateCode(input.dinnerId);
          const newTicket = this.ticketRepository.create({
            ...input,
            code,
          });
          const ticket = await this.ticketRepository.save(newTicket);
          tickets.push(ticket);
        }),
      );
      return tickets;
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while creating a news ticket.',
        error.stack,
        'TicketService/createTicket',
      );
    }
  }

  public async ticketById(id: number): Promise<Ticket> {
    try {
      return await this.ticketRepository.findOneBy({ id });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while obtaining the ticket with ID: ${id}`,
        error.stack,
        'TicketService/ticketById',
      );
    }
  }

  public async ticketByCode(code: string): Promise<Ticket> {
    try {
      return await this.ticketRepository.findOneBy({ code });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while obtaining the ticket with code: ${code}`,
        error.stack,
        'TicketService/ticketByCode',
      );
    }
  }

  public async ticketsByDinnerId(dinnerId: number): Promise<Ticket[]> {
    try {
      return await this.ticketRepository
        .createQueryBuilder('ticket')
        .where('ticket.dinnerId = :dinnerId', { dinnerId })
        .getMany();
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while getting the ticket with DinnerId: ${dinnerId}`,
        error.stack,
        'TicketService/ticketByDinnerId',
      );
    }
  }

  public async updateTicket(
    id: number,
    input: UpdateTicketInput,
  ): Promise<Ticket> {
    try {
      await this.ticketRepository.update(id, input);
      return await this.ticketById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while updating ticket with ID: ${id}`,
        error.stack,
        'TicketService/updateTicket',
      );
    }
  }

  public async removeTicket(id: number): Promise<Ticket> {
    try {
      await this.ticketRepository.softDelete(id);
      return await this.ticketRepository.findOne({
        where: { id },
        withDeleted: true,
      });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while removing ticket with ID: ${id}`,
        error.stack,
        'TicketService/removeTicket',
      );
    }
  }

  public async restoreTicket(id: number): Promise<Ticket> {
    try {
      await this.ticketRepository.restore(id);
      return await this.ticketById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while restoring ticket with ID: ${id}`,
        error.stack,
        'TicketService/restoreTicket',
      );
    }
  }

  public async generateCode(dinnerId: number): Promise<string> {
    //the characters that the code can take
    const characters = '0123456789';
    let code = '';
    let codeExists = true;
    try {
      while (codeExists) {
        code = '';
        //here character by character is assigned randomly and then it is tested if the code already exists
        for (let i = 0; i < 4; i++) {
          const indice = Math.floor(Math.random() * characters.length);
          code += characters[indice];
        }
        codeExists = await this.checkoutCodeExists(code, dinnerId);
      }

      return code;
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while generating a new code.`,
        error.stack,
        `TicketService/generateCode`,
      );
    }
  }

  public async checkoutCodeExists(
    code: string,
    dinnerId: number,
  ): Promise<boolean> {
    try {
      const tickets = await this.ticketsByDinnerId(dinnerId);
      const codes = tickets.map((ticket) => ticket.code);
      return codes.includes(code);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while checking the code: ${code}.`,
        error.stack,
        `TicketService/checkoutCodeExists`,
      );
    }
  }

  public async paidDinner(code: string, dinnerId: number): Promise<Ticket> {
    try {
      if (await this.checkoutCodeExists(code, dinnerId)) {
        const ticket = await this.ticketByCode(code);
        const { id } = ticket;
        await this.updateTicket(id, { isPaid: true });
        return await this.ticketById(id);
      }
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while paiding the ticket with code: ${code}.`,
        error.stack,
        `TicketService/paidDinner`,
      );
    }
  }
}
