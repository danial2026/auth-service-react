import React, { useEffect, useState } from "react";
const { URL } = require('url');

function RedirectPage({ match }) {
  useEffect(() => {
    // Get the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const redirectParam = urlParams.get("redirect");

    // check if its a valid url
    try {
      const urlObject = new URL(redirectParam);
      const domainName = 'danials.space';
      
      // check if the url ends with *.danials.space
      if (urlObject.hostname.endsWith(domainName)) {

        // Get user's accessToken
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && redirectParam) {
          // Redirect to the link with token as param
          const redirectLink = `${redirectParam}?token=${accessToken}`;
          window.location.href = redirectLink;
        } else {
          // Redirect to main page if user is not logged in
          window.location.href = "/";
        }
        } else {
        console.log('The URL is valid but does not end with ' + domainName);
        window.location.href = "/";
      }
    } catch (err) {
      console.error('The URL is not valid:', err);
      window.location.href = "/";
    }
  }, []);

  return <div></div>;
}

export default RedirectPage;