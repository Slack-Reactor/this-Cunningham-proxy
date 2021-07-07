/* eslint-disable no-console */
/* eslint-disable consistent-return */
import axios from 'axios';

const useRouteListener = () => {
  const handleIdClick = (id) => {
    window.history.pushState({}, '', `http://localhost:3000/id/${id}`);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  const handleUrlEvent = (service) => {
    const id = window.location.pathname.slice(4);
    if (service === 'showcase') {
      return axios.get(`http://localhost:3001/api/showcase/${id}`)
        .then(({ data }) => {
          window.history.pushState({}, '', 'http://localhost:3000');
          return data;
        })
        .catch((err) => console.log('Error GET by id:', err));
    }
    if (service === 'recommend') {
      return axios.get(`http://localhost:3002/`)
        .then(({ data }) => {
          window.history.pushState({}, '', 'http://localhost:3000');
          return data;
        })
        .catch((err) => console.log('Error GET by id port 3002', err));
    }
  };

  return {
    handleIdClick,
    handleUrlEvent,
  };
};

export default useRouteListener;
