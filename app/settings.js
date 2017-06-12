/**
 * Services settings
 */

const NODE_ENV = process.env.NODE_ENV || 'production';

const settingsArray = {
  'local': {
    apiUrl: 'http://localhost:8080/'
  },
  'web': {
    apiUrl: 'http://lilbros.macseam.ru:8080/'
  },
};

const settings = NODE_ENV === 'production' ? settingsArray['web'] : settingsArray['local'];

export default settings;

