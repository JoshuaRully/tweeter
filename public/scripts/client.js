// functions implemented below

// allows user to compose tweet without clicking on textarea
$("#write-btn").on("click", () => {
  $("#tweet-text").focus();
});

// returns timeStamp depending on current time
const convertTime = (tweetTime) => {
  const now = new Date().getTime();
  const created = tweetTime;
  let timePassed = created - now;
  const getHumanTime = function (timestamp) {
    let time = Math.abs(timestamp);
    let readableTime, timeUnits;
    if (time > 1000 * 60 * 60 * 24 * 365) {
      readableTime = parseInt(time / (1000 * 60 * 60 * 24 * 365), 10);
      timeUnits = "years";
    } else if (time > 1000 * 60 * 60 * 24 * 30) {
      readableTime = parseInt(time / (1000 * 60 * 60 * 24 * 30), 10);
      timeUnits = "months";
    } else if (time > 1000 * 60 * 60 * 24 * 7) {
      readableTime = parseInt(time / (1000 * 60 * 60 * 24 * 7), 10);
      timeUnits = "weeks";
    } else if (time > 1000 * 60 * 60 * 24) {
      readableTime = parseInt(time / (1000 * 60 * 60 * 24), 10);
      timeUnits = "days";
    } else if (time > 1000 * 60 * 60) {
      readableTime = parseInt(time / (1000 * 60 * 60), 10);
      timeUnits = "hours";
    } else if (time > 1000 * 60) {
      readableTime = parseInt(time / (1000 * 60), 10);
      timeUnits = "minutes";
    } else {
      readableTime = parseInt(time / 1000, 10);
      timeUnits = "seconds";
    }
    return `${readableTime} ${timeUnits} ago`;
  };
  return getHumanTime(timePassed);
};

// no more breaky breaky pal
const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// styles tweet objects passed through it
// TODO: fix text overflowing from textarea of tweets
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
      <p><time>${convertTime(tweet.created_at)}</time></p>
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

// loads tweets after tweet submission
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
    data: $(".submit-tweet").serialize(),
    dataType: "json",
    success: function(data) {
      renderTweets(data);
    }
  });
};
loadTweets();

// handles new tweet submission and rejects bad tweets
$("form").on("submit", (event) => {
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
  }).then(function() {
    $("#tweet-text").val("");
    loadTweets();
  }).then(function() {
    $("output").text('140');
  });
});