'''make_data.py

generates fake data that gets stored in mock_patient_data.csv

Isak Berntsson, Hugo Hallstensson Riddargard, Philip Nylen

FIXING '''

import pandas as pd
from faker import Faker
import random
import numpy as np
import datetime
from helper_funcs import random_times, compare_reference_values

LOCATIONS = ["Linkoping", "Norrkoping", "Motala"]
REASONS = ["Benbrott", "Buksmartor", "Hjartkramp", "Ryggvark"]
INJECTION_TYPES = ["Morfin", "Koksalt", "Naringsvatska"]
INJECTION_LOCALIZATION = ["Hoger arm", "Vanster Arm"]
EVENT_TYPES = ["Labbsvar Blodprov", "Labbsvar EKG", "Omvardnad", "Dosering"]
EVENT_TYPES_SENT = ["Skickat Blodprov", "Skickat EKG", "Skickat Rontgen remiss"]
EVENT_INLAGD = ["Gubbe", "Ambulans"]
MEDICIN_NAMES = ["Alvedon", "Ipren", "Kodein"]
MEDICIN_STRENGTH = ["500mg", "400mg"]
MEDICIN_ABSORTION = ["Oralt"]
MEDICIN_TYPE = ["Filmdragerad tablett"]
BLOOD_PRESSURES = [(90, 60), (95, 75), (84, 62), (78, 59)]
MAX_EVENTS = 12

def generate_ssn():
    year = str(random.randint(1920, 2020))
    month = str(random.randint(1, 12))
    month = "0"+month if int(month) < 10 else month
    day = str(random.randint(1, 28))
    day = "0"+day if int(day) < 10 else day
    last = str(random.randint(1000, 9999))

    return year + month + day + "-" + last

def generate_arrival():
    tim = str(random.randint(0, 23))
    tim = "0"+tim if int(tim) < 10 else tim
    minimum = str(random.randint(0, 59))
    sek = "0"+minimum if int(minimum) < 10 else minimum

    return tim + ":" + sek

def generate_reason():
    return random.choice(REASONS)

