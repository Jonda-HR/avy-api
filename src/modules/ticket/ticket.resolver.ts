import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput, UpdateTicketInput } from 'src/graphql';

@Resolver('Ticket')
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Query('tickets')
  public async tickets(): Promise<Ticket[]> {
    return await this.ticketService.tickets();
  }

  @Query('ticketById')
  public async ticketById(@Args('id') id: number): Promise<Ticket> {
    return await this.ticketService.ticketById(id);
  }

  @Mutation('createTicket')
  public async createTicket(
    @Args('input') input: CreateTicketInput,
  ): Promise<Ticket> {
    return await this.ticketService.createTicket(input);
  }

  @Mutation('updateTicket')
  public async updateTicket(
    @Args('id') id: number,
    @Args('input') input: UpdateTicketInput,
  ): Promise<Ticket> {
    return await this.ticketService.updateTicket(id, input);
  }

  @Mutation('removeTicket')
  public async removeTicket(@Args('id') id: number): Promise<Ticket> {
    return await this.ticketService.removeTicket(id);
  }

  @Mutation('restoreTicket')
  public async restoreTicket(@Args('id') id: number): Promise<Ticket> {
    return await this.ticketService.restoreTicket(id);
  }
}
