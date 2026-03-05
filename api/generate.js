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
version: "db21e45d3f95c1d7f6e1c30e5a52f2e4e8c5e9e7f1b1b9f6f6e3f2f8d2e3c1f2",
input: {
image: image,
prompt: `${style} interior design`
}
})
})

const data = await response.json()

res.status(200).json(data)

}
