# IMPORTAR HERRAMIENTAS
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_marshmallow import Marshmallow


# Crear la app
app = Flask(__name__)

# Usar Cors para dar acceso a las rutas(ebdpoint) desde frontend
CORS(app)

# CONFIGURACIÓN A LA BASE DE DATOS DESDE app
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:micram123@localhost/crudflask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# COMUNICAR LA APP CON SQLALCHEMY
db = SQLAlchemy(app)

# PERMITIR LA TRANSFORMACIÓN DE DATOS
ma = Marshmallow(app)


# ESTRUCTURA DE LA TABLA usuarios A PARTIR DE LA CLASE
class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre_completo = db.Column(db.String(100))
    telefono = db.Column(db.String(20))
    email = db.Column(db.String(100))

    def __init__(self, nombre_completo, telefono, email):
        self.nombre_completo = nombre_completo
        self.telefono = telefono
        self.email = email


# CREAR UNA CLASE UsuarioSchema, DONDE SE DEFINEN LOS CAMPOS DE LA TABLA
class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre_completo', 'telefono', 'email')


# DIFERENCIAR CUANDO SE TRANSFORME UN DATO O UNA LISTA DE DATOS
usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)



@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuarios.query.all()
    print(usuarios)
    return usuarios_schema.jsonify(usuarios)


@app.route('/usuarios', methods=['POST'])
def add_usuario():
    nombre_completo = request.json['nombre_completo']
    telefono = request.json['telefono']
    email = request.json['email']
    try:
        new_usuario = Usuarios(nombre_completo, telefono, email)
        db.session.add(new_usuario)
        db.session.commit()
        return jsonify({'id': new_usuario.id, 'message': 'Usuario agregado correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    usuario = Usuarios.query.get(id)
    if usuario:
        return usuario_schema.jsonify(usuario)
    else:
        return jsonify({'message': 'Usuario no encontrado'})


@app.route('/usuarios/<int:id>', methods=['PUT'])
def update_usuario(id):
    usuario = Usuarios.query.get(id)
    if usuario:
        nombre_completo = request.json.get('nombre_completo')
        telefono = request.json.get('telefono')
        email = request.json.get('email')
        usuario.nombre_completo = nombre_completo
        usuario.telefono = telefono
        usuario.email = email
        db.session.commit()
        return jsonify({'message': 'Usuario actualizado correctamente'})
    else:
        return jsonify({'message': 'Usuario no encontrado'})


@app.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    usuario = Usuarios.query.get(id)
    if usuario:
        db.session.delete(usuario)
        db.session.commit()
        return jsonify({'message': 'Usuario eliminado correctamente'})
    else:
        return jsonify({'message': 'Usuario no encontrado'})



if __name__ == '__main__':

    app.run(debug=True)

