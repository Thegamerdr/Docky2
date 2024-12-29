import { Sequelize, DataTypes, Model } from 'sequelize'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

class User extends Model {}
User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  emailVerified: DataTypes.DATE,
  image: DataTypes.STRING,
  password: DataTypes.STRING,
}, { sequelize, modelName: 'user' })

class Perfume extends Model {}
Perfume.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  brand: DataTypes.STRING,
  concentration: DataTypes.STRING,
  price: DataTypes.FLOAT,
  sillage: DataTypes.INTEGER,
  longevity: DataTypes.INTEGER,
  value: DataTypes.INTEGER,
  rating: DataTypes.FLOAT,
  notes: DataTypes.ARRAY(DataTypes.STRING),
  seasons: DataTypes.ARRAY(DataTypes.STRING),
  imageUrl: DataTypes.STRING,
}, { sequelize, modelName: 'perfume' })

class Review extends Model {}
Review.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  rating: DataTypes.FLOAT,
  comment: DataTypes.TEXT,
}, { sequelize, modelName: 'review' })

class Comparison extends Model {}
Comparison.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
}, { sequelize, modelName: 'comparison' })

User.hasMany(Review)
Review.belongsTo(User)

Perfume.hasMany(Review)
Review.belongsTo(Perfume)

User.hasMany(Comparison)
Comparison.belongsTo(User)

Comparison.belongsToMany(Perfume, { through: 'ComparisonPerfume' })
Perfume.belongsToMany(Comparison, { through: 'ComparisonPerfume' })

export { sequelize, User, Perfume, Review, Comparison }

