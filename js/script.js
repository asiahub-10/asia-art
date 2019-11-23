$(document).ready(function(){
    $("#showBtn").click(function(){
        $("#showLess").show(500);
        $('#showMore').hide();
    });
    $("#hideBtn").click(function(){
        $("#showLess").hide(500);
        $("#showMore").show();
    });

});


$('.portfolio-item').isotope({
    itemSelector : '.item',
    layoutModel : 'fitRows'
});

$('.portfolio-menu ul li').click(function () {
    $('.portfolio-menu ul li').removeClass('active');
    $(this).addClass('active');

    var selector = $(this).attr('data-filter');
    $('.portfolio-item').isotope({
        filter: selector
    });
});

lightbox.option({
    'resizeDuration' : 2000,
    'wrapAround' : true,
    'alwaysShowNavOnTouchDevice' : true,
    'disableScrolling' : true,
    'positionFromTop': 50,
    'showImageNumberLabel' : true
});




// count up plugin

$('.counter').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count');
    $({ countNum: $this.text()}).animate({
            countNum: countTo
        },
        {
            duration: 8000,
            easing:'linear',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(this.countNum);
                //alert('finished');
            }
        });
});

// count up plugin





function ckeckFirstName() {
    var firstName = $('#firstName').val();
    var regExp = /^[a-zA-Z ]{2,20}$/;
    if (regExp.test(firstName)){
        $('#firstNameError').text(' ');
        return true;
    } else {
        $('#firstNameError').text('Use a to z, A to Z and space');
        return false;
    }
}
$('#firstName').keyup(function () {
    ckeckFirstName();
});

function ckecklastName() {
    var lastName = $('#lastName').val();
    var regExp = /^[a-zA-Z ]{2,20}$/;
    if (regExp.test(lastName)){
        $('#lastNameError').text(' ');
        return true;
    } else {
        $('#lastNameError').text('Use a to z, A to Z and space');
        return false;
    }
}
$('#lastName').keyup(function () {
    ckecklastName();
});

function checkEmailAddress() {
    var email = $('#email').val();
    var regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (regExp.test(email)){
        $('#emailError').text(' ');
        return true;
    } else {
        $('#emailError').text('Invalid email address');
        return false;
    }
}
$('#email').keyup(function () {
    checkEmailAddress();
});

function checkPassword() {
    var password = $('#password').val();
    var regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (regExp.test(password)){
        $('#passwordError').text(' ');
        return true
    } else {
        $('#passwordError').text('Password at least 6 character with 0-9, one special character, a-z');
        return false;
    }
}
$('#password').keyup(function () {
    checkPassword();
});

$('#showHide').click(function () {
    var type = $('#password').attr('type');
    if (type == 'password'){
        $('#password').attr('type', 'text');
    } else {
        $('#password').attr('type', 'password');
    }
})

function ckeckComfirmPassword() {
    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();
    if (password == confirmPassword){
        $('#confirmPasswordError').text(' ');
        return true;
    } else {
        $('#confirmPasswordError').text('Password & confirm password are not same');
        return false;
    }
}
$('#confirmPassword').keyup(function () {
    ckeckComfirmPassword();
});

function ckeckPhoneNumber() {
    var phoneNumber = $('#phoneNumber').val();
    var regExp = /\+?(88)?0?1[3456789][0-9]{8}\b/;
    if (regExp.test(phoneNumber)){
        $('#phoneNumberError').text(' ');
        return true;
    }else {
        $('#phoneNumberError').text('Phone number is invalid');
        return false;
    }
}
$('#phoneNumber').keyup(function () {
    ckeckPhoneNumber();
});


function ckeckdistrictName() {
    var districtName = $('#districtName').val();
    if (districtName == ' '){
        // if (districtName == 'a'){
        $('#districtNameError').text('Please select a valid district name');
        return false;
    }else {
        $('#districtNameError').text(' ');
        return true;
    }
}
$('#districtName').change(function () {
    ckeckdistrictName();
})


function checkGenderInfo() {
    var genderInfo = $('input[type="radio"]:checked').val();
    if (genderInfo == null){
        $('#genderError').text('Please select your gender');
        return false;
    }else {
        $('#genderError').text(' ');
        return true;
    }
}


$('#registrationForm').submit(function () {
    if (
        ckeckFirstName() == true &&
        ckecklastName() == true &&
        checkEmailAddress() == true &&
        checkPassword() == true &&
        ckeckComfirmPassword() == true &&
        ckeckPhoneNumber() == true &&
        ckeckdistrictName() == true &&
        checkGenderInfo() == true
    ){
        return true;
    }else {
        return false;
    }
});

