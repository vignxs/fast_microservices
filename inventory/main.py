from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from inventory_models import Products

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['http://localhost:3000/'],
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}
  
@app.get("/products")
def all():
    return [format(i) for i in Products.all_pks()]

def format(pk):
    product = Products.get(pk)
    return {
        "id" : product.pk,
        "name" : product.name,
        "price" : product.price,
        "quantity" : product.quantity  
    }

@app.post("/create_product")
def create(product : Products):
    return product.save()
    
@app.get("/product/{pk}")
def get(pk):
    return Products.get(pk)

@app.delete("/product/{pk}")
def delete(pk):
    return Products.delete(pk)