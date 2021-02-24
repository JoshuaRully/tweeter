//  test data below

const tweetData =
{
  "user": {
    "name": "Alex Megos",
    "avatars": "images/megos.jpg",
    "handle": "@CarrotsForPower"
  },
  "content": {
    "text": "There are no bad conditions, there is only weakness"
  },
  "created_at": 1613963731720
}


// functions implemented below

const createTweetElement = (tweet) => {
  let $tweet = $(`
  <article class="tweets">
    <header>
      <div id="user-info">
        <img id="user-pic" src=${tweet.user.avatars} alt="No pic!"/>
        <p>${tweet.user.name}</p>
      </div>
      <p id="user">${tweet.user.handle}</p>
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <p>Posted at <time>${tweet.created_at}</time></p>
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

// more test data below

const $tweet = createTweetElement(tweetData);

console.log($tweet);
$('.tweets-feed').append($tweet);


