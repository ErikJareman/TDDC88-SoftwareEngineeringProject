''' Helper functions for the backend '''

import numpy as np
import datetime
import pandas as pd


# [returns a num-long list of random timesstamps, all bwtween
# current time and maxdiff_mins in the future.
# individual time values can be accessed as follows: time.hour()
def random_times(num=2, maxdiff_mins=6*60):
    low = datetime.datetime.now()
    #hi = lo+datetime.timedelta(minutes=maxdiff_mins)

    vals = [(low+datetime.timedelta(
        minutes=np.random.uniform(1, maxdiff_mins))).time() for _ in range(num)]
    vals = [v.replace(microsecond=0) for v in vals]

    vals.sort()
    return vals

# [returns some number of pulse based on some mean. capped at 180.]

def get_pulse(mean, num=1):

    deviations = np.random.lognormal(0, 2, size=num)
    return [min(180, val) for val in  [sum(x) for x in zip([mean]*num, list(deviations))]]

# [returns some number of body_temp values based on some mean. capped at 40.5.]

def get_body_temp(mean, num=1):
    deviations = np.random.lognormal(0, 0.2, size=num)
    return [min(40.5, val) for val in [sum(x) for x in zip([mean]*num, list(deviations))]]


# [tuples of the two value that make of blood pressure. ]

def get_blood_pressure(means, num=1): ## 120/80
    mean1, mean2 = means
    tops = [mean1 + d for d in np.linspace(mean1-25, mean1+15, 8)]
    bots = [mean2 + d for d in np.linspace(mean2-30, mean2+10, 8)]

    return [(np.random.choice(tops), np.random.choice(bots)) for _ in range(num)]


# [returns some number of breathing frequenciues based on some mean. capped at 45.]

def get_breathing_frequency(mean, num=1):
    deviations = np.random.lognormal(0, 2, size=num)
    return [min(45, val) for val in [sum(x) for x in zip([mean]*num, list(deviations))]]


def compare_reference_values(ssn, type, value):
    now = datetime.datetime.now().date()
    birth = datetime.date(year=int(ssn[:4]), month=int(ssn[4:6]), day = int(ssn[6:8]))

    age = np.floor((now-birth).days / 365.2425)
    #print(age)
    if type == "Blodtryck":
            return 0
    elif type == "Puls":
        if value > 90:
            return 1
        elif value < 60:
            return -1
        else:
            return 0
    elif type == "Kropptstemperatur":
        if value > 38:
            return 1
        elif value < 36:
            return -1
        else:
            return 0
    elif type == "Andningsfrekvens":
            if value > 20.5:
                return 1
            elif value <17.5:
                return -1
            else:
                return 0
    else:
        return 0
    
            
    
    

# run this file to see example poutputs
if __name__ == '__main__':
    
    compare_reference_values(1234, "Puls", 12)

    
    # N_VALS = 15
    # print(random_times(N_VALS, 120), "\n")
    # print(get_pulse(80, N_VALS), "\n")
    # print(get_body_temp(37, N_VALS), "\n")
    # print(get_blood_pressure((90, 80), N_VALS), "\n")
    # print(get_breathing_frequency(12, N_VALS), "\n")
   