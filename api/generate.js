export default async function handler(req,res){

try{

const replicateToken = process.env.REPLICATE_API_TOKEN

const { image, style } = req.body

const prompt =
"Interior redesign of this room in "+style+" style, ultra realistic, interior design photography"

const prediction = await fetch(
"https://api.replicate.com/v1/predictions",
{
method:"POST",
headers:{
"Authorization":`Token ${replicateToken}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
version:"7762fd07cf82c5a453c33dfd59f7f8c3cecb84ccf0c5d7f82e3d7b66c9b1a87a",
input:{
image:image,
prompt:prompt
}
})
}
)

const data = await prediction.json()

if(!data.urls || !data.urls.get){
return res.status(500).json({error:"Replicate response invalid"})
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

if(pollData.status === "succeeded"){

return res.status(200).json({
output: pollData.output
})

}

if(pollData.status === "failed"){

return res.status(500).json({
error:"AI generation failed"
})

}

}

}catch(err){

console.log(err)

return res.status(500).json({
error:err.message
})

}

}
