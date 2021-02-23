// backup usage of .ready() in case defer is forgotten or removed
$(document).ready( function() {
  const charCount = '#tweet-text';
  const updateCount = function() {
    let remainder = 140 - $(this).val().length;
    $('.counter').text(remainder);
    if (remainder < 0) {
      $('output').attr('id', 'alert-text');
    } else {
      $('output').removeAttr('id');
    } 
  }
  $(charCount).keyup(updateCount);
});