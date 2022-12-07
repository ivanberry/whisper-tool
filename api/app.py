from flask import Flask, flash, request
from werkzeug.utils import secure_filename
import os

import whisper

def prediction(audio):
    model = whisper.load_model("base")
    result = model.transcribe(audio)
    return result


app = Flask(__name__)
app.secret_key = "d2hhdCBmdWNrIG9mIHRoaXMgdG9waWMgZGlkIHVyIGxpa2U/"
app.config['UPLOAD_FOLDER'] = './api/tmp'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000


@app.route('/ping')
def hello_world():
    return 'pong'


ALLOWED_EXTENSIONS = {'m4a', 'mp3', 'wav', 'aifc', 'aiff', 'mp2', 'ogg'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/transcribe', methods=['POST'])
def transcribe():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return {
                'success': False,
                'msg': 'No file part'
            }
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return {
                'success': False,
                'msg': 'No filename'
            }
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            print(os.path)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            prections = prediction(os.path.join(
                app.config['UPLOAD_FOLDER'], filename))
            return {
                'success': False,
                'data': prections
            }

    return {
        'success': False
    }


if __name__ == "__main__":
  from waitress import serve
  serve(app, host="0.0.0.0", port=8081)