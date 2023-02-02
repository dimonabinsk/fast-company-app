const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    completedMeetings: Number,
    image: String,
    rate: Number,
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    profession: {
      type: Schema.Types.ObjectId,
      ref: "Profession",
    },
    qualities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quality",
      },
    ],
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("User", schema);
