const socket = io()

const chatBox = document.getElementById('chat-box')
const messagesBox = document.getElementById('messages-box')

let user;
  Swal.fire({
    title:'Identifiquese',
    input: 'text',
    text: 'Ingrese su nombre de usuario',
    inputValidator: (value) => {return !value && ' Debe ingresar un usuario para continuar'},
    allowOutsideClick: false,
    allowEscapeKey: false,
    padding: '16px'
  }).then((result)=>{
    user = resul.value;
    console.log(user)
  })
 chatBox?.addEventListener('ketup',(event)=>{
  if(event.key === "Enter"){
    if (chatBox.value.trim().length())
     socket.emit('message', { user:user, message: chatBox.value});
     chatBox.value="";
  }
 })