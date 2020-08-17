$(document).ready(function () {
    $('.btn-logout').on('click', function () {
        $.get('/logout', function (data, status) {
            window.location.href = "/";
        });

    });

})