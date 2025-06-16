import { useState, useEffect} from 'react';
import { LangAPI } from 'shared/api';


export const GetLanguage = ()  => {
  const [langInfo, setLangInfo ] = useState(
    {key: '', name: '', description: ''}
  );
    const [error, setError] = useState('');
  
 useEffect(() => {
    const fetchLangData = async () => {
      try {

             setError('');
       } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }  
    };

    fetchLangData();
  }, []);

  return (
    <>
     <p> NAME: {langInfo.name}</p>
     <p> DESCRIPTION: {langInfo.description}</p>
     <p> {error}</p>

    </>
  )

}
