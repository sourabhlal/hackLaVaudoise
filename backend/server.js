'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');
const validator = require('validator');

const Bcrypt = require('bcrypt');
const Basic = require('hapi-auth-basic');

const server = new Hapi.Server();

var Datastore = require('nedb');

var db = {};
db.issues = new Datastore({ filename: './myDB.db', autoload:true});


const users = {
    admin: {
        username: 'admin',
        password: '$2a$05$FkMtKms6DFnNIYmc5gwc/OrvgZGnQIkRYGl9PP7qRqrSAntHQTHiG',
        name: 'admin',
        id: '2133d32a',
        admin: true
    },
    pierre: {
        username: 'pierre',
        password: '$2a$05$fia8dK/u2/w3tuVhWUqVP.cNqKtijD6WQXH9LQWvi8aBXlRbS78sy',
        name: 'Pierre Gabioud',
        id: '2133d32b',
        admin:true
    }
};


const validate = function (request, username, password, callback) {
    const user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};


var publicAccess = process.argv[2];

server.connection({
    port: 3007,
    host: publicAccess ? '0.0.0.0' : 'localhost'
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});


server.register([Basic, require('inert'), require('vision')], (err) => {

    Hoek.assert(!err, err);


    server.auth.strategy('simple', 'basic', { validateFunc: validate });

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: './templates',
        partialsPath : './templates/partials',
        helpersPath : './templates/helpers'
    });


    //Homepage
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('homepage', {
                page : 'home'
            });
        }
    });


    server.route({
         method:'GET',
        path:'/ask',
         handler: function (request, reply) {
             reply({
                 answer: 'Here is your answer',
                 link: 'http://hey.com'
                   });
         }
     });


    //Static files
    server.route({
        method: 'GET',
        path: '/public/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });




    server.route({
        method: '*',
        path: '/{p*}', // catch-all path
        handler: function (request, reply) {
            return reply.view('errors.html');
        }
    });



});