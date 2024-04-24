import express from "express"
import fetch from "node-fetch"
import cors from "cors"

const app = express()
const PORT = 3000
const API_KEY = "29b6171ede0eea7146326b7e99089f8694d8f027"

app.use(cors()) // This will enable CORS for all routes and origins.
app.use(express.json())

app.get("/frete", async (req, res) => {
  const { cepOrigem, cepDestino, peso, altura, largura, comprimento } =
    req.query
  const url = `https://www.cepcerto.com/ws/json-frete/${cepOrigem}/${cepDestino}/${peso}/${altura}/${largura}/${comprimento}/${API_KEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch data from cepcerto.com")
    }
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
