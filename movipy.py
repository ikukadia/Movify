import requests
from bs4 import BeautifulSoup

def scrape():
    base_url = "https://api.themoviedb.org/3/discover/movie?api_key=14efa05d15268965b34816286e0035bd&language=en-US&sort_by=popularity.desc&include_adult=false&page="
    movies = ""

    for i in range(1, 501):
        curr_url = base_url + str(i)

        data = requests.get(curr_url)
        curr_page = BeautifulSoup(data.text, 'html.parser').text

        try:
            curr_page = curr_page.split("results\":[")[1].split("]}")[0] + ","
        except IndexError:
            pass

        movies += curr_page
    return movies

file1 = open("movies.txt", "ab")
file1.write(scrape().encode("utf-8"))
file1.close()
