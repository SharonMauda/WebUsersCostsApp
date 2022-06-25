import mongoose from 'mongoose';
import User from './User.js';
import Cost from './Cost.js';

/**
 * Connect to the database.
 */
export const connect = async () => {
  const username = 'MongoProject';
  const password = 'Aa123456';
  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@cluster0.iquagmh.mongodb.net/main?retryWrites=true&w=majority`
    )
    .then(async () => {
      console.log('Database connected!');
    });
};

/**
 *  Create a user.
 * @param {object} userDetails An object containing the user details.
 */
export const createUser = async (userDetails) => {
  const id = userDetails._id;
  const userExists = await checkUserExists(id);
  // If the user already exists, throw an error.
  if (userExists) {
    throw new Error('המשתמש כבר קיים');
  }
  // Create the user.
  const user = new User(userDetails);
  await user.save();
};

/**
 * Check if a user exists.
 * @param {String} userID The user ID.
 * @returns true if the user exists, false otherwise.
 */
export const checkUserExists = async (userID) => {
  const user = await User.findOne({ _id: userID });
  return user !== null;
};

/**
 * Create a cost.
 * @param {Object} costDetails An object containing the cost details.
 */
export const createCost = async (costDetails) => {
  const user = costDetails.created_by;
  // Check if user exists
  const userExists = await checkUserExists(user);
  // If the user doesn't exist, throw an error.
  if (!userExists) {
    throw new Error('המשתמש לא קיים');
  }
  // Create the cost.
  const cost = new Cost(costDetails);
  await cost.save();
};

/**
 * Get the costs report for a user in a given time period.
 * @param {String} id The user ID.
 * @param {Date} start_date The start date.
 * @param {Date} end_date The end date.
 * @returns A report of the costs of a user during the given period.
 */
export const getReport = async (id, start_date, end_date) => {
  // Check if user exists
  const userExists = await checkUserExists(id);
  // If the user doesn't exist, throw an error.
  if (!userExists) {
    throw new Error('המשתמש לא קיים');
  }

  // Get the costs.
  const results = (
    await Cost.find({
      $and: [
        {
          created_at: {
            $gte: start_date,
            $lt: end_date,
          },
        },
        { created_by: id },
      ],
    })
  )
    // Map the results to an array of objects which contain only the necessary information.
    .map((data) => {
      return {
        created_by: data.created_by,
        description: data.description,
        sum: data.sum,
        category: data.category,
      };
    });
  return results;
};
