const users = [...Array(5).keys()].map((key) => ({
  id: key + '',
  name: `Name${key}`,
}));

module.exports = {
  Query: {
    findUser: (parent, { id }) => {
      const user = users.find((user) => user.id === id);
      if (user) {
        return user;
      } else {
        throw new Error('Not Found!');
      }
    },
  },

  Mutation: {
    deleteUser: (parent, { id }) => {
      const index = users.findIndex((user) => user.id === id);
      if (index < 0) return false;
      users.splice(index, 1);
      return true;
    },
  },
};
