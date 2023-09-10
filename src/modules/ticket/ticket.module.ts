import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { Ticket } from './entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleErrorModule } from 'src/utilities/handleError/handleError.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), HandleErrorModule],
  exports: [TypeOrmModule],
  providers: [TicketResolver, TicketService],
})
export class TicketModule {}
