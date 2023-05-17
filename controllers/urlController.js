// const User = require('./../models/urlModel')
const db = require('./../models/urlModel');
const validUrl =  require('valid-url');
const shortId =  require('shortid');


const generateUrlId = async() => {
  let urlId = await shortId.generate({ length: 7 }).substring(0, 7);
  
  const result = await db('shortenUrls')
    .select()
    .where({ urlId })
    .first().returning('urlId');

  if (result) {
    findUrl();
  }
  return urlId;
}


const createShortUrl = async(url, urlId, shortUrl) => {

  const result = await db('shortenUrls').insert({
    url: url,
    urlId: urlId,
    shortUrl: shortUrl,
  }).returning('shortUrl');
  

  return result[0]
}


exports.shortenUrl = async (req, res) => {
  const url = req.body.url;
  const baseUrl = process.env.BASE;
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  if (validUrl.isUri(url)) {
    try {
      const origUrl = await db('shortenUrls')
      .select()
      .where({ url })
      .first();

      if (origUrl) {
        return res.status(200).json(origUrl.shortUrl);
      } else {
        let urlId = await generateUrlId();
        console.log(urlId);
        const shortUrl = `${baseUrl}/${urlId}`;
        console.log(shortUrl);

        const result = await createShortUrl(url, urlId, shortUrl);
        res.status(200).json({ shortUrl });
      }

    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
  
};

exports.getUrls = async (req, res) => {
  await db.select().from('shortenUrls')
  .then(urls => {
    return res.status(200).json({urls});
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
};


exports.getShortenUrl = async (req, res) => {
  const urlCode = req.params.shortUrl;

  const getUrl = async (urlId) => {
    const result = await db('shortenUrls')
    .select()
    .where({ urlId })
    .first()
    .returning('urlId');
    
    if (result) {
      return result.url;
    } else {
      return null;
    }
  }

  try {
    const longUrl = await getUrl(urlCode);
    if (longUrl) {
      res.redirect(longUrl);
    } else {
      return res.status(404).json({ error: 'No url found'});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
}

