const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links.find((link) => link.id === args.id),
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = links.find((link) => link.id === args.id);
      link.url = args.url ? args.url : link.url;
      if (args.description) {
        link.description = args.description;
      }
      return link;
    },
    deleteLink: (parent, args) => {
      const index = links.findIndex((link) => link.id === args.id);
      const link = links[index];
      links.splice(index, 1);
      return link;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
