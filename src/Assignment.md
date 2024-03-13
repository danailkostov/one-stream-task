Requirements: use React
Bonus points: modern and intuitive UI

Task:
Web form page with input for uploading a .txt file. The
file contains movie titles – each movie is on a new row.
After the file upload, the movie list is displayed on the
page. Each movie has a corresponding checkbox (default
checked), it’s possible to check or uncheck one or more
of the titles. The idea is to filter out unwanted
records.
Under the list, there is a “Search” button. On click,
information about the selected movie titles is fetched
from the TMDB API. (Link to the API documentation at the
end of the document).
The TMDB API can return information about movies just by
providing a title. The TMDB data can consist of:
 TMDB ID
 Title
 Overview
 Actors
 Genres
 Poster
 Release
 Rating
 Trailer
 Director
 Duration (in minutes)
After this TMDB search, the received information is shown
on a preview page in a list of “Movie Cards” or rows.
There should be only one result per searched movie title.
Each card/row should have a “Bin” icon to remove (filter
out) wrong or unwanted search results.
The “Search” button should now be labeled “Save” and on
click, the data of the selected movies is structured in a
JSON and sent to a save endpoint. For the purposes of
this task, the endpoint can be just a dummy address, in a
real situation there will be working back-end code that
will handle the save request.
Optional features:

1. When on the preview page (after fetching TMDB data),
   there is an input that the user can use to perform
   additional manual TMDB searches and fetch data for
   individual movies. While the user types the movie title,
   a dropdown with found results is shown under the input.
   When a suggested result is clicked – new movie card/row
   is added at the bottom of the preview page.
2. Add an option for the user to select the language of
   the collected TMDB data
3. Add an option to filter the results on the preview
   page by genre.
4. Add an option to reorder the results on the preview
   page. (Send order to save endpoint)
5. Add an option to manually edit the information in the
   TMDB data fields before sending for saving.
   TMDB API Docs -
   https://developers.themoviedb.org/3/getting-
   started/introduction
