import { GenericEntity } from '../generic/generic.entity';
import { UserEntity } from './user.entity';
import { ProfileEntity } from './profile.entity';

export  class UserProfileEntity extends GenericEntity {
    user: UserEntity;
    profile: ProfileEntity;
}