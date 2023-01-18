const questions = {
    "ownership": {
        "label": "Ownership type",
        "type": ["","Freehold", "Leasehold", "Absolute ownership"],
        "initial": true
    },
    "extended_lease": {
        "label": "Is the lease extended with this advance?",
        "type": Boolean
    },
    "lease_period": {
        "label": "Remaining term on lease",
        "type": "number",
        "max": 999
    },
    "service_charge": {
        "label": "Annual Service Charge",
        "type": "number"
    },
    "ground_rent": {
        "label": "Annual Ground Rent",
        "type": "number"
    },
    "ground_rent_increase": {
        "label": "Annual ground rent increase type",
        "type": ["","No increase", "Inflation increase", "Fixed increase", "Other"]
    },
    "nearby_commercial": {
      "label": "Is the property next to a commercial building/shop?",
      "type": Boolean  
    },
    "commercial_type": {
        "label": `Is the commercial building any of the following:
        <br>- Takeaway
        <br>- Petrol Station
        <br>- Sex Shop`,
        "type": Boolean          
    }
}

const flow = {
    "ownership": {
        "next": [
            {
                "condition": ["Leasehold"],
                "questions": ["extended_lease"]
            },
            {
                "condition": ["Freehold", "Absolute ownership"],
                "questions": ["nearby_commercial"]               
            }
        ]                    
    },
    "extended_lease": {
        "next": [
            {
                "condition": ["Yes","No"],
                "questions": ["lease_period"]
            }
        ]                    
    },    
    "nearby_commercial": {
        "next": [
            {
                "condition": "Yes",
                "questions": ["commercial_type"]
            }
        ]         
    },
    "commercial_type": {
        "decline": [
            {
                "condition": "Yes",
                "message": "Decline - not a nice neighberhood"
            }
        ]
    }   
}