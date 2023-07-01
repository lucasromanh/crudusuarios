console.log(location.search); // Lee los argumentos pasados a este formulario
var args = location.search.substr(1).split('&');
// Separa el string por los "&" creando una lista
// Ejemplo: ["id=1", "nombre_completo=John Doe", "telefono=123456789", "email=johndoe@example.com"]
console.log(args);

var parts = [];
for (let i = 0; i < args.length; ++i) {
  parts[i] = args[i].split('=');
}
console.log(parts);

document.getElementById("id").value = decodeURIComponent(parts[0][1]);
document.getElementById("nombre_completo").value = decodeURIComponent(parts[1][1]);
document.getElementById("telefono").value = decodeURIComponent(parts[2][1]);
document.getElementById("email").value = decodeURIComponent(parts[3][1]);

function modificar() {
  let id = document.getElementById("id").value;
  let nombreCompleto = document.getElementById("nombre_completo").value;
  let telefono = document.getElementById("telefono").value;
  let email = document.getElementById("email").value;

  let usuario = {
    nombre_completo: nombreCompleto,
    telefono: telefono,
    email: email
  };

  let url = "https://lucasromanh.pythonanywhere.com/usuarios/" + id;
  var options = {
    body: JSON.stringify(usuario),
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow'
  };

  fetch(url, options)
    .then(function () {
      console.log("modificado");
      alert("Registro modificado");
      window.location.href = "./usuarios.html";
    })
    .catch(err => {
      console.error(err);
      alert("Error al modificar");
    });
}
