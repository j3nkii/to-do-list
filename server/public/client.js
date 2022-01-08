$(ready)
function ready(){
    $(document).on('submit', '#task-form', addTask)
    renderTasks();
}


function renderTasks(){
    $('#taskTable').empty();
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log(response);
        //$('.taskTable').empty();
        for(let task of response){
            console.log(task);
            $('#taskTable').append(`
                <tr data-id = "${task.id}">
                    <td>${task.task}</td>
                    <td>${task.importance}</td>
                    <td>${task.dueBy}</td>
                </tr>
            `);
        }
    }).catch(function(error){
        console.log('error in GET', error);
    });
}



function addTask(event){
    event.preventDefault();
    let taskAtHand = {
        task: $('#task-input').val(),
        importance: $('#task-importance').val(),
        dueBy: $('#task-date').val()
    }
    console.log(taskAtHand);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {package: taskAtHand},
    }).then((response) => {
        console.log(':POST:', response);
        renderTasks();
    })
}