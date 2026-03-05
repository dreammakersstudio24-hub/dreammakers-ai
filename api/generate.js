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
version:"7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
input:{
image:image,
prompt:prompt
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
