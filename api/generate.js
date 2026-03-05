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
      version: "7762fd07cf82c55e6d6d9a2b2b3e4a5f8e7c2b1d9f0a3c4e5d6f7a8b9c0d1e2",
      input: {
        image: image,
        prompt: `${style} interior design, beautiful living room, photorealistic`
      }
    })
  })

  const data = await response.json()

  res.status(200).json(data)

}
