/*
 * schema.js
 * GraphQL schema definition
 */
'use strict';
const dataStore = require('./dataStore'),
	Graphql = require('graphql'),
	userType = new Graphql.GraphQLObjectType({
		name: 'User',
		fields: {
			userid: {type: new Graphql.GraphQLNonNull(Graphql.GraphQLString)},
			name: {type: new Graphql.GraphQLNonNull(Graphql.GraphQLString)},
			age: {type: Graphql.GraphQLInt}
		}
	}),
	queryType = new Graphql.GraphQLObjectType({
		name: 'Query',
		description: 'query users',
		fields: {
			user: {
				type: new Graphql.GraphQLList(userType),
				args: {
					userid: {type: Graphql.GraphQLString}
				},
				resolve: (source, args) => dataStore.getUser(args.userid)
			}
		}
	}),
	mutationType = new Graphql.GraphQLObjectType({
		name: 'Mutation',
		description: 'Mutation of the users',
		fields: {
			addUser: {
				type: userType,
				args: {
					userid: {type: new Graphql.GraphQLNonNull(Graphql.GraphQLString)},
					name: {type: new Graphql.GraphQLNonNull(Graphql.GraphQLString)},
					age: {type: Graphql.GraphQLInt}
				},
				resolve: (source, args) => dataStore.addUser(args)
			},
			deleteUser: {
				type: userType,
				args: {
					userid: {type: new Graphql.GraphQLNonNull(Graphql.GraphQLString)}
				},
				resolve: (source, args) => dataStore.deleteUser(args.userid)
			}
		}
	});

module.exports = new Graphql.GraphQLSchema({
	query: queryType,
	mutation: mutationType
});
