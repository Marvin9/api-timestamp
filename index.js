const Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router'),
    fs = require('fs');

const routers = new router();

app.use(routers.routes());

routers.get('/', async(ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./index.html');
});

routers.get('/api/timestamp', async(ctx) => {
    ctx.type = "json";
    let date = new Date();
    ctx.body = {
        "unix" : date.getTime() - date.getTimezoneOffset(),
        "utc" : date.toUTCString()
    };
});

routers.get('/api/timestamp/:datestring', async(ctx) => {
    ctx.state.err = {
        "error" : "Invalid Date"
    };
    ctx.type = 'json';
    let string = ctx.params.datestring;
    let not_valid = /[^0-9-]/;
    if(not_valid.test(string))
    {
        ctx.body = ctx.state.err;
    } else {
        let not_unix_number = /[^\d]/;
        if(not_unix_number.test(string))
        {
            let date = new Date(string+" UTC");
            if(date.toString() === "Invalid Date")
                ctx.body = ctx.state.err;
            else
                ctx.body = {
                    "unix" : date.getTime(),
                    "utc" : date.toUTCString()
                };
        }
        else
        {
            let date = new Date(+string);
            if(date.toString() === "Invalid Date")
                ctx.body = ctx.state.err;
            else
                ctx.body = {
                    "unix" : +string,
                    "utc" : date.toUTCString()
                };
        }
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server running on : ", PORT));