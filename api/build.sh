 echo "-----BUILD START-----"
 #!/bin/bash

echo "Upgrading pip..."

python3.9 -m pip install pip --upgrade

echo "Installing dependencies..."

python3.9 -m pip install -r requirements.txt

echo "Migrating database..."

python3.9 manage.py makemigrations --noinput
python3.9 manage.py migrate --noinput

 echo "-----BUILD END-----"