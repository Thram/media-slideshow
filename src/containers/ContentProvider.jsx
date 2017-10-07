import { Component, Children } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dictionaries from '../content';

let dictionary = {};
const PARAMS_REG_EXP = '%{(.*?)}';
const paramsRegExp = new RegExp(PARAMS_REG_EXP, 'g');

const content = (path, params) => {
  const text = get(dictionary, path, '');
  return params ? text.replace(paramsRegExp, (replaceText, key) => params[key]) : text;
};

const setDictionary = (lang) => {
  dictionary = dictionaries[lang];
};

class ContentProvider extends Component {
  static propTypes = {
    lang: PropTypes.string,
  };
  static defaultProps = {
    lang: 'en',
  };
  // you must specify what you’re adding to the context
  static childContextTypes = {
    content: PropTypes.shape({}).isRequired,
  };
  constructor(props) {
    super(props);
    setDictionary(props.lang);
  }

  getChildContext = () => ({ content: dictionary });

  componentWillReceiveProps = nextProps => setDictionary(nextProps.lang);
  shouldComponentUpdate = nextProps => this.props.lang !== nextProps.lang;
  // `Children.only` enables us not to add a wrapping <div />
  render = () => Children.only(this.props.children);
}

export { content, setDictionary };
export default connect(({ app }) => ({ lang: app.language }))(ContentProvider);
