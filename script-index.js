let btnCom = document.querySelector('#btn-comecar')
let campoPeso = document.querySelector('#campo-peso')
let campoRecipiente = document.querySelector('#campo-recip-ml')

let parte1 = document.querySelector('.parte1')
let parte2 = document.querySelector('.parte2')
var checkbox = document.querySelector('#checkbox')

var LOAD = document.querySelector('.prog-container') //Barra de loading

//Botão começar
btnCom.addEventListener('click', () => {
    let peso = Number(campoPeso.value)
    let recipiente = Number(campoRecipiente.value)
    if (campoPeso.value.length == 0 || campoRecipiente.value.length == 0) {
        alert('* Preencha os campos.')
        campoPeso.focus()
    } else {
        parte1.style.display = 'none'
        parte2.style.display = 'block'

        let litrosDia = peso*35
        let qntdRecipiente = (litrosDia/recipiente)
        let txtInfo = document.querySelector('#text-info-recip')
        txtInfo.innerHTML = `A quantidade de água ideal para seu peso é de ${(litrosDia/1000).toFixed(1).replace('.',',')} litros por dia. Com uma garrafa de ${recipiente}ml, você precisaria tomar  ${qntdRecipiente.toFixed(1).replace('.',',')} garrafas.`
        
        checkbox.innerHTML = ''
        var elementos = []
        for (x=0; x < qntdRecipiente; x++) { //Laço de criação dos boxes
            var box = document.createElement('p')
            box.classList.add('box-style')
            box.innerHTML = `${x+1}ª Garrafa`
            //box.setAttribute('id', `box${x+1}`)
            elementos.push(box)
            checkbox.appendChild(box)

            box.addEventListener('click', (e) => {
                e.target.classList.toggle('box-marcado') //Marcação dos boxes
                
                //Progress bar
                let barra = document.querySelector('.prog-bar')
                let numProg = document.querySelector('#porcent-number')
                let progress = 100/(elementos.length)

                var numMarcados = document.querySelectorAll('.box-marcado').length

                if (numMarcados == 0) {
                    barra.style.transition = '1s'
                    barra.style.width = `10%`
                    numProg.innerHTML = `0%`
                } else {
                    barra.style.transition = '1s'
                    barra.style.width = `${numMarcados*progress}%`
                    numProg.innerHTML = `${(numMarcados*progress).toFixed(0)}%`
                }

            })
        }

        LOAD.classList.add('animation') //Colocar barra de loading
    }
})

//Botão recomeçar
let btnRecom = document.querySelector('#btn-recomecar')

btnRecom.addEventListener('click', () => {
    parte2.style.display = 'none'
    parte1.style.display = 'block'

    campoPeso.value = ''
    campoRecipiente.value = ''

    LOAD.classList.remove('animation') //Remover barra de loading

    campoPeso.focus()
})

window.onload = () => {
    campoPeso.focus()
}