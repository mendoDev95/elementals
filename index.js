const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
	constructor(id){
		this.id = id
	}

	asignarElemental(elemental) {
		this.elemental = elemental
	}

	actualizarPosicion(x, y) {
		this.x = x
		this.y = y
	}
}

class Elemental {
	constructor(nombre) {
		this.nombre = nombre
	}
}

app.get("/unirse", (req, res) => {
	const id = `${Math.random()}`

	const jugador = new Jugador(id)

	jugadores.push(jugador)

	res.setHeader("Access-Control-Allow-Origin" , "*")

	res.send(id)
})

app.post("/elementals/:jugadorId", (req, res) => {
	const jugadorId = req.params.jugadorId || ""
	const nombre = req.body.elemental || ""
	const elemental = new Elemental(nombre)

	const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

	if (jugadorIndex >= 0 ) {
		jugadores[jugadorIndex].asignarElemental(elemental)	
	}

	console.log(jugadores)
	console.log(jugadorId)
	res.end()
})

app.post("/elementals/:jugadorId/posicion", (req, res) => {
	const jugadorId = req.params.jugadorId || ""
	const x = req.body.x || 0
	const y = req.body.y || 0

	const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

	if (jugadorIndex >= 0 ) {
		jugadores[jugadorIndex].actualizarPosicion(x, y)
	}

	const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

	res.send({
		enemigos
	})
})

app.listen("8080", () => {
	console.log("Servidor funcionando")
})