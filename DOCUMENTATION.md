# MyAnimeList Private API Documentation

All responses return JSON

# Client ID

Some endpoints are protected with a client ID. This ID is stored in plaintext in the official MAL app, and seems to be a static value. The client ID is `6114d00ca681b7701d1e15fe11a4987e`

# Data Fields

Some endpoints take a `fields` parameter which is a set of fields used to determine what data is to be returned about the query

| Name                     | Description                                                           |
|--------------------------|-----------------------------------------------------------------------|
| alternative_titles       | Titles in other languages and formats                                 |
| media_type               | Movie or TV show                                                      |
| num_episodes             | Number of total episodes (including unaired)                          |
| status                   | Airing status                                                         |
| start_date               | Airing start date                                                     |
| end_date                 | Airing end date                                                       |
| average_episode_duration | Average episode length in seconds                                     |
| synopsis                 | Media synopsis                                                        |
| mean                     | User rating score                                                     |
| rank                     | MAL ranking                                                           |
| popularity               | MAL popularity? (need clarification on how this differs from ranking) |
| num_list_users           | Number of users who have this media in a list                         |
| num_favorites            | Number of favorites                                                   |
| num_scoring_users        | Number of users who have scored this media                            |
| start_season             | Object containing the year and airing season                          |
| broadcast                | Object containing the day and time of new episodes                    |
| nsfw                     | String containing colors? (to determine how "NSFW" the media is?)     |
| created_at               | When was this media created in the API/database                       |
| updated_at               | When was this media updated in the API/database                       |

# Endpoints

## BaseURL

Base URL for the API is https://api.myanimelist.net/v0.8 (at least in the version of the app I reversed)

The oAuth refresh token endpoint `/oauth2/token` is the only endpoint which uses a different base, being https://myanimelist.net/v1

## [POST] /auth/token

Logs in a user with a username and password. Returns an oAuth authorization and refresh token

### Headers

| Name         | Value                             |
|--------------|-----------------------------------|
| Content-Type | application/x-www-form-urlencoded |

### Body

| Parameter  | Value            |
|------------|------------------|
| client_id  | App client ID    |
| username   | Account username |
| password   | Account password |
| grant_type | `password`       |

## [POST] /oauth2/token

Refreshes a login session with an oAuth refresh token. Returns an oAuth authorization and refresh token

### Headers

| Name         | Value                             |
|--------------|-----------------------------------|
| Content-Type | application/x-www-form-urlencoded |

### Body

| Parameter     | Value               |
|---------------|---------------------|
| client_id     | App client ID       |
| refresh_token | oAuth refresh token |
| grant_type    | `refresh_token`     |

## [GET] /anime/search

Runs a search on the database based on the `status` parameter. Contrary to what the endpoint suggests this does _NOT_ run a query search

### Query Parameters

| Name   | Description                                                                                 | Optional |
|--------|---------------------------------------------------------------------------------------------|----------|
| q      | query string (is ignored by API)                                                            | True     |
| status | Anime airing status to search by (only `currently_airing` and `not_yet_aired` are accepted) | False    |
| limit  | Return count upper limit                                                                    | True     |
| offset | Result offset based on limit (if limit is 10 and offset is 1, then returns results 10-20)   | True     |
| fields | Data fields to be returned with each result (see #data-fields)                              | True     |

## [GET] /anime

Runs a search on the database based on the `q` parameter

### Query Parameters

| Name   | Description                                                                                 | Optional |
|--------|---------------------------------------------------------------------------------------------|----------|
| q      | query string (is ignored by API)                                                            | False    |
| limit  | Return count upper limit                                                                    | True     |
| offset | Result offset based on limit (if limit is 10 and offset is 1, then returns results 10-20)   | True     |
| fields | Data fields to be returned with each result (see #data-fields)                              | True     |

## [GET] /anime/{id}

Gets anime details

### Query Parameters

| Name   | Description                                                                                 | Optional |
|--------|---------------------------------------------------------------------------------------------|----------|
| fields | Data fields to be returned with each result (see #data-fields)                              | True     |

## [GET] /anime/ranking

Gets top anime by rank and ranking type

### Query Parameters

| Name         | Description                                                                               | Optional |
|--------------|-------------------------------------------------------------------------------------------|----------|
| ranking_type | Sort type (`trend` or `bypopularity`)                                                     | True     |
| limit        | Return count upper limit                                                                  | True     |
| offset       | Result offset based on limit (if limit is 10 and offset is 1, then returns results 10-20) | True     |
| fields       | Data fields to be returned with each result (see #data-fields)                            | True     |

## [GET] /anime/season/{year}/{season}

Gets anime releasing/released in a given season

### Query Parameters

| Name   | Description                                                                               | Optional |
|--------|-------------------------------------------------------------------------------------------|----------|
| sort   | Sort type (`anime_num_list_users` or `anime_score`)                                       | True     |
| limit  | Return count upper limit                                                                  | True     |
| offset | Result offset based on limit (if limit is 10 and offset is 1, then returns results 10-20) | True     |
| fields | Data fields to be returned with each result (see #data-fields)                            | True     |

## [GET] /anime/suggestions

Gets anime suggestions for logged in user. Requires login

### Query Parameters

| Name   | Description                                                                               | Optional |
|--------|-------------------------------------------------------------------------------------------|----------|
| limit  | Return count upper limit                                                                  | True     |
| offset | Result offset based on limit (if limit is 10 and offset is 1, then returns results 10-20) | True     |
| fields | Data fields to be returned with each result (see #data-fields)                            | True     |