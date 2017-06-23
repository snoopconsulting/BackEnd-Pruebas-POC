$(function() {
    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '400px' });
    showForm(client);
});

function showForm(client) {
    var source = $("#add_task-hdbs").html();
    var template = Handlebars.compile(source);
    var html = template();
    $("#content").html(html);

    $("#add-btn").click(function(event) {
        event.preventDefault();
        if ($("#name").val().length == 0) {
            client.invoke('notify', 'Name can\'t be blank.', 'error');
        } else {                  // good to go
            var task = {
                data: {
                    name: $("#name").val(),
                    notes: $("#notes").val(),
                    projects: [parseInt($("#project-id").val())]
                }
            };
            sendTaskData(task, client);
        }
    });
}

function sendTaskData(task, client) {
    token = 'your_personal_access_token';
    var settings = {
        url: 'https://app.asana.com/api/1.0/tasks',
        headers: {"Authorization": "Bearer " + token},
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(task)
    };
    client.request(settings).then(
        function() {
            client.invoke('notify', 'Task successfully added to Asana.');
            $('#task-form')[0].reset();
        },
        function(response) {
            var msg = 'Error ' + response.status + ' ' + response.statusText;
            client.invoke('notify', msg, 'error');
        }
    );
    client.invoke('notify', 'Task sent! Please wait...');
}
