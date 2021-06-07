import { ItemEntity } from "../item/item.entity";
import { JobEntity } from "../item/job.entity";

export class GroupsPerJobDTO {

    numberOfSales: number;

    job :JobEntity;

    subTotal: number;
}
