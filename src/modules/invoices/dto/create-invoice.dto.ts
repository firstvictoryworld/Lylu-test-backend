import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
} from "class-validator";
import { Type } from 'class-transformer';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

export class ItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;
}

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  paymentDue: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  paymentTerms: number;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  clientEmail: string;

  @ValidateNested()
  @Type(() => AddressDto)
  senderAddress: AddressDto;

  @ValidateNested()
  @Type(() => AddressDto)
  clientAddress: AddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ItemDto)
  items: ItemDto[];
}
