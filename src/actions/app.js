const APP_SET_LANGUAGE = 'APP_SET_LANGUAGE';
const setLanguage = lang => ({
  type: APP_SET_LANGUAGE,
  payload: lang,
});

const types = { APP_SET_LANGUAGE };

export { types };
export default { setLanguage };
