import { Meteor } from 'meteor/meteor';

import {wallContainer} from '../imports/api/wall'
import {counts} from '../imports/api/countedPosts'

Meteor.methods({
  countPosts: function(uid){
    result = []
    result.push(wallContainer.find({owner:uid,type:"public"}).count());
    result.push(wallContainer.find({owner:uid,type:"private"}).count());
    
    counts.upsert(
      { _id: uid},
      {
        owner: uid,
        publicCount: result[0], 
        privateCount: result[1]
      }
    );
    return result;
  }
});

Meteor.startup(() => {
});
