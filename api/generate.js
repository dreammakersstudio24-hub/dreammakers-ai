export default async function handler(req, res) {

try{

const replicateToken = process.env.REPLICATE_API_TOKEN
const { image, style } = req.body

const prompt =
"beautiful "+style+" style interior design, modern furniture, photorealistic, keep original room layout"

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
guidance_scale:7,
num_inference_steps:30
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
"Authorization":`Token ${replicateToken}`
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
