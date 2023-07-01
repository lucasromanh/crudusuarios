const { createApp } = Vue;

createApp({
  data() {
    return {
      url: "http://127.0.0.1:5000/usuarios",
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
          this.usuarios = data;
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(usuarioId) {
      const url = 'http://localhost:5000/usuarios/' + usuarioId;
      var options = {
        method: 'DELETE',
      };
      fetch(url, options)
        .then(res => res.text())
        .then(res => {
          location.reload();
        });
    }
  }
}).mount('#app');
