import { GenericEntity } from '../generic/generic.entity';


export  class UserEntity extends GenericEntity {

   constructor() {
      super();
   }
   username: string;
   password: string;
   fullName: string;

}
