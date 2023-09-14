import { type UserDto } from "../../libs/dto/src/lib/user/user.dto";
import { type CategoryDto } from "../../libs/dto/src/lib/user/update-categorys-user.dto";

export interface User extends UserDto { // Could change in the future

}

export interface Category extends CategoryDto { // Could change in the future
  pins: Category['pins'] | {category: string}
}

export interface ISession {
  access_token: string
  user?: User
}


// ! Animes
export type Animes = Anime[]

export interface Anime {
  mal_id:          number;
  url:             string;
  images:          { [key: string]: ImageAnime };
  trailer:         Trailer;
  approved:        boolean;
  titles:          Title[];
  title:           string;
  title_english:   string;
  title_japanese:  string;
  title_synonyms:  string[];
  type:            string;
  source:          string;
  episodes:        number;
  status:          string;
  airing:          boolean;
  aired:           Aired;
  duration:        string;
  rating:          string;
  score:           number;
  scored_by:       number;
  rank:            number;
  popularity:      number;
  members:         number;
  favorites:       number;
  synopsis:        string;
  background:      string;
  season:          string;
  year:            number;
  broadcast:       Broadcast;
  producers:       Demographic[];
  licensors:       Demographic[];
  studios:         Demographic[];
  genres:          Demographic[];
  explicit_genres: any[];
  themes:          Demographic[];
  demographics:    Demographic[];
}

export interface Aired {
  from:   string;
  to:     string;
  prop:   Prop;
  string: string;
}

export interface Prop {
  from: From;
  to:   From;
}

export interface From {
  day:   number;
  month: number;
  year:  number;
}

export interface Broadcast {
  day:      string;
  time:     string;
  timezone: string;
  string:   string;
}

export interface Demographic {
  mal_id: number;
  type:   Type;
  name:   string;
  url:    string;
}

export enum Type {
  Anime = "anime",
}

export interface ImageAnime {
  image_url:       string;
  small_image_url: string;
  large_image_url: string;
}

export interface Title {
  type:  string;
  title: string;
}

export interface Trailer {
  youtube_id: null;
  url:        null;
  embed_url:  null;
  images:     ImagesAnime;
}

export interface ImagesAnime {
  image_url:         null;
  small_image_url:   null;
  medium_image_url:  null;
  large_image_url:   null;
  maximum_image_url: null;
}

// ! Movies
export type Movies = Movie[]
export interface Movie {
  adult:             boolean;
  backdrop_path:     null;
  genre_ids:         number[];
  id:                number;
  original_language: string;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  release_date:      string;
  title:             string;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
}
