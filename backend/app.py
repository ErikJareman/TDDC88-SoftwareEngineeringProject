'''backend.py

This is the server that talks with front-end and database

Isak Berntsson, Hugo Hallstensson Riddargard, Philip Nylen, Philip Lofgren

FIXING '''

from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS
from helper_funcs import get_pulse, get_body_temp, get_blood_pressure, get_breathing_frequency
from make_data import make_data


APP = Flask(__name__)
CORS = CORS(APP)

make_data(50)

# The route gives a list of all patients in their database and their
# triageLevel, arrival, reason, name, SSN, location, team, room, pn
@APP.route('/patients/<string:location>')
def patients_at(location):
    df_patients = pd.read_csv("mock_patient_data.csv", delimiter=',')
    patients = df_patients[df_patients["location"] == location]
    return jsonify(patients.to_dict('records'))


# Returns a dictionary of all vitals for a certain patient. The vitals
# are heartrate, bdoy temperature, blood pressure and breathing frequency.
@APP.route('/patients/<int:patient_id>/vitals')
def patient_vitals(patient_id):
    df_vitals = pd.read_csv("mock_vitals.csv", delimiter=',')
    vitals = df_vitals[df_vitals["id"] == patient_id]

    puls_table = vitals.loc[(vitals["id"] == patient_id) & (vitals["type"] == 'Puls'), ["value"]]
    puls = float(puls_table.at[puls_table.index.values[0], "value"])
    puls_output = get_pulse(puls)[0]
    vitals.loc[(vitals["id"] == patient_id) & (vitals["type"] == 'Puls'), "value"] = puls_output

    bodytemp_table = vitals.loc[
        (vitals["id"] == patient_id) & (vitals["type"] == 'Kroppstemperatur'),
        ["value"]
    ]
    bodytemp = float(bodytemp_table.at[bodytemp_table.index.values[0], "value"])
    bodytemp_output = get_body_temp(bodytemp)[0]
    vitals.loc[
        (vitals["id"] == patient_id) & (vitals["type"] == 'Kroppstemperatur'),
        "value"
    ] = bodytemp_output

    bp_table = vitals.loc[(vitals["id"] == patient_id) & (vitals["type"] == 'Blodtryck'), ["value"]]
    bp_level = bp_table.at[bp_table.index.values[0], "value"]
    bp_high = int(bp_level[1:3])
    bp_low = int(bp_level[5:7])
    bp_output = get_blood_pressure((bp_high, bp_low))
    vitals.loc[
        (vitals["id"] == patient_id) & (vitals["type"] == 'Blodtryck'),
        "value"
    ] = str(bp_output[0])

    b_freq_table = vitals.loc[
        (vitals["id"] == patient_id) & (vitals["type"] == 'Andningsfrekvens'),
        ["value"]
    ]
    b_freq = float(b_freq_table.at[b_freq_table.index.values[0], "value"])
    b_freq_output = get_breathing_frequency(b_freq)[0]
    vitals.loc[
        (vitals["id"] == patient_id) & (vitals["type"] == 'Andningsfrekvens'),
        "value"
    ] = b_freq_output

    return jsonify(vitals.to_dict('records'))


# Returns information about a patients injections: timein,
# timeout, type, value, localization, procedure
@APP.route('/patients/<int:patient_id>/injections')
def patient_injections(patient_id):
    df_injections = pd.read_csv("mock_injections.csv", delimiter=',')
    injections = df_injections[df_injections["id"] == patient_id]
    return jsonify(injections.to_dict('records'))


# Returns all events for a patient
@APP.route('/patients/<int:patient_id>/events')
def patient_events(patient_id):
    df_events = pd.read_csv("mock_events.csv", delimiter=',')
    events = df_events[df_events["id"] == patient_id]
    return jsonify(events.to_dict('records'))


# Returns all ums variables for a patient
@APP.route('/patients/<int:patient_id>/ums')
def patient_ums(patient_id):
    df_ums = pd.read_csv("mock_ums.csv", delimiter=',')
    ums = df_ums[df_ums["id"] == patient_id]
    return jsonify(ums.to_dict('records'))

# Returns information about a patients Medicin: id, name, strength, absortion, type, dosage, time
@APP.route('/patients/<int:patient_id>/medicin')
def patient_medicin(patient_id):
    df_medicin = pd.read_csv("mock_medicin.csv", delimiter=',')
    medicin = df_medicin[df_medicin["id"] == patient_id]
    return jsonify(medicin.to_dict('records'))

# For att endast skicka puls (Inaktiv)
#@APP.route('/patients/<int:patient_id>/vitals/heartrate')
#def puls(patient_id):
#    df_puls = pd.read_csv("mock_vitals.csv", delimiter=',')
#    puls_table = df_puls.loc[(df_puls["id"]==patient_id) & (df_puls["type"]=='Puls'), ["value"]]
#    puls = float(puls_table.at[puls_table.index.values[0], "value"])
#    puls_output = get_pulse(puls)[0]
#    return jsonify(puls_output),


@APP.route("/")
def hello_world():
    return "Mock Database for Emergency Journal APPlication C4."


if __name__ == "__main__":
    APP.run()
