import { Schema } from "mongoose";

export function versionPlugin(schema: Schema) {
  const versionKey = schema.get("versionKey");

  if (!versionKey) {
    throw new Error("VersionKey must be defined");
  }

  if (typeof versionKey === "boolean") {
    throw new Error("Version Key cannot be boolean");
  }

  // pre-save hook to check version
  schema.pre("save", function (next) {
    // Condition the save on the versions matching
    this.$where = { ...this.$where, [versionKey]: this[versionKey] };
    this.increment(); // increamenting version automatically
    next();
  });
}
