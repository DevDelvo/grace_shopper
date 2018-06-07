const User = require('./user')
const Cart = require('./cart')
const Car = require('./car')
const Transaction = require('./transaction')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Car.belongsTo(User) // starts as sell, after transaction is buyer
Car.belongsTo(Cart) // only after added to Cart
Cart.belongsTo(User) // this will be the user who will become the owner after transaction
Transaction.belongsTo(Cart)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  Car,
  Transaction
}
