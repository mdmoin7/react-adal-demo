import { UserAgentApplication } from "msal";
import { ADAL } from "./config";

export const requiresInteraction = errorMessage => {
  if (!errorMessage || !errorMessage.length) {
    return false;
  }

  return (
    errorMessage.indexOf("consent_required") > -1 ||
    errorMessage.indexOf("interaction_required") > -1 ||
    errorMessage.indexOf("login_required") > -1
  );
};

export const fetchMsGraph = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.json();
};

export const isIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ") > -1;
  const msie11 = ua.indexOf("Trident/") > -1;

  // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
  // const isEdge = ua.indexOf("Edge/") > -1;

  return msie || msie11;
};

export const GRAPH_SCOPES = {
  OPENID: "openid",
  PROFILE: "profile",
  USER_READ: "User.Read",
  MAIL_READ: "Mail.Read"
};

export const GRAPH_ENDPOINTS = {
  ME: "https://graph.microsoft.com/v1.0/me",
  MAIL: "https://graph.microsoft.com/v1.0/me/messages"
};

export const GRAPH_REQUESTS = {
  LOGIN: {
    scopes: [GRAPH_SCOPES.OPENID, GRAPH_SCOPES.PROFILE, GRAPH_SCOPES.USER_READ]
  },
  EMAIL: {
    scopes: [GRAPH_SCOPES.MAIL_READ]
  }
};

export const msalApp = new UserAgentApplication({
  auth: {
    ...ADAL.auth,
    validateAuthority: true,
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: ADAL.storage,
    storeAuthStateInCookie: isIE()
  },
  system: {
    navigateFrameWait: 0,
    logger: {
      error: console.error,
      errorPii: console.error,
      info: console.log,
      infoPii: console.log,
      verbose: console.log,
      verbosePii: console.log,
      warning: console.warn,
      warningPii: console.warn
    }
  }
});
