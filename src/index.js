const form = document.getElementById("dog-form")
document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/dogs")
        .then((response) => response.json())
        .then((data) => data.forEach(dogObj => populateTable(dogObj)))
})

function populateTable(dogObj) {
    let table = document.getElementById("table-body")
    const tr = document.createElement("tr")
    const btn = document.createElement("button")
    btn.innerText = "Edit Dog"
    btn.setAttribute("class", "edit-btn")
    tr.insertCell(0).innerText = dogObj.name
    tr.insertCell(1).innerText = dogObj.breed
    tr.insertCell(2).innerText = dogObj.sex
    tr.insertCell(3).appendChild(btn)
    table.appendChild(tr)
    btn.addEventListener("click", populateForm)
}

let rowIndex

function populateForm(el) {
    const tableRows = document.getElementById("table-body").rows
    rowIndex = el.target.parentElement.parentElement.rowIndex
    form.elements[0].value = tableRows[rowIndex-1].cells[0].innerText
    form.elements[1].value = tableRows[rowIndex-1].cells[1].innerText
    form.elements[2].value = tableRows[rowIndex-1].cells[2].innerText
}

form.addEventListener("submit", e => {
    document.getElementById("table-body").remove()
    let table = document.createElement("tbody")
    const tableContainer = document.querySelector("table")
    table.setAttribute("id", "table-body")
    tableContainer.appendChild(table)
    e.preventDefault()
        fetch(`http://localhost:3000/dogs/${rowIndex}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                "name": e.target[0].value,
                "breed": e.target[1].value,
                "sex": e.target[2].value
            })
        })   
            .then((resp) => {
                if (resp.status === 200) {
                    fetch("http://localhost:3000/dogs")
                        .then((r) => r.json())
                        .then((d) => d.forEach(dogObj => populateTable(dogObj)))
                }
            })
        }
)

            
    
