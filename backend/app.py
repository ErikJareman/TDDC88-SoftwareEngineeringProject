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
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


make_data(50)


@app.route('/patients/<string:location>')
def patients_at(location):
    df_patients = pd.read_csv("mock_patient_data.csv", delimiter=',')
    patients = df_patients[df_patients["location"] == location]
    return jsonify(patients.to_dict('records'))

@app.route('/patients/<int:patient_id>/vitals')
def patient_vitals(patient_id):
    df_vitals = pd.read_csv("mock_vitals.csv", delimiter=',')
    vitals = df_vitals[df_vitals["id"] == patient_id]
    return jsonify(vitals.to_dict('records'))

""" @app.route('/patients/<int:patient_id>/injections')
def patient_vitals(patient_id):
    df_injections = pd.read_csv("mock_injections.csv", delimiter=',')
    injectiosn = df_injections[df_injections["id"] == patient_id]
    return jsonify(df_injections.to_dict('records'))

@app.route('/patients/<int:patient_id>/events')
def patient_events(patient_id):
    df_events = pd.read_csv("mock_events.csv", delimiter=',')
    events = df_events[df_events["id"] == patient_id]
    return jsonify(events.to_dict('records')) """

@app.route("/")
def hello_world():
    return "Mock Database for Emergency Journal Application C4."

if __name__ == "__main__":
    app.run()