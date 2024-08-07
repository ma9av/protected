import { generateToken } from "./accessToken.js"
import { registerNewUser, showUser } from "./database.js"

export const registerUser =  async (req, res) =>{

        try{

            let name = req.body.name
            let password = req.body.password
            
            const user = {
                "id": Math.floor(Math.random()*1000000000),
                "name": name,
                "password": password
            }
            
            const result =  await registerNewUser(user)
            res.status(201).json({ message: 'User registered successfully', result }); 
        }  
        catch(error){
            res.status(403).json({ message: 'Error registering user', error})
        }
    } 
     
export const loginUser = async (req, res) => {

    let name = req.body.name
    let password = req.body.password

    const [result] =  await showUser(name)

    if(result == null){
        res.send({ message: 'invalid username'})
    }else{

        if(password != result.password){
            res.send({ message: 'wrong password'})
        }else{
            const accessToken = await generateToken(result)

            res.cookie('access_token', accessToken, { SameSite:'None', secure: true })
            res.json({message: 'authorized user'})
        }

    }

}

export const getUserInfo = async (req, res) => {
    const [result] = await showUser(req.user.name)
    res.send(result)
}