export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"})
}

try{

const token = process.env.REPLICATE_API_TOKEN
const {image,style} = req.body

const prompt =
"A beautiful "+style+" style interior design, keep same room layout, same window position, photorealistic, professional architecture photo"

const start = await fetch(
"https://api.replicate.com/v1/predictions",
{
method:"POST",
headers:{
"Authorization":`Token ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({

version:"flux-kontext-pro",

input:{
image:image,
prompt:prompt,
aspect_ratio:"9:16",
output_format:"png"
}

})
}
)

const prediction = await start.json()

const getUrl =
`https://api.replicate.com/v1/predictions/${prediction.id}`

let status = prediction.status
let output = null

while(status !== "succeeded" && status !== "failed"){

await new Promise(r=>setTimeout(r,1500))

const poll = await fetch(getUrl,{
headers:{
Authorization:`Token ${token}`
}
})

const data = await poll.json()

status = data.status
output = data.output

}

if(status === "failed"){
return res.status(500).json({error:"AI failed"})
}

return res.status(200).json({output})

}catch(err){

return res.status(500).json({error:err.message})

}

}
