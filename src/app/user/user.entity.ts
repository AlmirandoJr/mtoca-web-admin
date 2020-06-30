import { GenericEntity } from '../generic/generic.entity';
import { ProfileEntity } from './profile.entity';


export  class UserEntity extends GenericEntity {

   constructor() {
      super();
   }
   username: string;
   password: string;
   name: string;
   city:  string;
   gender: string;
   birthDate: Date;
   profile: ProfileEntity;

}
