const rpc = require("discord-rpc")
const startTimestamp = new Date()
const {getCurrentWindow, globalShortcut} = require('electron').remote;
let InstaClicked = false
let ValoClicked = false
window.addEventListener("DOMContentLoaded",()=>{
    var form = document.getElementById("Form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
    const insta = document.getElementById("Insta")
    insta.addEventListener("click",()=>{
        if(InstaClicked==false){
            InstaRpc()
        } else if(InstaClicked==true) return;
        InstaClicked = true;
    })
})

function InstaRpc(){
    const RPC = new rpc.Client({
        transport: 'ipc'
    })
    RPC.on("ready" , () => {
        RPC.setActivity({
            details: 'Instagram',
            state: 'Checking feed',
            startTimestamp,
            largeImageKey: 'insta-large',
            largeImageText: 'Checking feed'
        })
        console.log('rpc on')
    })
    RPC.login({
        clientId: '953521159771672626'
    })
}

function valoRPC(){
    const RPC = new rpc.Client({
        transport: 'ipc'
    })
    RPC.on("ready" , () => {
        RPC.setActivity({
            details: 'Valorant',
            state: 'Playing Valorant',
            startTimestamp,
            largeImageKey: 'valo',
            largeImageText: 'Playing valorant'
        })
        console.log('rpc on')
    })
    RPC.login({
        clientId: '956483198756487168'
    })
}

window.addEventListener("DOMContentLoaded",()=>{
    var form = document.getElementById("Form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
    const valo = document.getElementById("Valo")
    valo.addEventListener("click",()=>{
        if(ValoClicked==false){
            valoRPC()
        } else if(ValoClicked==true) return;
        ValoClicked = true;
    })
})

window.addEventListener("DOMContentLoaded",()=>{
    const removrpc = document.getElementById("Removerpc")
    removrpc.addEventListener("click" , ()=>{
        reload()
    })
})
function reload(){
    getCurrentWindow().reload()
  }