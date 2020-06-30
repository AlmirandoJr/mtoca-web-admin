import { GenericEntity } from '../generic/generic.entity';
import { AccountEntity } from './account-entity';
import { AccountItemEntity } from './AccountItemEntity';

export class AccountStatementEntity extends GenericEntity {
    occourenceDate: Date;
    description: string;
    balance: number;
    value: number;
    accountEntity: AccountEntity;
    AccountItemEntity: AccountItemEntity;
    code: string;
}