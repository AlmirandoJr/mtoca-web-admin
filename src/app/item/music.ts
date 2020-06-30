import { GenericEntity } from '../generic/generic.entity';
import { UserEntity } from '../user/user.entity';
import { JobEntity } from './job';

export class MusicEntity extends GenericEntity {
    title: string;
    author: UserEntity;
    genre: string;
    colaborators: string;
    price: number;
    code: string;
    releaseDate: Date;
    job: JobEntity;

}
