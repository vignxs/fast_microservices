import haversine as hs
import pgeocode

loc1=(13.121,80.285) #Chennai


def time_to_deliver(pincode):
    out = 0
    nomi = pgeocode.Nominatim('In')
    info = nomi.query_postal_code(pincode).to_dict()

    loc2 = (info['latitude'], info['longitude'])

    distance_km = hs.haversine(loc1,loc2)
    print(distance_km)
    try:
        out = round((distance_km/4.5)/24 + 2 )
    except ValueError:
        pass
    
    return out



