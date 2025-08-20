document.addEventListener("DOMContentLoaded", function () {

    let formulario = document.getElementById("miFormulario");
    let nombre = document.getElementById("nombre");
    let correo = document.getElementById("correo");
    let contrasena = document.getElementById("contrasena");
    let confirmar = document.getElementById("confirmar");
    let fecha = document.getElementById("fecha");
    let celular = document.getElementById("celular");
    let telefono = document.getElementById("telefono");
    let terminos = document.getElementById("terminos");

    let errorNombre = document.getElementById("errorNombre");
    let errorCorreo = document.getElementById("errorCorreo");
    let errorContrasena = document.getElementById("errorContrasena");
    let errorConfirmar = document.getElementById("errorConfirmar");
    let errorFecha = document.getElementById("errorFecha");
    let errorCelular = document.getElementById("errorCelular");
    let errorTelefono = document.getElementById("errorTelefono");
    let errorTerminos = document.getElementById("errorTerminos");

    let mensajeFinal = document.getElementById("mensajeFinal");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        let valido = true;

        if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{3,}$/.test(nombre.value.trim())) {
            errorNombre.textContent = "Ingresa un nombre válido (mín. 3 letras)";
            valido = false;
        } else { errorNombre.textContent = ""; }

        if (!/.+@.+\..+/.test(correo.value.trim())) {
            errorCorreo.textContent = "Correo inválido";
            valido = false;
        } else { errorCorreo.textContent = ""; }

        let pass = contrasena.value;
        if (pass.length < 8 || !/[A-Z]/.test(pass) || !/\d/.test(pass) || !/[^A-Za-z0-9]/.test(pass)) {
            errorContrasena.textContent = "Debe tener 8+ caracteres, mayúscula, número y símbolo";
            valido = false;
        } else { errorContrasena.textContent = ""; }

        if (confirmar.value !== contrasena.value || confirmar.value === "") {
            errorConfirmar.textContent = "Las contraseñas no coinciden";
            valido = false;
        } else { errorConfirmar.textContent = ""; }

        if (!fecha.value) {
            errorFecha.textContent = "Selecciona tu fecha";
            valido = false;
        } else {
            let hoy = new Date();
            let nacimiento = new Date(fecha.value);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            let mes = hoy.getMonth() - nacimiento.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
            if (edad < 18) {
                errorFecha.textContent = "Debes tener al menos 18 años";
                valido = false;
            } else { errorFecha.textContent = ""; }
        }

        if (!/^3\d{9}$/.test(celular.value.trim())) {
            errorCelular.textContent = "Celular inválido (debe empezar con 3 y tener 10 dígitos)";
            valido = false;
        } else { errorCelular.textContent = ""; }

        if (telefono.value.trim() !== "" && telefono.value.trim().length < 10) {
            errorTelefono.textContent = "Debe tener mínimo 10 dígitos";
            valido = false;
        } else { errorTelefono.textContent = ""; }

        if (!terminos.checked) {
            errorTerminos.textContent = "Debes aceptar los términos";
            valido = false;
        } else { errorTerminos.textContent = ""; }
        let captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
        document.getElementById("errorCaptcha").textContent = "Por favor verifica el reCAPTCHA.";
        return;
    } else {
        document.getElementById("errorCaptcha").textContent = "";
    }

    // Aquí iría tu lógica de validación de campos y envío
    document.getElementById("mensajeFinal").textContent = "Formulario enviado correctamente ✅";

     if (valido) {
            mensajeFinal.textContent = "✅ Registro completado con éxito";
            mensajeFinal.className = "success";
            formulario.reset();
        } else {
            mensajeFinal.textContent = "❌ Revisa los campos marcados en rojo";
            mensajeFinal.className = "error";
        }
    });

});
