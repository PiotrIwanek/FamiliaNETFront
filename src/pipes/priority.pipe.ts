import {Pipe, PipeTransform} from "@angular/core";


enum Prioryty {
  LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH'
}

@Pipe({name: 'priority'})
export class PriorityPipe implements PipeTransform {

  transform(priority: string) {
    switch (priority) {
      case 'LOW':
        return "Niski";
      case 'MEDIUM':
        return "Średni";
      case 'HIGH':
        return "Wysoki";
    }
  }

}

@Pipe({name: 'priorityIcon'})
export class priorityIconPipe implements PipeTransform {

  transform(priority: string) {
    switch (priority) {
      case 'LOW':
        return "pi pi-info-circle";
      case 'MEDIUM':
        return "pi pi-exclamation-triangle";
      case 'HIGH':
        return "pi pi-exclamation-triangle";
    }
  }

}
