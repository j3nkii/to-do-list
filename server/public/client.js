$(ready)
function ready(){
    renderTasks();
}


function renderTasks(){
    console.log('isRedner');
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