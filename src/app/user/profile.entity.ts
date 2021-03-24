import { GenericEntity } from '../generic/generic.entity';

export class ProfileEntity extends GenericEntity{
    public name: string;
    description: string;
    hibernateLazyInitializer: any;
}