const  UserService = require('../services/user.service')

class UserController{
 

  static async  findPeopleTheSameFavorites(req,res){
    const records =await UserService.findPeopleTheSameFavorites(req.params.id)
    console.log(records)
     return  res.send(records)
    
}
  static async findAll(req,res){
        const records =await UserService.findAll()
        console.log(records)
         return  res.send(records)
        
    }

    static async addFavorites(req,res){
      console.log(req.params.id,req.body.favorites)
      const records =await UserService.addFavorites(req.params.id,req.body.favorites)
      console.log(records)
       return  res.send(records)
    }
    static find(req,res){
        return  res.send('------find------')
       
   }
   static findOne(req,res){
    return  res.send('------findOne------')
}
static async create(req,res){
  console.log(req)
  const result = await UserService.create(req.body)
  res.send('ok')
}




}
module.exports = UserController