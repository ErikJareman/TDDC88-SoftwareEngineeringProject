from make_data import make_data
from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

make_data(50)

@app.route('/patients/<string:location>')
def patients_at(location):
    df_patients = pd.read_csv("mock_patient_data.csv")
    return jsonify(df_patients[df_patients["Location"] == location].to_dict())

@app.route("/")
def hello_world():
    return "Mock Database for Emergency Journal Application C4."
app.run()