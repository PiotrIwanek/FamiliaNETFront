export class FileDTO {
  public id: number;
  public name: string;
  public type: string;
  public url: string;
  public size: number;

  constructor(file: FileDTO) {
    this.id = file.id;
    this.name = file.name;
    this.type = file.type;
    this.url = file.url;
    this.size = file.size;
  }

  public static listFromData (data : FileDTO[]){
   let listToReturn : FileDTO [] = [];
    data.forEach( data => listToReturn.push(new FileDTO(data)));
    return listToReturn;
  }


}
