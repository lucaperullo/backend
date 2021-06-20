// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;


// MONGO ATLAS
export const mongoDB = {
  mdbUser: process.env.MDBUSER,
  mdbPassword: process.env.MDBPASSWORD,
  mdbHost: process.env.MDBHOST,
  mdbDatabase: process.env.MDBDATABASE
}
export const mongoURI = process.env.MONGO_URI

// CORS
export const corsUrlProduction = process.env.CORS_URL_PROD || "";
export const corsUrlDevelopment = process.env.CORS_URL_DEV || "";

// AUTH
// export const tokenInfo = {
//   accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
//   refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
//   issuer: process.env.TOKEN_ISSUER || '',
//   audience: process.env.TOKEN_AUDIENCE || '',
// };

// DIRECTORIES
export const logDirectory = process.env.LOG_DIR;