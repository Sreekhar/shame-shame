# Hall of Shame
## Inspiration
More than half of women and 70% percent of young adults have experienced online harassment. It's time for us to take action against this. We are motivated to provide a web app that in some way can reduce this evil practice.

## What it does
Hall of Shame is a web application prototype which takes any familiar social networking website data as an input (We used YouTube URL for this prototype) as input and displays user profiles who use most number of abusive words online.

BWS- For every video a score namely Bad Words Score(BWS) is calculated and corresponding ranking is provided for them.

## How we built it
We used YouTube commentThreads.list API for accessing user comments. Calculated BWS using python flask framework in the backend.

## Challenges we ran into
1)Scrapping of the YouTube webpage limited the amount of data (comments).  
2)Faced security issues in google chrome while implementing chrome extension through web injection.

## Accomplishments that we're proud of
1)We used open source API to access comments instead of webpage scrapping.
2)Calculating the BWS(Bad Word Score) for every video and comparing it with all other videos score already present in our database.
3)Implemented a dashboard which provides most abusive users on YouTube.

## What we learned
We realized that online harassment is not a trivial issue and needs to be addressed right now.

## What's next for HallOfShame
1)Since we have data of most abusive persons we can create use that data to create a chrome extension which when installed in any system can hide the comments of those abusive users automatically.
2)We can implement a chrome extension using web injection so that it prevents any user to use abusive words in their comments.

Please Note our website http://halloffshame.com will be loading slow for the intial attempts.
