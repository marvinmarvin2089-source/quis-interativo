const perguntas = {

programacao:[

{
pergunta:"O que significa HTML?",
opcoes:[
"Hyper Text Markup Language",
"High Text Machine Language",
"Hyper Tool Multi Language",
"Home Tool Markup Language"
],
resposta:0
},

{
pergunta:"Qual linguagem estiliza páginas?",
opcoes:["HTML","CSS","Python","Java"],
resposta:1
},

{
pergunta:"Qual linguagem roda no navegador?",
opcoes:["Python","JavaScript","C++","Java"],
resposta:1
},

{
pergunta:"Qual tag cria um link?",
opcoes:["<p>","<a>","<div>","<h1>"],
resposta:1
},

{
pergunta:"Qual método adiciona item no final do array?",
opcoes:["push()","pop()","shift()","map()"],
resposta:0
}

],

historia:[

{
pergunta:"Quem descobriu o Brasil?",
opcoes:[
"Pedro Álvares Cabral",
"Cristóvão Colombo",
"Dom Pedro I",
"Getúlio Vargas"
],
resposta:0
},

{
pergunta:"Em que ano começou a Segunda Guerra Mundial?",
opcoes:["1939","1914","1945","1929"],
resposta:0
},

{
pergunta:"Quem foi o primeiro presidente do Brasil?",
opcoes:[
"Deodoro da Fonseca",
"Getúlio Vargas",
"Juscelino Kubitschek",
"Dom Pedro II"
],
resposta:0
}

],

ciencia:[

{
pergunta:"Qual planeta é conhecido como planeta vermelho?",
opcoes:[
"Terra",
"Marte",
"Júpiter",
"Saturno"
],
resposta:1
},

{
pergunta:"Qual é o maior planeta do sistema solar?",
opcoes:[
"Marte",
"Terra",
"Júpiter",
"Saturno"
],
resposta:2
},

{
pergunta:"Qual gás respiramos?",
opcoes:[
"Hidrogênio",
"Oxigênio",
"Nitrogênio",
"Hélio"
],
resposta:1
}

]

}

let categoriaAtual="programacao"
let perguntaAtual=0
let pontuacao=0
let respondeu=false
let tempo=15
let intervalo

const perguntaElemento=document.getElementById("pergunta")
const opcoesElemento=document.getElementById("opcoes")
const resultado=document.getElementById("resultado")
const timerElemento=document.getElementById("timer")
const progressBar=document.getElementById("progress-bar")
const reiniciar=document.getElementById("reiniciar")

function iniciarTimer(){

tempo=15
timerElemento.innerText="Tempo: "+tempo

intervalo=setInterval(()=>{

tempo--
timerElemento.innerText="Tempo: "+tempo

if(tempo===0){

clearInterval(intervalo)
resultado.innerText="⏱ Tempo esgotado!"
respondeu=true

}

},1000)

}

function atualizarBarra(){

const total=perguntas[categoriaAtual].length
const progresso=(perguntaAtual/total)*100

progressBar.style.width=progresso+"%"

}

function carregarPergunta(){

clearInterval(intervalo)
respondeu=false

const perguntaObj=perguntas[categoriaAtual][perguntaAtual]

perguntaElemento.innerText=perguntaObj.pergunta

opcoesElemento.innerHTML=""
resultado.innerText=""

perguntaObj.opcoes.forEach((opcao,index)=>{

const botao=document.createElement("button")

botao.innerText=opcao
botao.classList.add("opcao")

botao.onclick=()=>verificarResposta(index,botao)

opcoesElemento.appendChild(botao)

})

iniciarTimer()
atualizarBarra()

}

function verificarResposta(index,botao){

if(respondeu) return

respondeu=true
clearInterval(intervalo)

const perguntaObj=perguntas[categoriaAtual][perguntaAtual]

const botoes=document.querySelectorAll(".opcao")

botoes.forEach((btn,i)=>{

if(i===perguntaObj.resposta){
btn.classList.add("correct")
}

})

if(index===perguntaObj.resposta){

resultado.innerText="✅ Resposta correta!"
pontuacao++

}else{

botao.classList.add("wrong")

resultado.innerText="❌ Resposta correta: "+perguntaObj.opcoes[perguntaObj.resposta]

}

}

document.getElementById("proxima").onclick=()=>{

perguntaAtual++

if(perguntaAtual<perguntas[categoriaAtual].length){

carregarPergunta()

}else{

perguntaElemento.innerText="Quiz finalizado!"
opcoesElemento.innerHTML=""

resultado.innerText="Pontuação: "+pontuacao

salvarRanking(pontuacao)

reiniciar.style.display="block"

clearInterval(intervalo)

}

}

reiniciar.onclick=()=>{

perguntaAtual=0
pontuacao=0

reiniciar.style.display="none"

carregarPergunta()

}

document.getElementById("categoria").addEventListener("change",(e)=>{

categoriaAtual=e.target.value
perguntaAtual=0
pontuacao=0

reiniciar.style.display="none"

carregarPergunta()

})

function salvarRanking(pontos){

let ranking=JSON.parse(localStorage.getItem("quizRanking"))||[]

ranking.push(pontos)

ranking.sort((a,b)=>b-a)

ranking=ranking.slice(0,5)

localStorage.setItem("quizRanking",JSON.stringify(ranking))

mostrarRanking()

}

function mostrarRanking(){

let ranking=JSON.parse(localStorage.getItem("quizRanking"))||[]

const rankingElemento=document.getElementById("ranking")

rankingElemento.innerHTML=""

ranking.forEach((pontos,index)=>{

const li=document.createElement("li")

li.innerText=`${index+1}º - ${pontos} pontos`

rankingElemento.appendChild(li)

})

}

const modoBtn=document.getElementById("modo")

modoBtn.onclick=()=>{

document.body.classList.toggle("dark")

}

mostrarRanking()

carregarPergunta()