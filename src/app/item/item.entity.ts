import { GenericEntity } from '../generic/generic.entity';
import { UserEntity } from '../user/user.entity';
import { JobEntity } from './job.entity';

export class ItemEntity extends GenericEntity {
    name: string;
    genre: string;
    colaborators: string;
    price: number;
    seqNumber: number;
    code: string;
    releaseDate: Date;
    job: JobEntity;

}