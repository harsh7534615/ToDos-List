
function getAndUpdate() {
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update();
}
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    // fill the values into the table
    let tableBody = document.getElementById("tableBody")
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
                <tr>
                <td><input class="form-check-input" type="checkbox" id="inlineCheckbox1" style="margin-left: 30px;" onclick="doneTask(${index})"></td>
                <td>${[element]}</td>
                <td><button class="btn btn-sm btn-warning py-2 px-4"  onclick="deleting(${index})">Delete</button></td>
                </tr>`;
    });
    tableBody.innerHTML = str;
}
const itemJsonArrayDone = [];
function updateDoneTask(itemJsonArrayTask){
    // populate the done task table
    let doneTask = document.getElementById("doneTask")
    let str = "";
    itemJsonArrayDone.push(itemJsonArrayTask)
    itemJsonArrayDone.forEach((element, index) => {
        str += `
                <tr>
                <td><input class="form-check-input" type="checkbox" id="inlineCheckbox1" checked style="margin-left: 30px;" "></td>
                <td>
                    <div style="text-decoration-line:line-through ;">
                        ${[element]}
                    </div>
                </td>
                </tr>`;
    });
    doneTask.innerHTML = str;
}
function deleting(itemIndex) {
    console.log("delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // delete itemindex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    update();
}
function clearstorage() {
    console.log("cleared");
    localStorage.clear();
    update();
    let doneTask = document.getElementById("doneTask")
    let str = "";
    doneTask.innerHTML = str;
}
function doneTask(itemIndex){
    itemJsonArrayTask = itemJsonArray[itemIndex];
    deleting(itemIndex);
    updateDoneTask(itemJsonArrayTask);
}
var input = document.getElementById("title");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("myBtn").click();
  }
});
// add = document.getElementById("add");
// add.addEventListener("click", getAndUpdate);
// update();
