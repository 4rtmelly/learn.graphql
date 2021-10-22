const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require("@prisma/client")


// 1

  
const resolvers = {
  // ---------------------------------- Query 
  Query: {
    feed: async (parent, args, context) => {
        return context.prisma.user.findMany()
    },
    // *** read tous les post
    readAllPost: async (parent, args, context) => {
        return context.prisma.post.findMany()
    },
    // *** read un post selon son ID
    readPostId: async (parent, args, context, ) => {
        return context.prisma.post.findUnique({where: {id: Number(args.id)}})
    },
  },
  // ---------------------------------- Mutation
  Mutation: {
    //  *** add un user
    add: (parent, args, context, info) => {
      const newUser = context.prisma.user.create({
        data: {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: args.password
        },
      })
      return newUser
    },
    // *** add un nouveau post
    addPost: (parent, args, context, info) => {
        const newPost = context.prisma.post.create({
          data: {
              author: args.author,
              authorId: args.authorId,
              content: args.content
          },
        })
        console.log('New post : ')
        return newPost
    },
    // *** delete un post selon son id
    deletePostId: (parent, args, context, info) => {
        const deleted = context.prisma.post.delete({
            where: {
                id: Number(args.id)
            }
        })
        console.log('delete Post: ')
        return deleted
    },
    // *** modifie un post selon son id
    modifyPostId: (parent, args, context, info) => {
        const modify = context.prisma.post.update({
            where: {
                id: Number(args.id)
            },
            data: {
                content: args.content
            }
        })
        console.log('modidy Post: ')
        return modify
    },
    
    
  },
}

// 3
const fs = require('fs');
const path = require('path');


const prisma = new PrismaClient()

const server = new ApolloServer({
   typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma,
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );