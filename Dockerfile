FROM python:3.8
WORKDIR /usr/app

COPY ./requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install waitress

COPY ./ ./

CMD ["python", "app.py"]