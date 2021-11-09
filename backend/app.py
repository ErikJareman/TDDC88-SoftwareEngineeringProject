# backend.py
#
# This is the server that talks with front-end and database
#
# Isak Berntsson, Hugo Hallstensson Riddargård, Philip Nylén
#
# FIXING

from make_data import make_data
from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)


make_data(50)


@app.route('/patients/<string:location>')
def patients_at(location):
    df_patients = pd.read_csv("mock_patient_data.csv", delimiter=',')
    patients = df_patients[df_patients["location"] == location]
    return jsonify(patients.to_dict('records'))
    

@app.route("/")
def hello_world():
    return "Mock Database for Emergency Journal Application C4."

if __name__ == "__main__":
    app.run()