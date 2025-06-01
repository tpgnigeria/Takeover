import { AdminDocument } from '../components/admin/entities/admin.entity';
import { CampDocument } from '../components/registration/entities/camp.entities';
import { TakeoverDocument } from '../components/registration/entities/takeover.entity';
import { PitchDocument } from '../components/registration/entities/pitch.registration';

export const ADMIN_ATTRIBUTES: Array<keyof AdminDocument> = [
  '_id',
  'fullName',
  'email',
  'role',
  'createdAt',
];

export const TAKEOVER_ATTRIBUTES: Array<keyof TakeoverDocument> = [
  '_id',
  'email',
  'fullName',
  'phoneNumber',
  'age',
  'gender',
  'daysAttending',
  'invite',
  'inviteOther',
  'info',
  'createdAt',
];

export const CAMP_ATTRIBUTES: Array<keyof CampDocument> = [
  '_id',
  'email',
  'fullName',
  'phoneNumber',
  'age',
  'address',
  'student',
  'school',
  'emergencyContact',
  'healthChallenge',
  'challenge',
  'createdAt',
];

export const PITCH_ATTRIBUTES: Array<keyof PitchDocument> = [
  '_id',
  'email',
  'fullName',
  'phoneNumber',
  'age',
  'exists',
  'cac',
  'businessName',
  'location',
  'proposedName',
  'description',
  'exhibits',
  'createdAt',
];
