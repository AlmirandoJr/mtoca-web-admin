import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";
import { AccountEntity } from "../account/account-entity";
import { GenericEntity } from "../generic/generic.entity";
import { ItemEntity } from "../item/item.entity";

export class AccountItemEntity extends GenericEntity{

    code: string;
    account: AccountEntity;
    item: ItemEntity;
    bought: boolean;
    name: string;
}