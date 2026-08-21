import { StrictMode, Suspense, Fragment, lazy, type ComponentType, type LazyExoticComponent } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes.ts";
import App from "./App.tsx";
import ScrollToHash from "./components/ScrollToHash.tsx";
import "./index.css";

const FAQPage = lazy(() => import("./pages/FAQPage.tsx"));
const ServicesIndexPage = lazy(() => import("./pages/ServicesIndexPage.tsx"));
const ServicePage = lazy(() => import("./pages/ServicePage.tsx"));
const LocationsIndexPage = lazy(() => import("./pages/LocationsIndexPage.tsx"));
const LocationPage = lazy(() => import("./pages/LocationPage.tsx"));
const BlogIndexPage = lazy(() => import("./pages/BlogIndexPage.tsx"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage.tsx"));

// Maps each routes.ts path to its component. Kept here (not in routes.ts) so that
// routes.ts stays free of page-component imports — see the comment in routes.ts
// for why that matters (it's imported by Navbar, which sits under every page).
const routeComponents: Record<string, ComponentType | LazyExoticComponent<ComponentType>> = {
  "/": App,
  "/faq": FAQPage,
  "/services": ServicesIndexPage,
  "/services/:slug": ServicePage,
  "/locations": LocationsIndexPage,
  "/locations/:slug": LocationPage,
  "/blog": BlogIndexPage,
  "/blog/:slug": BlogPostPage,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToHash />
      <Suspense fallback={null}>
        <Routes>
          {routes.map(({ path }) => {
            const Component = routeComponents[path];
            return (
              <Fragment key={path}>
                <Route path={path} element={<Component />} />
              </Fragment>
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
