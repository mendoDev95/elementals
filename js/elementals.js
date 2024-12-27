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

let elementals = []
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
    constructor (nombre, foto, cssSelector, cssBtn, fotoMapa) {
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

let hipodogeEnemigo = new Elemental ("Hipodoge", "./assets/mokepon_hipodoge.png", "selectorMascotaHipodoge", "hipo", "./assets/hipodoge.png")
let capipepoEnemigo = new Elemental ("Capipepo", "./assets/mokepon_capipepo.png", "selectorMascotaCapipepo", "capi", "./assets/capipepo.png")
let ratigueyaEnemigo = new Elemental ("Ratigueya", "./assets/mokepon_ratigueya.png", "selectorMascotaRatigueya", "rati", "./assets/ratigueya.png")
let pydosEnemigo = new Elemental ("Pydos", "./assets/mokepon_pydos.png", "selectorMascotaPydos", "pydo", "./assets/mokepon_pydos.png")
let tucapalmaEnemigo = new Elemental ("Tucapalma", "./assets/mokepon_tucapalma.png", "selectorMascotaTucapalma", "tuca", "./assets/mokepon_tucapalma.png")
let langostelvisEnemigo = new Elemental ("Langostelvis", "./assets/mokepon_langostelvis.png", "selectorMascotaLangostelvis", "lango", "./assets/mokepon_langostelvis.png")

hipodoge.ataques.push( 
    { nombre: "💧", id: "btnAgua" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🔥", id: "btnFuego" },
)
hipodogeEnemigo.ataques.push( 
    { nombre: "💧", id: "btnAgua" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🔥", id: "btnFuego" },
)
capipepo.ataques.push( 
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "🔥", id: "btnFuego" },
)
capipepoEnemigo.ataques.push( 
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "🔥", id: "btnFuego" },
)
ratigueya.ataques.push( 
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "💧", id: "btnAgua" },
)
ratigueyaEnemigo.ataques.push( 
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "💧", id: "btnAgua" },
)
pydos.ataques.push(
    { nombre: "💧", id: "btnAgua" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🔥", id: "btnFuego" },
)
tucapalma.ataques.push(
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🔥", id: "btnFuego" },
)
langostelvis.ataques.push(
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🔥", id: "btnFuego" },
    { nombre: "🌱", id: "btnPlanta" },
    { nombre: "💧", id: "btnAgua" },
    { nombre: "💧", id: "btnAgua" },
)

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
}

function aleatorio(min, max) {
    return Math.floor( Math.random() * (max - min + 1) + min)
}

//Seccion de seleccion de mascotas jugador y enemigo
function seleccionarMascotaJugador(){
    stnSeleccionarMascota.style.display = "none"

    //para validacion, posible arreglos!!!!!
    if ( !(inputHipodoge.checked) && !(inputCapipepo.checked) && !(inputRatigueya.checked) && !(inputPydos.checked) && !(inputTucapalma.checked) && !(inputLangostelvis.checked)){
        alert("Marca un Elemental primero 😅")
        location.reload()
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
    
    extraerAtaques(mascotaJugador)
}

function seleccionarMascotaEnemigo(enemigo){

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    imgEnemigo.src = enemigo.foto
    ataquesElementalEnemigo = enemigo.ataques
    console.log(enemigo.ataques)
    secuenciaAtaque() 
    
    // let seleccionEnemigo = aleatorio(0, elementals.length -1)

    // spanMascotaEnemigo.innerHTML = elementals[seleccionEnemigo].nombre
    // imgEnemigo.src = elementals[seleccionEnemigo].foto
    // ataquesElementalEnemigo = elementals[seleccionEnemigo].ataques
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
        // secuenciaAtaque()
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
                ataqueAletorioEnemigo()
            })
        })
    }


//seleccion aleatoria enemiga de ataques

function ataqueAletorioEnemigo(){

    ataquesElementalEnemigo.sort(()=>Math.random()-0.5)
    ataqueSeleccionadoEnemigo.push(ataquesElementalEnemigo[0].nombre)
    ataquesElementalEnemigo.shift()

    console.log(ataqueSeleccionadoEnemigo, ataquesElementalEnemigo)

    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length == 5) {
        combate()        
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueSeleccionadoEnemigo[enemigo]
}
//Combate
function combate()
{
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

//funcion revisar victorias para darle fin al combate
function revisarVictoria(){
    if(victoriaJugador == victoriaEnemigo){
        crearMensajeFinal("Empataron el combate, vaya ninjada 🐱‍👤🐱‍💻🐱‍🐉🐱‍👓🐱‍🚀")
    } else if(victoriaJugador > victoriaEnemigo){
        crearMensajeFinal("FELICITACIONES!! Ganaste el Combate 🎉👏😎🐱‍🏍")
    } else {
        crearMensajeFinal("Lo siento, Perdiste el Combate 😢🐱‍🏍")
    }
}

//creacion de mensajes de combate
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

//creacion del mensaje final
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
    hipodogeEnemigo.pintarElemental()
    capipepoEnemigo.pintarElemental()
    ratigueyaEnemigo.pintarElemental()

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
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
    stnSeleccionarAtaque.style.display = "flex"
    stnInfoJugadores.style.display = "grid"
    stnMensajes.style.display = "flex"
    stnVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}
// Eventos
//evento de carga de DOM antes de iniciar nuestro codigo
window.addEventListener('load', iniciarJuego)