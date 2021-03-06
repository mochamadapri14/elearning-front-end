import { ExperienceModel } from '../experience-model';
import { Gender } from '../gender';
import { TeacherModel } from '../teacher-model';

export class TeacherProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  gender: Gender;
  photoId: string;
  experiences: ExperienceModel[];
}
