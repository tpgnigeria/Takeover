import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Days, InviteSource } from '../types';

export type TakeoverDocument = Takeover &
  Document & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({ timestamps: true })
export class Takeover {
  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email: string;

  @Prop({ type: String, required: true, trim: true })
  fullName: string;

  @Prop({ type: String, required: true, trim: true })
  phoneNumber: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ type: String, required: true, enum: ['male', 'female'] })
  gender: 'male' | 'female';

  @Prop({
    type: [String],
    required: true,
    enum: ['thursday', 'friday', 'saturday', 'sunday'],
  })
  daysAttending: Days[];

  @Prop({
    type: String,
    required: true,
    enum: ['social_media', 'friend', 'church', 'advert', 'online', 'other'],
    trim: true,
  })
  invite: InviteSource;

  @Prop({
    type: String,
    trim: true,
    required: function (this: Takeover) {
      return this.invite === 'other';
    },
  })
  inviteOther?: string;

  @Prop({ type: String, trim: true })
  info?: string;
}

export const TakeoverSchema = SchemaFactory.createForClass(Takeover);
