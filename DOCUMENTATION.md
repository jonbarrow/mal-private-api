# MyAnimeList Private API Documentation

All responses return JSON

# Endpoints

## BaseURL

Base URL for the API is https://api.myanimelist.net/v0.8 (at least in the version of the app I reversed)

## /anime/search

Runs a search on the database based on the `status` parameter. Contrary to what the endpoint suggests this does _NOT_ run a query search

### Query Parameters

| Name   | Description                                                                                 |
|--------|---------------------------------------------------------------------------------------------|
| q      | query string (is ignored by API)                                                            |
| status | Anime airing status to search by (only `currently_airing` and `not_yet_aired` are accepted) |
| limit  | Return count upper limit                                                                    |
| offset | Result offset based on limit (if limit is 10 and offset is 1, then returns results 10-20)   |
| fields | Data fields to be returned with each result (see #data-fields)                              |