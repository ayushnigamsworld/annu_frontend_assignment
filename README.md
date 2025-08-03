
We’d like you to complete a small take-home programming challenge which should take at most an hour of your time.  If you could return your assignment, I will share with the team to review.  We will then proceed to scheduling a follow up technical interview where you will be asked to explain your solution, as well as extend it: During the interview, we’ll give you a small additional feature that you code with us. We’re looking to get a sense of your approach, problem solving skills, and ability to code a solution while discussing it with us.

 

Here’s the challenge:

 

Your company manages retail stores that belong to Jack in the Box franchises (e.g. “Joe’s Jack Franchise Group of  Colorado”). Each franchise can be organized into regions (“North”, “West”, “Central”), and each region consists of a number of stores, referred to by numbers (“005”, “012”, “105”, etc):

                Franchise => Region => Store

 

Franchises and regions have a name and a number.

Stores have a name, a number, and an address.

 

You are designing a service to support querying and managing such a hierarchy. Implement a service module (i.e. just below what might be a REST controller) with three interface points:

1.           Create a new hierarchy. It should create a root node representing Jack in the Box, and return a hierarchy id to the caller.

2.           Given a parent node ID, add a new node (franchise, region, or store) to a hierarchy (given its a hierarchy id). This should return a new node ID.

3.           (Time permitting) Return a list of all stores for a given node ID in the hierarchy. (If you’ve already an hour

 

Our team uses TypeScript on both client and server. As such, please implement a TypeScript solution. To keep things simple, manage the hierarchy as an in-memory data structure (i.e. don’t worry about creating code for external persistence).

 

Think though, about how you would persist your hierarchy, particularly given the in-memory mechanism you’ve chose to hold onto the hierarchy. Be prepared to discuss.

 

Please return a solution that aligns with what you think are appropriate choices for production-quality software. Be prepared to discuss your solution, as well as appropriate production considerations.
