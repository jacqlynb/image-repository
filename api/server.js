const express = require('express');
const cors = require('cors');
const connection = require('./config/mysql-config.js');
const port = 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/image', (req, res) => {
  const labels = req.query ? req.query.labels : '';
  const q = getQuery(labels);
  connection.query(q, (error, results) => {
    error
      ? res.send(error)
      : res.send(labels ? sortResults(results, labels) : results);
  });
});

function getQuery(labels) {
  if (labels) {
    const labelArray = labels.split(',');
    const labelClause = getLabelClause(labelArray);
    return `SELECT image_url, title, labels, author, date_display 
            FROM images 
            WHERE ${labelClause} 
            LIMIT 100`;
  } else {
    return `SELECT image_url, title, author, date_display 
            FROM images 
            LIMIT 100`;
  }
}

function getLabelClause(labels) {
  const labelBaseClause = `labels LIKE '%${labels[0].trim()}:%'`;
  return labels.length === 1
    ? labelBaseClause
    : labelBaseClause +
        [...labels]
          .slice(1)
          .map((label) => {
            return ` AND labels LIKE '%${label.trim()}:%'`;
          })
          .join('');
}

function parseLabels(labelsStr) {
  return labelsStr.split(',').map((labelWithConfidenceScore) => {
    const [label, confidenceScore] = labelWithConfidenceScore.split(':');
    return { label, confidenceScore };
  });
}

function sortResults(results, userLabels) {
  return results
    .map((result) => {
      const labelsFiltered = parseLabels(result.labels).filter(({ label }) =>
        userLabels.includes(label.toLowerCase())
      );
      return { ...result, labels_filtered: labelsFiltered };
    })
    .sort(
      (firstResult, secondResult) =>
        calculateConfidenceScore(secondResult.labels_filtered) -
        calculateConfidenceScore(firstResult.labels_filtered)
    );
}

function calculateConfidenceScore(labels) {
  return labels.reduce(
    (acc, curr) => acc + parseFloat(curr.confidenceScore),
    0
  );
}

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = {
  app,
};
