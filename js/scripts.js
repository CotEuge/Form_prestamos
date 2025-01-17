const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	documento: /^\d{8,8}$/, // 7 a 9 numeros.
	pasaporte: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/, //3 letras y 6 numeros
	plazo: /^\d{8,8}$/, // 7 a 9 numeros.
}
const campos = {
	nombre: false,
	apellido: false,
	correo: false,
	telefono: false,
	documento: false
}

const validacionForm = (e) => {
	switch (e.target.name) {

		case "nombre":
			validarCampo(expresiones.nombre, e.target, `nombre`);
			break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, `apellido`);
			break;
		case "documento":
			validarCampo(expresiones.documento, e.target, `documento`);
			break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo_${campo}`).classList.remove(`formulario_grupo-incorrecto`);
		document.getElementById(`grupo_${campo}`).classList.add(`formulario_grupo-correcto`);
		document.querySelector(`#grupo_${campo} i`).classList.add(`fa-check-circle`);
		document.querySelector(`#grupo_${campo} i`).classList.remove(`fa-times-circle`);
		document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove(`formulario_input-error-activo`);
		campos[campo] = true;
	} else {
		document.getElementById(`grupo_${campo}`).classList.add(`formulario_grupo-incorrecto`);
		document.getElementById(`grupo_${campo}`).classList.remove(`formulario_grupo-correcto`);
		document.querySelector(`#grupo_${campo} i`).classList.add(`fa-times-circle`);
		document.querySelector(`#grupo_${campo} i`).classList.remove(`fa-check-circle`);
		document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add(`formulario_input-error-activo`);
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validacionForm);
	input.addEventListener('blur', validacionForm);
})
//No envia el formulario
formulario.addEventListener('submit', (e) => {
	e.preventDefault();


	const envioCorrecto = document.getElementById('formulario');
	if (campos.nombre && campos.apellido && campos.correo && campos.telefono && campos.documento == true) {
		formulario.reset();

		document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');

		document.querySelectorAll('.formulario_grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario_grupo-correcto');
		});
	} else {
		document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
	}
});