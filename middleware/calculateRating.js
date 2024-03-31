const Order = require('../models/orders');

function calculateAverageRating(mentorId) {
  return Order.find({ mentorId: mentorId })
    .then((orders) => {
      if (orders.length === 0) {
        return null; // Or any default value you prefer for no ratings
      }

      const totalRating = orders.reduce(
        (sum, order) => sum + (order.star || 0),
        0
      );
      const averageRating = totalRating / orders.length;
      return averageRating;
    })
    .catch((err) => {
      console.error('Error calculating average rating:', err);
      throw err; // Re-throw to allow error handling in the calling code
    });
}

module.exports = calculateAverageRating;
