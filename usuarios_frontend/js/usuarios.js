const { createApp } = Vue;

        createApp({
            data() {
                return {
                    url: "https://lucasromanh.pythonanywhere.com/usuarios",
                    usuarios: [],
                    error: false,
                    cargando: true
                };
            },
            created() {
                this.fetchData(this.url);
            },
            methods: {
                fetchData(url) {
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            this.usuarios = data;
                            this.cargando = false;
                        })
                        .catch(err => {
                            console.error(err);
                            this.error = true;
                        });
                },
                eliminar(usuarioId) {
                  if (confirm("¿Estás segurisisisismo de que queres eliminar este usuario?")) {
                    const url = 'https://lucasromanh.pythonanywhere.com/usuarios/' + usuarioId;
                    var options = {
                      method: 'DELETE',
                    };
                    fetch(url, options)
                      .then(res => res.text())
                      .then(res => {
                        location.reload();
                      });
                  } else {
                    alert("Eliminación cancelada.");
                  }
                }
              }
        }).mount('#app');
