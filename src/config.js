const JIMAT_API_ROOT = process.env.REACT_APP_JIMAT_API_ROOT || window.REACT_APP_JIMAT_API_ROOT;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || window.REACT_APP_GOOGLE_CLIENT_ID;
const ENVIRONMENT = process.env.NODE_ENV || window.NODE_ENV;
const API_ROUTE = '/api';

export const CATEGORIES = [
  {
    name: 'Groceries',
    url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoSPgQ6gNd-A0OIxaduXBM5fDD7mO0KLUF9-ppOOm-jMk0LfW5KA&s',
  },
  {
    name: 'Pharmaceuticals',
    url:
      'https://www.tatachemicals.com/upload/images/masthead/Pharmaceuticals1.jpg',
  },
  {
    name: 'Personal Care',
    url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbU8Wrs3m3cd7FFyUQY8SsTIkFyKuX_xbxPEgrVWXI_CoHzj2&usqp=CAU',
  },
];

const config = {
  JIMAT_API_ROOT,
  JIMAT_API: `${JIMAT_API_ROOT}${API_ROUTE}`,
  GOOGLE_CLIENT_ID,
  ENVIRONMENT
}

window.__CONFIG__ = config;

export default config;
