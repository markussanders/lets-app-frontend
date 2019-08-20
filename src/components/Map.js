import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey( "AIzaSyCvCLXH3XB-vRnzD7xrKfqBW6Pp5uYcbLg" );
Geocode.enableDebug();




const WrappedMap = withScriptjs(withGoogleMap(Map));


export default Map;