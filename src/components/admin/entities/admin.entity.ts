import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AdminRoles } from '../types';
import { hash } from 'argon2';

export type AdminDocument = Admin &
  Document & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email: string;

  @Prop({ required: true, minlength: 8, maxlength: 64, select: false })
  password: string;

  @Prop({ required: true, enum: AdminRoles, default: AdminRoles.ADMIN })
  role: AdminRoles;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.pre<AdminDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await hash(this.password);
    next();
  } catch (err) {
    next(err);
  }
});
