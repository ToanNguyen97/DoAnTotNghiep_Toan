const schema = {
  tenKhoanThu: {
    type: String,
    required: true,
    max:30
  },
  giaKhoanThu: {
    type: Number,
    required: true
  }
}

const options = {
  collection: 'cackhoanthus'
}
export {schema, options}