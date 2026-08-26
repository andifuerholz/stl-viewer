import os
import json

stl_dir = "assets/stl"
files = [f for f in os.listdir(stl_dir) if f.lower().endswith('.stl')]

with open(os.path.join(stl_dir, "files.json"), "w") as f:
    json.dump(files, f, indent=2)

print(f"Erfolgreich {len(files)} STL-Dateien in files.json eingetragen.")