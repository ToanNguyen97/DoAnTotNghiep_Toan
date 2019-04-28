import Boom from 'boom'
import Mongoose from 'mongoose'
const RoleGroup = Mongoose.model('RoleGroup')

const get = async (request, h ) => {
  try {
    return await RoleGroup.find().populate('roles')
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const save = async (request, h ) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id) {
      data.roles.push('5cc5752e6adfd01278d9a325')
      item = new RoleGroup(data)
    } else {
      item = await RoleGroup.findById(data._id)
      item = Object.assign(item, data)
    }
    await item.save()
    return item
  } catch (err) {
    return Boom.forbidden(err)
  }
}

// add quyền cho group
const addRole = async (request, h) => {
  try {
    let data = request.payload
    let roleGroup = await RoleGroup.findById({_id:data.idGroup})
    if(roleGroup) {
      if(!roleGroup.roles) {
        roleGroup.roles = []
      }
      roleGroup.roles.push(data.idRole)
    }
    await roleGroup.save()
    return roleGroup
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  get,
  save,
  addRole
}