def make_data(num_patients=100):
    df_patients = pd.DataFrame(columns=["id", "triageLevel", "arrival",
                                        "reason", "name", "SSN", "location",
                                        "team", "room"])
    df_vitals = pd.DataFrame(columns=["id", "time", "type", "value","reference"])
    df_injections = pd.DataFrame(columns=["id", "timein", "timeout",
                                          "type", "value", "localization",
                                          "procedure"])
    df_events = pd.DataFrame(columns=["id", "time", "category", "type", "sent"])
    df_ums = pd.DataFrame(columns=["id", "sens_level", "med_condition",
                                   "care_deviation", "infection", "no_structure_info"])
    df_medicin = pd.DataFrame(columns=["id", "name", "strength", "absortion",
                                       "type", "dosage", "time"])

    fake = Faker()
    df_patients["id"] = [i for i in range(num_patients)]
    df_patients["triageLevel"] = [random.randint(1, 4) for _ in range(num_patients)]
    df_patients["arrival"] = random_times(num_patients, 24 * 60)
    df_patients["reason"] = [generate_reason() for _ in range(num_patients)]
    df_patients["name"] = [fake.name() for _ in range(num_patients)]
    df_patients["location"] = [random.choice(LOCATIONS) for _ in range(num_patients)]
    df_patients["SSN"] = [generate_ssn() for _ in range(num_patients)]
    df_patients["team"] = [random.choice(list("123")) for _ in range(num_patients)]
    df_patients["room"] = [random.randint(1, 10) for _ in range(num_patients)]
    #df_patients["age"] = [2021 - int(ssn[:4]) for ssn in df_patients.SSN]
    df_patients.sort_values(by=["team", "id"], inplace=True)

    # filling in vitals. base values for each patient is normally distributed with mean of
    # standard values. new vital values can be generated using functions in helper_funs.py

    vitals_counter = 0
    times = random_times(4, 2 * 60)
    pid_ssn = dict(zip(df_patients["id"],df_patients["SSN"]))
    print(pid_ssn)
    for pid in df_patients.id:

        for time in times:
            PULSE_VAL = round(75 * np.random.normal(1, .15))
            df_vitals.loc[vitals_counter, :] = [
                pid,
                time,
                "Puls",
                PULSE_VAL,
                compare_reference_values(pid_ssn[pid], "Puls",PULSE_VAL)
                
            ]
            vitals_counter += 1
            TEMP_VAL = round(37.2 + np.random.normal(0, .1), 1)
            df_vitals.loc[vitals_counter, :] = [pid, time, "Kroppstemperatur",
                                                TEMP_VAL, compare_reference_values(pid_ssn[pid],"Kroppstemperatur",TEMP_VAL)]
            vitals_counter += 1
            BP_VAL = (BLOOD_PRESSURES[int(np.random.randint(0, len(BLOOD_PRESSURES)))])
            df_vitals.loc[vitals_counter, :] = [
                pid,
                time,
                "Blodtryck",
                BP_VAL
                ,
                compare_reference_values(pid_ssn[pid],"Blodtryck",BP_VAL)
            ]
            vitals_counter += 1
            
            BREATHING_VAL = round(19 * np.random.normal(1, .3), 1)
            df_vitals.loc[vitals_counter, :] = [pid, time, "Andningsfrekvens", BREATHING_VAL, compare_reference_values(pid_ssn[pid],"Andningsfrekvens",BREATHING_VAL)]
            vitals_counter += 1

    # [Filling in df_injectios. Will need to add all available types,
    # localizationsm and procedures.]

    injection_counter = 0
    for pid in df_patients.id:
        if np.random.uniform(0, 1) < .4: #this changes number of patients with infarter
            times = random_times(2, 2 * 60)
            df_injections.loc[injection_counter, :] = [
                pid,
                times[0],
                times[1],
                random.choice(INJECTION_TYPES),
                random.choice([.1, .2, .3, .4]),
                random.choice(INJECTION_LOCALIZATION),
                "Seporerad"
            ]
            injection_counter += 1

    # [Filling in df_event.
    # We still need to fill in all possible event categories and types.
    # And they should probably be linked together, i assume this is used to specify icons and such.,
    # Entry and exit evennt are always entered.
    # All Patients have betwen 2 and 10 events.]

    def generate_type(is_sent_type):
        string_to_return = ""
        if is_sent_type:
            string_to_return = random.choice(EVENT_TYPES_SENT)
        else:
            string_to_return = random.choice(EVENT_TYPES)
        return string_to_return

    # blodprov = pippett
    # Gubbe = inlagd
    # Doktor = rontgen remiss, omvardnad
    # Ambulans =
    # Hus = lamnar
    # Medkit = dosering
    # Heartbeat = ekg
    def generate_category(event_type):
        string_to_return = ""
        if event_type in ("Labbsvar Blodprov", "Skickat Blodprov"):
            string_to_return = "Pippett"
        elif event_type in ("Labbsvar EKG", "Skickat EKG"):
            string_to_return = "Heartbeat"
        elif event_type in ("Skickat Rontgen remiss", "Omvardnad"):
            string_to_return = "Doktor"
        elif event_type == "Dosering":
            string_to_return = "Medkit"
        return string_to_return

    total_event_counter = 0
    for pid in df_patients.id:
        #entry_time, exit_time = random_times(2,8*60)
        times = random_times(MAX_EVENTS, maxdiff_mins=3 * 60)
        timein = times[0]
        timeout = datetime.time(times[1].hour + 1, times[1].minute, times[1].second)
        # times between 1 and 3 hours
        times = [datetime.time(t.hour, t.minute, t.second) for t in times]

        df_events.loc[total_event_counter, :] = [
            pid,
            timein,
            random.choice(EVENT_INLAGD),
            "Patient Inkommen",
            False
        ]
        total_event_counter += 1
        for i in range(int(random.randint(2, MAX_EVENTS - 2))): #number of events per patient
            is_sent = random.uniform(0, 1) < 0.2
            event_type = generate_type(is_sent)
            df_events.loc[total_event_counter, :] = [
                pid,
                times[i],
                generate_category(event_type),
                event_type,
                is_sent
            ]
            total_event_counter += 1
        df_events.loc[total_event_counter, :] = [pid, timeout, "Hus", "Patient Lamnar", False]
        total_event_counter += 1

    # Generates values for the patients UMS

    # Medicin

    def generate_strength(medicine_type):
        return_string = ""
        if medicine_type in ("Alvedon"):
            return_string = "500mg"
        elif medicine_type in ("Ipren"):
            return_string = "400mg"
        elif medicine_type in ("Kodein"):
            return_string = "30mg"
        return return_string

    medicin_counter = 0
    for pid in df_patients.id:
        if not (df_events.loc[(df_events["id"] == pid) & (df_events["type"] == 'Dosering'), ["time"]].empty) :
            events_table = df_events.loc[(df_events["id"] == pid) & (df_events["type"] == 'Dosering'), ["time"]]
            events = []
            medicine_name = random.choice(MEDICIN_NAMES)
            for i in range(events_table.shape[0]):
                events.append(events_table.at[events_table.index.values[i], "time"])
                # print(events[i])
                df_medicin.loc[medicin_counter, :] = [
                    pid,
                    medicine_name,
                    generate_strength(medicine_name),
                    random.choice(MEDICIN_ABSORTION),
                    random.choice(MEDICIN_TYPE),
                    random.randint(1,2),
                    events[i]
                ]
                medicin_counter += 1
    

    # Generates values for the patients UMS
    ums_counter = 0
    for pid in df_patients.id:
        sens_level = random.randint(0, 3)
        med_condition = random.choice([True, False])
        care_deviation = random.choice([True, False])
        infection = random.choice([True, False])
        no_structure_info = random.choice([True, False])
        df_ums.loc[ums_counter, :] = [
            pid,
            sens_level,
            med_condition,
            care_deviation,
            infection,
            no_structure_info
        ]
        ums_counter += 1


    # print(df_patients.head(), "\n")
    # print(df_vitals.head(), "\n")
    # print(df_events, "\n")
    # print(df_injections.head(), "\n")
    # print(df_medicin.head(), "\n")
    print(df_vitals)
    print(df_vitals["reference"].value_counts())
    
    with open("mock_patient_data.csv", "w+") as file:
        df_patients.to_csv(file, index=False)

    with open("mock_vitals.csv", "w+") as file:
        df_vitals.to_csv(file, index=False)

    with open("mock_events.csv", "w+") as file:
        df_events.to_csv(file, index=False)

    with open("mock_injections.csv", "w+") as file:
        df_injections.to_csv(file, index=False)

    with open("mock_ums.csv", "w+") as file:
        df_ums.to_csv(file, index=False)

    with open("mock_medicin.csv", "w+") as file:
        df_medicin.to_csv(file, index=False)

if __name__ == '__main__':
    make_data()
    
