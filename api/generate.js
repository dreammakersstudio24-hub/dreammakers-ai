export default async function handler(req, res) {

try{

const token = process.env.REPLICATE_API_TOKEN
const { image, style } = req.body

const prompt =
"beautiful "+style+" style interior design, photorealistic, keep original room layout"

const response = await fetch(
"https://api.replicate.com/v1/predictions",
{
method:"POST",
headers:{
"Authorization":`Token ${token}`,
"Content-Type":"application/json",
"Prefer":"wait"
},
body:JSON.stringify({

version:"db21e45caa7c57c3b5c7c7b69c8b1eab2b2f6c6f1a0d9c9a8b4e6c5d3c8f6f3e",

input:{
image:image,
prompt:prompt,
prompt_strength:0.8,
num_outputs:1
}

})
}
)

const data = await response.json()

if(!data.output){
return res.status(500).json({error:"AI generation failed"})
}

return res.status(200).json({
output:data.output
})

}catch(err){

return res.status(500).json({
error:err.message
})

}

}
