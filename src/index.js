const knexClient = require('../config/db/knex-client');

async function getPosts() {
  const [answer, answer2] = await knexClient('test_posts');
  console.log('\n\n########## answer2:\n', answer2, '\n##########\n\n');
  return answer;
}

async function print() {
  const result = await getPosts();
  console.log('\n\n########## res:\n', result, '\n##########\n\n');
}

print();
