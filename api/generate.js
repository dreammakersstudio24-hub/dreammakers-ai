export default async function handler(req,res){

try{

const replicateToken = process.env.REPLICATE_API_TOKEN

const { image, style } = req.body

const prompt =
"Interior redesign of this room in "+style+" style, ultra realistic interior design, photorealistic"

const prediction = await fetch(
"https://api.replicate.com/v1/predictions",
{
method:"POST",
headers:{
"Authorization":`Token ${replicateToken}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
version:"stability-ai/sdxl",
input:{
image:image,
prompt:prompt
}
})
}
)

const data = await prediction.json()

console.log("REPLICATE RESPONSE:",data)

if(!data.urls){

return res.status(500).json({
error:"Replicate did not return urls",
replicate:data
})

}

let getUrl = data.urls.get

while(true){

await new Promise(r=>setTimeout(r,2000))

const poll = await fetch(getUrl,{
headers:{
"Authorization":`Token ${replicateToken}`
}
})

const pollData = await poll.json()

console.log("POLL:",pollData.status)

if(pollData.status === "succeeded"){

return res.status(200).json({
output: pollData.output
})

}

if(pollData.status === "failed"){

return res.status(500).json({
error:"AI generation failed",
details:pollData
})

}

}

}catch(err){

console.log("SERVER ERROR:",err)

return res.status(500).json({
error:err.message
})

}

}
