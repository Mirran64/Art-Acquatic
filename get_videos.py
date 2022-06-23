# -*- coding: utf-8 -*-

# Sample Python code for youtube.search.list
# See instructions for running these code samples locally:
# https://developers.google.com/explorer-help/code-samples#python

import os

import googleapiclient.discovery

HOME_PAGE = "homePage.html"
VIDEO_IDS_FILE = "videos.txt"
SECRETS_FILE = "secrets.txt"

def get_api_key_from_file(secrets_file: str):
    with open(secrets_file, "r") as f:
        key = f.read()
    return key


def get_video_ids(query: str):
    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"
    DEVELOPER_KEY = get_api_key_from_file(SECRETS_FILE)

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey = DEVELOPER_KEY)

    request = youtube.search().list(
        part="snippet",
        maxResults=4,
        q=query,
        order="relevance",
        regionCode="us",
        type="video"
    )
    response = request.execute()
    ids = []
    for item in response["items"]:
        ids += [item["id"]["videoId"]]

    ids = [f"https://www.youtube.com/embed/{id}" for id in ids]
    return ids


def change_html_page(iframes:list, iframes_rows: list):
    iframes_rows = [i - 1 for i in iframes_rows]

    with open(HOME_PAGE, "r", encoding="utf-8") as f:
        data = f.readlines()

    for i in range(len(iframes_rows)):
        data[iframes_rows[i]] = iframes[i]
    
    with open(HOME_PAGE, "w", encoding="utf-8") as f:
        f.writelines(data)



if __name__ == "__main__":
    queries = ["aquascape|green aqua|mulMung|TheCineScaper|SerpaDesign|George Farmer", 
                "tutorial|SerpaDesign|aquapros|MD Fish Tanks|FERRET WONDERLAND", 
                "Paludarium|riparium",
                "Ecosphere"]
    ids = []
    for q in queries:
        ids += get_video_ids(q)
   
    iframes = [
        f"""\t\t\t\t<iframe class="p-2" src="{id}" width="500" height="300" allowfullscreen="true" ></iframe>\n""" for id in ids
    ]

    iframe_rows = [
        109, 110, 111, 112, 
        120, 121, 122, 123,
        131, 132, 133, 134, 
        142, 143, 144, 145]
    
    change_html_page(iframes, iframe_rows)

