Live Site:https://picnic-supermarket-auth.web.app/home. 

Project title: Picnic Super Market. 

Key features:  
->User can choose available products(Mostly groceries). 
->User have to go through authentication before purchasing. 
->User can pay using online payment system.  

How it works?  
->Admin can upload product information with picture in the database.  
The pictures can be selected from the computer then it'll be uploaded to  
a free image hosting site (imgbb.com). Then with the image link and product information  
altogether will be uploaded to the MongoDB.  

->User has to go through google authentication process. It is donce by google firebase  
authentication. Whenever the user clicks on a product, if the user isn't logged in  
he/she will be redirected to the login page via react private route.  

->The payment method is implemented with the help of famous and reliable online  
currency transfer organization(Stripe). Stripe has a beautiful library for reactJS.  
