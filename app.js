function cambiarPestana(idSeccion) {
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
    document.getElementById(idSeccion).classList.add('activa');

    if (idSeccion === 'seccionAtenciones') {
        cargarSelectsAtencion();
    }
}

const cajaMensaje = document.getElementById('mensajeRespuesta');
function mostrarMensaje(texto, tipo) {
    cajaMensaje.textContent = texto;
    cajaMensaje.className = `mensaje ${tipo}`;
    setTimeout(() => {
        cajaMensaje.style.display = 'none';
    }, 4000);
}

document.getElementById('formSocio').addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = {
        nombre: document.getElementById('nombreSocio').value.trim(),
        dni: document.getElementById('dniSocio').value,
        email: document.getElementById('emailSocio').value
    };

    const res = await fetch('/api/socios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    const resultado = await res.json();
    if (res.ok) {
        mostrarMensaje(resultado.mensaje, 'exito');
        e.target.reset();
    } else {
        mostrarMensaje('Error al registrar socio', 'error');
    }
});

document.getElementById('formEmpleado').addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = {
        nombre: document.getElementById('nombreEmpleado').value.trim(),
        cargo: document.getElementById('cargoEmpleado').value,
        sueldo: document.getElementById('sueldoEmpleado').value
    };

    const res = await fetch('/api/empleados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    const resultado = await res.json();
    if (res.ok) {
        mostrarMensaje(resultado.mensaje, 'exito');
        e.target.reset();
    } else {
        mostrarMensaje('Error al contratar empleado', 'error');
    }
});

async function cargarSelectsAtencion() {
    const resEmpleados = await fetch('/api/empleados');
    const empleados = await resEmpleados.json();
    
    const resSocios = await fetch('/api/socios');
    const socios = await resSocios.json();

    const selectEmp = document.getElementById('selectEmpleado');
    const selectSoc = document.getElementById('selectSocio');

    selectEmp.innerHTML = '<option value="">Seleccione un empleado...</option>';
    empleados.forEach(emp => {
        selectEmp.innerHTML += `<option value="${emp.nombre}">${emp.nombre} (${emp.cargo})</option>`;
    });

    selectSoc.innerHTML = '<option value="">Seleccione un socio...</option>';
    socios.forEach(soc => {
        selectSoc.innerHTML += `<option value="${soc.nombre}">Socio: ${soc.nombre} (DNI: ${soc.dni})</option>`;
    });
}

document.getElementById('formAtencion').addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = {
        empleado: document.getElementById('selectEmpleado').value,
        socio: document.getElementById('selectSocio').value,
        motivo: document.getElementById('motivoAtencion').value
    };

    const res = await fetch('/api/atenciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    const resultado = await res.json();
    if (res.ok) {
        mostrarMensaje(`Atención registrada: El empleado ${datos.empleado} atendió al socio ${datos.socio}`, 'exito');
        e.target.reset();
    } else {
        mostrarMensaje('Error al registrar atención', 'error');
    }
});