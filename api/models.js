const { Sequelize, Model, DataTypes } = require('sequelize')
const path = require('path')

const connectionSettings = {
    test: {dialect: 'sqlite', storage: 'sqlite::memory:'},
    dev: {dialect: 'sqlite', storage: path.join(__dirname, 'data.db')},
    production: {dialect: 'postgres', protocal: 'postgres'}
}

const sequelize =  new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, 'data.db')})

class User extends Model {}
class TransactionHistory extends Model {}

User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    balance: DataTypes.REAL,
}, {sequelize: sequelize})

TransactionHistory.init ({
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    amount: DataTypes.STRING,
}, {sequelize: sequelize})

const friendTable = sequelize.define('friendTable',{
},{})

User.hasMany(TransactionHistory, {as:"history"})
User.belongsToMany(User,{as:'friends',through:friendTable})
TransactionHistory.belongsTo(User)


module.exports = {User, TransactionHistory, sequelize}
