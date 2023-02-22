import { Injectable } from '@nestjs/common';
import * as data from './data.json';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { generateInvoiceId } from '@shared/helpers/random.helper';
import { INVOICE_STATUS } from '@shared/enums/invoice-status.enum';
import * as moment from 'moment';

@Injectable()
export class InvoiceService {
  public invoices = [];

  constructor() {
    this.invoices = data;
  }

  public getInvoices(filter: any) {
    if (filter.status) {
      return this.invoices.filter((item) => item.status === filter.status);
    }
    return this.invoices;
  }

  public findInvoiceById(id: string) {
    return this.invoices.find((item) => item.id === id);
  }

  public deleteByInvoiceId(id: string) {
    this.invoices = this.invoices.filter((item) => item.id !== id);
  }

  public createInvoice(
    data: CreateInvoiceDto,
    status: INVOICE_STATUS = INVOICE_STATUS.PENDING,
  ) {
    let total = 0;
    if (data.items) {
      data.items.forEach((item) => {
        total += item.total;
      });
    }

    const newInvoice = {
      id: generateInvoiceId(),
      total,
      status,
      ...data,
      ...(data.paymentTerms
        ? {
            paymentDue: moment()
              .add(Number(data.paymentTerms), 'days')
              .toDate(),
          }
        : {}),
      createdAt: moment().toDate(),
    };
    this.invoices = [...this.invoices, newInvoice];

    return newInvoice;
  }

  public markInvoicePaid(id: string) {
    this.invoices = this.invoices.map((item) => {
      if (item.id === id) return { ...item, status: INVOICE_STATUS.PAID };
      return item;
    });

    return id;
  }

  public updateInvoice(id: string, data: CreateInvoiceDto) {
    this.invoices = this.invoices.map((item) => {
      if (item.id === id) {
        let total = 0;
        data.items.forEach((item) => {
          total += item.total;
        });
        return {
          ...item,
          ...data,
          ...(data.paymentTerms
            ? {
                paymentDue: moment()
                  .add(Number(data.paymentTerms), 'days')
                  .toDate(),
              }
            : {}),
          status:
            item.status === INVOICE_STATUS.DRAFT
              ? INVOICE_STATUS.PENDING
              : item.status,
          total,
        };
      }

      return item;
    });

    return this.invoices.find((item) => item.id === id);
  }
}
