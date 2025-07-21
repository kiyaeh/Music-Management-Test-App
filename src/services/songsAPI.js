// API service for songs
const API_BASE_URL = process.env.API_BASE_URL || '/api';

class SongsAPI {
  async fetchSongs(page = 1, limit = 10) {
    try {
      const response = await fetch(`${API_BASE_URL}/songs?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        songs: data.songs || data, // Handle different response formats
        total: data.total || data.length,
        page: data.page || page
      };
    } catch (error) {
      console.error('Error fetching songs:', error);
      throw error;
    }
  }

  async createSong(songData) {
    try {
      const response = await fetch(`${API_BASE_URL}/songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(songData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating song:', error);
      throw error;
    }
  }

  async updateSong(id, songData) {
    try {
      const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(songData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating song:', error);
      throw error;
    }
  }

  async deleteSong(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting song:', error);
      throw error;
    }
  }
}

export const songsAPI = new SongsAPI();
