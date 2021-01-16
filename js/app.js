const U = require('./model/user')
const Koa = require('koa')
var serve = require('koa-static')
const session = require('koa-session')
var KoaRouter = require('koa-router')
var koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const views = require('koa-views')

var app = new Koa()
const router = new KoaRouter()

app.use(views('view', {map:{html:'ejs'}})) // 使用 ejs midleware(模板引擎) **要放在router啟動之前**
app.use(koaLogger())
app.use(koaBody())

app.keys = ['*@&))9kdjafda;983'] 
const CONFIG = { 
  key: 'd**@&(_034k3q3&@^(!$!',
  maxAge: 86400000
}
app.use(session(CONFIG, app)) // session 要放在 router 前面

app.use(router.routes())
app.use(serve(__dirname + '/public'));

router
.get('/', async (ctx) => { // render要顯示的頁面
    ctx.session.error_l = undefined
    ctx.session.error_r = undefined
    
    let userid = ctx.session.userID
    console.log('ctx.session.userID:',userid)
    await ctx.render('index',{ // render index.html
        userid
    })
})

.get('/register', async (ctx) => {
    let message = ctx.session.error_r
    await ctx.render('register',{
        message
    })
})

.post('/register', register)

.get('/login', async (ctx) => {
    let message = ctx.session.error_l
    await ctx.render('login',{
        message
    })
})
.post('/login', login)

.get('/logout',logout)

.get('/cart', async (ctx) => {
    let userid = ctx.session.userID
    console.log('ctx.session.userID:',userid)
    await ctx.render('cart',{ // render index.html
        userid
    })
})

.get('/user_data',async (ctx) =>{
    let data = U.get('bill')
    console.log(data)
    await ctx.render('user_data',{
        data
    })
})


async function register(ctx){
    const userData = ctx.request.body // 取得頁面的資料 (帳號，密碼)
    let data = await U.get(userData.id)
    console.log(userData.id)
    if (userData.id && userData.password != "" ){

        if (data == null){ // 確認帳號是否重複
            await U.add(userData)
            console.log("sign up success!")
            ctx.redirect('/')
        }
        else {
            ctx.session.error_r = "帳號已被使用"
            ctx.redirect('/register')
        }
    }
    else {
        ctx.session.error_r = "帳號或密碼不能為空白"
        ctx.redirect('/register')
    }
}  

async function login(ctx){
    let {id, password} = ctx.request.body
    let find_login =  await U.get(id)

    if (id && password != ""){
        if (find_login != null){ // 確認使用者資料是否存在
            if (find_login.password == password){ // 確認密碼
                ctx.session.userID = id
                ctx.session.error_l = undefined
                console.log('login success')
                ctx.redirect('/')
            }           
            else {
                ctx.session.error_l = "密碼錯誤"
                ctx.redirect('/login')
            }
        }
        else {
            ctx.session.error_l = "用戶不存在"
            ctx.redirect('/login')
        }
    }
    else {
        ctx.session.error_l = "帳號或密碼不可為空白"
        ctx.redirect('/login')
    }
}

async function logout(ctx){
    console.log("logout test")
    ctx.session.userID = undefined // 清除 session 紀錄的登入資料
    ctx.redirect('/')
}

// async function find(ctx){
//     let data = U.find()
//     ctx.body = data
// }

async function main() {
    await U.open()
    app.listen(3000)
    console.log("server run at http://localhost:3000")
}

main()