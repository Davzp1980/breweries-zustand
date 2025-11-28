import axios from "axios";

export async function getAllBreweriesApi(perPage, page) {
  try {
    const res = await axios.get(
      `https://api.openbrewerydb.org/v1/breweries?per_page=${perPage}&page=${page} `
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getACurrentBreweriesApi(id) {
  try {
    const res = await axios.get(
      `https://api.openbrewerydb.org/v1/breweries/${id} `
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
