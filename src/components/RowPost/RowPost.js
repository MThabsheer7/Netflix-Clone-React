import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import { imageURL, API_KEY } from '../../constants/constants';
import './RowPost.css';
import axios from '../../axios';

export default function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState('')

  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        setMovies(response.data.results)
      }).catch(err => {
        //alert('Network error')
      })
  }, [])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0])
      } else {
        console.log('Trailer not available')
      }
    })
  }

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {
          movies.map((movie) => {
            return (
              <img
                onClick={() => handleMovie(movie.id)}
                className={props.isSmall ? "smallPoster" : "poster"}
                src={imageURL + movie.backdrop_path}
                alt="poster"
              />
            )
          })
        }
      </div>
      {urlId && <Youtube videoId={urlId.key} opts={opts} />}
    </div>

  );
}
