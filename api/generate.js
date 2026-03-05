export default async function handler(req,res){

try{

const replicateToken = process.env.REPLICATE_API_TOKEN

const { image, style } = req.body

const prompt =
"Interior redesign of this room in "+style+" style, ultra realistic interior design, photorealistic"

const response = await fetch(
"https://api.replicate.com/v1/predictions",
{
method:"POST",
headers:{
"Authorization":`Token ${replicateToken}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
version:"ac732df83cea7fff2b5d6b2f1c7f0e52ffb4058a52c57d205c3bd6c0e0c4f52c",
input:{
image:image,
prompt:prompt
}
})
}
)

const data = await response.json()

console.log("REPLICATE:",data)

return res.status(200).json(data)

}catch(err){

console.log(err)

return res.status(500).json({
error:err.message
})

}

}
