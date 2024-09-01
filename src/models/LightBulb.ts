import mongoose, { model, models, Schema } from "mongoose";

const LightBulbSchema = new Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

  export default models.LightBulb || model('LightBulb', LightBulbSchema)