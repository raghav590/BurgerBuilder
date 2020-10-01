import axios from 'axios'

const instance= axios.create(
    {
        baseURL: 'https://react-burger-builder-998c2.firebaseio.com/'
    }
);

export default instance;