import axios from 'axios';
// Get all countries and sort alphabetically
const baseUrl = 'https://restcountries.com/v3.1/all';

 const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data.sort((a, b) => (a.name.common < b.name.common ? -1 : 0));
};

export default {getAll} ;