$(document).ready(function () {

    $('.img-link').attr('href', function () {
        return 'subGallery' + '?img=' + $(this).attr('href')
    });

    $('.video-link').attr('href', function () {
        return 'subGallery' + '?video=' + $(this).attr('href')
    });

    $('.folder-link').on('click', function () {
        window.location.href = window.location + $(this).text();
    });

});