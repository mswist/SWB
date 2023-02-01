const DTUtils = {
	checkAge: (value) => {
		return value > 95
	},
	checkServiceCharge: (value) => {
		return (value / 500000) <= 0.02
	},
	checkGroundService: (value) => {
		return (value / 500000) <= 0.001
	},
	true: () => {
		return true
	},
	solarPanels: (value, neg) => {
		if(neg && value == "No") return true 
		else return (document.forms["actionForm"].elements["property_flat"]?.value == "No" && value == "Yes")
	}
}

let dtu = DTUtils