// functions implemented below

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
}

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
  return $tweet
}

// loops through data and passes tweet objects to helper function
const renderTweets = (tweets) => {
  for (const tweet of Object.values(tweets)) {
    $(".tweets-feed").append(createTweetElement(tweet));
  }
};

// handles new tweet submission and rejects bad tweets
$("form").on("submit", function (event) {
  event.preventDefault();
  const tweetLength = $("textarea").val().length;
  if (tweetLength > 140) {
    alert("Please shorten tweet :)");
    return;
  }
  if (tweetLength === 0) {
    alert("Please write a tweet first :)");
    return;
  }
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: $("form").serialize()
  })
  $("#tweet-text").val("");
})

// loads tweets after tweet submission
// TODO: stop spamming already posted tweets!!!!
$(document).ready(
  $("form").on("submit", function (event) {
  event.preventDefault();
  $.ajax({
    url: "/tweets",
    method: "GET",
  }).then((result) => {
    renderTweets(result)
  })
})
)