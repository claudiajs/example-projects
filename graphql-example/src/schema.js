/*
 * schema.js
 * GraphQL schema definition
 */
import {addUser, getUser, deleteUser} from './dataStore';
import {GraphQLObjectType,
        GraphQLSchema,
        GraphQLNonNull,
        GraphQLList,
        GraphQLString,
        GraphQLInt} from 'graphql';

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        userid: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLInt}
    }
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    description: 'query users',
    fields: {
        user: {
            type: new GraphQLList(userType),
            args: {
                userid: {type: GraphQLString}
            },
            resolve: (source, args) => getUser(args.userid)
        }
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Mutation of the users',
    fields: {
        addUser: {
            type: userType,
            args: {
                userid: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLInt}
            },
            resolve: (source, args) => addUser(args)
        },
        deleteUser: {
            type: userType,
            args: {
                userid: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (source, args) => deleteUser(args.userid)
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

export default schema;
