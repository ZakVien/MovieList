import React, { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useLastLocation } from "react-router-last-location";
import { AnimatePresence, motion, MotionStyle } from "framer-motion";
import { useLocalStorage } from "@rehooks/local-storage";
import { Button } from "@material-ui/core";

import MovieBrowseWithData from "./MovieBrowseWithData";
import MovieListsWithData from "./MovieListsWithData";
import MovieListWithData from "./MovieListWithData";

const pageStyles: MotionStyle = {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  paddingTop: 60,
};

const variants = {
  visible: (skip: boolean) => {
    return {
      x: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: skip ? 0 : 0.6,
      },
    };
  },
  offScreenLeft: (skip: boolean) => {
    return {
      x: "-100%",
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: skip ? 0 : 0.6,
      },
    };
  },
  offScreenRight: (skip: boolean) => {
    return {
      x: "100%",
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: skip ? 0 : 0.6,
      },
    };
  },
};

async function getSessionIdFromRequestToken(token: string): Promise<string> {
  const url = new URL(
    "https://api.themoviedb.org/3/authentication/session/new"
  );
  url.searchParams.append("api_key", "56cadb8bb24ffc3ea1179620c8bbae8f");

  const response = await fetch(url.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      request_token: token,
    }),
  });

  const responseObj = await response.json();

  return responseObj.session_id;
}

export default function MainContentArea() {
  const location = useLocation();
  const lastLocation = useLastLocation();

  const [userSessionId, setUserSessionId] = useLocalStorage<string>(
    "userSessionId"
  );

  useEffect(() => {
    if (userSessionId == null) {
      const currentUrl = new URL(window.location.href);
      const requestToken = currentUrl.searchParams.get("request_token");
      if (requestToken != null) {
        // We're at step 3 of an approval flow
        getSessionIdFromRequestToken(requestToken).then((sessionId) => {
          setUserSessionId(sessionId);
        });
      }
    }
  }, [userSessionId, setUserSessionId]);

  const handleLinkMovieDbClick = async () => {
    // Step 1: Request a request token
    const url = new URL(
      "https://api.themoviedb.org/3/authentication/token/new"
    );
    url.searchParams.append("api_key", "56cadb8bb24ffc3ea1179620c8bbae8f");

    const response = await fetch(url.href);
    const responseObj = await response.json();

    // Step 2: Send user to authorization URL
    const approvalUrl = new URL(
      `https://www.themoviedb.org/authenticate/${responseObj.request_token}`
    );
    approvalUrl.searchParams.append("redirect_to", window.location.href);

    // Send the user to the approval URL
    window.location.href = approvalUrl.href;
  };

  if (userSessionId == null) {
    return (
      <div className="buttonPage">
        <Button
          variant="contained"
          color="primary"
          onClick={handleLinkMovieDbClick}
        >
          Link Movie Database Account
        </Button>
      </div>
    );
  }

  let transitionProps = {
    initial: "visible",
    exit: "offScreenLeft",
  };
  let shouldSkip = true;

  if (
    location.pathname === "/lists" &&
    lastLocation?.pathname.startsWith("/lists/")
  ) {
    transitionProps = {
      initial: "offScreenLeft",
      exit: "offScreenLeft",
    };
    shouldSkip = false;
  } else if (
    location.pathname.startsWith("/lists/") &&
    lastLocation?.pathname === "/lists"
  ) {
    transitionProps = {
      initial: "offScreenRight",
      exit: "offScreenRight",
    };
    shouldSkip = false;
  }

  return (
    <AnimatePresence initial={false} custom={shouldSkip}>
      <motion.div
        {...transitionProps}
        animate="visible"
        variants={variants}
        style={pageStyles}
        key={location.key}
      >
        <Switch location={location}>
          <Route path="/browse">
            <MovieBrowseWithData userSessionId={userSessionId} />
          </Route>
          <Route path="/lists/:id">
            <MovieListWithData userSessionId={userSessionId} />
          </Route>
          <Route path="/lists/">
            <MovieListsWithData userSessionId={userSessionId} />
          </Route>
          <Route path="/">
            <Redirect to="/Lists" />
          </Route>
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}
