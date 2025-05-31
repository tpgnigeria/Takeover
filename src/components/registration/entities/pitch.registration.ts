import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PitchDocument = Pitch &
  Document & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({ timestamps: true })
export class Pitch {
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

  @Prop({ type: Number, required: true, min: 18, max: 40 })
  age: number;

  @Prop({ type: String, required: true, trim: true })
  location: string;

  @Prop({ type: Boolean, required: true })
  exists: boolean;

  @Prop({
    type: String,
    trim: true,
    required: function (this: Pitch) {
      return this.exists === true;
    },
  })
  cac?: string;

  @Prop({
    type: String,
    trim: true,
    required: function (this: Pitch) {
      return this.exists === true;
    },
  })
  businessName?: string;

  @Prop({
    type: String,
    trim: true,
    required: function (this: Pitch) {
      return this.exists === false;
    },
  })
  proposedBusinessName?: string;

  @Prop({ type: String, required: true, trim: true })
  description: string;

  @Prop({ type: Boolean, required: true })
  exhibits: boolean;
}

export const PitchSchema = SchemaFactory.createForClass(Pitch);
