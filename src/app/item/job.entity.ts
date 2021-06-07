import { GenericEntity } from '../generic/generic.entity';
import { UserEntity } from '../user/user.entity';

export class  JobEntity  extends GenericEntity{
    name: string;
    author: UserEntity;
    jobType: string;
    code: string;
    releaseDate: Date;
    price: number;
    jobPhoto: any;

}