$(function () {
  $(document).tooltip();
});


$(document).ready(function() {
    $("#contact-date").datepicker({
      dateFormat: "dd-mm-yy",
      minDate: 0
    });

    $("#contact-form").submit(function(e) {
      e.preventDefault();
  
      const fullName = $("#full-name").val().trim();
      const email = $("#email").val().trim();
      const subject = $("#subject").val().trim();
      const message = $("#message").val().trim();

      if (fullName.length < 3) {
        alert("Full Name must be at least 3 characters long!");
        return;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        alert("Please enter a valid email address!");
        return;
      }

      if (subject === "") {
        alert("Please enter a subject!");
        return;
      }

      if (message === "") {
        alert("Please write your message!");
        return;
      }

      $("#contact-form").fadeOut(500, function() {
        $("<div class='success-message'>✅ Thank you! We will contact you soon.</div>")
          .hide()
          .appendTo(".contact-form")
          .fadeIn(800);

        setTimeout(function() {
          $(".success-message").fadeOut(800, function() {
            $(this).remove();
            $("#contact-form")[0].reset();
            $("#contact-form").fadeIn(500);
          });
        }, 5000);
      });
    });
  });
  