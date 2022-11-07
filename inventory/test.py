from pathlib import Path
import os


file = os.path.dirname(__file__)
print(file)
parent = os.path.dirname(file)

print(type(parent))