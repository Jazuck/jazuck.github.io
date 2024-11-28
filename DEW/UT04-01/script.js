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
});

function togglePassword() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}