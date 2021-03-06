require('httparty')
require('json')

class TwitterClient < ApiClient

  def initialize(token, token_secret)
    @base_url = "https://api.twitter.com"
    @auth_version = :oauth1
    @consumer_key = ENV['TWITTER_CLIENT_KEY']
    @consumer_secret = ENV['TWITTER_CLIENT_SECRET']
    @token = token
    @token_secret = token_secret
    super()
  end

  def fetch_all_recent_photos(tags)
    tags.each do |tag|
      Rails.logger.info("fetching twitter photos for #{tag}")
      fetch_hashtag_recent_photos(tag)
    end
  end

  def fetch_hashtag_recent_photos(hashtag)
    min_id = ENV["#{hashtag}_TWITTER_NEXT_MIN_ID"]
    tagURL = "/1.1/search/tweets.json"
    params = { :q => "\##{hashtag} filter:media", :result_type => 'recent', :include_entities => true }
    if min_id
      params[:since_id] = min_id
    end

    response = @connection.get(tagURL, params)
    return unless response.success?
    response.body["statuses"].each do |tweet|
      # puts(tweet)
      tweetID = tweet["id_str"]
      photoURL = tweet.dig("entities","media",0,"media_url")
      twitterUsername = tweet.dig("user","screen_name")
      twitterProfilePhoto = tweet.dig("user","profile_image_url")
      twitterFullname = tweet.dig("user","name")
      tweetText = tweet["text"]
      favorites = tweet["favorite_count"]
      retweets = tweet["retweet_count"]
      postTime = Time.zone.parse(tweet["created_at"])

      TwitterPhoto.create({ :tweet_id => tweetID, :photo_url => photoURL, :twitter_username => twitterUsername, :twitter_profile_photo => twitterProfilePhoto, :twitter_fullname => twitterFullname, :tweet_text => tweetText, :favorites => favorites, :retweets => retweets, :post_time => postTime})
    end

    ENV["#{hashtag}_TWITTER_NEXT_MIN_ID"] = response.body.dig('search_metadata','max_id_str')
  end
end
