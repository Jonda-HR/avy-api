import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketInput, UpdateTicketInput } from 'src/graphql';
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

  public async createTicket(input: CreateTicketInput): Promise<Ticket> {
    try {
      const newTicket = this.ticketRepository.create(input);
      return await this.ticketRepository.save(newTicket);
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while creating a new ticket.',
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
}
