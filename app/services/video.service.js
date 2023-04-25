const neo4j = require('neo4j-driver')
// import { nanoid } from 'nanoid'
const nanoid =require('nanoid')

// const driver = neo4j.driver( "bolt+s://86344438fbe9be6de3772e1c046aabc6.neo4jsandbox.com:7687", { disableLosslessIntegers: true })
// const personName = 'Alice'
const driver = neo4j.driver('neo4j://44.200.195.235:7687',
                  neo4j.auth.basic('neo4j', 'adjustments-subtask-abbreviations'), 
                  {/* encrypted: 'ENCRYPTION_OFF' */});

const find = async ()=>{
  const session = driver.session({database:'neo4j'});
  try{
      console.log('deo');
        
    const result = await session.run(`match (v:Video) return v`)
    //  console.log(result.records)
    const kq =result.records.map(i=>{
      console.log(i.get('v').properties)
      return i.get('v').properties
     
    }  )
  
  
   return kq
  
  } finally{
    await session.close()
  }
    
  
      }
      const finds = async (id)=>{
        const session = driver.session({database:'myapp'})
      
        console.log('bbbbbbbbbbbbbbbbbb'+id)
          try{
            const result = await session.run(`match (v:Video {id:${id}})<-[r:COMMENT]-(u:User) return v,u,r`)
            
            const kq =  result.records.map(function(i){ return {
              'u':i.get('u').properties,
              'v':i.get('v').properties,
              'r':i.get('r').properties
              }
              }  )
          return kq
              
          } finally{
            console.log('finally')
          await session.close()
      
      
          }
          
           
      }

const findComments = async (id)=>{
  const session = driver.session({database:'myapp'})

  console.log('bbbbbbbbbbbbbbbbbb'+id)
    try{
      const result = await session.run(`match (v:Video {id:${id}})<-[r:COMMENT]-(u:User) return v,u,r`)
      
      const kq =  result.records.map(function(i){ return {
        'u':i.get('u').properties,
        'v':i.get('v').properties,
        'r':i.get('r').properties
        }
        }  )
    return kq
        
    } finally{
      console.log('finally')
    await session.close()


    }
    
     
}


    const findAll = async (pagination=1)=>{
const session = driver.session({database:'myapp'})
      
      try{

        console.log('------------------------------'+pagination)
            
        const result = await session.run(`match  (u:User)-[r:HAVE]->(v:Video) set v.like = COUNT{ (uu:User)-[rr:LIKE]->(v)}, v.comment =COUNT{ (uuu:User)-[rrr:COMMENT]->(v)}return u,v limit ${pagination*4}`)
            // await session.close()
            // await session.run(`match  (u:User)-[r:HAVE]->(v:Video) set v.like = COUNT{ (uu:User)-[rr:LIKE]->(v)} return u,v limit ${pagination*4}`)
            // result.records.map( async(item)=> {
             
            //   const id =item.get('v').properties.id
                  
            // })
        
      //  const result = await session.run(`match (v:Video), (u:User), (u)-[r:HAVE]-(v) return v,u  limit ${pagination*2}`)
      //  await session.close()
              // console.log(result.records)
            //  await result.records.map(async (item)=> {
            //     // const videoId = item.get('v').elementId
            //     const result1 = await session.run(`match  (u:User)-[r:LIKE]->(v:Video ) where id(v)=${10}  return v ,count(*) as quantity`)
            //   console.loh(result1)
            //   })
              // console.log(result.records)
        const kq =result.records.map(i=>{ return {
          'u':i.get('u').properties,
          'v':i.get('v').properties,
         }
        }  )
      
  
       return kq

      } finally{
        await session.close()
      }
        
    }

    

     

    const findById =async (id)=>{
      const result= await session.run(`match (u:User {_id:'${id}'}) return u limit 1`)
      return result.records[0].properties
    }

     const create = async (video)=>{
      console.log(video)
        let userId ='2'
        let time= new Date();
        let timeStr = time.getDay() + '/' + time.getMonth() +'/' + time.getFullYear() + '-' +time.getUTCHours() 
       
        const result = await session.run(` create (v:Video {title:'${video.title}',dateTime:'${timeStr}', videoLink:'${video.videoLink}'}) with v set v.id = id(v) return v`)
        // const result = await session.run(`CREATE (v:Video {_id:'${Math.floor((new Date().getTime() * Math.random())).toString()}' , title:'${video.title}', videoLink:'${video.videoLink}',dateTime:'${timeStr}'}) return v`)
        // console.log('--------------------------------------')
         let videoId =result.records[0].get('v').properties.id
        // console.log(videoId)
        // console.log('--------------------------------------')
         const result1 = await session.run(`match (a:User), (v:Video) where id(a)=${+userId} and v.id=${+videoId} create (a)-[r:HAVE]->(v) return r `)
        // console.log(result1)

        return true
        // return result.records[0].properties
    }
     const findByAndUpdate = async (id,user)=>{
      const result = await session.run(`MATCH (u:user {_id:'${id}'}) SET name='${user.name}' , phone='${user.email  }' `)
      return result.records[0].properties
    }
       
      
      // // on application exit:
      // await driver.close()
    
    module.exports={
        findAll,findById,findByAndUpdate,create,findComments,find
      }
 