import { Schema } from "mongoose";

export function versionPlugin(schema: Schema) {
  schema.pre("save", function (next) {
    if (typeof this.version !== "number") {
      throw new Error("Version must be a number.");
    }
    this.version++;
    next();
  });
}
