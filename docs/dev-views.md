# Views development
A 'view' is loaded after the 'location' changes. The 'router' manages how the different 'locations' changes the 'views'.

## Dynamic views
There are different views but in the end are all the same. The differences depends on the 'configuration' file.

The file 'src/views/index.js' initializes the 'views' for each different 'topic'.

Is a library that contains methods for:
  - initialize topics views
  - get view
  - listen location changes
  - listen framework changes

### View Core
Is the core class for all the views. Makes use of 'Views Common' for initialize the 'topic', update 'concepts' and render the 'view'.

Each 'view' loads the data for their own 'topic' and 'frameworks'.

The file is 'src/views/view-core.js' and exports the class 'ViewCore'.


### Views Common
Is a library that contains the methods for:
  - initialize view
  - load topic
  - initialize concepts
  - update concepts
  - render concepts



