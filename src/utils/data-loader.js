'use strict';

import { AllHtmlEntities } from 'html-entities';


const _DATA_LOADER = {

  loadData: ({ url }) => {
    return new Promise((_resolve, _reject) => {
      _DATA_LOADER._fetchXML({ url })
      .then(data => {
        try {
          const _dataLoaded = _DATA_LOADER._parseXML({data});
          _resolve(_dataLoaded);
        } catch (_error) {
          _reject(Error('Error parsing XML. ' + _error.message));
        }
      })
      .catch(_error => _reject(Error('Error loading URL. ' + _error.message)))
    });
  },

  /**
   * @see https://stackoverflow.com/questions/37693982/how-to-fetch-xml-with-fetch-api
   */
  _fetchXML: ({ url }) => {
    return new Promise((_resolve, _reject) => {
      fetch(url)
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => { _resolve(data); })
        .catch((_error) => _reject(_error));
    });
  },

  _parseXML: ({ data }) => {
    const _dataLoaded = {topics: {}};
    try {
      const _dataElement = data.getElementsByTagName('data')[0];
      const _topics = _dataElement.getElementsByTagName('topic');

      let _topicData, _conceptName;
      for (let _topic of _topics) {
        _topicData = { 
          title: _topic.getElementsByTagName('title')[0].getAttribute('value'),
          description: _topic.getElementsByTagName('description')[0].textContent.trim(),
          conceptsOrder: [],
          concepts: {} 
        };
        
        for (let _concept of _topic.getElementsByTagName('concept')) {
          _conceptName = _concept.getAttribute('name');
          _topicData.conceptsOrder.push(_conceptName);
          _topicData.concepts[_conceptName] = {
            title: _concept.getElementsByTagName('title')[0].getAttribute('value'),
            docLink: _concept.getElementsByTagName('docLink')[0].getAttribute('value'),
            description: _concept.getElementsByTagName('description')[0].textContent.trim(),
          };

          let _codes = []; // Load codes for a concept
          for (const _code of _concept.getElementsByTagName('code')) {
            _codes.push({
                language: _code.getAttribute('language'),
                code: AllHtmlEntities.encode(_code.textContent.trim())
              });
          }
          _topicData.concepts[_conceptName].codes = _codes;
        }
        
        _dataLoaded.topics[_topic.getAttribute('name')] = {..._topicData};
      }
      return _dataLoaded;
    } catch (_err) {
      const _error = Error('Error parsing XML. ' + _err.message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, _error)
      }
      throw _error;
    }
  },
};


export default _DATA_LOADER;