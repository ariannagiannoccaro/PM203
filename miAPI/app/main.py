from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import misc, usuarios
from app.data.db import engine
from app.data import usuarioDB

#pertenece al funcionamiento del ORM de SQLAlchemy y sirve para 
#crear automáticamente las tablas en la base de datos si aún no existen.
usuarioDB.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="API usuarios ",
    description="Ivan Isay Guerra",
    version="1.0.0"
)

origins = [
    "http://localhost:8081",
    "http://127.0.0.1:8081",
    "http://192.168.1.58:8081",
    "http://192.168.1.58:5000",
    "http://0.0.0.0:8081",
    "http://0.0.0.0:5000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router)
app.include_router(misc.router)