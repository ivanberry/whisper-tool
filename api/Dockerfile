FROM ubuntu:20.04

WORKDIR /usr/app

RUN apt-get update && apt-get install -y software-properties-common gcc && \
    add-apt-repository -y ppa:deadsnakes/ppa

RUN apt-get update && apt-get install -y python3.6 python3-distutils python3-pip python3-apt && apt-get install -y git && apt-get install -y --no-install-recommends ffmpeg 

COPY ./requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir tmp

COPY ./ ./

CMD ["python3", "app.py"]
