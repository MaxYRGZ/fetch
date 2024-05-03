import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import './App.css';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const queryClient = new QueryClient();

function App(): JSX.Element {
  const { data, isLoading, isError } = useQuery<Photo[]>('photos', () =>
    fetch('https://jsonplaceholder.typicode.com/photos', { mode: 'cors' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
  );

  return (
    <div className="App">
      <h1>An image</h1>
      {isError && <div>Error fetching data</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        // Asegúrate de que data es un arreglo y tiene al menos un elemento
        data && data.length > 0 ? (
          <img src={data[0].url} alt={data[0].title} />
        ) : (
          <div>No data available</div>
        )
      )}
    </div>
  );
}

function AppWrapper(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default AppWrapper;
