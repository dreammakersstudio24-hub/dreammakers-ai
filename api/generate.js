export default async function handler(req, res) {

try{

const replicateToken = process.env.REPLICATE_API_TOKEN
const { image, style } = req.body

const prompt =
"beautiful "+style+" style interior redesign, same room layout, professional interior design, photorealistic"

const start = await fetch(
"https://api.replicate.com/v1/predictions",
{
method:"POST",
headers:{
"Authorization":`Token ${replicateToken}`,
"Content-Type":"application/json"
},
body:JSON.stringify({

version:"8a89b0ab59a050244a751b6475d91041a8582ba33692ae6fab65e0c51b700328",

input:{
input_image:image,
prompt:prompt,
width:720,
height:1280,
num_outputs:1,
guidance_scale:8,
num_inference_steps:40
}

})
}
)

const prediction = await start.json()

if(prediction.error){
return res.status(500).json(prediction)
}

let status = prediction.status

const getUrl =
`https://api.replicate.com/v1/predictions/${prediction.id}`

let output = null
let tries = 0

while(status !== "succeeded" && status !== "failed" && tries < 60){

await new Promise(r=>setTimeout(r,2000))

const poll = await fetch(getUrl,{
headers:{
"Authorization":`Token ${replicateToken}`
}
})

const pollData = await poll.json()

status = pollData.status
output = pollData.output

tries++

}

if(status !== "succeeded"){
return res.status(500).json({error:"AI generation timeout"})
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
