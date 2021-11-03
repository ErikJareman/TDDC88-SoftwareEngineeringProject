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
def make_data(NUM_PATIENTS = 100):
    LOCATIONS = ["Linkoping", "Norrkoping", "Motala"]
    df_patients = pd.DataFrame(columns = ["Name", "SSN","Location", "Team", "Room"])

    fake = Faker()
    df_patients["Name"] = [fake.name() for _ in range(NUM_PATIENTS)]
    df_patients["Location"] = [random.choice(LOCATIONS) for _ in range(NUM_PATIENTS)]
    df_patients["SSN"] = [generate_SSN() for _ in range(NUM_PATIENTS)]
    df_patients["Team"] = [random.choice(list("ABC")) for _ in range(NUM_PATIENTS)]
    df_patients["Room"] = [random.randint(1, 10) for _ in range(NUM_PATIENTS)]

    print(df_patients)

    with open("mock_patient_data.csv", "w+") as f:
        df_patients.to_csv(f)
    return
        
if __name__ == '__main__':
    make_data()