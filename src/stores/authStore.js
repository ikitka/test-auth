// src/stores/authStore.js
import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axiosInstance';

class AuthStore {
  accessToken = localStorage.getItem('access_token') || '';

  constructor() {
    makeAutoObservable(this);
  }

  async login(email, password) {
    try {
      console.log({ email, password });
      const response = await axiosInstance.post('/login/', { email, password });
      this.setTokens(response.data.access, response.data.refresh);
    } catch (error) {
      console.error("Login error: ", error);
    }
  }

  async register(email, password) {
    try {
      console.log({ email, password });
      const response = await axiosInstance.post('/register/', { email, password });
      this.setTokens(response.data.access, response.data.refresh);
    } catch (error) {
      console.error("Register error: ", error);
    }
  }

  logout() {
    this.clearTokens();
  }

  setTokens(access) {
    this.accessToken = access;
    localStorage.setItem('access_token', access);
  }

  clearTokens() {
    this.accessToken = '';
    localStorage.removeItem('access_token');
  }
}

export const authStore = new AuthStore();