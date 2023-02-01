const DTquestions = {
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
	"freeholder_type": {
		"label": "is the freeholder any of the following, please select N/A if none apply",
		"type": ['','National Trust','the Crown','Community Land Trust','Local Authority','New Town Authority','Housing Action Trust','University','Charitable Housing Trust','Ecclesiastical Landlord or Property','N/A']
	},
	"own_freehold": {
		"label": "Do you own the freehold?",
		"type": Boolean
	},
	"property_flat": {
		"label": "Is the property a flat",
		"type": Boolean
	},
    "property_flat_2": {
        "label": `Does the property have any of the following?
                <br> - Balcony access?
                <br> - Cladding not brick?`,
        "type": Boolean
    },
    "studio_flat": {
        "label": "Is it a Studio flat?",
        "type": Boolean
    },
    "4_stories": {
        "label": "Is it more than 4 stories high? ",
        "type": Boolean
    },
    "7_stories": {
        "label": "Is it more than 7 stories high? ",
        "type": Boolean
    },
    "12_flats": {
        "label": "Are there more than 12 flats in the block?",
        "type": Boolean
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
    },
    "business_type": {
        "label": "Please detail business name and type",
        "type": "text"
    },     
	"bedrooms": {
		"label": "How many bedrooms does the property have?",
		"type": "number",
		"max": 99
	},
    "swimming_pool": {
        "label": "Does the property have a swimming pool?",
        "type": Boolean
    }, 
    "pool_spendings": {
        "label": "How much do you spend on annual maintenance?",
        "type": "number"
    }, 
    "thatched_roof": {
        "label": "Does the property have a thatched roof?",
        "type": Boolean
    }, 
    "detached_house": {
        "label": "Is the property either a detached house or detatched bungalow?",
        "type": Boolean
    }, 
    "roof_maintanance": {
        "label": "How much have you spent on maintaining the roof in the last 5 years? Or during your ownership if less than 5 years?",
        "type": "number"
    }, 
    "septic_tank": {
        "label": "Does your property have a septic tank or cesspit? ",
        "type": Boolean
    }, 
    "tank_compliance": {
        "label": "Does it comply with environmental regulations?",
        "type": ['','Yes','No','Unknown']
    }, 
    "sole_tank": {
        "label": "Is it for the sole use of your property with all drains and access within your property? ",
        "type": Boolean
    }, 
    "listed_building": {
        "label": "Is the property a listed building?",
        "type": Boolean
    }, 
    "grade": {
        "label": "What is it's grade?",
        "type": ['','Grade 1/A', 'Grade 2*/2', 'Grade B/C (Scotland)']
    }, 
    "age_restricted": {
        "label": "Is the property age restricted  / sheltered housing? ",
        "type": Boolean
    }, 
    "3_years": {
        "label": "Is the property less than 3 years old?",
        "type": Boolean 
    }, 
    "exit_fee": {
        "label": "Are any exit fees greater than 1%",
        "type": Boolean
    }, 
    "estate_fees": {
        "label": "Does the property have any estate fees? Payments for common parts (not roads).",
        "type": Boolean
    }, 
    "management_share": {
        "label": "Do you have a share in the management company?",
        "type": Boolean
    }, 
    "annual_costs": {
        "label": "What are the annual costs?",
        "type": "number"
    }, 
    "property_extension": {
        "label": "Are you planning a property extension?",
        "type": Boolean
    }, 
    "approved_plans": {
        "label": "Do you have plans approved and cost estimates?",
        "type": Boolean
    }, 
    "flooded": {
        "label": "Has the property flooded in the last 5 years?",
        "type": Boolean
    }, 
    "flood_measures": {
        "label": "Have flood measures been installed since?",
        "type": Boolean
    }, 
    "refused_insurance": {
        "label": "Has property insurance been refused or special conditions imposed?",
        "type": Boolean
    }, 
    "solar_panels": {
        "label": "Has the Property got Solar Panels",
        "type": Boolean
    }, 
    "certified_panels": {
        "label": "Were the Panels installed  with Microgeneration Certification Scheme?",
        "type": Boolean
    }, 
    "owned_panels": {
        "label": "Are the panels owned?",
        "type": Boolean
    }, 
    "panles_lease": {
        "label": "Who is the lease with?",
        "type": "text"
    }, 
    "accepted_provider": {
        "label": "Is the lease provider on our accepted lease providers list?",
        "type": Boolean
    }
}

