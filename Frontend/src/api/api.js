// src/api/api.js
import api from './apiInstance';

const logRequest = (method, url, data) => {
  console.log(`URL: ${url}, Data:`, data);
};

const logResponse = (method, url, response) => {
  console.log(`URL: ${url}, Response:`, response);
};

const logError = (method, url, error) => {
  console.error(`URL: ${url}, Error:`, error);
};

// Send a message
export const sendMessage = async (messageData) => {
  const url = "/messages/send";
  logRequest('POST', url, messageData);
  try {
    const response = await api.post(url, messageData);
    logResponse('POST', url, response.data);
    return response.data;
  } catch (error) {
    logError('POST', url, error);
    throw error;
  }
};

// Fetch all messages
export const fetchMessages = async (params) => {
  const url = "/messages";
  logRequest('GET', url, params);
  try {
    const response = await api.get(url, { params });
    logResponse('GET', url, response.data);
    return response.data;
  } catch (error) {
    logError('GET', url, error);
    throw error;
  }
};

// Fetch all users
export const fetchUsers = async () => {
  const url = "/users";
  logRequest('GET', url, null);
  try {
    const response = await api.get(url);
    logResponse('GET', url, response.data);
    return response.data;
  } catch (error) {
    logError('GET', url, error);
    throw error;
  }
};

// Fetch all groups
export const fetchGroups = async () => {
  const url = "/groups";
  logRequest('GET', url, null);
  try {
    const response = await api.get(url);
    logResponse('GET', url, response.data);
    return response.data;
  } catch (error) {
    logError('GET', url, error);
    throw error;
  }
};

// Fetch user details by IDs
export const fetchUserDetailsByIds = async (ids) => {
  const url = "/users/details";
  logRequest('POST', url, { ids });
  try {
    const response = await api.post(url, { ids });
    logResponse('POST', url, response.data);
    return response.data;
  } catch (error) {
    logError('POST', url, error);
    throw error;
  }
};

// export const createContact = async (userData) => {
//   const url = "/users/create";
//   logRequest("POST", url, { userData });
//   try {
//     const response = await api.post(url, userData);
//     logResponse("POST", url, response.data);
//     return response.data;
//   } catch (error) {
//     // console.error("Failed to createa contact", error);
//     logError('POST', url, error);
//     throw error;
//   }
// }

export const createGroup = async (groupData) => {
  const url = "/groups/create";
  logRequest("POST", url, groupData);
  try {
    const response = await api.post(url, groupData);
    logResponse("POST", url, response.data);
    return response.data;
  } catch (error) {
    logError("POST", url, error);
  }
}