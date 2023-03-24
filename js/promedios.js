let actividades = [
    { id: 1, nombre: 'Actividad 1', nota: 0 },
    { id: 2, nombre: 'Actividad 2', nota: 1.5 },
    { id: 3, nombre: 'Actividad 3', nota: 5 }
];

let indexActividadSeleccionada = -1;

    function mostrarMensaje(promedio) {
        let mensaje = promedio >= 3 ? 'Aprobo' : 'Reprobo';

        document.getElementById('mensajeNota').innerText = mensaje;
    }

function mostrarActividades() {
    let filas = '';
    let sumatoria = 0;
    for (let index in actividades) {
        let actividad = actividades[index];
        filas += '<tr>';
        filas += '  <td>' + actividad.id + '</td>';
        filas += '  <td>' + actividad.nombre + '</td>';
        filas += '  <td>' + actividad.nota + '</td>';
        filas += '  <td>';
        filas += '      <button onclick="modificarActividad(' + index + ')">Modificar</button>';
        filas += '       <button onclick="eliminarActividad(' + index + ')">Eliminar</button>';
        filas += '  </td>';
        filas += '  </tr>';
        sumatoria += parseFloat(actividad.nota);
    }

    promedio = sumatoria / actividades.length;

    document.getElementById('promediosTb').getElementsByTagName('tbody')[0].innerHTML = filas;
    document.getElementById('promedioText').innerText = 'Su promedio es: ' + promedio;
    mostrarMensaje(promedio);
}

mostrarActividades();

document.getElementById('crearBtn').addEventListener('click', () => {
    indexActividadSeleccionada = -1;
    document.getElementById('actividad').setAttribute('value', '');
    document.getElementById('nota').setAttribute('value', '');
    document.getElementById('formActividad').reset();
    document.getElementById('formularioModal').classList.remove('close-modal');
    document.getElementById('tituloModal').innerText = 'Registrar actividad';
});

document.getElementById('cerrarModal').addEventListener('click', () => {
    document.getElementById('formularioModal').classList.add('close-modal');
});

document.getElementById('aceptarModal').addEventListener('click', () => {
    let formulario = document.forms['formularioActividad'];
    let actividad = formulario['actividad'].value;
    let nota = formulario['nota'].value;
    if (indexActividadSeleccionada == -1) {
        //CREAR
        let id = actividades.length + 1;
        actividades.push({
            id: id,
            nombre: actividad,
            nota: nota
        });
    }else{
        //MODIFICAR
        actividades[indexActividadSeleccionada].nombre = actividad;
        actividades[indexActividadSeleccionada].nota = nota;
    }
    mostrarActividades(); 
    document.getElementById('formularioModal').classList.add('close-modal');
});

function modificarActividad(posicionArray) {
    indexActividadSeleccionada = posicionArray;
    document.getElementById('formularioModal').classList.remove('close-modal');
    document.getElementById('tituloModal').innerText = 'Modificar';
    let actividad = actividades[posicionArray];
    document.getElementById('actividad').setAttribute('value', actividad.nombre);
    document.getElementById('nota').setAttribute('value', actividad.nota);

}

function eliminarActividad(index){
    actividades.splice(index, 1);
    mostrarActividades();
}
