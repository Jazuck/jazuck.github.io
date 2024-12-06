const DOM = {
    formulario: document.getElementById("frm"),
    botonEnviar: document.getElementById("btn"),
    tituloInput: document.getElementById("PublicacionTitulo"),
    descripcionInput: document.getElementById("PublicacionDescripcion"),
    contadorTitulo: document.getElementById("TituloContador"),
    contadorDescripcion: document.getElementById("DescripcionContador"),
    mostrarContrasenaCheckbox: document.getElementById("MostrarContrasena"),
    contrasenaInput: document.getElementById("Contrasena"),
    anioNacimientoSelect: document.getElementById("AnioNacimiento"),
    aficionesHiddenInput: document.getElementById("Aficiones"),
    aficionesCheckboxes: Array.from(document.querySelectorAll(".AficionesCheckbox")),
    inputs: () => Array.from(document.querySelectorAll("input, select, textarea"))
        .filter((field) => 
            !field.classList.contains("AficionesCheckbox") && 
            field.id !== "MostrarContrasena"
    ),
};

// Inicializador
document.addEventListener("DOMContentLoaded", () => {
    inicializarAnios();
    configurarEventos();
    actualizarAficiones();
    actualizarMensajesValidacion();
});

// Configurar eventos
const configurarEventos = () => {

    DOM.botonEnviar.addEventListener("click", (event) => {
        if (validarFormulario()) {
            DOM.formulario.submit();
        }
        actualizarMensajesValidacion();
    });

    // DOM.botonEnviar.addEventListener("click", (event) => {
    //     if (!validarFormulario()){
    //         event.preventDefault();
    //     }
    //     actualizarMensajesValidacion();
    // });

    DOM.tituloInput.addEventListener("input", () => {
        actualizarContador(DOM.tituloInput, DOM.contadorTitulo, 4, 15);
        actualizarMensajesValidacion();
    });
    DOM.descripcionInput.addEventListener("input", () => {
        actualizarContador(DOM.descripcionInput, DOM.contadorDescripcion, 4, 120);
        actualizarMensajesValidacion();
    });

    DOM.mostrarContrasenaCheckbox.addEventListener("change", () => {
        alternarContrasena(DOM.contrasenaInput);
        actualizarMensajesValidacion();
    });

    DOM.inputs().forEach((field) => {
        field.addEventListener("input", () => {
            showValidationMessage(field);
            actualizarMensajesValidacion();
        });
    });

    DOM.aficionesCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            actualizarAficiones();
            actualizarMensajesValidacion();
        });
    });
};

// Rellenar selector de años
const inicializarAnios = () => {
    for (let anio = 1920; anio <= 2010; anio++) {
        var option = document.createElement("option");
        option.value = anio;
        option.textContent = anio;
        DOM.anioNacimientoSelect.appendChild(option);
    }
};

// Actualiza contador de caracteres
const actualizarContador = (campo, contador, min, max) => {
    const longitud = campo.value.length;
    contador.textContent = `${longitud}/${max}`;

    if (longitud < min) {
        mostrarMensajeError(campo, `Debe tener al menos ${min} caracteres.`);
    } else if (longitud > max) {
        mostrarMensajeError(campo, `No debe superar los ${max} caracteres.`);
    } else {
        limpiarMensajeError(campo);
    }
};

// Muestrar u oculta la contraseña
const alternarContrasena = (campoContrasena) => {
    campoContrasena.type = campoContrasena.type === "password" ? "text" : "password";
};

// Actualiza el valor de aficiones seleccionadas
const actualizarAficiones = () => {
    const valores = DOM.aficionesCheckboxes.filter(cb => cb.checked).map(cb => cb.value);
    DOM.aficionesHiddenInput.value = valores.join(", ");
};

// Valida formulario antes de enviar
const validarFormulario = () => {
    const isValid = DOM.formulario.checkValidity();

    if (!isValid) {
        actualizarMensajes();
    }

    if (!validarAficiones()) {
        return false;
    }

    return isValid;
};

// Validar mínimo 2 aficiones seleccionadas
const validarAficiones = () => {
    const valores = DOM.aficionesHiddenInput.value.split(",").filter(Boolean);
    if (valores.length < 2) {
        //var errorElement = DOM.aficionesCheckboxes[0].closest(".FilaAficiones").querySelector(".ErrorMsg");
        //errorElement.textContent = "Debe seleccionar al menos 2 aficiones.";
        return false;
    }
    //limpiarMensajeError(DOM.aficionesCheckboxes[0]);
    return true;
};

// Muestra los mensajes de error
const actualizarMensajes = () => {
    DOM.inputs().forEach(showValidationMessage);
};

// Da color y tamaño al mensaje de error
const mostrarMensajeError = (campo, mensaje) => {
    const errorElement = obtenerErrorElemento(campo);
    errorElement.textContent = mensaje;
    campo.style.border = "2px solid red";
};

// Limpia mensajes de error
const limpiarMensajeError = (campo) => {
    const errorElement = obtenerErrorElemento(campo);
    errorElement.textContent = "";
    campo.style.border = "2px solid black";
};

// Obteiene elemento de error asociado a un campo
const obtenerErrorElemento = (campo) => {
    let errorElement = campo.closest(".campo").querySelector(".ErrorMsg");
    if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.classList.add("ErrorMsg");
        campo.closest(".campo").appendChild(errorElement);
    }
    return errorElement;
};

// Muestra mensajes de validación
const showValidationMessage = (field) => {
    let errorMsg = field.validationMessage;

    if (field.id === "Telefono" && !/^\(\+34\)\d{9}$/.test(field.value)) {
        errorMsg = "El formato debe ser (+34) seguido de 9 números.";
    } else if (field.id === "CodigoPostal" && !/^38\d{3}$/.test(field.value)) {
        errorMsg = "Debe comenzar con 38 y tener 5 números.";
    } else if (field.id === "Contrasena" && field.value.length !== 8) {
        errorMsg = "La contraseña debe tener exactamente 8 caracteres.";
    } else if (field.name === "Aficiones" && !validarAficiones()) {
        errorMsg = "Debe seleccionar al menos 2 aficiones.";
    }

    if (errorMsg) {
        mostrarMensajeError(field, errorMsg);
    } else {
        limpiarMensajeError(field);
    }
};

// Actualiza mensajes de validación parte derecha
const actualizarMensajesValidacion = () => {
    const mensajesDiv = document.getElementById("mensajes");
    mensajesDiv.innerHTML = ""; // Limpiar mensajes previos

    DOM.inputs().forEach((field) => {
        const fieldValue = field.value.trim();
        const isValid = field.checkValidity();
        const fieldLabel = document.querySelector(`label[for="${field.id}"]`)?.textContent || field.name;

        // Crea mensaje dinámico
        const mensaje = document.createElement("div");
        mensaje.style.marginBottom = "10px";

        if (isValid) {
            mensaje.textContent = `${fieldLabel}: ${fieldValue || "(Vacío)"}`;
            mensaje.style.color = "green";
        } else {
            const errorMsg = field.validationMessage || "Campo no válido.";
            mensaje.textContent = `${fieldLabel}: ${errorMsg}`;
            mensaje.style.color = "red";
        }

        mensajesDiv.appendChild(mensaje);
    });
};