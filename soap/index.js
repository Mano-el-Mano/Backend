module.exports = service = {
    ws: {
        calc: {
            sumar : function(args) {
                var n = 1*args.a + 1*args.b;
                return { sumres : n };
            },

            multiplicar : function(args) {
                console.log(args)
                var n = args.a * args.b;
                return { mulres : n }
            },

        }
    }
}