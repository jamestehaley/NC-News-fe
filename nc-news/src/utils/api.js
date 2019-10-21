const axios = require("axios");

const request = axios.create({
  baseURL: "https://nc-news-jamesteh.herokuapp.com/api"
});

export const getAllTopics = async () => {
  const { data } = await request.get("/topics");
  return data.topics;
};

export const getArticles = async (topic, sort_by, order, author, p) => {
  const { data } = await request.get("/articles", {
    params: { topic, sort_by, order, author, p }
  });
  return data;
};

export const getArticle = async uri => {
  const { data } = await request.get(uri);
  return data.article;
};
export const getComments = async (uri, p) => {
  const { data } = await request.get(`${uri}/comments`, { params: { p } });
  return data.comments;
};
export const postComment = async (body, username, uri) => {
  await request.post(`${uri}/comments`, { username, body });
};
export const deleteAny = async (id, type) => {
  await request.delete(`/${type}/${id}`);
};
export const incVotes = async (type, id, inc_votes) => {
  await request.patch(`/${type}/${id}`, { inc_votes });
};
export const getAllUsers = async () => {
  const { data } = await request.get("/users");
  return data.users;
};
export const postTopic = async (slug, description) => {
  await request.post(`/topics`, { slug, description });
};
export const postArticle = async (title, topic, author, body) => {
  const { data } = await request.post(`/articles`, {
    title,
    topic,
    author,
    body
  });
  return data.article;
};
export const deleteTopic = async topic => {
  await request.delete(`/topics/${topic}`);
};
