console.log("js loaded")

/* document.getElementById("correlationId").value = (() => {
    let currentDateString = (new Date()).toJSON().replaceAll(/-|T|:|\.|Z/g,'').slice(0,16)
    currentDateString = currentDateString.split('').map(b => b.charCodeAt(0).toString(16)).join('')
    return currentDateString.padEnd(48, '0')
})() */

document.getElementById("createMessage").addEventListener("click", async e => {
    const result = document.querySelector("textarea").value
    const correlationId =  document.getElementById("correlationId").value
    resp = await sendResult(result, correlationId)
    storeMessage(result, correlationId, resp.msgId)
    //document.querySelector("textarea").value = ''
})

const sendResult = async (result, correlationId) => {
    let req = await fetch('./valuation_result', {
        'method': 'POST',
        'body': JSON.stringify({
            "msg": result,
            "correlationId": correlationId
        })
    });
    return await req.json()
}

const storeMessage = (result, correlationId, msgId) => {
    const table = document.querySelector("#messages tbody")
    let row = document.createElement("tr")
    row.insertAdjacentHTML("beforeend", `<td>${(new Date()).toISOString()}</td>`)
    row.insertAdjacentHTML("beforeend", `<td>${msgId}</td>`)
    row.insertAdjacentHTML("beforeend", `<td>${correlationId}</td>`)
    let content = document.createElement("td")
    content.textContent = result.trim()
    row.insertAdjacentElement("beforeend", content)
    row.insertAdjacentHTML("beforeend", `<td></td>`)
    row.dataset.target = "create-message"
    row.onclick = (e) => { toggleModal(e) }
    table.appendChild(row)
}

const getAcknowledgments = async () => {
    let acknowledgment = await fetch('./messages')
    acknowledgment = await acknowledgment.json()
    let match = false
    if(acknowledgment.status == 200) {
        [...document.querySelectorAll('#messages tbody tr')].forEach(tr => {
            if( tr.cells[1].textContent.toLowerCase() == acknowledgment.msgId.toLowerCase() &&
                tr.cells[2].textContent.toLowerCase() == acknowledgment.correlationId.toLowerCase()) {
                    tr.cells[4].textContent = "\u2714"
                    match = true
                }
        })
        storeAcknowledgment(acknowledgment, match);
    }
    setTimeout(getAcknowledgments, 3000)
}

const storeAcknowledgment = (acknowledgment, match) => {
    const table = document.querySelector("#acknowledgments tbody")
    let row = document.createElement("tr")
    row.insertAdjacentHTML("beforeend", `<td>${(new Date()).toISOString()}</td>`)
    row.insertAdjacentHTML("beforeend", `<td>${acknowledgment.msgId}</td>`)
    row.insertAdjacentHTML("beforeend", `<td>${acknowledgment.correlationId}</td>`)
    let content = document.createElement("td")
    content.textContent = acknowledgment.msg.trim()
    row.insertAdjacentElement("beforeend", content)
    row.insertAdjacentHTML("beforeend", `<td>${match?"\u2714":""}</td>`)
    row.dataset.target = "create-message"
    row.onclick = (e) => { toggleModal(e) }
    table.appendChild(row)    
}

getAcknowledgments()

const newMsg = {
    "msg": `<HXML>
    <HEADER HdrVersion="4" MsgName="VSWB.UPD.PRA.STATUS.REQ" MsgVersion="1" Origin="Colleys" Mode="PRD" UserID="Covis" UserInitials="Covis" UserRole="USER5" Location="1696" IPAddress="10.172.51.64" ComputerName="APPDIV0FCC" MsgIDNo="COLLEYSMSGID20230403161229717" ConvIDNo="NMSP1TEST" />
    <DATA>
        <REQUEST CASECODE="KasiaDemo066" STATDATE="2023-04-03" STATTIME="16:12:27" MOROLLNO="665363747000000" REQUESTN="90000066" PROPADD1="  Thead" PROPPOST="HX1 3QR" STATTYPE="B" APPTDATE="2022-12-22" UPDATMES="04031613HV400B.Appointment booked for 22 DEC 2022" />
    </DATA>
</HXML>`, 
    "correlationId": "752CA7A1EDE0F94C919446BFBE8442A80000000000000000"
}

