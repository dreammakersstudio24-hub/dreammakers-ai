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
"db21e45c8e0a8e9b1fbe8c0d5857a1f5aaecf66da68c249c090e28ca06e4756a",

input: {
image: image,
prompt: prompt
}

})
}
)

const data = await response.json()

console.log("Replicate:", data)

if (!data.output) {
return res.status(500).json({ error: "AI generation failed" })
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
