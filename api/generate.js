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
      version: "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
      input: {
        image: image,
        prompt: `${style} interior design, beautiful living room, photorealistic`
      }
    })
  })

  const data = await response.json()

  res.status(200).json(data)

}
