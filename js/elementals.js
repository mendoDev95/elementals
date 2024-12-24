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
let opcionElementals
let ataquesElemental
let ataquesElementalEnemigo
let btnFuego
let btnAgua
let btnPlanta
let victoriaJugador = 0
let victoriaEnemigo = 0
let lienzo = mapa.getContext("2d")

class Elemental {
    constructor (nombre, foto, cssSelector, cssBtn) {
        this.nombre = nombre
        this.foto = foto
        this.cssSelector = cssSelector
        this.cssBtn = cssBtn
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
    }
}

let hipodoge = new Elemental ("Hipodoge", "./assest/mokepon_hipodoge.png", "selectorMascotaHipodoge", "hipo")
let capipepo = new Elemental ("Capipepo", "./assest/mokepon_capipepo.png", "selectorMascotaCapipepo", "capi")
let ratigueya = new Elemental ("Ratigueya", "./assest/mokepon_ratigueya.png", "selectorMascotaRatigueya", "rati")
let pydos = new Elemental ("Pydos", "./assest/mokepon_pydos.png", "selectorMascotaPydos", "pydo")
let tucapalma = new Elemental ("Tucapalma", "./assest/mokepon_tucapalma.png", "selectorMascotaTucapalma", "tuca")
let langostelvis = new Elemental ("Langostelvis", "./assest/mokepon_langostelvis.png", "selectorMascotaLangostelvis", "lango")

hipodoge.ataques.push( 
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
ratigueya.ataques.push( 
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
    stnSeleccionarAtaque.style.display = "none"
    stnInfoJugadores.style.display = "none"

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
    
    seleccionarMascotaEnemigo()
    extraerAtaques(mascotaJugador)
}

function seleccionarMascotaEnemigo(){
    let seleccionEnemigo = aleatorio(0, elementals.length -1)

    spanMascotaEnemigo.innerHTML = elementals[seleccionEnemigo].nombre
    imgEnemigo.src = elementals[seleccionEnemigo].foto
    ataquesElementalEnemigo = elementals[seleccionEnemigo].ataques
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

        stnMensajes.style.display = "none"
        stnVerMapa.style.display = "flex"

        secuenciaAtaque()
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
    let ataqueAleatorio = aleatorio(0, ataquesElementalEnemigo.length -1)
    let ataque = ataquesElementalEnemigo[ataqueAleatorio].nombre
    ataquesElementalEnemigo.splice(ataqueAleatorio, 1)

    if (ataque == "🔥") {
        ataqueEnemigo.push("🔥")
    } else if (ataque == "💧") {
        ataqueEnemigo.push("💧")
    } else {
        ataqueEnemigo.push("🌱")
    }
            console.log(ataqueEnemigo)

    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length == 5) {
        combate()        
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
//Combate
function combate()
{
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] == ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE 🐱‍👤")
        } else if((ataqueJugador[index] == "🔥" && ataqueEnemigo[index] == "🌱") || (ataqueJugador[index] == "🌱" && ataqueEnemigo[index] == "💧") || (ataqueJugador[index] == "💧" && ataqueEnemigo[index] == "🔥"))  {
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

    stnReiniciar.style.display = "block"
    btnReiniciar.addEventListener("click", reiniciarJuego)
}

function reiniciarJuego(){
    location.reload()
}

function pintarPersonaje() {
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        ratigueya.mapaFoto,
        ratigueya.x,
        ratigueya.y,
        ratigueya.ancho,
        ratigueya.alto
    )
    
}

function moverRatigueyaArriba() {
    ratigueya.y = ratigueya.y - 5
    pintarPersonaje()
}
function moverRatigueyaDerecha() {
    ratigueya.x = ratigueya.x + 5
    pintarPersonaje()
}
function moverRatigueyaIzquierda() {
    ratigueya.x = ratigueya.x - 5
    pintarPersonaje()
}
function moverRatigueyaAbajo() {
    ratigueya.y = ratigueya.y + 5
    pintarPersonaje()
}

// Eventos
//evento de carga de DOM antes de iniciar nuestro codigo
window.addEventListener('load', iniciarJuego)