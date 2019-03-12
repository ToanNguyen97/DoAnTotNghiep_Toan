const schema = {
  tenKhuPhong: {
    type: String,
    required: true,
    max: 20
  },
  anhKhuPhong: {
    type: String
  }
}

const options = {
  collection: 'khuphongs',
  timestamps: true
}

export { schema, options}