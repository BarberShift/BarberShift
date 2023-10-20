export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.touched) {
    // Comprueba si el campo ha sido tocado
    if (input.validity.valid) {
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML =
        mostrarMensajeDeError(tipoDeInput, input);
    }
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
    valueMissing: "El campo Nombre no puede estar vacío",
  },
  email: {
    valueMissing: "El campo Correo no puede estar vacío",
    typeMismatch: "El correo no es válido",
  },
  password: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "Al menos 6 caracteres",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener 18 años de edad",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato requerido es xxxxxxxxxx (10 números)",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe tener entre 10 y 40 caracteres",
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe tener entre 3 y 40 caracteres",
  },
  localidad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe tener entre 3 y 40 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });

  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener 18 años de edad";
  }
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}

// Agrega oyentes de eventos para marcar los campos como "touched"
const inputs = document.querySelectorAll("input[data-tipo]");
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.touched = true; // Marca el campo como "touched" cuando el usuario comienza a escribir en él
    valida(input);
  });

  input.addEventListener("blur", () => {
    input.touched = true; // Marca el campo como "touched" cuando el usuario sale del campo
    valida(input);
  });

  input.addEventListener("focus", () => {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  });
});
