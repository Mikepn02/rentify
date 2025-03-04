import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const GooglePlacesAutoCompleteComponent = () => {
  return (
    <div className='w-full md:max-w-xl'>
        <GooglePlacesAutocomplete 
          apiKey='****'
          selectProps={{
            placeholder: 'Where to?',
          }}
          autocompletionRequest={{
              componentRestrictions: {
                country: ['us'],
              },
          }}
        />
    </div>
  )
}

export default GooglePlacesAutoCompleteComponent