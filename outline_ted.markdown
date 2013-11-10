# Functional Reactive Programming

Intro who we are

# In the beginning
## Getting single values (synchronous, blocking) 
  
    getWidget: Widget

# Then came Iterator pattern (as documented by the Gang of Four)
## Get multiple values (synchronous, blocking)

    getWidgets: List[Widgets]

## Gave us composable, expressable ways to work with our data 

talk about letting you do things functionally with them

map, reduce, zip, take, drop etc

## but we have to block until the whole list shows up


## Callbacks/CPS let us work asynchronously

show easy then painful examples

## Futures/Promises help tame callback hell

(for single values)

## get single value (async)

    getWidget: Future[Widget]

# What if you need a list of items asynchronously? 

One way is to request the full list in an asynchronous way:

    getWidgets: Future[Widget]

Server calculates list asynchronously and does a callback when it has the full list

Problems: 
- need to wait for full list to come back (slow user experience)
- what if it's infinite (need to paginate, etc)
- what if it's a stream that updates? we need to poll for updates


# Observer pattern (as documented by the Gang of Four)

lets you register a callback 

but then it's up to you to aggregate those into mutable lists and let consumers know that the list has been updated

# what if this happened? 

You got your Iterator in my Observable! You got your Observable in my Iterator!

Photoshopped Reeses Peanut Butter Cups image

# their love child would be the Observable

    getWidgets: Observable[Widget]

Allows you to asynchronously get 

They are also composable, as we'll see

## Marble diagrams explanation using something like drop


## Merge

## Zip

## Other functions

## Composition of functions


# How does this solve problems in the real world?

## Netflix example

netflix does this with their video API:

    def getVideos(userId: Long): Observable[Map[String, Any]] = 
      videoService.getVideos(userId)
        .take(10)  // take the first 10, then auto-unsubscribe
        .flatMap(video => {
          val metadata = video.getMetaData(video) // async Map
          val bookmark = videoService.getBookmark(video, userId) // async Map
          val rating = videoService.getRating(video, userId) // async Map
          Observable.zip(Observable(List(metadata, bookmark, rating): _*)).map {
            case m :: b :: r :: Nil => Map("id" -> video.id) ++ m ++ b ++ r
          }
      })
      //=>    Map(id -> 1, rating -> *****, position -> 1:33, length -> 2h, title -> Gravity)

That method composes 4 separate asynch calls into a List of 10 Maps


## Other examples




# Demo (shows merge, zip etc)

- potentially some sort of voting thing? 
- maybe let people go to a tiny url and vote to see results while merging in a stream from the browser?

potentially use:  w3c EventSource HTML5 push notifications: http://dev.w3.org/html5/eventsource/ generates "text/event-stream"

or streaming api from twitter from: https://speakerdeck.com/mattrjacobs/rxjava-reactive-extensions-in-scala
    https://userstream.twitter.com/1.1/user.json

