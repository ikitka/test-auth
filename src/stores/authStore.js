// src/stores/authStore.js
import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axiosInstance';

class AuthStore {
  accessToken = localStorage.getItem('access_token') || '';
  refreshToken = localStorage.getItem('refresh_token') || '';

  constructor() {
    makeAutoObservable(this);
  }

  async login(username, password) {
    try {
      const response = await axiosInstance.post('/login/', { username, password });
      this.setTokens(response.data.access, response.data.refresh);
    } catch (error) {
      console.error("Login error: ", error);
    }
  }

  async register(username, password) {
    try {
      const response = await axiosInstance.post('/register/', { username, password });
      this.setTokens(response.data.access, response.data.refresh);
    } catch (error) {
      console.error("Register error: ", error);
    }
  }

  logout() {
    this.clearTokens();
  }

  setTokens(access, refresh) {
    this.accessToken = access;
    this.refreshToken = refresh;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  clearTokens() {
    this.accessToken = '';
    this.refreshToken = '';
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

export const authStore = new AuthStore();