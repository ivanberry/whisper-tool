FROM python:3.8
WORKDIR /usr/app

COPY ./requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY ./ ./

CMD ['waitress-serve' '--host', '127.0.0.1', 'app:app']