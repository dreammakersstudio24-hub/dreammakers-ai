export default async function handler(req, res) {

try {

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
version:"15a3689c7b4d3e3f9c5a16e9c5d2c65e6a85ee661eb5d286276f4e5a3815014a",
input:{
init_image:image,
prompt:prompt,
strength:0.65,
num_outputs:1
}
})
}
)

const data = await response.json()

if(!data.output){
return res.status(500).json({
error:"AI generation failed"
})
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
