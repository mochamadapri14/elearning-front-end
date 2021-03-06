import { FileModel } from './file-model';
import { ScheduleModel } from './schedule-model';

export class DetailModuleResponse {
  code: string;
  title: string;
  description: string;
  schedule = new ScheduleModel();
  files: FileModel[];
}
