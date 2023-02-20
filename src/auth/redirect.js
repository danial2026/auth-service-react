import React, { useEffect, useState } from "react";

function RedirectPage({ match }) {
  useEffect(() => {
    // Get the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const redirectParam = urlParams.get("redirect");

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
  }, []);

  return <div></div>;
}

export default RedirectPage;