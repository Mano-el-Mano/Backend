
var soap = require('soap');
var http = require('http');

const users = require('../logic/users')

var service = {
    ws: {
        calc: {
            sumar : function(args) {
                var n = 1*args.a + 1*args.b;
                return { sumres : n };
            },

            multiplicar : function(args) {
                var n = args.a * args.b;
                return { mulres : n };
            },
            
            getUser: async function(args){
                const userId = args.userId;
                const foundUser = await users.getUser(userId)
                return {user: JSON.stringify(foundUser)}
            },
            getAllUsers: async function(args){
                console.log(args)
                const foundUsers = await users.getUsers();
                return {users: JSON.stringify(foundUsers)}
            }
        }
    }
};


/*

Comment in code below and run as a node script for testing purposes

//
var xml = require('fs').readFileSync('wscalc1.wsdl', 'utf8');

var server = http.createServer(function(request,response) {
    response.end("404: Not Found: "+request.url);
});

server.listen(8001, () => console.log('listening on port'));
soap.listen(server, '/wscalc1', service, xml);

*/

module.exports = service