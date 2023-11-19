 echo "-----BUILD START-----"
 #!/bin/bash

echo "Upgrading pip..."

python3.9 -m pip install pip --upgrade

echo "Installing dependencies..."

python3.9 -m pip install -r requirements.txt

echo "Migrating database..."

python3.9 manage.py makemigrations --noinput
python3.9 manage.py migrate --noinput

echo "Creating superuser..."

DJANGO_SUPERUSER_EMAIL=${EMAIL_HOST_USER}
DJANGO_SUPERUSER_USERNAME=${SUPERUSER_USERNAME}
DJANGO_SUPERUSER_PASSWORD=${EMAIL_HOST_PASSWORD}

python3.9 manage.py createsuperuser \
    --email $DJANGO_SUPERUSER_EMAIL \
    --username $DJANGO_SUPERUSER_USERNAME \
    --noinput || true

echo "Collecting static files..."

python3.9 manage.py collectstatic --noinput

 echo "-----BUILD END-----"