const flow = {
    "ownership": {
        "next": [
            {
                "condition": ["Leasehold"],
                "questions": ["lease_period"]
            },
            {
                "condition": ["Freehold", "Absolute ownership"],
                "questions": ["nearby_commercial"]               
            }
        ]                    
    },
	"lease_period": {
		"next": [
			{
				"condition": dtu.checkAge,
				"questions": ["extended_lease"]
			}
		],
		"decline": [
			{
				"condition": dtu.checkAge,
				"message": "Decline - Lease period too short"
			}
		]
	},
    "extended_lease": {
        "next": [
            {
                "condition": ["Yes","No"],
                "questions": ["service_charge"]
            }
        ]                    
    },
	"service_charge": {
		"next": [{
			"condition": dtu.checkServiceCharge,
			"questions": ["ground_rent"]
		}],
		"decline": [{
			"condition": dtu.checkServiceCharge,
			"message": "Decline - Service charge too high"			
		}]
	},
	"ground_rent": {
		"next": [{
			"condition": dtu.checkGroundService,
			"questions": ["ground_rent_increase"]
		}],
		"decline": [{
			"condition": dtu.checkGroundService,
			"message": "Decline - Ground rent too high"			
		}]
	},
    "ground_rent_increase": {
		"next": [{
			"condition": ["No increase", "Inflation increase", "Fixed increase", "Other"],
			"questions": ["freeholder_type"]
		}]
	},
    "freeholder_type": {
		"next": [{
			"condition": "N/A",
			"questions": ["own_freehold"]
		}],
		"decline": [{
			"condition": ['National Trust','the Crown','Community Land Trust','Local Authority','New Town Authority','Housing Action Trust','University','Charitable Housing Trust','Ecclesiastical Landlord or Property'],
			"message": "Decline - ownership not accepted"			
		}]
	},
    "own_freehold": {
		"next": [{
			"condition": ["Yes", "No"],
			"questions": ["property_flat"]
		}]
	},
    "property_flat": {
		"next": [{
			"condition": ["Yes"],
			"questions": ["property_flat_2"]
		},
        {
			"condition": ["No"],
			"questions": ["nearby_commercial"]
		}]
	},
    "property_flat_2": {
		"next": [{
			"condition": "No",
			"questions": ["studio_flat"]
		}],
		"decline": [{
			"condition": "Yes",
			"message": "Decline - unsupported property type"			
		}]
	},
    "studio_flat": {
		"next": [{
			"condition": "No",
			"questions": ["4_stories"]
		}],
		"decline": [{
			"condition": "Yes",
			"message": "Decline - unsupported property type"			
		}]
	},
    "4_stories": {
		"next": [{
			"condition": "Yes",
			"questions": ["7_stories"]
		},{
			"condition": "No",
			"questions": ["12_flats"]
		}]
	},
    "7_stories": {
        "next": [{
			"condition": "No",
			"questions": ["12_flats"]
		}],
		"decline": [{
			"condition": "Yes",
			"message": "Decline - unsupported property type"			
		}]  
    },
    "12_flats": {
        "next": [
            {
                "condition": ["No","Yes"],
                "questions": ["nearby_commercial"]
        }
        ]
    }, 
    "nearby_commercial": {
        "next": [
            {
                "condition": "Yes",
                "questions": ["commercial_type"]
            },
			{
                "condition": "No",
                "questions": ["bedrooms"]				
			}
        ]         
    },
    "commercial_type": {
        "next":[{
            "condition":"No",
            "questions":["business_type"]
        }],
        "decline": [
            {
                "condition": "Yes",
                "message": "Decline - not a nice neighberhood"
            }
        ]
    },
    "business_type": {
        "next": [
            {
                "condition": dtu.true,
                "questions": ["bedrooms"]
        }
        ]
    },
    "bedrooms": {
        "next": [
            {
                "condition": dtu.true,
                "questions": ["swimming_pool"]
        }
        ]
    },
    "swimming_pool": {
        "next": [
            {
                "condition": "Yes",
                "questions": ["pool_spendings"]},
            {
                "condition": "No",
                "questions": ["thatched_roof"]}            
        ]        
    },
    "pool_spendings": {        
        "next": [
        {
            "condition": dtu.true,
            "questions": ["thatched_roof"]
        }
    ]},
    "thatched_roof": {
        "next": [
            {
                "condition": "Yes",
                "questions": ["detached_house"]},
            {
                "condition": "No",
                "questions": ["septic_tank"]}            
        ]        
    },
    "detached_house": {
        "next":[{
            "condition":"Yes",
            "questions":["roof_maintanance"]
        }],
        "decline": [
            {
                "condition": "No",
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "roof_maintanance": {        
        "next": [
        {
            "condition": dtu.true,
            "questions": ["septic_tank"]
        }
    ]},
    "septic_tank": {
        "next": [
            {
                "condition": "Yes",
                "questions": ["tank_compliance"]},
            {
                "condition": "No",
                "questions": ["listed_building"]}            
        ]        
    },
    "tank_compliance": {
        "next":[{
            "condition":["Yes","Unknown"],
            "questions":["sole_tank"]
        }],
        "decline": [
            {
                "condition": "No",
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "sole_tank": {
        "next":[{
            "condition":"Yes",
            "questions":["listed_building"]
        }],
        "decline": [
            {
                "condition": "No",
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "listed_building": {
        "next": [
            {
                "condition": "Yes",
                "questions": ["grade"]},
            {
                "condition": "No",
                "questions": ["age_restricted"]}            
        ]        
    },
    "grade": {
        "next":[{
            "condition":['Grade 2*/2', 'Grade B/C (Scotland)'],
            "questions":["age_restricted"]
        }],
        "decline": [
            {
                "condition": 'Grade 1/A',
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "age_restricted": {
        "next": [
            {
                "condition": "Yes",
                "questions": ["3_years"]},
            {
                "condition": "No",
                "questions": ["estate_fees"]}            
        ]        
    },
    "3_years": {
        "next":[{
            "condition":"No",
            "questions":["exit_fee"]
        }],
        "decline": [
            {
                "condition": 'Yes',
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "exit_fee": {
        "next":[{
            "condition":"No",
            "questions":["estate_fees"]
        }],
        "decline": [
            {
                "condition": 'Yes',
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "estate_fees": {
        "next": [
            {
                "condition": "Yes",
                "questions": ["management_share"]},
            {
                "condition": "No",
                "questions": ["property_extension"]}            
        ]        
    },
    "management_share": {
        "next":[{
            "condition":"Yes",
            "questions":["annual_costs"]
        }],
        "decline": [
            {
                "condition": 'No',
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "annual_costs": {
        "next":[{
            "condition":dtu.true,
            "questions":["property_extension"]
    }]},
    "property_extension": {
        "next": [
            {
                "condition": "Yes",
                "questions": ["approved_plans"]},
            {
                "condition": "No",
                "questions": ["flooded"]}            
        ]        
    },
    "approved_plans": {
        "next":[{
            "condition":"Yes",
            "questions":["flooded"]
        }],
        "decline": [
            {
                "condition": 'No',
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "flooded": {
        "next": [
            {
                "condition": "Yes",
                "questions": ["flood_measures"]},
            {
                "condition": "No",
                "questions": ["solar_panels"]}            
        ]        
    },
    "flood_measures": {
        "next":[{
            "condition":"Yes",
            "questions":["refused_insurance"]
        }],
        "decline": [
            {
                "condition": 'No',
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "refused_insurance": {
        "next":[{
            "condition":"No",
            "questions":["solar_panels"]
        }],
        "decline": [
            {
                "condition": 'Yes',
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "solar_panels": {
        "accept": [{
            "condition": "No"
        }],
        "next": [{
            "condition": dtu.solarPanels,
            "questions": ["certified_panels"]
        }],
        "decline": [
            {
                "condition": dtu.solarPanels,
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "certified_panels": {
        "next":[{
            "condition":"Yes",
            "questions":["owned_panels"]
        }],
        "decline": [
            {
                "condition": 'No',
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "owned_panels": {
        "next":[{
            "condition":"No",
            "questions":["panles_lease"]
        }],
        "decline": [
            {
                "condition": 'Yes',
                "message": "Decline - unsupported property type"
            }
        ]
    },
    "panles_lease": {
        "next":[{
            "condition":dtu.true,
            "questions":["accepted_provider"]
    }]},
    "accepted_provider": {
        "accept":[{
            "condition":"Yes"
        }],
        "decline": [
            {
                "condition": 'No',
                "message": "Decline - unsupported property type"
            }
        ]
    },
}