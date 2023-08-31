const baseGithubUrl = 'https://api.github.com';
const baseJsdelivrUrl = 'https://cdn.jsdelivr.net/gh/PhanhotboY/profile-card@latest/jsdelivr/cards'

const cardIframe = document.createElement('iframe');
const cardEle = document.getElementById('github-card');
const cardDataset = cardEle.dataset;

const ghUser = await fetch(`${baseGithubUrl}/users/${cardDataset.user}`).then((res) => res.json());
const themes = {default: 'default.html'}

cardEle.parentNode.replaceChild(cardIframe, cardEle);
cardIframe.src = `${baseJsdelivrUrl}/${themes.default}`

const abbCharacters = ['', 'K', 'M', 'B', 'T'];
const shortenNumber = (num, stack = 0) => {
  if (Math.abs(num) < 1000 || stack >= abbCharacters.length - 1) return num + abbCharacters[stack];

  return shortenNumber(Math.round(num / 1000), ++stack);
};

const objToCSS = (obj) =>
  Object.keys(obj).reduce((style, key) => `${style} ${key}: ${obj[key]};`, '');
const istyle = {
  height: cardDataset.height || 150,
  width: cardDataset.width || 350,
  border: '1px rgba(0,0,0, 0.1) solid',
  'border-radius': '0.25rem',
  'box-shadow': 'rgba(51, 51, 51, 0.1) 1px 1px 2px 1px',
};

cardIframe.style = objToCSS(istyle);
cardIframe.setAttribute('scrolling', 0);
cardIframe.setAttribute('frameborder', 0);
cardIframe.setAttribute('allowtransparency', true);
cardIframe.onload = (evt) => {
  const $ = cardIframe.contentDocument.querySelector.bind(cardIframe.contentDocument);
  const ihtml = $('html');
  const avatarAnchor = $('div.header > a.avatar');
  const avatarImg = $('div.header > a.avatar > div');
  const fullName = $('div.header > div.name > div.full_name');
  const userName = $('div.header > div.name > a.user_name');
  const follow = $('div.header > a.follow');
  const reposQuan = $('div.details > div.data > span.quantity.repos');
  const gistsQuan = $('div.details > div.data > span.quantity.gists');
  const followersQuan = $('div.details > div.data > span.quantity.followers');

  ihtml.style = objToCSS({ width: '100%', height: '100%;' });
  cardIframe.contentDocument.body.style = objToCSS({
    margin: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  });

  avatarAnchor.href = ghUser.html_url;
  avatarImg.style.backgroundImage = `url('${ghUser.avatar_url}')`;
  fullName.innerText = ghUser.name;
  userName.href = ghUser.html_url;
  userName.innerText = `@${ghUser.login}`;
  reposQuan.innerText = ghUser.public_repos;
  gistsQuan.innerText = ghUser.public_gists;
  followersQuan.innerText = ghUser.followers;
};
