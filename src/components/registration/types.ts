import { CampDocument } from './entities/camp.entities';
import {
  ADMIN_ATTRIBUTES,
  CAMP_ATTRIBUTES,
  PITCH_ATTRIBUTES,
  TAKEOVER_ATTRIBUTES,
} from '../../common/constants';
import { AdminDocument } from '../admin/entities/admin.entity';
import { TakeoverDocument } from './entities/takeover.entity';
import { PitchDocument } from './entities/pitch.registration';

export type Days = 'thursday' | 'friday' | 'saturday' | 'sunday';

export type InviteSource =
  | 'social_media'
  | 'friend'
  | 'church'
  | 'advert'
  | 'online'
  | 'other';

export type AdminResponse = Partial<
  Pick<AdminDocument, (typeof ADMIN_ATTRIBUTES)[number]>
>;

export type TakeoverResponse = Partial<
  Pick<TakeoverDocument, (typeof TAKEOVER_ATTRIBUTES)[number]>
>;

export type CampResponse = Partial<
  Pick<CampDocument, (typeof CAMP_ATTRIBUTES)[number]>
>;

export type PitchResponse = Partial<
  Pick<PitchDocument, (typeof PITCH_ATTRIBUTES)[number]>
>;
