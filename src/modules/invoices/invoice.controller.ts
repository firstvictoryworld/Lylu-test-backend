import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { INVOICE_STATUS } from '@shared/enums/invoice-status.enum';

@Controller({
  path: 'invoices',
})
export class InvoiceController {
  constructor(public invoiceService: InvoiceService) {}

  @Get()
  search(@Query() query, @Res() res) {
    const data = this.invoiceService.getInvoices(query);

    return res.status(HttpStatus.OK).send({ invoices: data });
  }

  @Get(':id')
  find(@Param('id') id: string, @Res() res) {
    const invoice = this.invoiceService.findInvoiceById(id);

    return res.status(HttpStatus.OK).send({ invoice });
  }

  @Post()
  create(@Body() data: CreateInvoiceDto, @Res() res) {
    const invoice = this.invoiceService.createInvoice(data);
    return res.status(HttpStatus.OK).send({ invoice });
  }

  @Post('draft')
  createDraft(@Body() data, @Res() res) {
    const invoice = this.invoiceService.createInvoice(
      data,
      INVOICE_STATUS.DRAFT,
    );
    return res.status(HttpStatus.OK).send({ invoice });
  }

  @Put(':id')
  update(@Body() data: CreateInvoiceDto, @Param('id') id: string, @Res() res) {
    const invoice = this.invoiceService.updateInvoice(id, data);
    return res.status(HttpStatus.OK).send({ invoice });
  }

  @Patch(':id/paid')
  markPaid(@Param('id') id: string, @Res() res) {
    const invoiceId = this.invoiceService.markInvoicePaid(id);
    return res.status(HttpStatus.OK).send({ invoiceId });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    this.invoiceService.deleteByInvoiceId(id);

    return res
      .status(HttpStatus.OK)
      .send({ message: 'Invoice is removed successfully' });
  }
}
