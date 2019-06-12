const schema = {
  tenLoaiPhong: {
    type: String,
    required: true,
    max: 30
  },
  giaPhong: {
    type: Number,
    required: true
  },
  anhLoaiPhong: {
    type: String,
    max: 50
  }
}

const options = {
  collections: 'loaiphongs'
}

export  {schema, options}