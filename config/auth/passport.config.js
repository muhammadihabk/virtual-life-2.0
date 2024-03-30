const fs = require('fs');
const path = require('path');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const knexClient = require('../db/knex-client');
const { UserDefaultSelect } = require('../../src/components/user/user.enums');
const { Table, User } = require('../db/db.enums');

const publicKey = fs.readFileSync(path.join(__dirname, '../../src/auth/lib/public.pem'), 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ['RS256'],
};

async function verifyFn(jwt_payload, done) {
  try {
    const [user] = await knexClient.select(UserDefaultSelect.concat[User.ID]).from(Table.USER).where(User.EMAIL, jwt_payload.sub);

    return user ? done(null, user) : done(null, false);
  } catch (error) {
    console.log(`[Auth]: Failed to find user with email ${jwt_payload.sub}`, error);

    return done(new Error('Failed to verify token'), false);
  }
}

const jwtStrategy = new JwtStrategy(options, verifyFn);

passport.use(jwtStrategy);

module.exports = passport;