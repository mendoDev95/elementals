// Declaracion de Variables globales, Clases, Objetos y Arreglos
const stnSeleccionarMascota = document.getElementById("seleccionarMascota")
const btnMascotaJugador = document.getElementById("btnMascota")
const stnSeleccionarAtaque = document.getElementById("seleccionarAtaque")
const stnInfoJugadores = document.getElementById("infoJugadores")
const stnReiniciar = document.getElementById("reiniciar")
const btnReiniciar = document.getElementById("btnReiniciar")
const stnMensajes = document.getElementById("mensajes")
const sectionMensajes = document.getElementById("resultado")

const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")
const imgJugador = document.getElementById("imgJugador")
const imgEnemigo = document.getElementById("imgEnemigo")
const spanMascotaJugador = document.getElementById("mascotaJugador")
const spanMascotaEnemigo = document.getElementById("mascotaEnemigo")
const spanVidaJugador = document.getElementById("vidaJugador")
const spanVidaEnemigo = document.getElementById("vidaEnemigo")

const stnVerMapa = document.getElementById("verMapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let elementals = []
let elementalsEnemigos = []
let botones = []
let ataqueJugador = []
let ataqueEnemigo = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let inputHipodoge 
let inputCapipepo 
let inputRatigueya
let inputPydos
let inputTucapalma
let inputLangostelvis
let mascotaJugador
let mascotaJugadorObjeto
let opcionElementals
let ataquesElemental
let ataquesElementalEnemigo
let ataqueSeleccionadoEnemigo = []
let btnFuego
let btnAgua
let btnPlanta
let victoriaJugador = 0
let victoriaEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let alturaDeseada
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 460

if ( anchoDelMapa > anchoMaximoMapa) {
    anchoDelMapa = anchoMaximoMapa
}

alturaDeseada = anchoDelMapa * 3 / 4

mapa.width = anchoDelMapa
mapa.height = alturaDeseada

class Elemental {
    constructor (nombre, foto, cssSelector, cssBtn, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.cssSelector = cssSelector
        this.cssBtn = cssBtn
        this.ataques = []
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio( 0, mapa.width - this.ancho)
        this.y = aleatorio( 0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarElemental() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Elemental ("Hipodoge", "./assets/mokepon_hipodoge.png", "selectorMascotaHipodoge", "hipo", "./assets/hipodoge.png")
let capipepo = new Elemental ("Capipepo", "./assets/mokepon_capipepo.png", "selectorMascotaCapipepo", "capi", "./assets/capipepo.png")
let ratigueya = new Elemental ("Ratigueya", "./assets/mokepon_ratigueya.png", "selectorMascotaRatigueya", "rati", "./assets/ratigueya.png")
let pydos = new Elemental ("Pydos", "./assets/mokepon_pydos.png", "selectorMascotaPydos", "pydo", "./assets/mokepon_pydos.png")
let tucapalma = new Elemental ("Tucapalma", "./assets/mokepon_tucapalma.png", "selectorMascotaTucapalma", "tuca", "./assets/mokepon_tucapalma.png")
let langostelvis = new Elemental ("Langostelvis", "./assets/mokepon_langostelvis.png", "selectorMascotaLangostelvis", "lango", "./assets/mokepon_langostelvis.png")

const HIPODOGE_ATAQUES = [
    { nombre: "💧", id: "btnAgua" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🔥", id: "btnFuego" },
]
hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "🔥", id: "btnFuego" },
]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "💧", id: "btnAgua" },
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

const PYDOS_ATAQUES = [
    { nombre: "💧", id: "btnAgua" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🔥", id: "btnFuego" },
]
pydos.ataques.push(...PYDOS_ATAQUES)

const TUCAPALMA_ATAQUES = [
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🔥", id: "btnFuego" },
]
tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

const LANGSOTELVIS_ATAQUES = [
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "💧", id: "btnAgua" },
]
langostelvis.ataques.push(...LANGSOTELVIS_ATAQUES)

elementals.push(hipodoge, pydos, tucapalma, capipepo, ratigueya, langostelvis)

//Inicio de la logica
function iniciarJuego(){
    stnSeleccionarAtaque.style.display = "none"
    stnInfoJugadores.style.display = "none"
    stnReiniciar.style.display = "none"
    stnMensajes.style.display = "none"
    stnVerMapa.style.display = "none"

    elementals.forEach((elemental) => {
        opcionElementals = `
        <input name="mascota" type="radio" id=${elemental.nombre} />
                <label class=${elemental.cssSelector} for=${elemental.nombre}>
                    <p class=${elemental.cssBtn}>${elemental.nombre}</p>
                    <img src=${elemental.foto} alt=${elemental.nombre}>
                </label>
        `
        contenedorTarjetas.innerHTML += opcionElementals
        
    inputHipodoge = document.getElementById("Hipodoge")
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")
    inputPydos = document.getElementById("Pydos")
    inputTucapalma = document.getElementById("Tucapalma")
    inputLangostelvis = document.getElementById("Langostelvis")

    })

    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    unirseAlJuego()
}

// Peticion al servidor para generar un id unico para el jugador
function unirseAlJuego() {
    fetch("http://192.168.1.101:8080/unirse")
        .then(function(res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
                }
        })
}

function aleatorio(min, max) {
    return Math.floor( Math.random() * (max - min + 1) + min)
}

//Seccion de seleccion de mascotas jugador y enemigo
function seleccionarMascotaJugador(){
    //para validacion, posible arreglos!!!!!
    if ( !(inputHipodoge.checked) && !(inputCapipepo.checked) && !(inputRatigueya.checked) && !(inputPydos.checked) && !(inputTucapalma.checked) && !(inputLangostelvis.checked)){
        alert("Marca un Elemental primero 😅")
        return
    }
    else if (inputHipodoge.checked){
            spanMascotaJugador.innerHTML = inputHipodoge.id
            imgJugador.src = hipodoge.foto
            mascotaJugador = inputHipodoge.id
        }
    else if (inputCapipepo.checked){
            spanMascotaJugador.innerHTML = inputCapipepo.id
            imgJugador.src = capipepo.foto
            mascotaJugador = inputCapipepo.id
    }
    else if (inputRatigueya.checked){
            spanMascotaJugador.innerHTML = inputRatigueya.id
            imgJugador.src = ratigueya.foto
            mascotaJugador = inputRatigueya.id
    }
    else if (inputPydos.checked){
            spanMascotaJugador.innerHTML = inputPydos.id
            imgJugador.src = pydos.foto
            mascotaJugador = inputPydos.id
    }
    else if (inputTucapalma.checked){
            spanMascotaJugador.innerHTML = inputTucapalma.id
            imgJugador.src = tucapalma.foto
            mascotaJugador = inputTucapalma.id
    }
    else if (inputLangostelvis.checked){
            spanMascotaJugador.innerHTML = inputLangostelvis.id
            imgJugador.src = langostelvis.foto
            mascotaJugador = inputLangostelvis.id
    }

    stnSeleccionarMascota.style.display = "none"
    
    seleccionarElemental(mascotaJugador)
    extraerAtaques(mascotaJugador)
}

function seleccionarElemental(mascotaJugador) {
    fetch(`http://192.168.1.101:8080/elementals/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            elemental: mascotaJugador
        })
    })
}

//Sistema de Ataques
function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < elementals.length; i++) {
        if (mascotaJugador == elementals[i].nombre) {
            ataques = elementals[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

    function mostrarAtaques(ataques){
        ataques.forEach((ataque) => {
            ataquesElemental = `
            <button id=${ataque.id} class="btnAtaque bAtaque">${ataque.nombre}</button>
            `
            contenedorAtaques.innerHTML += ataquesElemental 
        })

        btnFuego = document.getElementById("btnFuego")
        btnAgua = document.getElementById("btnAgua")
        btnPlanta = document.getElementById("btnPlanta")

        botones = document.querySelectorAll(".bAtaque")

        stnVerMapa.style.display = "flex"
        stnReiniciar.style.display = "block"
        btnReiniciar.addEventListener("click", reiniciarJuego)

        iniciarMapa()
    }
    
    //Eventos de click dinamicos
    function secuenciaAtaque() {
        botones.forEach((boton) => {
            boton.addEventListener("click", (e) => {
                if (e.target.lastChild.textContent == "🔥"){
                    ataqueJugador.push("🔥")
                    console.log(ataqueJugador)
                    boton.style.background = "#112f58"
                    boton.disabled = true
                }   else if (e.target.lastChild.textContent == "💧"){
                    ataqueJugador.push("💧")
                    console.log(ataqueJugador)
                    boton.style.background = "#112f58"
                    boton.disabled = true
                }   else {
                    ataqueJugador.push("🌱")
                    console.log(ataqueJugador)
                    boton.style.background = "#112f58"
                    boton.disabled = true
                }
                if (ataqueJugador.length === 5) {
                    enviarAtaques()
                }    
            })
        })
    }

    function enviarAtaques() {
        fetch(`http://192.168.1.101:8080/elementals/${jugadorId}/ataques`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ataques: ataqueJugador
            })
        })

        intervalo = setInterval(obtenerAtaques, 100)
    }

    function obtenerAtaques() {
        fetch(`http://192.168.1.101:8080/elementals/${enemigoId}/ataques`)
            .then(function(res) {
                if (res.ok) {
                    res.json()
                        .then(function({ ataques }) {
                            if(ataques.length === 5) {
                                ataqueEnemigo = ataques
                                ataqueSeleccionadoEnemigo.push(...ataques)
                                combate()
                            }
                        })
                }
            })
    }

    function seleccionarMascotaEnemigo(enemigo){
        spanMascotaEnemigo.innerHTML = enemigo.nombre
        imgEnemigo.src = enemigo.foto
        ataquesElementalEnemigo = enemigo.ataques
        console.log(enemigo.ataques)
        secuenciaAtaque() 
    }

