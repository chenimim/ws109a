const U = module.exports = {}
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const url = 'mongodb://localhost:27017'
const dbName = 'project'
var client, db, logins

U.open = async function () {
    client = await MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true})
    db = await client.db(dbName) // 創建名為 'project' 資料庫
    logins = await db.collection('logins') // 創建 db:project 下的 colletion:logins
}

U.add = async function (login) {
    login.created_at = new Date() // 資料創建日期
    let r = await logins.insertOne(login) // 新增一筆 user 資料
    login._id = r.insertedID
    return login
}

U.get = async function (Id) {
    let data = await logins.findOne({id:Id}) // data 取得資料庫對應的帳密
    console.log(data)
    return data
}

U.find = async function(){
    let data = await logins.find()
    return data
}