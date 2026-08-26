#src/stl_loader.py

from stl import mesh


def load_stl(file_path: str) -> mesh.Mesh:
    """
    Load an STL file and return a mesh object.
    """
    return mesh.Mesh.from_file(file_path)