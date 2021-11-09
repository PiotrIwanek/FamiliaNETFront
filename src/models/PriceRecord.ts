export class PriceRecord {

   id: number;
   name: string;
  description: string;
  price: number;

  constructor(name: string, description: string, price: number) {

    this.name = name;
    this.description = description;
    this.price = price;
  }


  get getId(): number {
    return this.id;
  }


  get getName(): string {
    return this.name;
  }

  set setName(value: string) {
    this.name = value;
  }

  get getDescription(): string {
    return this.description;
  }

  set setDescription(value: string) {
    this.description = value;
  }

  get getPrice(): number {
    return this.price;
  }

  set setPrice(value: number) {
    this.price = value;
  }
}
