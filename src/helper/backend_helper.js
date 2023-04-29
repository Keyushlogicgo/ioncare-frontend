import { ApiClient } from "./apiService";
import * as url from "./url_helper";

const api = new ApiClient();

export const getCategoryList = () => {
  return api.get(url.GET_CATEGORY);
};
export const postCategory = (data) => {
  return api.create(url.GET_CATEGORY, data);
};
export const deleteCategory = (data) => {
  return api.delete(url.GET_CATEGORY + "/" + data);
};
export const patchCategory = (data) => {
  return api.patch(url.GET_CATEGORY + "/" + data.id, data.data);
};

export const getLabList = (data) => {
  return api.get(url.GET_PACKAGE + (data ? "/" + data : ""));
};
export const postLab = (data) => {
  return api.create(url.GET_PACKAGE, data);
};
export const deleteLab = (data) => {
  return api.delete(url.GET_PACKAGE + "/" + data);
};
export const patchLab = (data) => {
  return api.patch(url.GET_PACKAGE + "/" + data.id, data.data);
};

export const getMemberList = (data) => {
  return api.get(url.GET_MEMBER + (data ? "/" + data : ""));
};
export const postMember = (data) => {
  return api.create(url.GET_MEMBER, data);
};
export const deleteMember = (data) => {
  return api.delete(url.GET_MEMBER + "/" + data);
};
export const patchMember = (data) => {
  return api.patch(url.GET_MEMBER + "/" + data.id, data.data);
};

export const postLabAppoinment = (data) => {
  return api.create(url.GET_LABAPPOINMENT, data);
};
export const getLabAppoinment = () => {
  return api.get(url.GET_LABAPPOINMENT);
};

export const postPayment = (data) => {
  return api.create(url.GET_PAYMENT, data);
};
