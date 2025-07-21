import { createServer, Model, Factory, Response } from 'miragejs';

export function startMirageServer() {
  console.log('Creating MirageJS server...');
  createServer({
    models: {
      song: Model
    },

    factories: {
      song: Factory.extend({
        title(i) {
          const titles = [
            'Bohemian Rhapsody', 'Imagine', 'Hotel California', 'Sweet Child O Mine',
            'Stairway to Heaven', 'Yesterday', 'Hey Jude', 'Let It Be', 
            'Come As You Are', 'Smells Like Teen Spirit', 'Billie Jean',
            'Beat It', 'Thriller', 'Purple Rain', 'Like a Rolling Stone',
            'Blowin in the Wind', 'The Sound of Silence', 'Bridge Over Troubled Water',
            'Good Vibrations', 'I Want to Hold Your Hand', 'Satisfaction',
            'Paint It Black', 'Angie', 'Brown Sugar', 'Start Me Up'
          ];
          return titles[i % titles.length];
        },

        artist(i) {
          const artists = [
            'Queen', 'John Lennon', 'Eagles', 'Guns N Roses',
            'Led Zeppelin', 'The Beatles', 'The Beatles', 'The Beatles',
            'Nirvana', 'Nirvana', 'Michael Jackson',
            'Michael Jackson', 'Michael Jackson', 'Prince', 'Bob Dylan',
            'Bob Dylan', 'Simon & Garfunkel', 'Simon & Garfunkel',
            'The Beach Boys', 'The Beatles', 'The Rolling Stones',
            'The Rolling Stones', 'The Rolling Stones', 'The Rolling Stones', 'The Rolling Stones'
          ];
          return artists[i % artists.length];
        },

        album(i) {
          const albums = [
            'A Night at the Opera', 'Imagine', 'Hotel California', 'Appetite for Destruction',
            'Led Zeppelin IV', 'Yesterday and Today', 'Hey Jude', 'Let It Be',
            'Nevermind', 'Nevermind', 'Thriller',
            'Thriller', 'Thriller', 'Purple Rain', 'Highway 61 Revisited',
            'The Freewheelin Bob Dylan', 'Bridge Over Troubled Water', 'Bridge Over Troubled Water',
            'Pet Sounds', 'A Hard Days Night', 'Aftermath',
            'Paint It Black', 'Goats Head Soup', 'Sticky Fingers', 'Tattoo You'
          ];
          return albums[i % albums.length];
        },

        year() {
          return Math.floor(Math.random() * (2023 - 1960) + 1960);
        },

        genre(i) {
          const genres = [
            'Rock', 'Pop', 'Rock', 'Hard Rock',
            'Rock', 'Pop', 'Pop', 'Pop',
            'Grunge', 'Grunge', 'Pop',
            'Pop', 'Pop', 'Funk', 'Folk Rock',
            'Folk', 'Folk Rock', 'Folk Rock',
            'Pop', 'Pop', 'Rock',
            'Rock', 'Rock', 'Rock', 'Rock'
          ];
          return genres[i % genres.length];
        },

        duration() {
          // Duration in seconds (3-6 minutes)
          return Math.floor(Math.random() * (360 - 180) + 180);
        }
      })
    },

    seeds(server) {
      // Create initial songs
      console.log('Creating initial song data...');
      server.createList('song', 25);
      console.log('Initial data created');
    },

    routes() {
      this.namespace = 'api';
      
      console.log('Setting up API routes...');

      // GET /api/songs - Fetch songs with pagination
      this.get('/songs', (schema, request) => {
        console.log('GET /api/songs called with params:', request.queryParams);
        const page = parseInt(request.queryParams.page) || 1;
        const limit = parseInt(request.queryParams.limit) || 10;
        const offset = (page - 1) * limit;

        const allSongs = schema.songs.all();
        const total = allSongs.length;
        const songs = allSongs.slice(offset, offset + limit);

        const response = {
          songs: songs.models,
          total,
          page,
          totalPages: Math.ceil(total / limit)
        };
        console.log('Returning songs:', response);
        return response;
      });

      // POST /api/songs - Create a new song
      this.post('/songs', (schema, request) => {
        console.log('POST /api/songs called with body:', request.requestBody);
        const attrs = JSON.parse(request.requestBody);
        
        // Validate required fields
        if (!attrs.title || !attrs.artist) {
          console.log('Validation failed - missing title or artist');
          return new Response(400, {}, {
            error: 'Title and artist are required fields'
          });
        }

        const song = schema.songs.create(attrs);
        console.log('Song created:', song);
        return song;
      });

      // PUT /api/songs/:id - Update a song
      this.put('/songs/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        
        const song = schema.songs.find(id);
        if (!song) {
          return new Response(404, {}, {
            error: 'Song not found'
          });
        }

        song.update(attrs);
        return song;
      });

      // DELETE /api/songs/:id - Delete a song
      this.delete('/songs/:id', (schema, request) => {
        const id = request.params.id;
        const song = schema.songs.find(id);
        
        if (!song) {
          return new Response(404, {}, {
            error: 'Song not found'
          });
        }

        song.destroy();
        return new Response(204);
      });

      // Add some delay to simulate real API
      this.timing = 500;
    }
  });
}
