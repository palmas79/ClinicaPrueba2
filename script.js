document.getElementById('pacienteForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const jsonData = {};
    formData.forEach((value, key) => {jsonData[key] = value});

    const domicilio = {
        calle: jsonData.calle,
        numero: jsonData.numero,
        localidad: jsonData.localidad,
        provincia: jsonData.provincia
    };

    delete jsonData.calle;
    delete jsonData.numero;
    delete jsonData.localidad;
    delete jsonData.provincia;

    jsonData.domicilio = domicilio;

    try {
        const response = await fetch('http://localhost:8082/pacientes/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (response.ok) {
            alert('Paciente registrado exitosamente');
            this.reset();
        } else {
            throw new Error('Error al registrar el paciente');
        }
    } catch (error) {
        alert(error.message);
    }
});