import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
});

function explode(delimiter, string) {

	var emptyArray = {0: ''};

	if ( arguments.length != 2
		|| typeof arguments[0] == 'undefined'
		|| typeof arguments[1] == 'undefined' )
	{
		return null;
	}

	if ( delimiter === ''
		|| delimiter === false
		|| delimiter === null )
	{
		return false;
	}

	if ( typeof delimiter == 'function'
		|| typeof delimiter == 'object'
		|| typeof string == 'function'
		|| typeof string == 'object' )
	{
		return emptyArray;
	}

	if ( delimiter === true ) {
		delimiter = '1';
	}

	return string.toString().split ( delimiter.toString() );
}

function implode( glue, pieces ) {
	return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );
}

function correctName(fullname) {
  const result = [];

  if (fullname) {
    const incorrect = fullname.match('[0-9_\/]');
    if (incorrect) {
      return 'Invalid fullname';
    }
    fullname = fullname.trim().replace(/\s+/g, ' ');
    const fullnameArray = explode(' ', fullname);

    let f = fullnameArray[fullnameArray.length - 1];
    f = f.toLowerCase();
    f = f.slice(0, 1).toUpperCase() + f.slice(1);
    result.push(f);

    if (fullnameArray.length > 3) {
      return 'Invalid fullname';
    } else if (fullnameArray.length > 2) {
      let i = fullnameArray[fullnameArray.length - 3];
      if (i) {
        i = i[0] + '.';
        i = i.toLowerCase();
        i = i.slice(0, 1).toUpperCase() + i.slice(1);
        result.push(i);
      }
      let o = fullnameArray[fullnameArray.length - 2];
      if (o) {
        o = o[0] + '.';
        o = o.toLowerCase();
        o = o.slice(0, 1).toUpperCase() + o.slice(1);
        result.push(o);
      }
    } else if (fullnameArray.length > 1) {
      let i = fullnameArray[fullnameArray.length - 2];
      if (i) {
        i = i[0] + '.';
        i = i.toLowerCase();
        i = i.slice(0, 1).toUpperCase() + i.slice(1);
        result.push(i);
      }
    }
    return implode(' ', result);
  } else {
    return 'Invalid fullname';
  }
}

// console.log(correctName('иГоРь аЛексАндРовиЧ сУвороВ'));

app.get('/task2B', (req, res) => {
  const fullname = req.query.fullname;

  res.send(correctName(fullname));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
