const socket = io()

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