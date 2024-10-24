$(document).ready(function() {
    $('#createCredential').on('click', function(event) {
        event.preventDefault();

        $('#name').removeClass('input-error');
        $('#username').removeClass('input-error');
        $('#password').removeClass('input-error');
        $('#url').removeClass('input-error');

        $('#nameError').text('');
        $('#usernameError').text('');
        $('#passwordError').text('');
        $('#urlError').text('');

        var urlPath = window.location.pathname;
        var vaultId = urlPath.match(/\/vault\/(\d+)/)[1];

        var formData = new FormData($('#form-create-credential')[0]);

        formData.append('vault', vaultId);

        $.ajax({
            url: '/vaults/credential',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            success: function(data) {
                $('#form-create-credential').trigger('reset');

                closeModal('modal-create-credential');

                $('.alert-success').show();
                $('.alert-title').text(data.message);

                setTimeout(function () {
                    $('.alert-title').text('');
                    $('.alert-success').hide();
                }, 3000);
            },
            error: function(xhr, status, error) {
                var response = JSON.parse(xhr.responseText);
                if (response.errors) {
                    if (response.errors.name) {
                        $('#nameError').text(response.errors.name);
                        $('#name').addClass('input-error');
                    }
                    if (response.errors.username) {
                        $('#usernameError').text(response.errors.username);
                        $('#username').addClass('input-error');
                    }
                    if (response.errors.password) {
                        $('#passwordError').text(response.errors.password);
                        $('#password').addClass('input-error');
                    }
                    if (response.errors.url) {
                        $('#urlError').text(response.errors.url);
                        $('#url').addClass('input-error');
                    }
                }
            
            }
        });
    });

    // update credential
    $('#updateCredential').on('click', function(event) {
        event.preventDefault();

        $('#name-view').removeClass('input-error');
        $('#username-view').removeClass('input-error');
        $('#password-view').removeClass('input-error');
        $('#url-view').removeClass('input-error');

        $('#nameError-view').text('');
        $('#usernameError-view').text('');
        $('#passwordError-view').text('');
        $('#urlError-view').text('');


        var formData = new FormData($('#form-view-credential')[0]);

        var urlPath = window.location.pathname;
        var vaultId = urlPath.match(/\/vault\/(\d+)/)[1];

        var data = {};

        formData.forEach(function(value, key){
            data[key] = value;
        });

        data['vault'] = vaultId;

        $.ajax({
            url: '/vaults/credential/' + $('#credentialId').val(),
            type: 'PUT',
            data: JSON.stringify(data),
            processData: false,
            contentType: false,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            success: function(data) {
                $('#form-view-credential').trigger('reset');

                closeModal('modal-view-credential');

                $('.alert-success').show();
                $('.alert-title').text(data.message);

                setTimeout(function () {
                    $('.alert-title').text('');
                    $('.alert-success').hide();
                }, 3000);
            },
            error: function(xhr, status, error) {
                var response = JSON.parse(xhr.responseText);
                if (response.errors) {
                    if (response.errors.name) {
                        $('#nameError-view').text(response.errors.name);
                        $('#name-view').addClass('input-error');
                    }
                    if (response.errors.username) {
                        $('#usernameError-view').text(response.errors.username);
                        $('#username-view').addClass('input-error');
                    }
                    if (response.errors.password) {
                        $('#passwordError-view').text(response.errors.password);
                        $('#password-view').addClass('input-error');
                    }
                    if (response.errors.url) {
                        $('#urlError-view').text(response.errors.url);
                        $('#url-view').addClass('input-error');
                    }
                }
            
            }
        });
    });

    // delete credential
    $('#deleteCredential').on('click', function(event) {
        event.preventDefault();

        $.ajax({
            url: '/vaults/credential/' + $('#credentialId').val(),
            type: 'DELETE',
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            success: function(data) {
                closeModal('modal-view-credential');

                $('.alert-success').show();
                $('.alert-title').text(data.message);

                setTimeout(function () {
                    $('.alert-title').text('');
                    $('.alert-success').hide();
                }, 3000);
            },
            error: function(xhr, status, error) {
                var response = JSON.parse(xhr.responseText);

                $('.alert-success').show();
                $('.alert-title').text(response.message);

                setTimeout(function () {
                    $('.alert-title').text('');
                    $('.alert-success').hide();
                }, 3000);
            }
        });
    });

    $('.options-toggle').on('click', function(event) {
        event.stopPropagation();

        var $menu = $(this).next('.options-menu');

        $menu.toggle();  
    });

    $(document).on('click', function() {
        $('.options-menu').hide();
    });
});

function openModalViewCredential(id, name, username, password, url, description) {
    openModal('modal-view-credential');

    $('#credentialId').val(id);
    $('#name-view').val(name);
    $('#username-view').val(username);
    $('#password-view').val(password);
    $('#url-view').val(url);
    $('#description-view').val(description);
}

function randomPassword(size, idInputPassword) {
    const inputPassword = document.getElementById(idInputPassword);

    const caracteresEspeciais = '!@#$%^&*()';
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const letrasMaiusculas = letrasMinusculas.toUpperCase();
    const numeros = '0123456789';

    const caracteres = caracteresEspeciais + letrasMinusculas + letrasMaiusculas + numeros;

    let password = '';

    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        password += caracteres.charAt(randomIndex);
    }

    inputPassword.value = password
}

function seePassword(eyeIcon, passwordInput) {
    const togglePassword = document.getElementById(eyeIcon);
    const input = document.getElementById(passwordInput);

    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);

    const iconSrc = type === 'password' ? "/static/icons/eye.svg" : "/static/icons/eye-off.svg";
    togglePassword.setAttribute('src', iconSrc);
}

function copyInput(idInputText, text) {
    const inputText = document.getElementById(idInputText).value;

    navigator.clipboard.writeText(inputText).then(() => {
        showAlert(text);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function showAlert(message) {
    const alertBox = document.querySelector('.alert.alert-success');
    const alertTitle = alertBox.querySelector('.alert-title');
    
    alertTitle.textContent = message;
    
    alertBox.style.display = 'flex';
    
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}