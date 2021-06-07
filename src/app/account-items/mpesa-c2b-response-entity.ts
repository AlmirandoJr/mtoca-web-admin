import { GenericEntity } from "../generic/generic.entity";
import { AccountItemEntity } from "./account-item-entity";

export class MpesaC2BResponseEntity extends GenericEntity{
    accountItem :AccountItemEntity;
    output_ConversationID: string;
    output_TransactionID: string;
    output_ResponseDesc: string;
    output_ResponseCode: string;
    output_ThirdPartyReference: string;
} 