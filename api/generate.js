export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"})
}

try{

const token = process.env.REPLICATE_API_TOKEN
const {image,style} = req.body

const prompt =
"beautiful "+style+" style interior design, keep same room layout, photorealistic"

const response = await fetch(
"https://api.replicate.com/v1/predictions",
{
method:"POST",
headers:{
Authorization:`Token ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
version:"39ed52f2a78e9346f6c59c8f1a5f3b59e8f8cba3c0a9b2c89c1d0c3bcb7c2c1f",
input:{
image:image,
prompt:prompt,
strength:0.7,
num_outputs:1
}
})
}
)

const data = await response.json()

if(data.error){
return res.status(500).json(data)
}

return res.status(200).json({
output:data.output
})

}catch(err){

return res.status(500).json({error:err.message})

}

}