function iniciarCombate() {
    if (ataqueJugador.length == 5) {
        combate()        
    }
}

// Extraer datos para mostrar luego
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueSeleccionadoEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] == ataqueSeleccionadoEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE 🐱‍👤")
        } else if((ataqueJugador[index] == "🔥" && ataqueSeleccionadoEnemigo[index] == "🌱") || (ataqueJugador[index] == "🌱" && ataqueSeleccionadoEnemigo[index] == "💧") || (ataqueJugador[index] == "💧" && ataqueSeleccionadoEnemigo[index] == "🔥"))  {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE ✨🏆✨")
            victoriaJugador++
            spanVidaJugador.innerHTML = victoriaJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE 🤷‍♀️🤷‍♂️")
            victoriaEnemigo++
            spanVidaEnemigo.innerHTML = victoriaEnemigo
        }
    }

    revisarVictoria()
}

//Para darle fin al combate
function revisarVictoria(){
    if(victoriaJugador == victoriaEnemigo){
        crearMensajeFinal("Empataron el combate, vaya ninjada 🐱‍👤🐱‍💻🐱‍🐉🐱‍👓🐱‍🚀")
    } else if(victoriaJugador > victoriaEnemigo){
        crearMensajeFinal("FELICITACIONES!! Ganaste el Combate 🎉👏😎🐱‍🏍")
    } else {
        crearMensajeFinal("Lo siento, Perdiste el Combate 😢🐱‍🏍")
    }
}

