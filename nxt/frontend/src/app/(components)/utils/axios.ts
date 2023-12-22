/* eslint-disable import/no-cycle */
// import { notification } from "antd";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import cookie from "cookie";
// import dayjs from "dayjs";
import get from "lodash/get";
import { NextApiRequest, NextApiResponse } from "next";
import { CookieKey } from "../enums/common/cookie";
// import { EAPIErrorCodeI18n } from "../constants/common/responseCode";

// import { codeMessage, showModal } from "./auth";

export const axiosSerialize = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosRequestServer = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: null,
  },
});

export const requestServer = async (
  url: string,
  options: AxiosRequestConfig,
  req: NextApiRequest,
  _res: NextApiResponse
) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const score = get(cookies, CookieKey.SCORE, "");
  const authToken = get(cookies, CookieKey.AUTH_TOKEN, "");

  const { headers, ...theRestOptions } = options;
  try {
    const result: AxiosResponse = await axiosRequestServer({
      method: "GET",
      url,
      baseURL: "",
      timeout: 1000 * 5,
      headers: {
        "Accept-Encoding": "deflate, gzip;q=1.0, *;q=0.5",
        ...headers,
        Cookie: `score=${score}; auth_token=${authToken}`,
      },
      ...theRestOptions,
    });
    return result;
  } catch (error: any) {
    const responseError = error.response;
    throw responseError;
  }
};

// export const requestSerialize = async (
//   url: string,
//   options: AxiosRequestConfig = {},
//   otherOptions = { hideErrorNotification: false }
// ) => {
//   try {
//     const res: AxiosResponse = await axiosSerialize({
//       method: "GET",
//       url,
//       baseURL: "",
//       timeout: 1000 * 5,
//       ...options,
//     });

//     return res.data;
//   } catch (err) {
//     const statusCode = get(err, "status");
//     const errorCode = get(err, "data.code");
//     const data = get(err, "data");
//     if (statusCode && data) {
//       const errorText = data?.message || codeMessage[statusCode];
//       if (
//         ![EAPIErrorCodeI18n.G0003, EAPIErrorCodeI18n.G0001].includes(
//           errorCode
//         ) &&
//         !otherOptions.hideErrorNotification
//       ) {
//         notification.error({
//           key: errorCode,
//           message: data.status ? `Error ${data.status}:` : "Error",
//           description: errorText,
//         });
//       }
//     }

//     throw err;
//   }
// };

// let retryGlobal = 0;
// axiosSerialize.interceptors.request.use(
//   async (config) => {
//     const cookies = cookie.parse(document.cookie);
//     const expirationTime = Number(get(cookies, CookieKey.AUTH_EXPIRATION_TIME));
//     const timeRemaining =
//       dayjs.unix(expirationTime).unix() - dayjs(new Date()).unix();
//     const tokenWarningThreshold = Number(
//       process.env.NEXT_PUBLIC_TOKEN_WARNING_THRESHOLD || 0
//     );

//     try {
//       if (
//         timeRemaining < tokenWarningThreshold &&
//         timeRemaining > 0 &&
//         !retryGlobal
//       ) {
//         retryGlobal = 1000;
//         await axios.get("/api/auth/refresh-token", {
//           baseURL: "",
//         });
//         retryGlobal = 0;
//       }

//       if (retryGlobal) {
//         await new Promise((resolve) => {
//           setTimeout(() => {
//             resolve(true);
//           }, retryGlobal);
//         });
//       }
//       return config;
//     } catch (err) {
//       return config;
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosSerialize.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const errorResponse = get(error, "response");
//     const status = get(error, "response.status");
//     const errorCode =
//       get(error, "response.code") || get(error, "response.data.code");

//     if (!errorCode) {
//       // return this error if server timeout
//       return Promise.reject(error);
//     }
//     if (
//       [
//         EAPIErrorCodeI18n.G0003,
//         EAPIErrorCodeI18n.G0001,
//         EAPIErrorCodeI18n.G0005,
//       ].includes(errorCode) &&
//       status === 401
//     ) {
//       showModal();
//     }

//     return Promise.reject(errorResponse);
//   }
// );
