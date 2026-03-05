export default async function handler(req,res){

try{

const replicateToken = process.env.REPLICATE_API_TOKEN

const { image, style } = req.body

const prompt =
"Interior redesign of this room in "+style+" style, ultra realistic interior design, photorealistic"

const start = await fetch(
"https://api.replicate.com/v1/predictions",
{
method:"POST",
headers:{
"Authorization":`Token ${replicateToken}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
version:"ac732df83cea7fff2b5d6b2f1c7f0e52ffb4058a52c57d205c3bd6c0e0c4f52c",
input:{
image:image,
prompt:prompt
}
})
}
)

const prediction = await start.json()

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

const data = await poll.json()

status = data.status
output = data.output

}

if(status === "failed"){
return res.status(500).json({error:"AI failed"})
}

return res.status(200).json({
output:output
})

}catch(err){

console.log(err)

return res.status(500).json({
error:err.message
})

}

}
