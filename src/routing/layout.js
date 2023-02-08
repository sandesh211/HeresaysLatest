import { Route, Routes } from "react-router-dom";
import AdClassified from "../pages/home/advertisement/adClassified";
import AddBanner from "../pages/home/advertisement/addBanner";
import AddBook from "../pages/home/advertisement/addBook";
import Advertisement from "../pages/home/advertisement/advertisement";
import Home from "../pages/home/home";
import Initial from "../pages/initialscreen/initial";
import ReadStory from "../pages/readstory/readstory";
import ReadStoryBook from "../pages/readstory/readstorybook";
// import ReadStoryBook2 from "../pages/readstory/readStoryBook2";
import StoryList from "../pages/readstory/StoryList";
import TypeStory from "../pages/typestory/typestory";
import WriteStory from "../pages/writestory/writestory";
import New from "../pages/new/new";
import StoryList2 from "../pages/readstory/StoryList2";
import { useState } from "react";

const Layout = (props) => {
  const [languageRefresh, setLanguageRefresh] = useState(false);

  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Home
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      />
      <Route
        exact
        path="/"
        element={
          <Initial
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      />
      <Route
        path="/readstory"
        element={
          <ReadStory
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      />
      {/* <Route
        path="/readstory/storylist"
        element={
          <StoryList
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      /> */}
      <Route
        path="/storylist2"
        element={
          <StoryList2
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      />
      <Route
        path="/storylist2/readstorybook/:storyid"
        element={
          <ReadStoryBook
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      />
      {/* <Route
        path="/readstory/storylist/readstorybook2/:storyid"
        element={
          <ReadStoryBook2
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      />
      <Route
        path="/readstorybook2"
        element={
          <ReadStoryBook2
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      /> */}

      <Route
        path="/writestory"
        element={
          <WriteStory
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      />
      {/* <Route
        path="/advertisement"
        element={
          <Advertisement
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      /> */}
      {/* <Route
        path="/advertisement/ad-classified"
        element={
          <AdClassified
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      /> */}
      {/* <Route
        path="/advertisement/add-book"
        element={
          <AddBook
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      /> */}
      {/* <Route
        path="/advertisement/add-banner"
        element={
          <AddBanner
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      /> */}
      <Route
        path="/story/type-story"
        element={
          <TypeStory
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      />
      {/* <Route
        path="/new"
        element={
          <New
            imagesPreloaded={props.imagesPreloaded}
            languageRefresh={languageRefresh}
            setLanguageRefresh={setLanguageRefresh}
          />
        }
      /> */}
    </Routes>
  );
};
export default Layout;
