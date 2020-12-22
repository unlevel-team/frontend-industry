# Topics development
The 'config data' contains information about the 'frameworks' and 'topics'.
Each 'framework' contains different 'topics'. 
Each 'Topic' data is stored in a XML file.

The topics are loaded using 'src/util/data-loader.js' when the 'view' change.

## Topic data
- topic
  - title
  - description
  - conceptsOrder
  - concepts

## Concept data
- concept
  - title
  - docLink
  - description
  - codeLanguage
  - code

