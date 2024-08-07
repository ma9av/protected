import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool(
    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
).promise()

export async function showUser(name){
    try{

        const [result] = await pool.query('select * from users where name = ?;', [name])
        return result

    }catch(err){
        throw err ;
    }
}

export async function registerNewUser(user){
        try{
            const result =await pool.execute('insert into users values(?, ?, ?)', [user.id, user.name, user.password])
            return result
            
        }catch(err){
            throw err;
        }

}

// const answer = await registerNewUser({ id: 100, name:"Yash", password:"jjk"})
// console.log(answer)