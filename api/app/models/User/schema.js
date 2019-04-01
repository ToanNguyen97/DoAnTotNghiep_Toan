'use strict'

const schema = {
  userName: {
    type: String,
    required: true,
    max: 30
  },
  passWord: {
    type: String,
    required:true
  },
  email: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: true // true: active, false: inactive
  },
  roles: {
    type: [{
      type: String,
      enum: [ 'user', 'staff', 'super-admin' ]
    }],
    default: ['user']
  }
}

const options = {
  collection: 'users',
  timestamps: true,
  virtuals: true
}

export {schema, options}