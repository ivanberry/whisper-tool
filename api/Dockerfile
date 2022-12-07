FROM jrottenberg/ffmpeg

WORKDIR /usr/app

RUN sudo apt-get update -y
RUN sudo apt-get install -y python


# RUN pip install git+https://github.com/openai/whisper.git 

COPY ./requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY ./ ./

CMD ["python", "app.py"]