  // Init GeoFireX
  import firebase from 'firebase'
  import * as geofirex from 'geofirex';
  const geo = geofirex.init(firebase);
  console.log("geofirex initialized")

  export default geo;