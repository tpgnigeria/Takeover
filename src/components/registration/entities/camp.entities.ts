import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CampDocument = Camp &
  Document & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({ timestamps: true })
export class Camp {
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
  address: string;

  @Prop({ type: Boolean, required: true })
  student: boolean;

  @Prop({
    type: String,
    trim: true,
    required: function (this: Camp) {
      return this.student === true;
    },
  })
  school?: string;

  @Prop({ type: String, required: true, trim: true })
  emergency: string;

  @Prop({ type: Boolean, required: true })
  healthChallenge: boolean;

  @Prop({
    type: String,
    trim: true,
    required: function (this: Camp) {
      return this.healthChallenge === true;
    },
  })
  challenge?: string;
}

export const CampSchema = SchemaFactory.createForClass(Camp);
