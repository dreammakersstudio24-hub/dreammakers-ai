export default async function handler(req, res) {

const token = process.env.REPLICATE_API_TOKEN

const { image, style } = req.body

const response = await fetch("https://api.replicate.com/v1/predictions", {
method: "POST",
headers: {
"Authorization": `Token ${token}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
version: "ac732df83cea7fff8e4a3ff6e4fbe0c9d0c6b6d70f6a1e7b2e6f9c6e5c1f2b34",
input: {
image: image,
prompt: `${style} interior design`
}
})
})

const data = await response.json()

res.status(200).json(data)

}
