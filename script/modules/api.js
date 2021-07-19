import { defaultSeason } from "./settings.js";
import { showLoader, hideLoader } from "./loader.js";

// API details
const api = {
  url: "https://fly.sportsdata.io",
  endpoints: {
    teams: "/v3/nba/scores/json/teams",
    bio: "/v3/nba/stats/json/Players",
    stats: `/v3/nba/stats/json/PlayerSeasonStatsByTeam/${defaultSeason}`,
  },
  key: "44c04f59b59b46e0b83d9f530f7c8e27",
};

// Fetch teams data from API
export const fetchTeamsData = async () => {
  // Show loading spinner when making async call to retrieve data
  showLoader();

  // Fetch url setup
  const url = new URL(`${api.url}${api.endpoints.teams}`);
  url.search = new URLSearchParams({
    key: api.key,
  });

  return fetch(url)
    .then((res) => {
      // Hide loading spinner once data is retrieved
      hideLoader();

      // Throw error if async call is not successful, else return data
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res);
      }
    })
    .catch((error) => {
      return error;
    });
};

// Fetch roster bio data from API
export const fetchBioData = async (abbreviation) => {
  // Show loading spinner when making async call to retrieve data
  showLoader();

  // Fetch url setup
  const url = new URL(
    `${api.url}${api.endpoints.bio}/${abbreviation.toLowerCase()}`
  );
  url.search = new URLSearchParams({
    key: api.key,
  });

  return fetch(url)
    .then((res) => {
      // Hide loading spinner once data is retrieved
      hideLoader();

      // Throw error if async call is not successful, else return data
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res);
      }
    })
    .catch((error) => {
      return error;
    });
};

// Fetch roster stats data from API
export const fetchStatsData = async (abbreviation) => {
  // Show loading spinner when making async call to retrieve data
  showLoader();

  // Fetch url setup
  const url = new URL(
    `${api.url}${api.endpoints.stats}/${abbreviation.toLowerCase()}`
  );
  url.search = new URLSearchParams({
    key: api.key,
  });

  return fetch(url)
    .then((res) => {
      // Hide loading spinner once data is retrieved
      hideLoader();

      // Throw error if async call is not successful, else return data
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res);
      }
    })
    .catch((error) => {
      return error;
    });
};
