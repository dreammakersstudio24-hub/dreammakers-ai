export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"})
}

try{

const token = process.env.REPLICATE_API_TOKEN
const {image,style} = req.body

// convert image url -> base64
const img = await fetch(image)
const buffer = await img.arrayBuffer()
const base64 = Buffer.from(buffer).toString("base64")

const prompt =
"beautiful "+style+" style interior design, photorealistic, keep same room layout"

const response = await fetch(
"https://api.replicate.com/v1/predictions",
{
method:"POST",
headers:{
Authorization:`Token ${token}`,
"Content-Type":"application/json",
Prefer:"wait"
},
body:JSON.stringify({

version:"d0ee3d708c6e1f1a1c1e099f3996bd6f66a701d2325405cb9184160a9c3a01d9",

input:{
image:"data:image/png;base64,"+base64,
prompt:prompt,
strength:0.65,
num_outputs:1
}

})
}
)

const data = await response.json()

console.log("Replicate:",data)

if(!data.output){
return res.status(500).json({error:"AI generation failed"})
}

return res.status(200).json({
output:data.output
})

}catch(err){

console.error(err)

return res.status(500).json({
error:err.message
})

}

}
