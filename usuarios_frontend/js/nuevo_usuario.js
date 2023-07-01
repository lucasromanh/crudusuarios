function guardar() {
    let nombreCompleto = document.getElementById("nombre_completo").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
  
    let usuario = {
      nombre_completo: nombreCompleto,
      telefono: telefono,
      email: email
    };
  
    let url = "https://lucasromanh.pythonanywhere.com/usuarios";
    var options = {
      body: JSON.stringify(usuario),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
  
    fetch(url, options)
      .then(function () {
        console.log("creado");
        alert("Grabado");
        window.location.href = "./usuarios.html";
      })
      .catch(err => {
        console.error(err);
        alert("Error al grabar");
      });
  }
  