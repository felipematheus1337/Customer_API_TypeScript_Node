import app from "./app";

const port = process.env.PORT || 3002;



app.listen(port,() => {
    console.log(`Servidor executado rodando na porta: ${port}`)
})