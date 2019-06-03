## Run
It's React so `npm run build`

## Design Decisions
- Put the map pins in a hashmap for constant lookup when clicking / looking at one.
- Kept an array of the hashmap's keys to efficiently iterate over the pins during Prev/Next 
    - This could be expanded into a sidebar selection, like when clicking on a resturant in google maps it brings it on the map.
- Used react-router and query-string to cleanly route and parse the url
    - It's a good fit for a url driven webpage 
    - Of course, there are a lot of options for routing, but react-router has excellent documentation and a large contributing base.
- I considered using the unwrapped version of mapbox, which would have provided more flexability and up-to-date features, all thoroughly document, but for speed the react wrapped version helped.  

## Real work application changes
- Pull map data by current coordinate area and pull a max amount at a time. Similar to Google maps and yelp.
    - This would improve scaling to large data
- Polyfilling for older browers
- App folder structure
- Useful unit and integration tests using Jest

## Future additions
- Search, navigation, home page, etc. 
- Mapbox polygons to shade work areas.


