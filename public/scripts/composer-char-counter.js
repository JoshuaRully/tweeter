// backup usage of .ready() in case defer is forgotten or removed
$(document).ready( function() {
  const charCount = ".new-tweet textarea";
  const updateCount = function() {
    let remainder = 140 - $(this).val().length;
    $(".counter").text(remainder);
  }
  $(charCount).keyup(updateCount);
});