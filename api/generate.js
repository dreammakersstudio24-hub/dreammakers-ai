export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" })
}

try {

const token = process.env.REPLICATE_API_TOKEN
const { image, style } = req.body

const prompt =
"beautiful " + style + " interior design, photorealistic"

const response = await fetch(
"https://api.replicate.com/v1/predictions",
{
method: "POST",
headers: {
Authorization: `Token ${token}`,
"Content-Type": "application/json",
Prefer: "wait"
},
body: JSON.stringify({

version:
"ac732df83cea7fff1cf3f0e3c5a6d2a45c7c1d24b3a91a6b1e0c9c45f1ab3c5e",

input: {
image: image,
prompt: prompt,
strength: 0.65
}

})
}
)

const data = await response.json()

console.log("Replicate:", data)

if (!data.output) {

return res.status(500).json({
error: "AI generation failed",
details: data
})

}

return res.status(200).json({
output: data.output
})

} catch (error) {

console.error(error)

return res.status(500).json({
error: "System error"
})

}

}
