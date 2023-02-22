import { INVOICE_STATUS } from '../enums/invoice-status.enum';

interface IAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface IInvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IInvoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: INVOICE_STATUS;
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: IInvoiceItem[];
  total: number;
}
