console.log("js loaded")

/* document.getElementById("correlationId").value = (() => {
    let currentDateString = (new Date()).toJSON().replaceAll(/-|T|:|\.|Z/g,'').slice(0,16)
    currentDateString = currentDateString.split('').map(b => b.charCodeAt(0).toString(16)).join('')
    return currentDateString.padEnd(48, '0')
})() */

document.getElementById("createMessage").addEventListener("click", e => {
    const result = document.querySelector("textarea").value
    sendResult(result)
    //document.querySelector("textarea").value = ''
})

const sendResult = async (result) => {
    let req = await fetch('./valuation_result', {
        'method': 'POST',
        'body': result
    })
}

const statusMessage = `<HXML>
    <HEADER HdrVersion="4" MsgName="VSWB.UPD.PRA.STATUS.REQ" MsgVersion="1" Origin="Colleys" Mode="PRD" UserID="Covis" UserInitials="Covis" UserRole="USER5" Location="1696" IPAddress="10.172.51.64" ComputerName="APPDIV0FCC" MsgIDNo="COLLEYSMSGID20230403161229717" ConvIDNo="NMSP1TEST" />
    <DATA>
        <REQUEST CASECODE="KasiaDemo066" STATDATE="2023-04-03" STATTIME="16:12:27" MOROLLNO="665363747000000" REQUESTN="90000066" PROPADD1="  Thead" PROPPOST="HX1 3QR" STATTYPE="B" APPTDATE="2022-12-22" UPDATMES="04031613HV400B.Appointment booked for 22 DEC 2022" />
    </DATA>
</HXML>`

document.querySelector("textarea").value = statusMessage
document.getElementById("correlationId").value = "752CA7A1EDE0F94C919446BFBE8442A80000000000000000"