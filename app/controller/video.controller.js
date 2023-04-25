const  VideoService = require('../services/video.service')
class UserController{

  static async findAll(req,res){
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+req.params.pagination)
        const records =await VideoService.findAll(req.params.pagination)
        console.log(records)
         return  res.send(records)
        
    }

    static async findComments(req,res){
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+req.params.id)
      const records =await VideoService.findComments(req.params.id)
      console.log(records)
       return  res.send(records)

    }
    static async find(req,res){
      const records =await VideoService.find();
      console.log(records);
        return res.send( records);
       
   }
   static findOne(req,res){
    return  res.send('------findOne------')
}
static async create(req,res){
  console.log(req)
  const result = await VideoService.create(req.body)
  return res.send('ok')
}




}
module.exports = UserController