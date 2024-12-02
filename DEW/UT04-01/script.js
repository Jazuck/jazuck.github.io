document.addEventListener("DOMContentLoaded", function () {
    const anioNacimiento = document.getElementById("anio_nacimiento");

    if (anioNacimiento) {
        for (let year = 1920; year <= 2024; year++) {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            anioNacimiento.appendChild(option);
        }
    }

    const form = document.getElementById("frm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 
        const errors = validateForm();
        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            form.submit();
        }
    });

    const togglePassword = document.getElementById('show-password');
    togglePassword.addEventListener("click", function () {
        const passwordInput = document.getElementById('password');
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    });
});


function validateForm() {
    const errors = [];

    const username = document.getElementById("Nombre usuario");
    if (username.value.trim() === "") {
        errors.push("Nombre de usuario: campo requerido.");
    } else if (username.value.length < 3) {
        errors.push("Nombre de usuario: debe tener al menos 3 caracteres.");
    }

    const password = document.getElementById("password");
    if (password.value.trim() === "") {
        errors.push("Contraseña: campo requerido.");
    } else if (password.value.length < 6) {
        errors.push("Contraseña: debe tener al menos 6 caracteres.");
    }

    const name = document.getElementById("nombre");
    if (name.value.trim() === "") {
        errors.push("Nombre: campo requerido.");
    } else if (name.value.length < 3) {
        errors.push("Nombre: debe tener al menos 3 caracteres.");
    }

    const lastname = document.getElementById("apellidos");
    if (lastname.value.trim() === "") {
        errors.push("Apellidos: campo requerido.");
    } else if (lastname.value.length < 3) {
        errors.push("Apellidos: debe tener al menos 3 caracteres.");
    }

    const phone = document.getElementById("telefono");
    if (phone.value.trim() === "") {
        errors.push("Teléfono: campo requerido.");
    } else if (!/^\d{9,12}$/.test(phone.value)) {
        errors.push("Teléfono: debe contener entre 9 y 12 dígitos.");
    }

    const cp = document.getElementById("cp");
    if (cp.value.trim() === "") {
        errors.push("Código postal: campo requerido.");
    } else if (!/^\d{5}$/.test(cp.value)) {
        errors.push("Código postal: debe tener 5 dígitos.");
    }

    const dni = document.getElementById("dni");
    if (dni.value.trim() === "") {
        errors.push("DNI/NIE: campo requerido.");
    } else if (!/^\d{8}[A-Z]$/.test(dni.value)) {
        errors.push("DNI/NIE: debe tener 8 números seguidos de una letra mayúscula.");
    }

    const accountType = document.querySelector("input[name='tipo_cuenta']:checked");
    if (!accountType) {
        errors.push("Tipo de cuenta: debe seleccionar una opción.");
    }

    const birthYear = document.getElementById("anio_nacimiento");
    if (birthYear.value === "") {
        errors.push("Año de nacimiento: campo requerido.");
    }

    const hobbies = document.querySelectorAll("input[name='aficiones']:checked");
    if (hobbies.length < 2) {
        errors.push("Aficiones: debes seleccionar al menos 2 opciones.");
    }

    const title = document.getElementById("titulo");
    if (title.value.trim() === "") {
        errors.push("Título: campo requerido.");
    } else if (title.value.length > 15) {
        errors.push("Título: no debe exceder los 15 caracteres.");
    }

    const description = document.getElementById("descripcion");
    if (description.value.trim() === "") {
        errors.push("Descripción: campo requerido.");
    } else if (description.value.length > 120) {
        errors.push("Descripción: no debe exceder los 120 caracteres.");
    }

    return errors;
}