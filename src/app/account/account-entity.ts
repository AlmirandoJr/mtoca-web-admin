import { GenericEntity } from '../generic/generic.entity';
import { UserEntity } from '../user/user.entity';

export class AccountEntity extends GenericEntity {

    constructor() {
        super();
    }

    balance: number;
    user: UserEntity;

}
