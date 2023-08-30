import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from './utils/API_URL';

export function useFavouriteStatus(artworkId) {
  const [isAFavourite, setIsAFavourite] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        const favouriteIds = response.data.map(artwork => artwork.id);
        setIsAFavourite(favouriteIds.includes(artworkId));
      })
      .catch(error => console.error(error.message));
  }, [artworkId]);

  return isAFavourite;
}
