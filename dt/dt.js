const form = document.forms["actionForm"].querySelector(".dl-wrapper dl")
const q_template = document.querySelector("#question")
const d_template = document.querySelector("#decline")
const a_template = document.querySelector("#accept")
const questions = DTquestions

const DecisionTree = {
	//shows next question
	showQuestion: (question) => {
		let question_data = questions[question]
		let line = q_template.content.cloneNode(true);
		line.querySelector("dt").innerHTML = question_data.label;
		let element = DecisionTree.buildElement(question_data, question)
		element.dataset.question = question
		line.appendChild(element)
		form.appendChild(line)
		element.querySelector("input")?.focus()		        
	},
	//builds html data element for next question
	buildElement: (data, name) => {
		let element = document.createElement("dd");
		element.style = "float: left"
		if(Array.isArray(data.type)) {
			element.appendChild(DecisionTree.buildSelect(data.type))
		}
		else if(data.type === Boolean) {
			element.insertAdjacentHTML("beforeend",`<input data-question=${name} name=${name} value="Yes" type="radio">Yes</input`)
			element.insertAdjacentHTML("beforeend",`<input data-question=${name} name=${name} value="No" type="radio">No</input`)
		}
		else if(data.type === "number") {
			let input = document.createElement("input")
			input.type = "number"
			if(data.max) input.max = data.max 
			element.appendChild(input)
		}
		return element
	},
	//builds Select HTML element with available answers
	buildSelect: (type) => {
		let select = document.createElement("select")
		type.forEach(answer => {
			let option = document.createElement("option")
			option.textContent = answer;
			select.appendChild(option)
		})
		return select
	},
	validateCondition: (condition, value, neg = false) => {
		if(typeof condition === "function") {
			return neg?(!condition(value)):(condition(value))
		}
		else if (Array.isArray(condition)) {
			return condition.includes(value)
		}
		else return condition == value 
	}
}

const dt = DecisionTree

let initial_question = Object.keys(questions).find(q => questions[q].initial)
dt.showQuestion(initial_question)
document.forms["actionForm"].addEventListener("submit", (e)=>{
	e.preventDefault()
})

form.addEventListener("change", (e) => {
	let current_qestion = e.target.parentElement
	//delete all subsequent questions
	while(['DD','DT','P'].includes(current_qestion?.nextElementSibling?.nodeName)) {
		form.removeChild(current_qestion.nextElementSibling)
	}  
	let next_action = flow[e.target?.parentElement?.dataset?.question]?.next
	if(next_action) {
		next_action.forEach(next => {
			if(dt.validateCondition(next.condition, e.target.value)) {
				next.questions.forEach( q => dt.showQuestion(q))
			}
		}) 
	}
	let decline_action = flow[e.target?.parentElement?.dataset?.question]?.decline
	if(decline_action) {        
		decline_action.forEach(decline => {
			if(dt.validateCondition(decline.condition, e.target.value, true)) {
				let p_decline = d_template.content.cloneNode(true);
				p_decline.firstElementChild.textContent = decline.message;
				form.appendChild(p_decline)                    
			}
		}) 
	}
	let accept_action = flow[e.target?.parentElement?.dataset?.question]?.accept
	if(accept_action) {        
		accept_action.forEach(accept => {
			if(dt.validateCondition(accept.condition, e.target.value, true)) {
				let p_accept = a_template.content.cloneNode(true);
				form.appendChild(p_decline)                    
			}
		}) 
	}

})


