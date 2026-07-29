from fastapi import FastAPI
from app.routers import usuarios
from app.data.db import engine
from app.data import usuarioDB
from fastapi.middleware.cors import CORSMiddleware

#pertenece al funcionamiento del ORM de SQLAlchemy y sirve para 
#crear automáticamente las tablas en la base de datos si aún no existen.
usuarioDB.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="API usuarios ",
    description="Ivan Isay Guerra",
    version="1.0.0"
)


"""clientes con autorizacion a usar la API"""
origins = [
    "http://localhost:8081",
    "http://127.0.0.1:8081" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, #permite que los clientes de estos origenes se conecten a la API
    allow_credentials=True, #permite que los clientes envien credenciales (cookies, autenticacion, etc.)
    allow_methods=["*"], #significa que cualquier metodo HTTP esta permitido
    allow_headers=["*"], #permite cualquier cabecera en la peticion
)

app.include_router(usuarios.router)