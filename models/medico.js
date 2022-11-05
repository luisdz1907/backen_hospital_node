const { Schema, model } = require("mongoose");

const medicoSchema = Schema(
  {
    nombre: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required:true
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required:true
    },
  },
  { collection: "medicos" }
);

//El parametro del id
medicoSchema.method("toJSON", function () {
  const { _v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Medico", medicoSchema);
