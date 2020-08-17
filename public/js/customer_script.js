$(document).ready(function () {
    $('.btn-del').on('click', function () {
        var id = $(this).parents('tr').attr("id");
        $.get('/customer/delete?id=' + id);
        window.location.replace('./customer');
    })

    $('.btn-create').on('click', function () {
        $.post('/customer/create', {
            id: $('.id').val(),
            name: $('.name').val(),
            date: $('.date').val(),
            phone: $('.phone').val(),
            email: $('.email').val()
        }, function (data, status) {
            alert(status);
        });

        window.location.href = './customer';
    })
});