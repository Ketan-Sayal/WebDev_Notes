const btn = document.getElementById("btn");
const todoContainer = document.getElementById("todo-container");
const input = document.getElementById("inp");
const todos = [];


function render(){
    todoContainer.innerHTML = "";
    todos.forEach((item)=>{
        let div = document.createElement("div");
        div.innerHTML = `${item.id}. ${item.task}`;
        todoContainer.append(div);
    });
}

btn.addEventListener("click", (e)=>{
    e.stopPropagation();
    let val = input.value;
    if(val.trim()!=""){
        todos.push({id:todos.length+1, task:val.trim()});
        render();
        input.value = "";
    }
});

render();