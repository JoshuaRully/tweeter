// functions implemented below

// allows user to compose tweet without clicking on textarea
$("#write-btn").on("click", function () {
  $("#tweet-text").focus();
});

// changes epoch time to readable time
const humanTime = (epoch) => {
  const tweetTime = new Date(0);
  tweetTime.setUTCSeconds(epoch);
  return tweetTime;
};

// no more breaky breaky pal
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// styles tweet objects passed through it
const createTweetElement = (tweet) => {
  let $tweet = $(`
  <article class="tweets">
    <header>
      <div id="user-info">
        <img id="user-pic" src=${tweet.user.avatars} alt="No pic!"/>
        <p>${escape(tweet.user.name)}</p>
      </div>
      <p id="user">${escape(tweet.user.handle)}</p>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer>
      <p><time>${humanTime(tweet["created_at"])}</time></p>
      <div class="imgs">
        <img src="images/icons8-empty-flag-50.png" />
        <img src="images/icons8-retweet-50.png" />
        <img src="images/icons8-heart-50.png" />
      </div> 
    </footer>
  </article>
  `);
  return $tweet;
};

// loops through data and passes tweet objects to helper function
const renderTweets = (tweets) => {
  $(".tweets-feed").empty();
  for (const tweet of Object.values(tweets)) {
    $(".tweets-feed").prepend(createTweetElement(tweet));
  }
};

// handles new tweet submission and rejects bad tweets
// TODO: fix text overflowing from textarea of tweets
$("form").on("submit", function(event) {
  event.preventDefault();
  const tweetLength = $("textarea").val().length;
  const $tweetTooLong = $(
    `<span id="alert-msg">Please shorten your tweet</span>`
  );
  const $tweetTooShort = $(
    `<span id="alert-msg">Please enter a tweet</span>`
  );
  if (tweetLength > 140) {
    $(".err-text").empty();
    $(".err-text")
      .append($tweetTooLong)
      .hide()
      .fadeIn();
    return;
  }
  if (tweetLength === 0) {
    $(".err-text").empty();
    $(".err-text")
      .append($tweetTooShort)
      .hide()
      .fadeIn();
    return;
  }
  if (tweetLength > 0 && tweetLength <= 140) {
    $(".err-text").children().empty();
  }
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: $("form").serialize()
  });
  $("#tweet-text").val("");
  loadTweets();
});

// loads tweets after tweet submission
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
    data: $(".submit-tweet").serialize(),
    dataType: "json",
    success: function (data) {
      renderTweets(data);
    } 
  });
}
loadTweets();