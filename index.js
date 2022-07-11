const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;

const db = require('./models');

const { Op } = db.Sequelize;
const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/static`));


app.get('/api/games', async (req, res) => {
  try {
    const games = await db.Game.findAll()
    return res.send(games)
  } catch (err) {
    console.error('There was an error querying games', err);
    return res.send(err);
  }
})

app.post('/api/games/search', async (req, res) => {

  const { name, platform } = req.body;
  let whereClauses = {};
  if (name && platform) {
    whereClauses = { [Op.and]: [{ name: { [Op.like]: `%${name}%` } }, { platform  }] }
  }
  else if (name && !platform) {
    whereClauses = { name: { [Op.like]: `%${name}%` } }
  }
  else if (!name && platform) {
    whereClauses = { platform }
  }

  try {
    const games = await db.Game.findAll({
      where: whereClauses
    })
    return res.send(games)
  } catch (err) {
    console.error('***Error Searching games game', err);
    return res.status(400).send(err);
  }
});


app.post('/api/games', async (req, res) => {
  const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;
  try {
    const game = await db.Game.create({ publisherId, name, platform, storeId, bundleId, appVersion, isPublished })
    return res.send(game)
  } catch (err) {
    console.error('***There was an error creating a game', err);
    return res.status(400).send(err);
  }
})

app.delete('/api/games/:id', async (req, res) => {
  try {
    const game = await db.Game.findByPk(parseInt(req.params.id))
    await game.destroy({ force: true })
    return res.send({ id: game.id  })
  } catch (err) {
    console.error('***Error deleting game', err);
    return res.status(400).send(err);
  }
});

app.put('/api/games/:id', async (req, res) => {
  // eslint-disable-next-line radix
  const id = parseInt(req.params.id);
  const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;
  try {
    const game = await db.Game.findByPk(id)
    await game.update({ publisherId, name, platform, storeId, bundleId, appVersion, isPublished })
    return res.send(game)
  } catch (err) {
    console.error('***Error updating game', err);
    return res.status(400).send(err);
  }
});

async function populate(path) {
  const { data } = await axios.get(path);

  data.forEach( async element => {
    let game = element[0];
    let haveGame =await  db.Game.findAll({
      where: {
        name: game.name,
      platform: game.os,
      storeId: game.appId
      }
    });
    if(haveGame.length === 0) {
      await db.Game.create({
        publisherId: game.publisher_id,
        name: game.name,
        platform: game.os,
        storeId: game.appId,
        bundleId: game.bundle_id,
        appVersion: game.version,
        isPublished: true
      });

    }
  });
}
app.post('/api/games/populate', async (req, res) => {
  try {

    await populate('https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/android.top100.json')
    await populate('https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/ios.top100.json')
    res.sendStatus(201);
  } catch (err) {
    console.error('***Error updating game', err);
    return res.status(400).send(err);
  }
})

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

module.exports = app;
