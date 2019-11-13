const graphql = require('graphql');
import { Trip } from '../resources/trip/trip.model'
import { GraphQLBoolean } from 'graphql';

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const TripType = new GraphQLObjectType({
    name: 'Trip',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        dateStart: { type: GraphQLString },
        dateEnd: { type: GraphQLString },
        isConfirmed: { type: GraphQLBoolean },
        isEditing: { type: GraphQLBoolean }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        trips:{
            type: new GraphQLList(TripType),
            resolve(parent, args) {
                return Trip.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTrip: {
            type: TripType,
            args: {
                name: { type: GraphQLString }, 
                dateStart: { type: GraphQLString },
                dateEnd: { type: GraphQLString },
                isConfirmed: { type: GraphQLBoolean },
                isEditing: { type: GraphQLBoolean }
            },
            resolve(parent, args){
                let trip = new Trip({
                    name: args.name, 
                    dateStart: args.dateStart,
                    dateEnd: args.dateEnd,
                    isConfirmed: args.isConfirmed,
                    isEditing: args.isEditing,
                    createdBy: "5db474847f4fcf269336d3de"
                });
                return trip.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});