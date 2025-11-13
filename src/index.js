import express from "express";

const app = express()

app.get('/', (req, res) => {
  return res.status(200).json({
    message: "Todo API está rodando!",
    version: "1.0.0"
  });
})

app.listen(3000)