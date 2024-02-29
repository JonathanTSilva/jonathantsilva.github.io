(function () {
  "use strict";

  let forms = document.querySelectorAll('.contact-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      if( ! action ) {
        displayMsg(thisForm, 'The form action property is not set!', false);
        return;
      }

      let name = $('#name').val();
      let email = $('#email').val();
      let subject = $('#subject').val();
      let message = $('textarea[name="message"]').val();

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      $.ajax({
        url: action,
        method: 'POST',
        data: {
          name: name,
          email: email,
          subject: subject,
          message: message,
          _captcha: false
        },
        dataType: 'json',
        success: function() {
          displayMsg(thisForm, 'Your message has been sent. Thank you!', true);
          // $('.modal-body').text('Your message has been sent. Thank you!');
          // $('#messageModal').modal('show');
        },
        error: function() {
          displayMsg(thisForm, 'An error occurred. Please try again.', false);
          // $('.modal-body').text('An error occurred. Please try again.');
          // $('#messageModal').modal('show');
        }
      });

    });
  });

  function displayMsg(thisForm, message, isSuccess) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    if (isSuccess) {
      let sentMessageDiv = thisForm.querySelector('.sent-message');
      sentMessageDiv.innerHTML = message;
      sentMessageDiv.classList.add('d-block');
    } else {
      let errorMessageDiv = thisForm.querySelector('.error-message');
      errorMessageDiv.innerHTML = message;
      errorMessageDiv.classList.add('d-block');
    }
  }

})();
