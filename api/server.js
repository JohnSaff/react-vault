const express = require('express');
const app = express();
const { User, TransactionHistory, sequelize } = require('./models');
const Mailer = require('./Mailer')
const {Op} = require('sequelize')

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Headers", "*");
    next();
})


app.get('/', (req,res)=>{
    res.send({})
})

app.post('/', express.json(), async (req,res)=>{
    if (!req.body.user){
        res.status(401).send({'hello':'world'})
        return
    }
    var user = await User.findOne({where:{email:req.body.user.email}})
    if (!user){
        if(req.body.user.given_name){
            await User.create({
                name:req.body.user.given_name,
                email:req.body.user.email,
                balance:0.
            })
        }
        else{
            await User.create({
                name:req.body.user.nickname,
                email:req.body.user.email,
                balance: 0.
            })
        }
        user = await User.findOne({where:{email:req.body.user.email}})
    }
    const friendObjects = await user.getFriends()
    const sendData = {
        user: user,
        friends: friendObjects
    }
    res.send(JSON.stringify(sendData))
    return
})

app.post('/addfunds',express.json(),async (req,res)=>{
    if(req.body.amount === undefined || req.body.amount === null){
        res.status(400).send({})
        return
    }
    const amount = req.body.amount
    const user = await User.findOne({where:{email:req.body.user.email}})
    var balance = parseFloat(user.balance)
    balance += parseFloat(amount)
    await user.update({balance})
    res.send({})
})

app.post('/pay', express.json(),async (req,res)=>{
    if (Object.keys(req.body).length == 0){
        console.log('415')
        res.status(415).send({})
        return
    }
    if(!req.body.amount || !req.body.recipient){
        console.log(400)
        res.status(400).send({})
        return
    }
    const payer = await User.findOne({where:{email:req.body.user.email}})
    const payee = await User.findOne({where:{email:req.body.recipient}})
    if(!payer || !payee){
        console.log(404)
        res.status(404).send({})
        return
    }
    if(payer.email === payee.email){
        await TransactionHistory.create({from: req.body.recipient, to: payer.email, amount: req.body.amount, UserId: payer.id})
        res.status(200).send({})
        return
    }
    payerBalance = parseFloat(payer.balance)
    await payer.update({balance: payerBalance - parseFloat(req.body.amount)})
    payeeBalance = parseFloat(payee.balance)
    await payee.update({balance: payeeBalance + parseFloat(req.body.amount)})
    await TransactionHistory.create({from: req.body.recipient, to: payer.email, amount: req.body.amount, UserId: payer.id})
    res.status(200).send({})
})

app.post('/addfriend', express.json(),async (req,res) =>{
    if(!req.body.email){
        res.status(400).send({})
        return
    }
    const user = await User.findOne({where:{email:req.body.user.email}})
    const friend =  await User.findOne({where:{email:req.body.email}})
    if(friend == null){
        console.log('404')
        res.status(404).send({})
        return
    }
    await user.addFriend(friend)
    res.send({})
    return
})

app.post('/invite',async (req,res)=>{
    if(!req.body.email){
        console.log('400')
        res.status(400).send({})
        return
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    if(!validateEmail(req.body.email)){
        console.log('400')
        res.status(400).send({})
        return
    }
    const user = await User.findOne({where:{email:req.oidc.user.email}})
    const mailer = new Mailer(user.name,req.oidc.useremail)
    mailer.sendInvite(req.body.email)
    res.send({})
})

app.post('/history', express.json(), async (req,res) => {
    const user = await User.findOne({where:{email:req.body.user.email}})
    const history = await TransactionHistory.findAll({where: {[Op.or]: [{from: user.email}, {to: user.email}]}})
    console.log(200)
    res.send({user, history})
    return
})

app.post('/friends', async(req, res)=> {
    const user = await User.findOne({where:{email:req.body.user.email}})
    const friends = await user.getFriends()
    res.send({friends})
    return
})



app.listen(9000, () => {
    sequelize.sync().then(() => console.log("All ready for banking"))
})
