export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"})
}

try{

const token = process.env.REPLICATE_API_TOKEN
const {image,style} = req.body

const prompt =
"beautiful "+style+" style interior design, photorealistic, keep original room layout"

const start = await fetch(
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
strength:0.7
}
})
}
)

const prediction = await start.json()

if(prediction.error){
return res.status(500).json(prediction)
}

let status = prediction.status
let getUrl = prediction.urls.get
let output = null

while(status !== "succeeded" && status !== "failed"){

await new Promise(r=>setTimeout(r,2000))

const poll = await fetch(getUrl,{
headers:{
Authorization:`Token ${token}`
}
})

const pollData = await poll.json()

status = pollData.status
output = pollData.output

}

if(status === "failed"){
return res.status(500).json({error:"AI generation failed"})
}

return res.status(200).json({
output:output
})

}catch(err){

return res.status(500).json({
error:err.message
})

}

}
