let deleteID;
$(ready)
function ready(){
    $(document).on('submit', '#task-form', addTask)
    $(document).on('click', '#delete-button', deleteTask)
    $(document).on('click', '#complete-button', completeTask)
    $('#taskDeletion').on('click', function(){
        console.log('workinggggg');
        $.ajax({
                type: 'DELETE',
                url: `/tasks/${deleteID}`
            }).then((res) => {
                renderTasks();
                console.log('delete ajax');
            }).catch((err) => {
                console.log('FAILED:', err);
            });
        })
    renderTasks();
}


function renderTasks(){
    $('#taskTable').empty();
    $('#doneTaskTable').empty();
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log(response);
        //$('.taskTable').empty();
        for(let task of response){
            $(`${task.completed ? '#doneTaskTable' :'#taskTable'}`).append(`
                <tr data-id = "${task.id}">
                    <td data-completed="${task.completed}">
                        <button class="${task.completed ? "btn btn-secondary" : "btn btn-success"}" id="complete-button">${task.completed ? 'Completed' : 'Not Yet'}</button>
                    </td>
                    <td>${task.task}</td>
                    <td>${task.importance}</td>
                    <td>${dateFormatter(task.completed ? task.dateCompleted : task.dueBy)}</td>
                    <td>
                        <!-- Button trigger modal -->
                        <button id="delete-button" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal">
                            Delete
                        </button>
                    </td>
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
    }).catch((err) => {
        console.error('POST failed', err); 
        console.log('POST failed', err)
    });
}


//putting the modal here allows my to use the $(this) to get the id
//the actual function to delete happens in the ready func... to be refactored
function deleteTask(){
    deleteID = $(this).parents('tr').data('id');
    $('#delete-modal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })
    
}



function completeTask(){
    let completed = $(this).parent().data('completed') ? false : true;
    $.ajax({
        method: 'PUT',
        url: `/tasks/${$(this).parents('tr').data('id')}`,
        data: {
            completed: completed,
            dateCompleted: 'now'
        }
    }).then((res) => {
        console.log('UPDATE:', res);
        renderTasks();
    }).catch((err) => {
        console.log('FAILED:', err);
    });
}