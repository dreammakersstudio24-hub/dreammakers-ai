export default async function handler(req,res){

try{

const replicateToken = process.env.REPLICATE_API_TOKEN

const { image, style } = req.body

const prompt =
"interior redesign, "+style+" style, modern furniture, beautiful lighting, photorealistic, keep original room layout"

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
image:image,
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
return res.status(500).js
