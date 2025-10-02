import { useEffect, useState } from 'react';

let nextId = 3;
//const initialArtists = [
//    { id: 0, name: 'Marta Colvin Andrade' },
//    { id: 1, name: 'Lamidi Olonade Fakeye'},
//    { id: 2, name: 'Louise Nevelson'},
//  ];
const initialArtists = [];
const initialArtists0 = [
    { id: 0, name: 'Marta Colvin Andrade' },
  ];
const initialArtists1 = [
    { id: 1, name: 'Lamidi Olonade Fakeye'},
  ];
const initialArtists2 = [
    { id: 2, name: 'Louise Nevelson'},
  ];

const Dashboard = () => {
    const [name, setName] = useState('');
    const [artists, setArtists] = useState(
      initialArtists
    );
  
    function handleClick() {
        const insertAt = 1; // Could be any index
        const nextArtists = [
          // Items before the insertion point:
          ...artists.slice(0, insertAt),
          // New item:
          //{ id: nextId++, name: name },
          { id: nextId++, name: 'Marta Colvin Andrade' },
          //{ id: 0, name: 'Marta Colvin Andrade' },          
          // Items after the insertion point:
          ...artists.slice(insertAt)
        ];
        setArtists(nextArtists);
        setName('');
      }

    console.log("artists", artists);

    // This function will called only once 
    useEffect(() => { 
        handleClick(); 
    }, [])
    
    return (
      <>
        <h1>Inspiring sculptors:</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleClick} 
        className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
            Insert</button>
        <ul>
          {artists.map((artist) => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ul>
      </>
    );
}

export default Dashboard