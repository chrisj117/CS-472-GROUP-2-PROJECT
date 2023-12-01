FROM python:3.10-slim

# Dir setup
ENV APP_DIR /app
RUN mkdir ${APP_DIR}
VOLUME ${APP_DIR}
WORKDIR ${APP_DIR}


# Install requirements early so we can change code and re-build quickly
COPY requirements.txt .
RUN pip3 install --upgrade pip
RUN pip3 install --trusted-host pypi.org --trusted-host files.pythonhosted.org pip setuptools && \
    pip3 install -r requirements.txt


# expose http port
EXPOSE 8000
#
# copy config files into filesystem
COPY . .

# The "python manage.py migrate" command migrates the results of 
# "python manage.py makemigrations" command to the [remote] deployment database
# which may (supposed to) be different from the [local] development database
CMD python manage.py migrate --noinput && \
    python manage.py collectstatic --noinput && \
    gunicorn --bind=0.0.0.0:8000 backend.wsgi
