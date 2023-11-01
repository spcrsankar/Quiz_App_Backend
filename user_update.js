const {User} = require('./models/user'); 

exports.updateUserData = async (req, res) => {
  try {
    const { userId } = req.params; 
    const updatedUser = await User.findByIdAndUpdate(userId, {
      firstName: req.body.firstName, 
      lastName: req.body.lastName, 
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User data updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
