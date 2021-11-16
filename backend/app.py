# backend.py
#
# This is the server that talks with front-end and database
#
# Isak Berntsson, Hugo Hallstensson Riddargård, Philip Nylén, Philip Löfgren
#
# FIXING

from helper_funcs import get_pulse, get_body_temp, get_blood_pressure, get_breathing_frequency
from make_data import make_data
from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


make_data(50)


# The route gives a list of all patients in their database and their triageLevel, arrival, reason, name, SSN, location, team, room
@app.route('/patients/<string:location>')
def patients_at(location):
    df_patients = pd.read_csv("mock_patient_data.csv", delimiter=',')
    patients = df_patients[df_patients["location"] == location]
    return jsonify(patients.to_dict('records'))


# Returns a dictionary of all vitals for a certain patient. The vitals are heartrate, bdoy temperature, blood pressure and breathing frequency.
@app.route('/patients/<int:patient_id>/vitals')
def patient_vitals(patient_id):
    df_vitals = pd.read_csv("mock_vitals.csv", delimiter=',')
    vitals = df_vitals[df_vitals["id"] == patient_id]

    puls_table = vitals.loc[(vitals["id"]==patient_id) & (vitals["type"]=='Puls'), ["value"]]
    puls = float(puls_table.at[puls_table.index.values[0], "value"])
    puls_output = get_pulse(puls)[0]
    vitals.loc[(vitals["id"]==patient_id) & (vitals["type"]=='Puls'), "value"] = puls_output

    bodytemp_table = vitals.loc[(vitals["id"]==patient_id) & (vitals["type"]=='Kroppstemperatur'), ["value"]]
    bodytemp = float(bodytemp_table.at[bodytemp_table.index.values[0], "value"])
    bodytemp_output = get_body_temp(bodytemp)[0]
    vitals.loc[(vitals["id"]==patient_id) & (vitals["type"]=='Kroppstemperatur'), "value"] = bodytemp_output

    bp_table = vitals.loc[(vitals["id"]==patient_id) & (vitals["type"]=='Blodtryck'), ["value"]]
    bp = bp_table.at[bp_table.index.values[0], "value"]
    bp_high = int(bp[1:3])
    bp_low = int(bp[5:7])
    bp_output = get_blood_pressure((bp_high, bp_low))
    vitals.loc[(vitals["id"]==patient_id) & (vitals["type"]=='Blodtryck'), "value"] = str(bp_output[0])


    bFreq_table = vitals.loc[(vitals["id"]==patient_id) & (vitals["type"]=='Andningsfrekvens'), ["value"]]
    bFreq = float(bFreq_table.at[bFreq_table.index.values[0], "value"])
    bFreq_output = get_breathing_frequency(bFreq)[0]
    vitals.loc[(vitals["id"]==patient_id) & (vitals["type"]=='Andningsfrekvens'), "value"] = bFreq_output
    
    return jsonify(vitals.to_dict('records')) 


# Returns information about a patients injections: timein, timeout, type, value, localization, procedure
@app.route('/patients/<int:patient_id>/injections')
def patient_injections(patient_id):
    df_injections = pd.read_csv("mock_injections.csv", delimiter=',')
    injections = df_injections[df_injections["id"] == patient_id]
    return jsonify(injections.to_dict('records'))


# Returns all events for a patient
@app.route('/patients/<int:patient_id>/events')
def patient_events(patient_id):
    df_events = pd.read_csv("mock_events.csv", delimiter=',')
    events = df_events[df_events["id"] == patient_id]
    return jsonify(events.to_dict('records'))


# Returns all ums variables for a patient
@app.route('/patients/<int:patient_id>/ums')
def patient_ums(patient_id):
    df_ums = pd.read_csv("mock_ums.csv", delimiter=',')
    ums = df_ums[df_ums["id"] == patient_id]
    return jsonify(ums.to_dict('records'))


# För att endast skicka puls (Inaktiv)
""" @app.route('/patients/<int:patient_id>/vitals/heartrate')
def puls(patient_id):
    df_puls = pd.read_csv("mock_vitals.csv", delimiter=',')
    puls_table = df_puls.loc[(df_puls["id"]==patient_id) & (df_puls["type"]=='Puls'), ["value"]]
    puls = float(puls_table.at[puls_table.index.values[0], "value"])
    puls_output = get_pulse(puls)[0]
    return jsonify(puls_output)  """


@app.route("/")
def hello_world():
    return "Mock Database for Emergency Journal Application C4."


if __name__ == "__main__":
    app.run()