//Mensajes de combate
function crearMensaje(resultado){
    let ataqueDelJugador = document.getElementById("ataqueDelJugador")
    let ataqueDelEnemigo = document.getElementById("ataqueDelEnemigo")
    
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo  
    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
}

function reiniciarJuego(){
    location.reload()
}

// Logica de Mapa
function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarElemental()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    elementalsEnemigos.forEach(function(elemental) {
        elemental.pintarElemental()
        revisarColision(elemental)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.101:8080/elementals/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res) {
        if(res.ok) {
            res.json()
                .then(function({ enemigos }) {
                    console.log(enemigos)
                    elementalsEnemigos = enemigos.map(function(enemigo) {
                        let elementalEnemigo = null
                        const elementalNombre = enemigo.elemental.nombre || ""
                        if (enemigo.elemental != undefined) {
                            if (elementalNombre === "Hipodoge") {
                                elementalEnemigo = new Elemental ("Hipodoge", "./assets/mokepon_hipodoge.png", "selectorMascotaHipodoge", "hipo", "./assets/hipodoge.png", enemigo.id)
                            }   else if (elementalNombre === "Capipepo") {
                                elementalEnemigo = new Elemental ("Capipepo", "./assets/mokepon_capipepo.png", "selectorMascotaCapipepo", "capi", "./assets/capipepo.png", enemigo.id)
                            }   else if (elementalNombre === "Ratigueya") {
                                elementalEnemigo = new Elemental ("Ratigueya", "./assets/mokepon_ratigueya.png", "selectorMascotaRatigueya", "rati", "./assets/ratigueya.png", enemigo.id)
                            }   else if (elementalNombre === "Pydos") {
                                elementalEnemigo = new Elemental ("Pydos", "./assets/mokepon_pydos.png", "selectorMascotaPydos", "pydo", "./assets/mokepon_pydos.png", enemigo.id)
                            }   else if (elementalNombre === "Tucapalma") {
                                elementalEnemigo = new Elemental ("Tucapalma", "./assets/mokepon_tucapalma.png", "selectorMascotaTucapalma", "tuca", "./assets/mokepon_tucapalma.png", enemigo.id)
                            }   else if (elementalNombre === "Langostelvis") {
                                elementalEnemigo = new Elemental ("Langostelvis", "./assets/mokepon_langostelvis.png", "selectorMascotaLangostelvis", "lango", "./assets/mokepon_langostelvis.png", enemigo.id)
                            }

                            elementalEnemigo.x = enemigo.x
                            elementalEnemigo.y = enemigo.y

                            return elementalEnemigo
                        }
                    })
                })
        }
    })
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function press(event){

    console.log(event.key)

    switch (event.key) {
        case "ArrowUp" :
        case "w" :
            moverArriba()      
            break

        case "ArrowDown" :
        case "s" :
            moverAbajo()
            break

        case "ArrowRight" :
        case "d" :
            moverDerecha()
            break

        case "ArrowLeft" :
        case "a" :
            moverIzquierda()
            break

        default:
            break
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerMascota(mascotaJugador)
    intervalo = setInterval( pintarCanvas, 50)

    window.addEventListener("keydown", press)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerMascota() {
    for (let i = 0; i < elementals.length; i++) {
        if (mascotaJugador == elementals[i].nombre) {
            return elementals[i]
        }
    }
}

function revisarColision(enemigo){

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho
    
    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = 
        mascotaJugadorObjeto.x
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) { 
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id

    stnSeleccionarAtaque.style.display = "flex"
    stnInfoJugadores.style.display = "grid"
    stnMensajes.style.display = "flex"
    stnVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}

//evento de carga de DOM antes de iniciar nuestro codigo
window.addEventListener('load', iniciarJuego)