import requests
from datetime import datetime

# Your logic to fetch data and generate graphs

with open("README.md", "r") as file:
    readme = file.readlines()

# Update README content
# readme[index] = your_updated_content

with open("README.md", "w") as file:
    file.writelines(readme)
