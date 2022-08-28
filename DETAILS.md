# How does this work?

1.  Install the app by running `npm install`
2.  Start the app by running `npm start`. This loads the app on `localhost:1234`

Next button goes to the next page, back button goes to the previous page

# Implementation

The app has 4 main functions - `getData`,`renderTableFromApi`, `renderTablefromSavedData` and `renderPage`

#### getData

`getData` function fetches the data from the API, with default page as 1, it returns the fetched data, and the pagination details

#### renderTableFromApi

`renderTableFromApi` function calls the getData function, which returns 2 arrays , `arr[n]` and `arr[n+1]` where n is the page number. The function renders `arr[n]` on the html table and saves `arr[n+1]` in a variable.

#### renderTablefromSavedData

`renderTablefromSavedData` get the saved data `arr[n+1]` and renders it on an html table

#### renderPage

if the page number is not divisible by 2 e.g 1,3,5,7, etc ,`renderPage` calls `renderTablefromSavedData` which renders the saved data, else it calls `renderTableFromApi` to render a new data from the api.
