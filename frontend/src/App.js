import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <React.Fragment>
          {/* <Search baseUrl={this.state.configuration.images.secure_base_url} smPosterSize={this.state.configuration.images.poster_sizes[3]} goToPage={this.goToPage} /> */}
          Test
        </React.Fragment>
      </div>
    </BrowserRouter>
  );
}

export default App;
