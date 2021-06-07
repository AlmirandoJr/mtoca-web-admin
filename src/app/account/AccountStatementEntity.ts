import { AccountItemEntity } from '../account-items/account-item-entity';
import { GenericEntity } from '../generic/generic.entity';
import { AccountEntity } from './account-entity';

export class AccountStatementEntity extends GenericEntity {
    occourenceDate: Date;
    description: string;
    balance: number;
    value: number;
    accountEntity: AccountEntity;
    AccountItemEntity: AccountItemEntity;
    code: string;
}