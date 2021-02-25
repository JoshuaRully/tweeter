// backup usage of .ready() in case defer is forgotten or removed
$(document).ready(function() {
  $(charCount).keyup(updateCount);
});

// updates character counter and changes to red if limit is passed\
const charCount = '#tweet-text';
const updateCount = function() {
  let remainder = 140 - $(this).val().length;
  $('.counter').text(remainder); // TODO: refactor to using .parent() etc.
  if (remainder < 0) {
    $('output').attr('id', 'alert-text');
  } else {
    $('output').removeAttr('id');
  }
};
