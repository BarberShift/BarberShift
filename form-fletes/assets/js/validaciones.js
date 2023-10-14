export function valida(input){
  const tipoDeInput = input.dataset.tipo;
  if(validadores[tipoDeInput]){
    validadores[tipoDeInput](input)
  }

  console.log(input.parentElement)
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid")
    input.parentElement.querySelector(".input-message-error").innerHTML = ""
  }
  else{
    input.parentElement.classList.add("input-container--invalid")
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);

  }

}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];


const mensajesDeError = {
  nombre: {
    valueMissing: "El campo Nombre no puede estar vacio"
  },
  email:{
    valueMissing: "El campo Correo no puede estar vacio",
    typeMismatch: "El correo no es valido"
  },
  password:{
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "Al menos 6 caracteres"
  },
  nacimiento:{
    valueMissing: "Este campo no puede estar vacio",
    customError: "Debes tenes 18 años de edad"
  },
  numero:{
    valueMissing: "Esste campo no puede estar vacio",
    patternMismatch: "El formato requerido es xxxxxxxxxx 10 números"
  },
  direccion:{
    valueMissing: "Esste campo no puede estar vacio",
    patternMismatch: "La direccion debe tener entre 10 o 40 caracteres"
  },
  ciudad:{
    valueMissing: "Esste campo no puede estar vacio",
    patternMismatch: "La direccion debe tener entre 3 o 40 caracteres"
  },
  localidad:{
    valueMissing: "Esste campo no puede estar vacio",
    patternMismatch: "La direccion debe tener entre 3 o 40 caracteres"
  }

}

const validadores = {
  nacimiento: (input)=> validarNacimiento(input)
}

function mostrarMensajeDeError(tipoDeInput, input){
  let mensaje = ""
  tipoDeErrores.forEach(error => {
    if (input.validity[error]) {
      mensaje= mensajesDeError[tipoDeInput][error]
    }
  });

  return mensaje
}

function validarNacimiento(input){
  const fechaCliente = new  Date(input.value);
  let mensaje = "";
  if(!mayorDeEdad(fechaCliente)){
  mensaje = "Debes tenes 18 años de edad"
}
  input.setCustomValidity(mensaje);
}
function mayorDeEdad(fecha){
  const fechaActual = new Date();
  const diferenciaFechas = new Date(fecha.getUTCFullYear() +18,
  fecha.getUTCMonth(),
  fecha.getUTCDate());
 return diferenciaFechas <= fechaActual;
}