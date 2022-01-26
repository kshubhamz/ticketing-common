import { Schema } from "mongoose";

export function versionPlugin(schema: Schema) {
  schema.pre("save", function (next) {
    this.version = typeof this.version === "undefined" ? 0 : this.version++;
    next();
  });
}
