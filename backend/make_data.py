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
import numpy as np
import datetime
from helper_funcs import random_times



def generate_SSN():
    y = str(random.randint(1920,2020))
    m = str(random.randint(1,12))
    m = "0"+m if int(m)<10 else m
    d = str(random.randint(1,28))
    d = "0"+d if int(d)<10 else d
    x = str(random.randint(1000,9999))

    return y+m+d+"-"+x

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
    df_patients = pd.DataFrame(columns = ["id", "triageLevel", "arrival", "reason", "name", "SSN","location", "team", "room"])
    df_vitals = pd.DataFrame(columns = ["id", "time", "type", "value"])
    df_injections = pd.DataFrame(columns = ["id", "timein", "timeout", "type", "value", "localization", "procedure"])
    df_events = pd.DataFrame(columns = ["id", "time", "category", "type"])
    df_ums = pd.DataFrame(columns= ["id", "sensLevel", "medCondition", "careDeviation", "infection", "noStructureInfo"])

    fake = Faker()
    df_patients["id"] = [i for i in range(NUM_PATIENTS)]
    df_patients["triageLevel"] = [random.randint(1, 4) for _ in range(NUM_PATIENTS)]
    df_patients["arrival"] = [generate_arrival() for _ in range(NUM_PATIENTS)]
    df_patients["reason"] = [generate_reason() for _ in range(NUM_PATIENTS)]
    df_patients["name"] = [fake.name() for _ in range(NUM_PATIENTS)]
    df_patients["location"] = [random.choice(LOCATIONS) for _ in range(NUM_PATIENTS)]
    df_patients["SSN"] = [generate_SSN() for _ in range(NUM_PATIENTS)]
    df_patients["team"] = [random.choice(list("123")) for _ in range(NUM_PATIENTS)]
    df_patients["room"] = [random.randint(1, 10) for _ in range(NUM_PATIENTS)]
    df_patients=df_patients.sort_values(by=["team"])
    print(df_patients)
  
  
    """
    filling in vitals. 
    base values for each patient is normally distributed with  mean of standard values.
    
    new vital values can be generated using functions in helper_funs.py
    
    """
    
    blood_pressures = [(90,60),(95, 75), (84,62), (78,59)]
    vitals_counter = 0
    for id in df_patients.id:
        now = datetime.datetime.now().time
        
        df_vitals.loc[vitals_counter,:] = [id, now(),"Puls", 75*np.random.normal(1,.15)]
        vitals_counter +=1
        
        df_vitals.loc[vitals_counter,:] = [id, now(), "Kroppstemperatur", 37.2+np.random.normal(0,.1)]
        vitals_counter +=1
        
        
        df_vitals.loc[vitals_counter,:] = [id, now(), "Blodtryck", (blood_pressures[np.random.randint(0,len(blood_pressures))] )]
        vitals_counter +=1
        
        df_vitals.loc[vitals_counter,:] = [id, now(), "Andningsfrekvens", 19*np.random.normal(1,.3)]
        vitals_counter +=1


    """[Filling in df_injectios. Will need to add all available types, localizationsm and procedures.
        
    ]
    """
    INJECTION_TYPES = ["Morfin", "Koksalt", "Naringsvatska" ]
    INJECTION_LOCALIZATION = ["Hoger arm", "Vanster Arm"]    
    injection_counter = 0
    for id in df_patients.id:
        if np.random.uniform(0,1) < .4: #this changes number of patients with infarter
            times = random_times(2,2*60)
            df_injections.loc[injection_counter,:] = [id, times[0], times[1], random.choice(INJECTION_TYPES), random.choice([.1,.2,.3,.4]), random.choice(INJECTION_LOCALIZATION), "Seporerad" ]
            injection_counter += 1
    
    
    """[Filling in df_event.
        We still need to fill in all possible event categories and types. And they should probably be linked together, i assume this is used to specify icons and such.,
        Entry and exit evennt are always entered.
        All Patients have betwen 2 and 10 events.
        ]
    """
    EVENT_CATEGORIES = ["eyedropper icon", "doctor icon", "medkit icon", "heartbeat icon", "street view icon"]
    EVENT_TYPES = ["Labbsvar Blodprov", "Labbsvar EKG", "Omvardnad", "Dosering "]
    event_counter = 0
    for id in df_patients.id:
        entry_time, exit_time = random_times(2,8*60)
        df_events.loc[event_counter,:] = [id, entry_time,"street view icon", "Patient Inlagd"]
        event_counter +=1
        for _ in range(int(random.randint(2,10))): #number of events per patient
            temp_event = random.choice(EVENT_CATEGORIES)
            if temp_event == "eyedropper icon":
                df_events.loc[event_counter,:] = [id, random_times(1)[0], temp_event,"Labbsvar Blodprov" ]
                event_counter +=1
            elif temp_event == "doctor icon":
                df_events.loc[event_counter,:] = [id, random_times(1)[0], temp_event,"Omvardnad" ]
                event_counter +=1
            elif temp_event == "heartbeat icon":
                df_events.loc[event_counter,:] = [id, random_times(1)[0], temp_event,"Labbsvar EKG" ]
                event_counter +=1
            elif temp_event == "medkit icon":
                df_events.loc[event_counter,:] = [id, random_times(1)[0], temp_event,"Dosering" ]
                event_counter +=1
        df_events.loc[event_counter,:] = [id, entry_time,"street view icon", "Patient Lamnar"]
        event_counter +=1

    """  Generates values for the patients UMS """
    ums_counter = 0
    for id in df_patients.id:
        sensLevel = random.randint(0,3)
        medCondition = random.choice([True, False])
        careDeviation = random.choice([True, False])
        infection = random.choice([True, False])
        noStructureInfo = random.choice([True, False])
        df_ums.loc[ums_counter,:] = [id, sensLevel, medCondition, careDeviation, infection, noStructureInfo]
        ums_counter +=1

    
    # print(df_patients.head(), "\n")
    # print(df_vitals.head(), "\n")       
    # print(df_events.head(), "\n")
    # print(df_injections.head(), "\n")
    
    
    
    with open("mock_patient_data.csv", "w+") as f:
        df_patients.to_csv(f, index=False)
    
    with open("mock_vitals.csv", "w+") as f:
        df_vitals.to_csv(f, index=False)
        
    with open("mock_events.csv", "w+") as f:
        df_events.to_csv(f, index=False)
        
    with open("mock_injections.csv", "w+") as f:
        df_injections.to_csv(f, index=False)

    with open("mock_ums.csv", "w+") as f:
        df_ums.to_csv(f, index=False)

    
    
    
    
    return
        
if __name__ == '__main__':
    make_data()
    #print(generate_single_patient_vitals(1337,tot_num=100)["types"])