import {
  getUsers as getUsersApi,
  getPosts as getPostsApi,
  getAlbums as getAlbumsApi,
} from '../api/mocks';

const FETCH_USERS_INIT = 'FETCH_USERS_INIT';
const fetchUsersInit = options => ({ type: FETCH_USERS_INIT, meta: { options } });

const FETCH_USERS_COMMIT = 'FETCH_USERS_COMMIT';
const fetchUsersCommit = users => ({
  type: FETCH_USERS_COMMIT,
  payload: users,
});

const FETCH_USERS_ROLLBACK = 'FETCH_USERS_ROLLBACK';
const fetchUsersRollback = error => ({
  type: FETCH_USERS_ROLLBACK,
  meta: { error },
});

const getUsers = options => (dipatch) => {
  dipatch(fetchUsersInit(options));
  getUsersApi()
    .then(users => dipatch(fetchUsersCommit(users)))
    .catch(error => dipatch(fetchUsersRollback(error)));
};

const FETCH_POSTS_INIT = 'FETCH_POSTS_INIT';
const fetchPostsInit = options => ({ type: FETCH_POSTS_INIT, meta: { options } });

const FETCH_POSTS_COMMIT = 'FETCH_POSTS_COMMIT';
const fetchPostsCommit = posts => ({
  type: FETCH_POSTS_COMMIT,
  payload: posts,
});

const FETCH_POSTS_ROLLBACK = 'FETCH_POSTS_ROLLBACK';
const fetchPostsRollback = error => ({
  type: FETCH_POSTS_ROLLBACK,
  meta: { error },
});

const getPosts = options => (dipatch) => {
  dipatch(fetchPostsInit(options));
  getPostsApi()
    .then(posts => dipatch(fetchPostsCommit(posts)))
    .catch(error => dipatch(fetchPostsRollback(error)));
};

const FETCH_ALBUMS_INIT = 'FETCH_ALBUMS_INIT';
const fetchAlbumsInit = options => ({ type: FETCH_ALBUMS_INIT, meta: { options } });

const FETCH_ALBUMS_COMMIT = 'FETCH_ALBUMS_COMMIT';
const fetchAlbumsCommit = albums => ({
  type: FETCH_ALBUMS_COMMIT,
  payload: albums,
});

const FETCH_ALBUMS_ROLLBACK = 'FETCH_ALBUMS_ROLLBACK';
const fetchAlbumsRollback = error => ({
  type: FETCH_ALBUMS_ROLLBACK,
  meta: { error },
});

const getAlbums = options => (dipatch) => {
  dipatch(fetchAlbumsInit(options));
  getAlbumsApi()
    .then(albums => dipatch(fetchAlbumsCommit(albums)))
    .catch(error => dipatch(fetchAlbumsRollback(error)));
};

const types = {
  FETCH_USERS_INIT,
  FETCH_USERS_COMMIT,
  FETCH_USERS_ROLLBACK,
  FETCH_POSTS_INIT,
  FETCH_POSTS_COMMIT,
  FETCH_POSTS_ROLLBACK,
  FETCH_ALBUMS_INIT,
  FETCH_ALBUMS_COMMIT,
  FETCH_ALBUMS_ROLLBACK,
};

export { types, getUsers, getPosts, getAlbums };

export default {
  types,
  getUsers,
  getPosts,
  getAlbums,
};
