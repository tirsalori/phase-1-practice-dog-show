// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById("dog-form")
//     fetch("http://localhost:3000/dogs")
//         .then((response) => response.json())
//         .then((data) => data.forEach(dogObj => {
//             const table = document.getElementById("table-body")
//             const tr = document.createElement("tr")
//             const btn = document.createElement("button")
//             btn.innerText = "Edit Dog"
//             btn.setAttribute("class", "edit-btn")
//             tr.insertCell(0).innerText = dogObj.name
//             tr.insertCell(1).innerText = dogObj.breed
//             tr.insertCell(2).innerText = dogObj.sex
//             tr.insertCell(3).appendChild(btn)
//             table.appendChild(tr)
//             btn.addEventListener("click", () => {
//                 form.elements[0].value = dogObj.name
//                 form.elements[1].value = dogObj.breed
//                 form.elements[2].value = dogObj.sex
//                 form.addEventListener("submit", e => {
//                     table.remove()
//                     const newTable = document.createElement("tbody")
//                     const tableContainer = document.querySelector("table")
//                     newTable.setAttribute("id", "table-body")
//                     tableContainer.appendChild(newTable)
//                     e.preventDefault()
//                     fetch(`http://localhost:3000/dogs/${dogObj.id}`, {
//                         method: "PATCH",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Accept: "application/json",
//                         },
//                         body: JSON.stringify({
//                             "name": e.target[0].value,
//                             "breed": e.target[1].value,
//                             "sex": e.target[2].value
//                         })
//                     })   
//                         .then((resp) => {
//                             if (resp.status === 200) {
//                                 fetch("http://localhost:3000/dogs")
//                                     .then((r) => r.json())
//                                     .then((d) => d.forEach(revDogObj => {
//                                         const newRow = document.createElement("tr")
//                                         const newBtn = document.createElement("button")
//                                         newBtn.innerText = "Edit Dog"
//                                         newBtn.setAttribute("id", "edit-btn")
//                                         newRow.insertCell(0).innerText = revDogObj.name
//                                         newRow.insertCell(1).innerText = revDogObj.breed
//                                         newRow.insertCell(2).innerText = revDogObj.sex
//                                         newRow.insertCell(3).appendChild(newBtn)
//                                         newTable.appendChild(newRow)
//                             }))
//                     }
//                 })
//             })
//         })
//     }))
// })

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

function populateForm(el) {
    let table = document.getElementById("table-body")
    const tableRows = document.getElementById("table-body").rows
    let rowIndex = el.target.parentElement.parentElement.rowIndex
    form.elements[0].value = tableRows[rowIndex-1].cells[0].innerText
    form.elements[1].value = tableRows[rowIndex-1].cells[1].innerText
    form.elements[2].value = tableRows[rowIndex-1].cells[2].innerText
    form.addEventListener("submit", e => {
        table.remove()
        const newTable = document.createElement("tbody")
        const tableContainer = document.querySelector("table")
        newTable.setAttribute("id", "table-body")
        tableContainer.appendChild(newTable)
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
    })
} 
            
    
