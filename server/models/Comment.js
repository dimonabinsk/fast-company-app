const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    pageId: {
      //   На чьей странице находится комментарий
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      //   Кто оставил комментарий
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Comment", schema);
