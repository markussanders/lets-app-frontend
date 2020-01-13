import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const API_KEY = process.env.REACT_GOOGLE_MAPS_API_KEY

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={13}
    center = {
      {
        lat: 41.8914,
        lng: -87.6274
      }
    }
  >
    {
      props.isMarkerShown && <Marker position = {
        {
          lat: JSON.parse(props.coordinates).latitude,
          lng: JSON.parse(props.coordinates).longitude
        }
      }
      onClick = {
        props.onMarkerClick
      }
      />}
  </GoogleMap>
)

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        venueLocation={this.props.venueLocation}
        coordinates={this.props.coordinates}
      />
    )
  }
}
export default MyFancyComponent;
