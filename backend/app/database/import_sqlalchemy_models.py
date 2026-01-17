from __future__ import annotations

import importlib
import os
from pathlib import Path
from typing import Any


def load_all_models(
    directory: str | Path = "app",
    package: str = "app",
    models_folder: str = "models",
) -> list[dict[str, Any]]:
    result = []

    for root, dirs, _ in os.walk(directory):
        # Check if the directory path includes "/models/"
        if models_folder in dirs:
            models_path = Path(root) / models_folder

            # Iterate over .py files in the "models" folder
            for file in models_path.iterdir():
                file_name = file.name
                if file_name.endswith(".py") and file_name != "__init__.py":
                    # Construct the module name
                    module_name = file_name[:-3]
                    full_module_name = f"{package}.{os.path.relpath(models_path, directory).replace(os.path.sep, '.')}.{module_name}"
                    # Import the module dynamically
                    mdl = importlib.import_module(full_module_name)

                    # Check for __all__ and import accordingly
                    if "__all__" in mdl.__dict__:
                        names = mdl.__dict__["__all__"]
                    else:
                        names = [x for x in mdl.__dict__ if not x.startswith("_")]

                    # Append module information to the result list
                    result.append({k: getattr(mdl, k) for k in names})

    return result
