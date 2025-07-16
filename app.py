from flask import Flask, render_template, request
import requests
import json
from datetime import datetime as dt

app = Flask(__name__)


@app.route('/old')
def index():
    return render_template('old_input.html')

@app.route('/new')
def new_input():
    return render_template("new_input.html")

@app.route('/recommend', methods=['POST'])
def start_workflow():
        source = request.form.get('source', 'unknown')
        print(f"Form submitted from: {source}")

        genres = request.form.get('genres', "")
        year = request.form.get('year', "")
        status = request.form.get('status', '')
        type_ = request.form.get('type', '')
        qty = request.form.get('qty','')

        print("---- FORM DUMP ----")
        for key, value in request.form.items():
            print(f"{key} = {value}")
        print("--------------------")

        base_url = "https://kitsu.io/api/edge/anime"
        filters = []

        if genres:
            filters.append(f"filter[genres]={genres}")
        if year:
            filters.append(f"filter[year]={year}")
        if status:
            filters.append(f"filter[status]={status}")
        if type_:
            filters.append(f"filter[subtype]={type_}")
        if qty:
            filters.append(f"page[limit]={qty}")
        if status=="current":
            filters.append(f"filter[year]={dt.now().year}")
        query_string = "&".join(filters)
        endpoint = f"{base_url}?{query_string}" if filters else base_url

        print(f"Fetching from Kitsu: {endpoint}")

        response = requests.get(endpoint)
        response.raise_for_status()
        data = response.json()

        anime_list = []
        for item in data.get("data", []):
            attr = item.get("attributes", {})
            titles = attr.get("titles", {})

            title = titles.get("en") or titles.get("en_us") or titles.get("en_jp") or "Unknown Title"
            synopsis = attr.get("synopsis", "").replace("`", "'").replace('"', "'")

            anime = {
                "title": title,
                "image_url": attr.get("posterImage", {}).get("original", ""),
                "synopsis": synopsis,
                "episodes": attr.get("episodeCount", "Unknown") 
            }
            
            anime_list.append(anime)
            for anime in anime_list:
                if anime["episodes"]==None:
                   anime["episodes"]="Episode count currently Unknown. Waiting for new information."
        filters_= {}
        if genres:
            filters_["genres"] = genres.split(",")
            lol= filters_["genres"]
            for i in range(len(lol)):
                lol[i]=lol[i].capitalize()
        if year:
            filters_["year"] = year
        if status:
            if status=="finished":
                filters_["status"] = "Completed"
            elif status=="current":
                filters_["status"] = "Currently Airing"
            elif status=="tba":
                filters_["status"] = "TBA"
            else:
                filters_["status"] = status
                filters_["status"] = status.capitalize()
        if type_:
            filters_["type"] = type_
            if type_=="special" or type_=="music" or type_=="movie":
                filters_["type"] = type_.capitalize()
            else:
                filters_["type"] = type_.upper()
        if filters_=={}:
            values_to_send = json.dumps("No filters applied.")
        else:
            values_to_send = json.dumps(filters_)
        print(values_to_send)
        if not anime_list:
           print(True)
           return render_template("new_input.html", no_anime=True, animefilters=values_to_send, force_redirect=True)


        else:
            template_to_render = "new_output.html" if source=="new" else "old_output.html"
        
            return render_template(template_to_render, anime_data=json.dumps(anime_list), animefilters=values_to_send)

print("Flask app started. If no output appears here, check fallback_log.txt")

if __name__ == '__main__':
    app.run(debug=True)
