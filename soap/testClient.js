var soap = require('soap')
var url = 'http://localhost:8001/wscalc1?wsdl'

//internal script to test out soap endpoints

soap.createClient(url, function (err, client) {
    if (err) throw err
    console.log(client.describe().ws.calc)

    client.multiplicar({ a: 4, b: 3 }, function (err, res) {
        if (err) throw err
        console.log(res)
    })

    client.sumar({ a: 232, b: 560 }, function (err, res) {
        if (err) throw err
        console.log(res)
    })

    client.getUser({ userId: '3' }, function (err, res) {
        if (err) throw err
        console.log(res)
    })

    client.getAllUsers({}, function (err, res) {
        if (err) throw err
        console.log(res)
    })
})
