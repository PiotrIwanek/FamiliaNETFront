
export class FileTO{

  public id : string;

  constructor(id: string) {
    this.id = id;
  }

  public static fromData( data ){
    return new FileTO( data.id);
  }
}
