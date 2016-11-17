import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

async function getPc() {
  let pc = {};
  return await fetch(pcUrl)
    .then(res => res.json())
    .then((res) => {
      pc = res;
      return pc;
    })
    .catch((err) => {
      console.log('Что-то пошло не так:\n', err);
      return pc;
    });
};

app.get('/3A/volumes', async (req, res) => {
  const PC = await getPc();
  const hdd = PC.hdd;

  let volumes = {};

  for (let key in hdd) {
    const d = hdd[key].volume;
    if (!volumes[d]) {
      volumes[d] = 0;
    }

    volumes[d] += hdd[key].size;
  }

  for (let key in volumes) {
    volumes[key] = volumes[key] + 'B';
  }

  return res.json(volumes);
});

app.get('*', async (req, res) => {
  const pc = await getPc();
  try {
    const r = req.path.replace('/3A/', '')
      .split('/')
      .filter(e => !!e)
      .reduce((acc, item) => {
        if (!Object.keys(acc).includes(item)) {
          throw new Error('Not Found');
        } else {
          return acc[item];
        }
      }, pc);
    res.json(r);
  } catch (e) {
    res.sendStatus(404);
    res.end(e.message);
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
