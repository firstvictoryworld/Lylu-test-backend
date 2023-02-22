import { Module } from '@nestjs/common';
import { InvoiceService } from '@modules/invoices/invoice.service';
import { InvoiceController } from './invoice.controller';

@Module({
  imports: [],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
