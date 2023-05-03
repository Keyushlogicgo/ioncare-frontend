import { ApiClient } from "./apiService";
import * as url from "./url_helper";

const api = new ApiClient();

export const getTestList = () => {
  return api.get(url.GET_Test);
};
export const postTest = (data) => {
  return api.create(url.GET_Test, data);
};
export const deleteTest = (data) => {
  return api.delete(url.GET_Test + "/" + data);
};
export const patchTest = (data) => {
  return api.patch(url.GET_Test + "/" + data.id, data.data);
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
  return api.create(url.GET_PACKAGE_APPOINTMENT, data);
};
export const getLabAppoinment = () => {
  return api.get(url.GET_PACKAGE_APPOINTMENT);
};

export const postPayment = (data) => {
  return api.create(url.GET_PAYMENT, data);
};

export const postPrescriptionImage = (data) => {
  return api.create(url.GET_PRESCRIPTION_IMAGE, data);
};
export const getPrescriptionImage = (data) => {
  return api.get(url.GET_PRESCRIPTION_IMAGE + (data ? "/" + data : ""));
};
export const deletePrescriptionImage = (data) => {
  return api.delete(url.GET_PRESCRIPTION_IMAGE + "/" + data);
};

export const postPrescription = (data) => {
  return api.create(url.GET_PRESCRIPTION, data);
};
export const getPrescription = (data) => {
  return api.get(url.GET_PRESCRIPTION + (data ? "/" + data : ""));
};
export const deletePrescription = (data) => {
  return api.delete(url.GET_PRESCRIPTION + "/" + data);
};
