// import mongoose, { Document, Model } from 'mongoose';

export interface Account {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  secondName?: string;
  password?: string;
  role?: string;
}

/*
export type AccountDoc = Document &
  Account & {
    _id: string;

    createdAt: string;
    updatedAt: string;
  };

const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      text: true,
      lowercase: true,
      trim: true,
      sparse: true,
      required: false,
    },

    phone: {
      type: String,
      unique: true,
      required: true,
    },

    firstName: {
      type: String,
      text: true,
    },
    lastName: {
      type: String,
      text: true,
    },
    secondName: {
      type: String,
      text: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export let accountModel: Model<AccountDoc>;

export const ACCOUNTS_COLLECTION = 'Account';

try {
  accountModel = mongoose.model<AccountDoc>(ACCOUNTS_COLLECTION);
} catch (error) {
  accountModel = mongoose.model<AccountDoc>(ACCOUNTS_COLLECTION, accountSchema);
}
*/
