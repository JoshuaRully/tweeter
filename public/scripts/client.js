//  test data below

const data =
[
  {
    "user": {
      "name": "Alex Megos",
      "avatars": "images/megos.jpg",
      "handle": "@AlexMegos"
    },
    "content": {
      "text": "There are no bad conditions, there is only weakness"
    },
    "created_at": 1614026101409
  },
  {
    "user": {
      "name": "Ben Howard",
      "avatars": "images/howard.jpg",
      "handle": "@BenHoward"
    },
    "content": {
      "text": "Lonely, oh no not me\n I have a grave to dig fast\n Moving feet you gave me\n Light where it once was gone\n I made a bed where we don't belong"
    },
    "created_at": 1614112501409
  }
];


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

const renderTweets = (tweets) => {
  for (const tweet of Object.values(tweets)) {
    $(".tweets-feed").append(createTweetElement(tweet));
  }
};

// more test data below

renderTweets(data);


