/**
 * Created by tom on 13/04/16.
 */
var userObSchema = require('./schemas/user-ob');
var imageObSchema = require('./schemas/image-ob');


exports.userObValidator = require('./validator')(userObSchema);
exports.imageObValidator = require('./validator')(imageObSchema);