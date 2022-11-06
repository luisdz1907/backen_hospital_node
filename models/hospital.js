const { Schema, model } = require("mongoose");

const hospitalSchema = Schema({
  nombre: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
},{ collection: 'hospitales' });

//El parametro del id
hospitalSchema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  return object;
})

module.exports = model("Hospital", hospitalSchema);
