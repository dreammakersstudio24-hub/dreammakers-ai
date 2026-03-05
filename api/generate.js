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
    model: "stability-ai/sdxl",
    input: {
      image: image,
      prompt: `${style} interior design`
    }
  })
})

const data = await response.json()

res.status(200).json(data)

}
