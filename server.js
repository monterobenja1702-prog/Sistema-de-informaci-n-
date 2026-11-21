const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Función auxiliar para leer/escribir archivos JSON
const leerDB = (archivo) => {
    if (fs.existsSync(archivo)) {
        const data = fs.readFileSync(archivo, 'utf8');
        return data ? JSON.parse(data) : [];
    }
    return [];
};

const escribirDB = (archivo, datos) => {
    fs.writeFileSync(archivo, JSON.stringify(datos, null, 2));
};

// --- ENTIDAD 1: SOCIOS ---
app.post('/api/socios', (req, res) => {
    const socios = leerDB('db_socios.json');
    const nuevoSocio = { id: Date.now(), ...req.body, fechaAsociacion: new Date().toLocaleDateString() };
    socios.push(nuevoSocio);
    escribirDB('db_socios.json', socios);
    res.status(201).json({ mensaje: 'Socio registrado en el club con éxito', socio: nuevoSocio });
});

app.get('/api/socios', (req, res) => {
    res.json(leerDB('db_socios.json'));
});

// --- ENTIDAD 2: EMPLEADOS ---
app.post('/api/empleados', (req, res) => {
    const empleados = leerDB('db_empleados.json');
    const nuevoEmpleado = { id: Date.now(), ...req.body, fechaContratacion: new Date().toLocaleDateString() };
    empleados.push(nuevoEmpleado);
    escribirDB('db_empleados.json', empleados);
    res.status(201).json({ mensaje: 'Empleado contratado con éxito', empleado: nuevoEmpleado });
});

app.get('/api/empleados', (req, res) => {
    res.json(leerDB('db_empleados.json'));
});

// --- ENTIDAD 3: ATENCIONES (Empleado atiende a Socio) ---
app.post('/api/atenciones', (req, res) => {
    const atenciones = leerDB('db_atenciones.json');
    const nuevaAtencion = { id: Date.now(), ...req.body, fechaHora: new Date().toLocaleString() };
    atenciones.push(nuevaAtencion);
    escribirDB('db_atenciones.json', atenciones);
    res.status(201).json({ mensaje: 'Atención registrada correctamente', atencion: nuevaAtencion });
});

app.get('/api/atenciones', (req, res) => {
    res.json(leerDB('db_atenciones.json'));
});

app.listen(PORT, () => {
    console.log(`⚽ Club de Fútbol corriendo en http://localhost:${PORT}`);
});