# make_data.py
#
# generates fake data that gets stored in mock_patient_data.csv
#
# Isak Berntsson, Hugo Hallstensson Riddargård, Philip Nylén
#
# FIXING

import pandas as pd
from faker import Faker
import random

def generate_SSN():
    y = str(random.randint(1920,2020))
    m = str(random.randint(1,12))
    m = "0"+m if int(m)<10 else m
    d = str(random.randint(1,28))
    d = "0"+d if int(d)<10 else d
    x = str(random.randint(1000,9999))

    return y+m+d+"-"+x

def generate_timer():
    min = str(random.randint(0,10))
    min = "0"+min if int(min)<10 else min
    sek = str(random.randint(0,59))
    sek = "0"+sek if int(sek)<10 else sek
    
    return min+":"+sek

def generate_arrival():
    tim = str(random.randint(0,23))
    tim = "0"+tim if int(tim)<10 else tim
    min = str(random.randint(0,59))
    sek = "0"+min if int(min)<10 else min
    
    return tim+":"+min

def generate_reason():
    reasons = ["Benbrott", "Buksmartor", "Hjartkramp", "Ryggvark"]
    return random.choice(reasons)
        
def make_data(NUM_PATIENTS = 100):
    LOCATIONS = ["Linkoping", "Norrkoping", "Motala"]
    df_patients = pd.DataFrame(columns = ["id", "timer", "arrival", "reason", "name", "SSN","location", "team", "room"])
    df_vitals = pd.DataFrame(columns = ["id", "time", "type", "value", "level"])
    df_injections = pd.DataFrame(columns = ["id", "timein", "timeout", "type", "value", "localization", "procedure"])
    df_events = pd.DataFrame(columns = ["id", "time", "category", "type"])

    fake = Faker()
    df_patients["id"] = [i for i in range(NUM_PATIENTS)]
    df_patients["timer"] = [generate_timer() for _ in range(NUM_PATIENTS)]
    df_patients["arrival"] = [generate_arrival() for _ in range(NUM_PATIENTS)]
    df_patients["reason"] = [generate_reason() for _ in range(NUM_PATIENTS)]
    df_patients["name"] = [fake.name() for _ in range(NUM_PATIENTS)]
    df_patients["location"] = [random.choice(LOCATIONS) for _ in range(NUM_PATIENTS)]
    df_patients["SSN"] = [generate_SSN() for _ in range(NUM_PATIENTS)]
    df_patients["team"] = [random.choice(list("ABC")) for _ in range(NUM_PATIENTS)]
    df_patients["room"] = [random.randint(1, 10) for _ in range(NUM_PATIENTS)]

    print(df_patients)

    with open("mock_patient_data.csv", "w+") as f:
        df_patients.to_csv(f, index=False)
    return
        
if __name__ == '__main__':
    make_data()