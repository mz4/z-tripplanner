const graphql = require('graphql');
import { Trip } from '../resources/trip/trip.model'
import { GraphQLBoolean } from 'graphql';

const {
  GraphQLObjectType, GraphQLString,
  GraphQLID, GraphQLInt, GraphQLSchema,
  GraphQLList, GraphQLNonNull, GraphQLInputObjectType
} = graphql;

const TripType = new GraphQLObjectType({
  name: 'Trip',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    dateStart: { type: GraphQLString },
    dateEnd: { type: GraphQLString },
    isConfirmed: { type: GraphQLBoolean },
    isEditing: { type: GraphQLBoolean }
  })
});

const queryTrips = new GraphQLObjectType({
  name: 'query a list of trips',
  fields: {
    trips: {
      type: new GraphQLList(TripType),
      resolve(parent, args) {
        return Trip.find({});
      }
    }
  }
});

const subscriptionTrips = new GraphQLObjectType({
  name: 'subscribe to new trips'
})

const mutationTrips = new GraphQLObjectType({
  name: 'mutationTrips',
  description: 'insert and delete trips',
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
      resolve(parent, args) {
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
    },
    deleteTrip: {
      type: TripType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {
        let TripId = Trip.findByIdAndRemove(args.id).exec();
        return TripId;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: queryTrips,
  mutation: mutationTrips,
  subscription: subscriptionTrips
});