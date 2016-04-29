/**
 * Provides validators
 */

var userObSchema = require('./schemas/user-ob');
var imageObSchema = require('./schemas/image-ob');
var imageSchema = require('./schemas/image');


exports.userObValidator = require('./validator')(userObSchema);
exports.imageObValidator = require('./validator')(imageObSchema);
exports.imageValidator = require('./validator')(imageSchema);