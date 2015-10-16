var Waterline = require('waterline');
var waterline = new Waterline();
var mongoAdapter = require('sails-mongo');

var config = {
    adapters: {
        mongo: mongoAdapter
    },

    connections: {
        mongoDev: {
            adapter: 'mongo',
            host: 'localhost',
            database: 'waterline',
            port: 27017,
            schema: true,
            poolSize: 1
        }
    }
};


// Define your collection (aka model)
var User = Waterline.Collection.extend({

    tableName: 'users',

    identity: 'user',

    connection: 'mongoDev',

    attributes: {

        firstName: {
            type: 'string',
            required: true,
            blablabla: 'trtrt'
        },

        lastName: {
            type: 'string',
            required: true
        },

        age: {
            type: 'integer',
            required: true
        },

        email: {
            type: 'email',
            required: true
        },

        // You can also define instance methods here
        fullName: function() {
            return this.firstName + ' ' + this.lastName
        },

        // Override toJSON instance method
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },

    beforeCreate: function(values, cb) {
        cb();
    },

    // Class Method
    doSomething: function() {
        // Do something here
    }
});



waterline.loadCollection(User);
waterline.initialize(config, function(err, models) {

    if(err) { throw new Error(err); }

    models.collections.user.find()
        .where({ age: 21 })
        .sort({ createdAt: 'desc' })
        .exec(function(err, users) {
            // Do stuff here
            console.log(users);
        });

});

