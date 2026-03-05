export default async function handler(req, res) {

try {

const replicateToken = process.env.REPLICATE_API_TOKEN

const { image, style } = req.body

const prompt =
"Interior redesign of this room in "+style+" style, ultra realistic interior design, photorealistic, beautiful lighting, high quality"

const start = await fetch(
"https://api.replicate.com/v1/predictions",
{
method:"POST",
headers:{
"Authorization":`Token ${replicateToken}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
version:"7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
input:{
prompt:prompt
}
})
}
)

const prediction = await start.json()

console.log("Prediction start:",prediction)

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
"Authorization":`Token ${replicateToken}`
}
})

const pollData = await poll.json()

console.log("Polling:",pollData)

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

console.log("SERVER ERROR:",err)

return res.status(500).json({
error:err.message
})

}

}
