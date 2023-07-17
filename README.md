# What is this?
This is the React frontend to the news bias project. 

# How do I run this? 
To power up the front end, run `npm start` in the console at the top level of this directory. Make sure you've installed everything with `npm install`. 

You also need to run the [news bias backend server](https://github.com/AstronautCharlie/news-bias-backend) for this frontend to have anything to talk to. 

# Most recent thing finished?
Getting input from user and sending it to the app backend. 

# To do next.
Right now the app expects a payload with an `embeddings` field, which it will do the t-SNE visualization with. The backend is returning a jsonified SubjectMatterResponse object - add the embeddings as a separate field to this